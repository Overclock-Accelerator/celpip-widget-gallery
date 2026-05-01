/**
 * Widget Composer types — the new /builder route.
 *
 * The composer is distinct from the AI campaign generator at /campaigns
 * (whose types live in src/builder/types.ts). The composer takes:
 *  - an audience preset (or free-form override)
 *  - a marketer-curated list of widget *kinds* (the variants they like)
 * and produces a single cohesive Microsite by rewriting copy across all
 * selected blocks for the chosen audience.
 *
 * Saved Samples live at public/builds/{slug}/sample.json and can later be
 * consumed by /campaigns as a starting structure.
 */

import type { Microsite, WidgetBlock } from "@/microsites/data";

export type AudienceRegion =
  | "India"
  | "Philippines"
  | "Nigeria"
  | "Australia"
  | "Global";

export type AudienceDestination = "Canada" | "Australia";

/**
 * Hard-coded audience presets keyed off existing regional microsites #11–#30.
 * `context` is the 1–2 sentence framing the LLM uses to anchor copy rewrite —
 * keep it specific enough to drive distinct copy without being prescriptive.
 */
export type AudiencePreset = {
  key: string;
  label: string;
  region: AudienceRegion;
  profession: string;
  destination: AudienceDestination;
  context: string;
};

/**
 * The kind strings are exactly the discriminators of WidgetBlock in
 * src/microsites/data.ts. We mirror that union here as a string-literal type
 * so consumers don't have to import the full data module to type a kind.
 */
export type WidgetKind = WidgetBlock["kind"];

export type WidgetCategory =
  | "Hero"
  | "Trust & Social Proof"
  | "Conversion"
  | "Features"
  | "Testimonials"
  | "Score & FAQ"
  | "Forms & Resources"
  | "Content"
  | "CTA";

/**
 * Catalog entry describing one selectable widget variant in the wizard.
 * `intent` is the one-liner shown on the variant card.
 */
export type CatalogEntry = {
  kind: WidgetKind;
  category: WidgetCategory;
  displayName: string;
  intent: string;
};

// ─────────────────────────────────────────────────────────────────────────
// Saved sample shape (persisted to public/builds/{id}/sample.json)
// ─────────────────────────────────────────────────────────────────────────

export type Sample = {
  id: string;
  name: string;
  audienceKey: string;
  audienceLabel: string;
  selectedKinds: WidgetKind[];
  microsite: Microsite;
  createdAt: string;
};

/** Lighter shape returned by GET /api/composer/samples for the index grid. */
export type SampleSummary = {
  id: string;
  name: string;
  audienceLabel: string;
  selectedKinds: WidgetKind[];
  firstBlockKind: WidgetKind | null;
  createdAt: string;
};

// ─────────────────────────────────────────────────────────────────────────
// Build endpoint: input + streaming protocol
// ─────────────────────────────────────────────────────────────────────────

export type ComposerInput = {
  audienceKey: string;
  customAudience?: string;
  selectedKinds: WidgetKind[];
  sampleName?: string;
};

export type ComposerStep =
  | "drafting-frame"
  | "generating-hero-image"
  | "rewriting-block"
  | "composing-microsite"
  | "saving-sample"
  | "complete";

export type ComposerStreamEvent =
  | {
      type: "step";
      step: ComposerStep;
      label: string;
      blockIndex?: number;
      totalBlocks?: number;
      kind?: WidgetKind;
    }
  | { type: "warning"; message: string }
  | { type: "error"; message: string }
  | {
      type: "done";
      sample: { id: string; name: string };
      microsite: Microsite;
    };
