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
 * Hero imagery: when any image-bearing hero variant is selected (HeroSplit,
 * HeroFullBleedImage, HeroSplitForm, HeroFloatingPanel, HeroBigStat,
 * HeroCentered) we call OpenAI Images (`gpt-image-1`) once with an
 * audience-themed editorial prompt and stash the file at
 * `public/builds/{id}/hero.png`. `microsite.heroImageSrc` is wired to that
 * path so the renderBlock fallback chain populates the variant correctly.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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
const IMAGE_MODEL = "gpt-image-1";

/**
 * Hero kinds that consume `imageSrc` from `microsite.heroImageSrc`. If at
 * least one of these is selected, the build pipeline generates a hero image.
 * HeroGradient and HeroFormInHeader are intentionally excluded — they don't
 * have an imagery slot.
 */
const HEROES_NEEDING_IMAGE = new Set<WidgetKind>([
  "HeroSplit",
  "HeroFullBleedImage",
  "HeroSplitForm",
  "HeroFloatingPanel",
  "HeroBigStat",
  "HeroCentered",
]);

async function generateHeroImage(
  apiKey: string,
  audienceLabel: string,
  audienceContext: string,
  outFile: string,
): Promise<void> {
  const prompt = [
    "Photorealistic editorial photograph, 4:3 landscape.",
    `Subject: a real working professional from this audience — ${audienceLabel}.`,
    audienceContext,
    "Show them in a moment of calm, focused confidence — at work, studying with a laptop, or in their professional environment. Avoid stock-photo cliches; aim for candid, lived-in, dignified.",
    "Editorial photography style, shallow depth of field, 50mm lens at f/2.5, soft natural light.",
    "No text, no logos, no watermark, no UI overlays.",
  ].join(" ");

  const res = await fetch(`${OPENAI_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      size: "1536x1024",
      n: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI image failed: ${res.status} ${body.slice(0, 240)}`);
  }

  const json = (await res.json()) as { data: { b64_json?: string }[] };
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI image returned no b64_json");
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, Buffer.from(b64, "base64"));
}

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

  // Defensive ordering: a marketer can pick variants in any sequence in the
  // wizard, but the rendered microsite must follow the canonical layout
  // arc (Hero → trust → features → social proof → conversion → CTA).
  // We sort the selection into that arc here.
  // If no Hero variant was picked, prepend HeroSplit so the page always
  // opens with a hero. (Without this defensive add, a build with FeatureGrid
  // first looks broken — exactly what was happening pre-fix.)
  let orderedKinds = sortKindsIntoLayoutOrder(args.selectedKinds);
  if (!orderedKinds.some((k) => k.startsWith("Hero"))) {
    orderedKinds = ["HeroSplit" as WidgetKind, ...orderedKinds];
  }

  const totalBlocks = orderedKinds.length;

  // Generate the sample id up front so we can pin the hero image path before
  // we know the blocks. Slug stays the URL fragment for the saved sample.
  const id = newSampleId(args.audienceKey);

  // Step 1 — Frame
  emit({
    type: "step",
    step: "drafting-frame",
    label: "Drafting microsite frame…",
  });
  const frame = await generateFrame(apiKey, audienceContext, audienceLabel, orderedKinds);

  // Step 1.5 — Hero image (only if any image-bearing hero is selected)
  let heroImageSrc: string | undefined;
  const needsHeroImage = orderedKinds.some((k) => HEROES_NEEDING_IMAGE.has(k));
  if (needsHeroImage) {
    emit({
      type: "step",
      step: "generating-hero-image",
      label: "Generating hero image…",
    });
    try {
      const heroFile = path.join(
        process.cwd(),
        "public",
        "builds",
        id,
        "hero.png",
      );
      await generateHeroImage(apiKey, audienceLabel, audienceContext, heroFile);
      heroImageSrc = `/builds/${id}/hero.png`;
    } catch (err) {
      emit({
        type: "warning",
        message: `Hero image generation failed: ${(err as Error).message}. Sample will use the placeholder fallback.`,
      });
    }
  }

  // Step 2..N — One LLM call per block
  const blocks: WidgetBlock[] = [];
  for (let i = 0; i < orderedKinds.length; i++) {
    const kind = orderedKinds[i];
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

  const name =
    args.sampleName?.trim() ||
    `${audienceLabel} — ${new Date().toISOString().slice(0, 10)}`;

  const microsite: Microsite = {
    id: 0, // not in the registry — addressed by sample id (slug)
    title: name,
    tag: "Layout",
    description: `${audienceLabel} · ${blocks.length} composed widgets`,
    heroImageSrc,
    blocks,
  };

  const sample: Sample = {
    id,
    name,
    audienceKey: args.audienceKey,
    audienceLabel,
    // Persist the canonical-ordered list so the sample summary reflects what
    // actually rendered — not the user's click order.
    selectedKinds: orderedKinds,
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

// ─────────────────────────────────────────────────────────────────────────
// Canonical layout order
// ─────────────────────────────────────────────────────────────────────────
//
// Marketers select widgets in arbitrary order in the wizard. The rendered
// microsite must always read top-down as a real landing page: Hero on top,
// CTA at the bottom, social proof and conversion in between. This table
// assigns every kind to a stage; we stable-sort by stage so within-stage
// order matches the user's click order (lets them rearrange e.g. two CTAs).
const LAYOUT_STAGE: Record<WidgetKind, number> = {
  // 0 — Hero (any of the 8 variants)
  HeroSplit: 0,
  HeroFullBleedImage: 0,
  HeroSplitForm: 0,
  HeroFloatingPanel: 0,
  HeroBigStat: 0,
  HeroCentered: 0,
  HeroFormInHeader: 0,
  HeroGradient: 0,
  // 1 — Urgency strip (sits right under the hero)
  UrgencyBar: 1,
  // 2 — Trust signals
  TrustStrip: 2,
  // 3 — Vanity metrics
  MetricsRow: 3,
  MetricsNavyDividers: 3,
  MetricsCards: 3,
  // 4 — Why CELPIP / features (the "value prop" arc)
  WhyCelpipPillars: 4,
  WhyCelpipTestCards: 4,
  WhyCelpipMomentum: 4,
  FeatureGrid: 4,
  FeatureNavyCards: 4,
  // 5 — Social proof / moments
  MomentSpotlightLargePhoto: 5,
  MomentSpotlightInline: 5,
  TestimonialSpotlight: 5,
  TestimonialQuoteCards: 5,
  TestimonialVideo: 5,
  // 6 — Score / equivalence (interpretive)
  ScoreEquivalencyTable: 6,
  // 7 — Content / editorial (rich text + galleries)
  RichTextEditorial: 7,
  RichTextCompact: 7,
  ImageGalleryGrid: 7,
  ImageGalleryCarousel: 7,
  // 8 — Conversion machinery
  BookingPanelInline: 8,
  BookingPanelStacked: 8,
  NextStepsHorizontal: 8,
  NextStepsVertical: 8,
  ReadinessQuiz: 8,
  PrepStarterPackHero: 8,
  PrepStarterPackInline: 8,
  // 9 — Resources / lead-magnet listings
  ResourceCardGrid: 9,
  ResourceFilteredList: 9,
  // 10 — Objection handling (last-mile FAQs come before the CTA)
  ObjectionHandlerFAQ: 10,
  FAQAccordion: 10,
  FAQTabbedByCategory: 10,
  // 11 — Lead forms
  FormSimpleLead: 11,
  FormInline: 11,
  FormB2BContact: 11,
  // 12 — Final CTA
  CTABoldBanner: 12,
  CTANavyAccent: 12,
  CTACardWithIcon: 12,
};

function sortKindsIntoLayoutOrder(kinds: WidgetKind[]): WidgetKind[] {
  return kinds
    .map((k, i) => ({ k, i, stage: LAYOUT_STAGE[k] ?? 99 }))
    .sort((a, b) => a.stage - b.stage || a.i - b.i)
    .map((x) => x.k);
}

// Suppress unused-warning for the imported AUDIENCE_PRESETS (kept for tree-shake clarity).
void AUDIENCE_PRESETS;
