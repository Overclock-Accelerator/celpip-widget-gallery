/**
 * Composer generation pipeline.
 *
 * Strategy: one OpenAI call per selected widget kind (sequential), so each
 * call's JSON schema stays small and easy for the LLM to satisfy. Between
 * each call we emit a `step` SSE event with `blockIndex` so the client can
 * render a per-block progress indicator.
 *
 * Cohesion comes from a shared **frame** generated up front:
 *   - audience anchor (preset context or marketer override)
 *   - global tone, story arc, key proof points
 * The frame is appended to every per-block user prompt so the entire
 * microsite reads as one piece — names recur across blocks, the same CLB
 * scores show up in the FAQ + score table, the same testimony recurs in
 * the moment spotlight + spotlight + quote cards.
 *
 * No images are generated here (out of scope — sample.heroImageSrc is left
 * undefined; user can swap in /heroes/N.png later by editing the sample).
 */

import type { Microsite, WidgetBlock } from "@/microsites/data";
import type {
  ComposerStreamEvent,
  Sample,
  WidgetKind,
} from "./types";
import {
  AUDIENCE_PRESETS,
  CATALOG_BY_KIND,
  PROP_SCHEMAS,
  getAudiencePreset,
} from "./catalog";
import { newSampleId, saveSample } from "./storage";

const OPENAI_BASE = "https://api.openai.com/v1";
const TEXT_MODEL = "gpt-4o-mini";

const COMPOSER_VOICE_SYSTEM = `You write web copy for CELPIP, the Canadian English Language Proficiency Index Program.

Voice: Supportive expert. Calm, competent guide. "You've got this. And we've got you."
Style: European spelling. Grade 5–7 readability. Active voice. Concise. No hype.
Boundaries:
  - NEVER give immigration advice. Regulatory questions point readers to IRCC, DHA, FMRAC, CAPR, AHPRA, or relevant authority.
  - NEVER mention pricing or fees.
  - Don't promise outcomes — describe what CELPIP IS recognised for.
  - Specific to the audience: every block must speak to the SAME named people, the SAME CLB scores, the SAME journey. The microsite is one cohesive artefact, not a montage.

You will receive a microsite frame (audience + story arc + recurring details), then a single widget kind to write props for. Output ONLY JSON matching the supplied schema. Do not wrap in code fences.`;

// ─────────────────────────────────────────────────────────────────────────
// Frame generation (the cohesion layer)
// ─────────────────────────────────────────────────────────────────────────

type Frame = {
  audienceContext: string;
  audienceLabel: string;
  storyArc: string;
  recurringTestimonialName: string;
  recurringTestimonialLocation: string;
  recurringTestimonialScore: string;
  proofPoints: string[];
};

const FRAME_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "storyArc",
    "recurringTestimonialName",
    "recurringTestimonialLocation",
    "recurringTestimonialScore",
    "proofPoints",
  ],
  properties: {
    storyArc: {
      type: "string",
      description:
        "Single paragraph (35–70 words) describing the through-line of this microsite — opening hook → trust → conversion. Reused across every block prompt.",
    },
    recurringTestimonialName: {
      type: "string",
      description:
        "First and last name of one named candidate the microsite recurs to (e.g. in MomentSpotlight + TestimonialSpotlight). Match the audience region.",
    },
    recurringTestimonialLocation: {
      type: "string",
      description: 'e.g. "Mumbai → Toronto"',
    },
    recurringTestimonialScore: {
      type: "string",
      description: 'CLB band, e.g. "CLB 9"',
    },
    proofPoints: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: { type: "string", description: "10–18 words. Concrete CELPIP facts that recur." },
    },
  },
} as const;

async function generateFrame(
  apiKey: string,
  audienceContext: string,
  audienceLabel: string,
  selectedKinds: WidgetKind[],
): Promise<Frame> {
  const userPrompt = `Audience: ${audienceContext}

The marketer has chosen these widget blocks for the microsite (in order):
${selectedKinds.map((k, i) => `${i + 1}. ${k} — ${CATALOG_BY_KIND.get(k)?.intent ?? ""}`).join("\n")}

Produce a microsite frame: a story arc that ties these blocks together, one named candidate to recur in any moment/testimonial blocks, and 3–5 concrete CELPIP proof points that recur across blocks.`;

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: COMPOSER_VOICE_SYSTEM },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "composer_frame", strict: true, schema: FRAME_SCHEMA },
      },
      temperature: 0.65,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI frame call failed: ${res.status} ${body.slice(0, 240)}`);
  }
  const json = (await res.json()) as { choices: { message: { content: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI frame call returned no content");
  const parsed = JSON.parse(content) as Omit<Frame, "audienceContext" | "audienceLabel">;
  return { ...parsed, audienceContext, audienceLabel };
}

// ─────────────────────────────────────────────────────────────────────────
// Per-block generation
// ─────────────────────────────────────────────────────────────────────────

async function generateBlockProps(
  apiKey: string,
  kind: WidgetKind,
  frame: Frame,
): Promise<unknown> {
  const schema = PROP_SCHEMAS[kind];
  if (!schema) throw new Error(`No prop schema for kind ${kind}`);
  const intent = CATALOG_BY_KIND.get(kind)?.intent ?? "";
  const userPrompt = `Microsite frame:
Audience — ${frame.audienceLabel}: ${frame.audienceContext}

Story arc: ${frame.storyArc}

Recurring candidate (use whenever a named person appears): ${frame.recurringTestimonialName} (${frame.recurringTestimonialLocation}, ${frame.recurringTestimonialScore})

Proof points to thread through the microsite:
${frame.proofPoints.map((p) => `- ${p}`).join("\n")}

Now write the props JSON for one block:
- Kind: ${kind}
- Intent: ${intent}

Constraints:
- Match the audience exactly.
- Reuse the recurring candidate when a named person fits.
- Reuse the proof points where relevant.
- No pricing. No immigration advice. European spelling.
- Output ONLY a JSON object matching the schema.`;

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: COMPOSER_VOICE_SYSTEM },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: `props_${kind}`, strict: true, schema },
      },
      temperature: 0.6,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${kind} call failed: ${res.status} ${body.slice(0, 240)}`);
  }
  const json = (await res.json()) as { choices: { message: { content: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error(`OpenAI ${kind} call returned no content`);
  return JSON.parse(content);
}

// ─────────────────────────────────────────────────────────────────────────
// Coercion: LLM-generated props → typed WidgetBlock
// ─────────────────────────────────────────────────────────────────────────

/**
 * The LLM output for galleries doesn't include `src` (we drop it from the
 * schema to avoid hallucinated URLs). Inject placeholder srcs at coercion
 * time so the gallery widgets render.
 */
function coerceProps(kind: WidgetKind, props: unknown): WidgetBlock {
  const p = props as Record<string, unknown>;

  if (kind === "ImageGalleryGrid" || kind === "ImageGalleryCarousel") {
    const images = (p.images as Array<{ alt: string; caption: string }>).map((img, i) => ({
      src: `https://picsum.photos/seed/composer-${kind}-${i}/800/800`,
      alt: img.alt,
      caption: img.caption,
    }));
    return { kind, props: { heading: p.heading as string, images } } as WidgetBlock;
  }

  if (kind === "MomentSpotlightLargePhoto" || kind === "MomentSpotlightInline") {
    return {
      kind,
      props: {
        ...(p as object),
        imageSrc: `https://picsum.photos/seed/composer-${kind}/1200/1400`,
      },
    } as WidgetBlock;
  }

  if (kind === "PrepStarterPackHero" || kind === "PrepStarterPackInline") {
    return {
      kind,
      props: {
        ...(p as object),
        imageSrc: `https://picsum.photos/seed/composer-prep-${kind}/800/800`,
      },
    } as WidgetBlock;
  }

  if (kind === "ResourceFilteredList") {
    const filters = p.filters as string[];
    return {
      kind,
      props: { ...(p as object), activeFilter: filters[0] },
    } as WidgetBlock;
  }

  // Default: pass props through verbatim.
  return { kind, props: p } as WidgetBlock;
}

// ─────────────────────────────────────────────────────────────────────────
// Top-level orchestrator
// ─────────────────────────────────────────────────────────────────────────

export async function runComposerBuild(
  args: {
    audienceKey: string;
    customAudience?: string;
    selectedKinds: WidgetKind[];
    sampleName?: string;
  },
  emit: (event: ComposerStreamEvent) => void,
): Promise<{ sample: Sample; microsite: Microsite }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const preset = getAudiencePreset(args.audienceKey);
  if (!preset && !args.customAudience) {
    throw new Error("Unknown audience preset and no customAudience override supplied.");
  }

  const audienceContext = args.customAudience?.trim()
    ? args.customAudience.trim()
    : preset!.context;
  const audienceLabel = preset?.label ?? "Custom audience";

  const totalBlocks = args.selectedKinds.length;

  // Step 1 — Frame
  emit({
    type: "step",
    step: "drafting-frame",
    label: "Drafting microsite frame…",
  });
  const frame = await generateFrame(apiKey, audienceContext, audienceLabel, args.selectedKinds);

  // Step 2..N — One LLM call per block
  const blocks: WidgetBlock[] = [];
  for (let i = 0; i < args.selectedKinds.length; i++) {
    const kind = args.selectedKinds[i];
    const entry = CATALOG_BY_KIND.get(kind);
    emit({
      type: "step",
      step: "rewriting-block",
      label: `Rewriting ${entry?.displayName ?? kind} (${i + 1} of ${totalBlocks})…`,
      blockIndex: i,
      totalBlocks,
      kind,
    });
    try {
      const props = await generateBlockProps(apiKey, kind, frame);
      blocks.push(coerceProps(kind, props));
    } catch (err) {
      emit({
        type: "warning",
        message: `Block ${kind} generation failed: ${
          (err as Error).message
        }. Skipping this block.`,
      });
    }
  }

  if (blocks.length === 0) {
    throw new Error("No blocks were generated successfully.");
  }

  // Step N+1 — Compose Microsite
  emit({
    type: "step",
    step: "composing-microsite",
    label: "Composing microsite…",
  });

  const id = newSampleId(args.audienceKey);
  const name =
    args.sampleName?.trim() ||
    `${audienceLabel} — ${new Date().toISOString().slice(0, 10)}`;

  const microsite: Microsite = {
    id: 0, // not in the registry — addressed by sample id (slug)
    title: name,
    tag: "Layout",
    description: `${audienceLabel} · ${blocks.length} composed widgets`,
    blocks,
  };

  const sample: Sample = {
    id,
    name,
    audienceKey: args.audienceKey,
    audienceLabel,
    selectedKinds: args.selectedKinds,
    microsite,
    createdAt: new Date().toISOString(),
  };

  // Step N+2 — Persist
  emit({ type: "step", step: "saving-sample", label: "Saving sample…" });
  await saveSample(sample);

  emit({ type: "step", step: "complete", label: "Complete." });
  emit({
    type: "done",
    sample: { id: sample.id, name: sample.name },
    microsite,
  });

  return { sample, microsite };
}

// Suppress unused-warning for the imported AUDIENCE_PRESETS (kept for tree-shake clarity).
void AUDIENCE_PRESETS;
