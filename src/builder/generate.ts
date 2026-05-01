/**
 * Server-only generation pipeline for the AI Builder.
 *
 * Two API surfaces:
 *  - OpenAI Chat Completions (`gpt-4o-mini`) for structured copy
 *  - OpenAI Images (`gpt-image-1`) for hero + 3 ad creatives
 *
 * The top-level entry point is `runGeneration(input, emit)` which streams
 * progress events through `emit` and resolves to a fully-assembled
 * `BuilderResult`. Image generation runs in parallel via Promise.all.
 *
 * If any individual image generation fails, we fall back to a tiny
 * inline-rendered gradient PNG (1×1 placeholder is fine — the result page
 * uses CSS gradients with overlay text when `src` is empty).
 *
 * Voice/tone: CELPIP brand — supportive expert, calm guide, never gives
 * immigration advice. Reflected in both the copy system prompt and the
 * image prompt scaffolding.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

import type { Microsite, WidgetBlock } from "@/microsites/data";
import type {
  BuilderAdImages,
  BuilderCopy,
  BuilderInput,
  BuilderResult,
  BuilderStreamEvent,
  CountryTarget,
  ToneLeaning,
} from "./types";

const OPENAI_BASE = "https://api.openai.com/v1";
const TEXT_MODEL = "gpt-4o-mini";
const IMAGE_MODEL = "gpt-image-1";

const PUBLIC_BUILDER_DIR = path.join(process.cwd(), "public", "builder");

// ─────────────────────────────────────────────────────────────────────────
// Session management
// ─────────────────────────────────────────────────────────────────────────

export function newSessionId(): string {
  // 8 chars hex + ms timestamp suffix → readable + collision-free for demo.
  return `${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`;
}

async function ensureSessionDir(sessionId: string): Promise<string> {
  const dir = path.join(PUBLIC_BUILDER_DIR, sessionId);
  await mkdir(dir, { recursive: true });
  return dir;
}

// ─────────────────────────────────────────────────────────────────────────
// Copy generation (structured output via JSON Schema)
// ─────────────────────────────────────────────────────────────────────────

const CELPIP_VOICE_SYSTEM = `You write web copy for CELPIP, a Canadian English language proficiency test recognised by IRCC (Canada) and DHA (Australia).

Voice: Supportive expert. Calm, competent guide. "You've got this. And we've got you."
Style: European spelling. Grade 5–7 readability. Active voice. Concise. No hype.
Boundaries: NEVER give immigration advice. If something is regulatory, point readers to IRCC or DHA. Don't promise outcomes — describe what CELPIP IS.

You will receive a target audience and ad concept. Produce structured website copy + a short ad pair. Keep all copy specific to the audience described.`;

const COPY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "eyebrow",
    "headline",
    "subhead",
    "primaryCta",
    "secondaryCta",
    "features",
    "testimonials",
    "faqs",
    "metrics",
    "adHeadline",
    "adTagline",
  ],
  properties: {
    eyebrow: { type: "string", description: "Short uppercase tag, 2-5 words." },
    headline: { type: "string", description: "Hero headline, 6-12 words." },
    subhead: { type: "string", description: "Hero subhead, 18-32 words." },
    primaryCta: { type: "string", description: "Primary CTA label, 2-4 words." },
    secondaryCta: { type: "string", description: "Secondary CTA label, 2-4 words." },
    features: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["icon", "title", "desc"],
        properties: {
          icon: {
            type: "string",
            description:
              "A single emoji codepoint as plain Unicode (e.g. 💻 ⏱ 🌍). NOT an HTML entity.",
          },
          title: { type: "string", description: "Feature title, 2-5 words." },
          desc: { type: "string", description: "Feature description, 14-26 words." },
        },
      },
    },
    testimonials: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "location", "quote", "score"],
        properties: {
          name: { type: "string" },
          location: { type: "string" },
          quote: { type: "string", description: "20-50 words. Specific, plain-spoken." },
          score: { type: "string", description: 'CLB band, e.g. "CLB 9"' },
        },
      },
    },
    faqs: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["q", "a"],
        properties: {
          q: { type: "string" },
          a: { type: "string", description: "30-60 words. No immigration advice." },
        },
      },
    },
    metrics: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["value", "label"],
        properties: {
          value: { type: "string", description: 'e.g. "4-5 days", "3 hrs", "100+"' },
          label: { type: "string", description: "Short label, 2-4 words." },
        },
      },
    },
    adHeadline: { type: "string", description: "Ad headline, max 7 words." },
    adTagline: { type: "string", description: "Ad tagline, max 14 words." },
  },
} as const;

export async function generateCopy(input: BuilderInput): Promise<BuilderCopy> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const userPrompt = `Audience:
${input.audience.trim()}

Ad concept / scene:
${input.concept.trim()}

Target country: ${input.country}
Tone leaning: ${input.tone}

Produce structured copy that speaks directly to this audience. Tie at least the headline, subhead, and one feature to the specific country target. Match the tone leaning. Keep CLB scores realistic (CLB 7-10 is most common for PR / skilled migration applicants).`;

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: CELPIP_VOICE_SYSTEM },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "celpip_copy",
          strict: true,
          schema: COPY_SCHEMA,
        },
      },
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI chat failed: ${res.status} ${body.slice(0, 240)}`);
  }

  const json = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI chat returned no content");
  return JSON.parse(content) as BuilderCopy;
}

// ─────────────────────────────────────────────────────────────────────────
// Image generation
// ─────────────────────────────────────────────────────────────────────────

type ImageSize = "1024x1024" | "1024x1536" | "1536x1024";

async function generateOneImage(
  prompt: string,
  size: ImageSize,
  outFile: string,
): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch(`${OPENAI_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      size,
      n: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI image failed (${size}): ${res.status} ${body.slice(0, 240)}`);
  }

  const json = (await res.json()) as { data: { b64_json?: string }[] };
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`OpenAI image returned no b64_json (${size})`);
  await writeFile(outFile, Buffer.from(b64, "base64"));
}

function buildImagePrompt(
  input: BuilderInput,
  framing: "hero" | "1x1" | "9x16" | "4x5",
): string {
  const framingNote: Record<typeof framing, string> = {
    hero: "Cinematic wide editorial framing for a website hero, 16:9 composition.",
    "1x1": "Square framing balanced for an Instagram or Meta feed ad, central subject.",
    "9x16":
      "Tall vertical framing for Instagram Reels or TikTok story ads, subject in the upper two-thirds with breathing room above and below for safe zones.",
    "4x5":
      "Portrait framing for a Facebook or Instagram feed ad, subject occupies most of the vertical space without crowding the edges.",
  };

  // Country-anchored scene libraries. People are always the focus —
  // either at work in their career, among friends visiting recognisable
  // landmarks, or set against the cityscape of their destination.
  const scenes: Record<CountryTarget, {
    careers: string[];
    landmarks: string[];
    cityscapes: string[];
  }> = {
    Canada: {
      careers: [
        "a nurse in scrubs reviewing a chart with a colleague on a hospital ward",
        "a software engineer at a standing desk in a bright Toronto open-plan office",
        "a construction site engineer in a hard hat reviewing plans on a Vancouver job site",
        "a teacher leading a small group of students in a sunlit Canadian classroom",
      ],
      landmarks: [
        "a small group of friends laughing together in front of the CN Tower at golden hour",
        "two friends taking a selfie on the steps of Parliament Hill in Ottawa",
        "a couple walking past Stanley Park totem poles in Vancouver",
        "friends sharing coffee on a patio in Old Montreal with cobblestone streets",
      ],
      cityscapes: [
        "the downtown Toronto skyline at dusk with a lone figure walking toward it",
        "Vancouver waterfront with mountains behind, a person in foreground carrying a backpack",
        "snowy Montreal rowhouse street with warm window light and a person walking",
        "Calgary skyline at sunrise with a commuter in the foreground",
      ],
    },
    Australia: {
      careers: [
        "a registered nurse in a Sydney hospital corridor consulting with a colleague",
        "an engineer in hi-vis on a Melbourne construction site reading drawings",
        "a barista crafting coffee in a sunlit Melbourne laneway café",
        "a young accountant at a desk in a Sydney CBD office with harbour views",
      ],
      landmarks: [
        "friends posing for a photo in front of the Sydney Opera House at sunset",
        "a couple walking across the Sydney Harbour Bridge with the city behind",
        "friends laughing together at a Bondi Beach lookout with surfers in the distance",
        "two friends exploring the laneway street art of Hosier Lane in Melbourne",
      ],
      cityscapes: [
        "Sydney harbour skyline at golden hour with a single figure on a viewpoint",
        "Melbourne tram-lined city street at dusk with a commuter walking",
        "Brisbane river skyline at dawn with a jogger in the foreground",
        "Perth city skyline across the Swan River with a person looking out",
      ],
    },
    Both: {
      careers: [
        "a healthcare professional in scrubs in a modern hospital corridor",
        "a software engineer collaborating with a teammate at a bright office whiteboard",
        "a construction site engineer in hi-vis reviewing plans on site",
        "a young professional in business casual at a sunlit co-working space",
      ],
      landmarks: [
        "friends laughing together in front of an iconic harbour skyline at sunset",
        "a couple walking through a historic downtown plaza at golden hour",
        "two friends taking a selfie on a famous waterfront promenade",
        "a small group exploring a cobblestone old-town district",
      ],
      cityscapes: [
        "a sweeping modern city skyline at dusk with a single figure walking toward it",
        "a waterfront skyline with mountains behind and a person carrying a backpack",
        "a downtown street at golden hour with warm light and a lone commuter",
        "a city park overlook with skyline behind and a person looking out",
      ],
    },
  };

  // Deterministic scene-per-framing rotation so the four creatives
  // form a coherent set: hero = cityscape, 1x1 = career, 9x16 =
  // landmarks (friends), 4x5 = career portrait.
  const country: CountryTarget = (input.country as CountryTarget) ?? "Both";
  const lib = scenes[country] ?? scenes.Both;
  const pickFor: Record<typeof framing, string> = {
    hero: lib.cityscapes[0],
    "1x1": lib.careers[1],
    "9x16": lib.landmarks[0],
    "4x5": lib.careers[0],
  };

  return [
    `Photorealistic editorial photograph featuring real people: ${pickFor[framing]}.`,
    `Mood: calm, focused, hopeful, ${input.tone.toLowerCase()}.`,
    `Lighting: soft natural daylight, warm midtones, no harsh shadows.`,
    framingNote[framing],
    "Subjects must look candid and aspirational, mid-action, never posed like stock photography.",
    "Absolutely no text, letters, words, signage, UI overlays, logos, watermarks, or superimposed graphics anywhere in the image.",
  ].join(" ");
}

// ─────────────────────────────────────────────────────────────────────────
// Microsite assembly
// ─────────────────────────────────────────────────────────────────────────

function composeMicrosite(
  sessionId: string,
  input: BuilderInput,
  copy: BuilderCopy,
  heroPath: string,
): Microsite {
  const blocks: WidgetBlock[] = [];

  // 1. Hero
  blocks.push({
    kind: "HeroSplit",
    props: {
      eyebrow: copy.eyebrow,
      headline: copy.headline,
      subhead: copy.subhead,
      primaryCta: { label: copy.primaryCta },
      secondaryCta: { label: copy.secondaryCta },
      imageAlt: input.concept.slice(0, 80),
    },
  });

  // 2. Metrics
  blocks.push({
    kind: "MetricsRow",
    props: {
      metrics: copy.metrics,
    },
  });

  // 3. Features
  blocks.push({
    kind: "FeatureGrid",
    props: {
      heading: "Why CELPIP works for this audience",
      subheading: copy.subhead,
      features: copy.features,
    },
  });

  // 4. Tone-specific extra
  if (input.tone === "Inspiring") {
    blocks.push({
      kind: "TestimonialSpotlight",
      props: { testimonial: copy.testimonials[0] },
    });
  }

  // 5. Standard testimonials
  blocks.push({
    kind: "TestimonialQuoteCards",
    props: { testimonials: copy.testimonials },
  });

  // 6. Tone-specific extra (Practical leans on score table)
  if (input.tone === "Practical") {
    blocks.push({
      kind: "ScoreEquivalencyTable",
      props: {
        heading: "Where your score lands",
        subheading: "CELPIP · CLB · CEFR · DHA at a glance",
        rows: [
          { celpip: "10", clb: "10", cefr: "C1", dha: "Proficient", desc: "High professional proficiency" },
          { celpip: "9", clb: "9", cefr: "B2+", dha: "Proficient", desc: "Professional working proficiency" },
          { celpip: "8", clb: "8", cefr: "B2", dha: "Competent", desc: "Upper intermediate" },
          { celpip: "7", clb: "7", cefr: "B2", dha: "Competent", desc: "Intermediate" },
        ],
      },
    });
  }

  // 7. FAQ
  blocks.push({
    kind: "FAQAccordion",
    props: {
      heading: "Common questions",
      faqs: copy.faqs,
    },
  });

  // 8. CTA
  blocks.push({
    kind: "CTABoldBanner",
    props: {
      heading: copy.headline,
      subheading: copy.subhead,
      primaryCta: { label: copy.primaryCta },
      secondaryCta: { label: copy.secondaryCta },
    },
  });

  return {
    id: 0, // not in the registry — addressed by sessionId
    title: titleFromAudience(input.audience),
    tag: "Layout",
    description: input.concept.slice(0, 180),
    heroImageSrc: heroPath,
    blocks,
  };
}

function titleFromAudience(audience: string): string {
  const first = audience.split(/[.!?]/)[0] ?? audience;
  return first.length > 60 ? `${first.slice(0, 57)}…` : first;
}

// Suppress unused-warning for the imported ToneLeaning type alias (kept for clarity).
void (null as unknown as ToneLeaning);

// ─────────────────────────────────────────────────────────────────────────
// Top-level orchestrator
// ─────────────────────────────────────────────────────────────────────────

export async function runGeneration(
  input: BuilderInput,
  emit: (event: BuilderStreamEvent) => void,
): Promise<BuilderResult> {
  const start = Date.now();
  const sessionId = newSessionId();
  const sessionDir = await ensureSessionDir(sessionId);

  // Step A: Copy
  emit({ type: "step", step: "drafting-copy", label: "Drafting copy…" });
  const copy = await generateCopy(input);

  // Step B+C: Images in parallel
  const heroFile = path.join(sessionDir, "hero.png");
  const sqFile = path.join(sessionDir, "ad-1x1.png");
  const storyFile = path.join(sessionDir, "ad-9x16.png");
  const portraitFile = path.join(sessionDir, "ad-4x5.png");

  const heroPrompt = buildImagePrompt(input, "hero");
  const sqPrompt = buildImagePrompt(input, "1x1");
  const storyPrompt = buildImagePrompt(input, "9x16");
  const portraitPrompt = buildImagePrompt(input, "4x5");

  emit({ type: "step", step: "generating-hero", label: "Generating hero image…" });
  emit({ type: "step", step: "generating-square", label: "Generating square ad (1:1)…" });
  emit({ type: "step", step: "generating-story", label: "Generating story ad (9:16)…" });
  emit({ type: "step", step: "generating-portrait", label: "Generating portrait ad (4:5)…" });

  // Each fulfilled = path; rejected = "" fallback. We surface a warning per fail.
  const settle = async (
    label: string,
    prompt: string,
    size: ImageSize,
    out: string,
    publicPath: string,
  ): Promise<string> => {
    try {
      await generateOneImage(prompt, size, out);
      return publicPath;
    } catch (err) {
      emit({
        type: "warning",
        message: `${label} image generation failed: ${(err as Error).message}. Using gradient fallback.`,
      });
      return "";
    }
  };

  const [heroPub, sqPub, storyPub, portraitPub] = await Promise.all([
    settle("Hero", heroPrompt, "1536x1024", heroFile, `/builder/${sessionId}/hero.png`),
    settle("Square", sqPrompt, "1024x1024", sqFile, `/builder/${sessionId}/ad-1x1.png`),
    settle("Story", storyPrompt, "1024x1536", storyFile, `/builder/${sessionId}/ad-9x16.png`),
    settle("Portrait", portraitPrompt, "1024x1536", portraitFile, `/builder/${sessionId}/ad-4x5.png`),
  ]);

  const ads: BuilderAdImages = {
    hero: heroPub,
    square: sqPub,
    story: storyPub,
    portrait: portraitPub,
  };
  const imageFallback = !heroPub || !sqPub || !storyPub || !portraitPub;

  // Step D: Compose microsite
  emit({ type: "step", step: "composing-microsite", label: "Composing microsite…" });
  const microsite = composeMicrosite(sessionId, input, copy, heroPub);

  const elapsedSeconds = Math.round((Date.now() - start) / 100) / 10;

  const result: BuilderResult = {
    sessionId,
    input,
    copy,
    ads,
    microsite,
    elapsedSeconds,
    imageFallback,
  };

  // Persist for the result + microsite-render pages.
  await writeFile(
    path.join(sessionDir, "site.json"),
    JSON.stringify(result, null, 2),
    "utf8",
  );

  emit({ type: "step", step: "complete", label: "Complete." });
  emit({ type: "done", result });

  return result;
}
