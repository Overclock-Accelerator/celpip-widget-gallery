/**
 * POST /api/builder/generate
 *
 * Streams Server-Sent Events while the AI Builder pipeline runs:
 *  - drafting copy (gpt-4o-mini, structured output)
 *  - generating 1 hero + 3 ad creatives in parallel (gpt-image-1)
 *  - composing the Microsite JSON and persisting to public/builder/{sessionId}/
 *
 * Each SSE message is one BuilderStreamEvent (see src/builder/types.ts),
 * JSON-encoded on a single `data:` line. A blank line terminates each event.
 *
 * The client reads the final `done` event for the assembled BuilderResult
 * and redirects to `/builder/result/{sessionId}`.
 */

import { runGeneration } from "@/builder/generate";
import type {
  BuilderInput,
  BuilderStreamEvent,
  CountryTarget,
  ToneLeaning,
} from "@/builder/types";

// Force Node.js runtime so we can use node:fs / node:crypto.
export const runtime = "nodejs";
// This route does long synchronous work — never cache.
export const dynamic = "force-dynamic";
// Generous max duration; image generation can take ~60s.
export const maxDuration = 300;

const COUNTRIES: CountryTarget[] = ["Canada", "Australia", "Both"];
const TONES: ToneLeaning[] = ["Inspiring", "Reassuring", "Practical"];

function isCountry(v: unknown): v is CountryTarget {
  return typeof v === "string" && (COUNTRIES as string[]).includes(v);
}
function isTone(v: unknown): v is ToneLeaning {
  return typeof v === "string" && (TONES as string[]).includes(v);
}

function parseInput(body: unknown): BuilderInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be JSON object" };
  const b = body as Record<string, unknown>;
  const audience = typeof b.audience === "string" ? b.audience.trim() : "";
  const concept = typeof b.concept === "string" ? b.concept.trim() : "";
  const country = b.country;
  const tone = b.tone;
  if (audience.length < 10) return { error: "audience must be at least 10 characters" };
  if (concept.length < 10) return { error: "concept must be at least 10 characters" };
  if (audience.length > 1500) return { error: "audience exceeds 1500 characters" };
  if (concept.length > 1500) return { error: "concept exceeds 1500 characters" };
  if (!isCountry(country)) return { error: "country must be Canada | Australia | Both" };
  if (!isTone(tone)) return { error: "tone must be Inspiring | Reassuring | Practical" };
  return { audience, concept, country, tone };
}

function sse(event: BuilderStreamEvent): string {
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

  const input = parsed;
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: BuilderStreamEvent) => {
        controller.enqueue(encoder.encode(sse(event)));
      };

      try {
        await runGeneration(input, emit);
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
