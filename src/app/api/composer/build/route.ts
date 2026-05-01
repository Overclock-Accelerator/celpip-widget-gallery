/**
 * POST /api/composer/build
 *
 * Streams Server-Sent Events while the Widget Composer pipeline runs.
 * Body: { audienceKey, customAudience?, selectedKinds, sampleName? }
 *
 * Each SSE message is one ComposerStreamEvent (see src/composer/types.ts).
 * Mirrors the pattern at /api/builder/generate but at the composer endpoint.
 */

import { runComposerBuild } from "@/composer/generate";
import type { ComposerStreamEvent, WidgetKind } from "@/composer/types";
import { getAudiencePreset, PROP_SCHEMAS } from "@/composer/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function isWidgetKind(s: unknown): s is WidgetKind {
  return typeof s === "string" && s in PROP_SCHEMAS;
}

function parseInput(body: unknown):
  | {
      audienceKey: string;
      customAudience?: string;
      selectedKinds: WidgetKind[];
      sampleName?: string;
    }
  | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be JSON object" };
  const b = body as Record<string, unknown>;

  const audienceKey = typeof b.audienceKey === "string" ? b.audienceKey.trim() : "";
  if (!audienceKey) return { error: "audienceKey is required" };
  const customAudience =
    typeof b.customAudience === "string" && b.customAudience.trim().length > 0
      ? b.customAudience.trim()
      : undefined;
  const preset = getAudiencePreset(audienceKey);
  if (!preset && !customAudience) {
    return { error: `Unknown audienceKey '${audienceKey}' and no customAudience supplied.` };
  }

  if (!Array.isArray(b.selectedKinds) || b.selectedKinds.length < 3) {
    return { error: "selectedKinds must be an array of at least 3 widget kinds." };
  }
  if (b.selectedKinds.length > 12) {
    return { error: "selectedKinds may not exceed 12 widgets." };
  }
  for (const k of b.selectedKinds) {
    if (!isWidgetKind(k)) return { error: `Unknown widget kind: ${String(k)}` };
  }
  const selectedKinds = b.selectedKinds as WidgetKind[];
  const sampleName = typeof b.sampleName === "string" ? b.sampleName.trim() : undefined;

  return { audienceKey, customAudience, selectedKinds, sampleName };
}

function sse(event: ComposerStreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "OPENAI_API_KEY is not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const parsed = parseInput(body);
  if ("error" in parsed) {
    return new Response(JSON.stringify({ error: parsed.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: ComposerStreamEvent) => {
        controller.enqueue(encoder.encode(sse(event)));
      };
      try {
        await runComposerBuild(parsed, emit);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        emit({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
