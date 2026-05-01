/**
 * AI Builder shared types — used by:
 *  - the form (`/builder`)
 *  - the SSE route (`/api/builder/generate`)
 *  - the result page (`/builder/result/[sessionId]`)
 *  - the microsite render (`/builder/site/[sessionId]`)
 *
 * Keeping these in one place ensures the shape that flows over the
 * stream matches the JSON we persist to disk under
 * `public/builder/{sessionId}/site.json`.
 */

import type { Microsite } from "@/microsites/data";

export type CountryTarget = "Canada" | "Australia" | "Both";
export type ToneLeaning = "Inspiring" | "Reassuring" | "Practical";

export type BuilderInput = {
  audience: string;
  concept: string;
  country: CountryTarget;
  tone: ToneLeaning;
};

export type BuilderFeature = { icon: string; title: string; desc: string };
export type BuilderTestimonial = {
  name: string;
  location: string;
  quote: string;
  score: string;
};
export type BuilderFaq = { q: string; a: string };

export type BuilderCopy = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  features: BuilderFeature[];
  testimonials: BuilderTestimonial[];
  faqs: BuilderFaq[];
  metrics: { value: string; label: string }[];
  adHeadline: string;
  adTagline: string;
};

export type BuilderAdImages = {
  // Each is a public path under /builder/{sessionId}/...; "" if generation
  // failed and we fell back to a gradient placeholder.
  square: string; // 1:1
  story: string; // 9:16
  portrait: string; // 4:5
  hero: string;
};

export type BuilderResult = {
  sessionId: string;
  input: BuilderInput;
  copy: BuilderCopy;
  ads: BuilderAdImages;
  microsite: Microsite;
  /** Wall-clock seconds the backend took to assemble. */
  elapsedSeconds: number;
  /** True when one or more image generations failed and a fallback was used. */
  imageFallback: boolean;
};

// Streaming protocol -------------------------------------------------------

export type BuilderStreamEvent =
  | { type: "step"; step: BuilderStep; label: string }
  | { type: "warning"; message: string }
  | { type: "error"; message: string }
  | { type: "done"; result: BuilderResult };

export type BuilderStep =
  | "drafting-copy"
  | "generating-hero"
  | "generating-square"
  | "generating-story"
  | "generating-portrait"
  | "composing-microsite"
  | "complete";

export const STEP_LABELS: Record<BuilderStep, string> = {
  "drafting-copy": "Drafting copy…",
  "generating-hero": "Generating hero image…",
  "generating-square": "Generating square ad (1:1)…",
  "generating-story": "Generating story ad (9:16)…",
  "generating-portrait": "Generating portrait ad (4:5)…",
  "composing-microsite": "Composing microsite…",
  complete: "Complete.",
};
