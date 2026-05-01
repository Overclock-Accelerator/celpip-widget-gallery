/**
 * Composer catalog: the source of truth for what the wizard exposes to the
 * marketer.
 *
 * Two payloads:
 *  1. AUDIENCE_PRESETS — 14 hard-coded presets keyed off the regional
 *     microsites #11–#30. Each carries a 1–2 sentence `context` that becomes
 *     the LLM anchor during cohesive rewrite.
 *  2. CATALOG — every selectable widget variant grouped by category, plus
 *     the JSON schema fragment the LLM uses when generating that variant's
 *     props. Schemas are deliberately conservative: optional fields are
 *     dropped, max-length-y bodies are constrained loosely (the LLM
 *     respects natural limits without us policing every char count), and
 *     we lean on `additionalProperties: false` + `required: [...]` to keep
 *     output coercion simple.
 */

import type { AudiencePreset, CatalogEntry, WidgetKind } from "./types";

// ─────────────────────────────────────────────────────────────────────────
// Audience presets (14 — derived from microsites #11–#30 personas)
// ─────────────────────────────────────────────────────────────────────────

export const AUDIENCE_PRESETS: AudiencePreset[] = [
  {
    key: "india-nurses-canada",
    label: "India · Nurses → Canada",
    region: "India",
    profession: "Nurses",
    destination: "Canada",
    context:
      "Indian registered nurses pursuing licensure (FMRAC/CAPR) and PR in Canada. Working clinical shifts, balancing study at home, looking for a fast, fair English test that fits around night rotations.",
  },
  {
    key: "india-software-canada",
    label: "India · Software Engineers → Canada",
    region: "India",
    profession: "Software Engineers",
    destination: "Canada",
    context:
      "Indian software engineers in Bengaluru, Hyderabad, Pune and Gurgaon on the Express Entry path. Time-poor, technically sharp, want results that move their CRS score quickly.",
  },
  {
    key: "india-finance-canada",
    label: "India · Finance & Accounting → Canada",
    region: "India",
    profession: "Finance & Accounting",
    destination: "Canada",
    context:
      "Indian finance and accounting professionals (CA, CFA, MBA) targeting Canadian PR and financial services roles. Detail-oriented, evidence-driven, want a test recognized by IRCC and major employers.",
  },
  {
    key: "india-students-canada",
    label: "India · Students → Canada",
    region: "India",
    profession: "Students",
    destination: "Canada",
    context:
      "Indian undergraduates and graduates applying to Canadian colleges and universities. Need an English test accepted for SDS / study permit applications and post-graduate work permits.",
  },
  {
    key: "philippines-nurses-canada",
    label: "Philippines · Nurses → Canada",
    region: "Philippines",
    profession: "Nurses",
    destination: "Canada",
    context:
      "Filipino registered nurses in Manila, Cebu and Davao planning a move to Canada. Often supporting family back home, balancing clinical shifts with prep, motivated by the Health Care Worker pathway.",
  },
  {
    key: "philippines-engineers-canada",
    label: "Philippines · Engineers → Canada",
    region: "Philippines",
    profession: "Engineers",
    destination: "Canada",
    context:
      "Filipino civil, mechanical and electrical engineers pursuing Canadian PR and licensure. English-fluent already, looking for a credible IRCC-accepted test that proves their professional level fast.",
  },
  {
    key: "philippines-caregivers-canada",
    label: "Philippines · Caregivers → Canada",
    region: "Philippines",
    profession: "Caregivers",
    destination: "Canada",
    context:
      "Filipino caregivers and home support workers on the Home Support / Home Child Care pathways. Need clear, plain-spoken information and a supportive test experience that respects their time.",
  },
  {
    key: "nigeria-healthcare-canada",
    label: "Nigeria · Healthcare → Canada",
    region: "Nigeria",
    profession: "Healthcare Workers",
    destination: "Canada",
    context:
      "Nigerian doctors, nurses and pharmacists targeting Canadian licensure and PR. English-medium professional training already, looking for a recognized test that doesn't penalise their accent.",
  },
  {
    key: "nigeria-engineers-canada",
    label: "Nigeria · Engineers → Canada",
    region: "Nigeria",
    profession: "Engineers",
    destination: "Canada",
    context:
      "Nigerian engineers (oil & gas, civil, software) on the Express Entry path. Ambitious, mid-career, want Canadian P.Eng pathways and PR with as few language-test attempts as possible.",
  },
  {
    key: "nigeria-students-canada",
    label: "Nigeria · Students → Canada",
    region: "Nigeria",
    profession: "Students",
    destination: "Canada",
    context:
      "Nigerian students applying to Canadian post-secondary programs. Need a study-permit-approved test that fits their timeline and budget; family often co-investing in the application.",
  },
  {
    key: "india-nurses-australia",
    label: "India · Nurses → Australia (DHA)",
    region: "India",
    profession: "Nurses",
    destination: "Australia",
    context:
      "Indian registered nurses pursuing AHPRA registration and skilled migration to Australia. Need a test the DHA / Department of Home Affairs accepts for visas and AHPRA accepts for nursing registration.",
  },
  {
    key: "philippines-nurses-australia",
    label: "Philippines · Nurses → Australia (DHA)",
    region: "Philippines",
    profession: "Nurses",
    destination: "Australia",
    context:
      "Filipino registered nurses targeting Australian skilled migration and AHPRA-registered nursing roles. Want clarity on DHA-accepted English tests and a fast, accurate result.",
  },
  {
    key: "global-pr-canada",
    label: "Global · Canada PR (Generic)",
    region: "Global",
    profession: "PR Applicants",
    destination: "Canada",
    context:
      "Globally distributed Express Entry applicants who already know they want Canadian PR. Need an English test designated by IRCC, available worldwide, with results in days not weeks.",
  },
  {
    key: "global-skilled-australia",
    label: "Global · Australia Skilled Migration",
    region: "Global",
    profession: "Skilled Migrants",
    destination: "Australia",
    context:
      "Skilled migration applicants worldwide pursuing Australian permanent residency. Need an English test the Department of Home Affairs accepts (CELPIP-General) and that scores quickly.",
  },
];

export function getAudiencePreset(key: string): AudiencePreset | undefined {
  return AUDIENCE_PRESETS.find((a) => a.key === key);
}

// ─────────────────────────────────────────────────────────────────────────
// Widget catalog (selectable variants in the wizard)
// ─────────────────────────────────────────────────────────────────────────

export const CATALOG: CatalogEntry[] = [
  // Hero
  { kind: "HeroSplit", category: "Hero", displayName: "Hero Split", intent: "Headline + subhead with imagery on the right." },
  { kind: "HeroGradient", category: "Hero", displayName: "Hero Gradient", intent: "Bold gradient background, centered headline + dual CTA." },
  { kind: "HeroFormInHeader", category: "Hero", displayName: "Hero Form-in-Header", intent: "Hero with an embedded lead form for campaign landings." },
  { kind: "HeroFullBleedImage", category: "Hero", displayName: "Hero Full-Bleed", intent: "Full-bleed photo with overlaid headline and CTA." },
  { kind: "HeroSplitForm", category: "Hero", displayName: "Hero Split + Form", intent: "Headline left, lead-form right." },
  { kind: "HeroFloatingPanel", category: "Hero", displayName: "Hero Floating Panel", intent: "Photo background with a floating copy panel." },
  { kind: "HeroBigStat", category: "Hero", displayName: "Hero Big Stat", intent: "Headline paired with one oversized credibility stat." },
  { kind: "HeroCentered", category: "Hero", displayName: "Hero Centered", intent: "Quiet, centered text-only hero for editorial layouts." },

  // Trust & social proof
  { kind: "TrustStrip", category: "Trust & Social Proof", displayName: "Trust Strip", intent: "Recognized-by row of authorities (IRCC, FMRAC, etc)." },
  { kind: "MomentSpotlightLargePhoto", category: "Trust & Social Proof", displayName: "Moment Spotlight (Large)", intent: "One real candidate moment with a large photo and quote." },
  { kind: "MomentSpotlightInline", category: "Trust & Social Proof", displayName: "Moment Spotlight (Inline)", intent: "Compact candidate moment with portrait and quote." },

  // Conversion
  { kind: "BookingPanelInline", category: "Conversion", displayName: "Booking Panel (Inline)", intent: "Inline list of upcoming sittings with seat counts." },
  { kind: "BookingPanelStacked", category: "Conversion", displayName: "Booking Panel (Stacked)", intent: "Stacked sittings card with parking + address detail." },
  { kind: "NextStepsHorizontal", category: "Conversion", displayName: "Next Steps (Horizontal)", intent: "Numbered Book → Prepare → Test → Results roadmap." },
  { kind: "NextStepsVertical", category: "Conversion", displayName: "Next Steps (Vertical)", intent: "Vertical numbered steps for narrower layouts." },
  { kind: "UrgencyBar", category: "Conversion", displayName: "Urgency Bar", intent: "Slim banner: next sitting, city, seats left." },
  { kind: "PrepStarterPackHero", category: "Conversion", displayName: "Prep Starter Pack (Hero)", intent: "Hero-sized lead magnet: free practice test + study guide." },
  { kind: "PrepStarterPackInline", category: "Conversion", displayName: "Prep Starter Pack (Inline)", intent: "Inline lead-magnet card with benefits and CTA." },
  { kind: "ReadinessQuiz", category: "Conversion", displayName: "Readiness Quiz", intent: "3-question quiz that routes to ready / almost / prep-first CTAs." },

  // Features
  { kind: "FeatureGrid", category: "Features", displayName: "Feature Grid", intent: "3 icon-led features in a grid." },
  { kind: "FeatureNavyCards", category: "Features", displayName: "Feature Navy Cards", intent: "Horizontal navy cards with icons." },
  { kind: "WhyCelpipPillars", category: "Features", displayName: "Why CELPIP — Pillars", intent: "Three differentiator pillars (recognition, speed, ease)." },
  { kind: "WhyCelpipTestCards", category: "Features", displayName: "Why CELPIP — Test Cards", intent: "Card layout describing what makes CELPIP testing different." },
  { kind: "WhyCelpipMomentum", category: "Features", displayName: "Why CELPIP — Momentum", intent: "Momentum-framed value pillars for conversion-stage pages." },

  // Testimonials
  { kind: "TestimonialQuoteCards", category: "Testimonials", displayName: "Testimonial Cards", intent: "Three short testimonial cards in a row." },
  { kind: "TestimonialSpotlight", category: "Testimonials", displayName: "Testimonial Spotlight", intent: "One long-form testimonial with photo." },
  { kind: "TestimonialVideo", category: "Testimonials", displayName: "Testimonial Video", intent: "Video thumbnail + quote attribution." },

  // Score & FAQ
  { kind: "ScoreEquivalencyTable", category: "Score & FAQ", displayName: "Score Equivalency Table", intent: "CELPIP / CLB / CEFR / DHA conversion grid." },
  { kind: "FAQAccordion", category: "Score & FAQ", displayName: "FAQ Accordion", intent: "Collapsible questions and answers." },
  { kind: "FAQTabbedByCategory", category: "Score & FAQ", displayName: "FAQ Tabbed", intent: "Tabbed FAQ grouped by category." },
  { kind: "ObjectionHandlerFAQ", category: "Score & FAQ", displayName: "Objection Handler FAQ", intent: "'I'm worried about…' format with empathetic reassurance." },

  // Forms & Resources
  { kind: "FormSimpleLead", category: "Forms & Resources", displayName: "Form — Simple Lead", intent: "Simple email + name lead form." },
  { kind: "FormInline", category: "Forms & Resources", displayName: "Form — Inline", intent: "Inline single-line newsletter / interest form." },
  { kind: "FormB2BContact", category: "Forms & Resources", displayName: "Form — B2B Contact", intent: "Multi-field B2B contact / partnerships form." },
  { kind: "ResourceCardGrid", category: "Forms & Resources", displayName: "Resource Cards", intent: "Grid of free guides, webinars and practice tests." },
  { kind: "ResourceFilteredList", category: "Forms & Resources", displayName: "Resource Filtered List", intent: "Filterable resource list with type tabs." },

  // Metrics
  { kind: "MetricsRow", category: "Trust & Social Proof", displayName: "Metrics Row", intent: "4 quick credibility numbers in a clean row." },
  { kind: "MetricsNavyDividers", category: "Trust & Social Proof", displayName: "Metrics — Navy", intent: "Navy strip with dividers between numbers." },
  { kind: "MetricsCards", category: "Trust & Social Proof", displayName: "Metrics — Cards", intent: "Each metric in its own card with label." },

  // Content
  { kind: "RichTextEditorial", category: "Content", displayName: "Rich Text — Editorial", intent: "Long-form editorial typography for context paragraphs." },
  { kind: "RichTextCompact", category: "Content", displayName: "Rich Text — Compact", intent: "Compact rich-text block for short policy-style copy." },
  { kind: "ImageGalleryGrid", category: "Content", displayName: "Image Gallery — Grid", intent: "Grid of images with captions." },
  { kind: "ImageGalleryCarousel", category: "Content", displayName: "Image Gallery — Carousel", intent: "Horizontal carousel of images with captions." },

  // CTA
  { kind: "CTABoldBanner", category: "CTA", displayName: "CTA — Bold Banner", intent: "Bold full-width call-to-action banner." },
  { kind: "CTANavyAccent", category: "CTA", displayName: "CTA — Navy Accent", intent: "Navy background CTA with teal accent." },
  { kind: "CTACardWithIcon", category: "CTA", displayName: "CTA — Card with Icon", intent: "Compact card-style CTA with icon." },
];

export const CATALOG_BY_KIND = new Map<WidgetKind, CatalogEntry>(
  CATALOG.map((c) => [c.kind, c]),
);

export const ALL_CATEGORIES: Array<CatalogEntry["category"]> = [
  "Hero",
  "Trust & Social Proof",
  "Features",
  "Testimonials",
  "Conversion",
  "Score & FAQ",
  "Forms & Resources",
  "Content",
  "CTA",
];

// ─────────────────────────────────────────────────────────────────────────
// Per-kind JSON schemas (for OpenAI structured output)
// ─────────────────────────────────────────────────────────────────────────
//
// Each schema is the *props* schema for one widget kind. We generate one
// LLM call per block, so each schema stays small and independently
// validatable. Schemas mirror the TypeScript prop types in
// src/components/widgets/*.tsx — only fields the LLM should populate are
// included; missing fields fall back to widget defaults at render time.

type JSONSchema = Record<string, unknown>;

const ctaSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["label"],
  properties: {
    label: { type: "string", description: "CTA label, 2–4 words." },
  },
};

const heroBaseProperties: Record<string, JSONSchema> = {
  eyebrow: { type: "string", description: "Short uppercase tag, 2–6 words." },
  headline: { type: "string", description: "Hero headline, 6–12 words." },
  subhead: { type: "string", description: "Hero subhead, 18–36 words." },
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  imageAlt: { type: "string", description: "One-sentence alt text for hero image." },
};
const heroBaseRequired = ["eyebrow", "headline", "subhead", "primaryCta", "secondaryCta", "imageAlt"];

const featureSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["icon", "title", "desc"],
  properties: {
    icon: { type: "string", description: "Single emoji codepoint (e.g. 💻 ⏱ 🌍)." },
    title: { type: "string", description: "Feature title, 2–5 words." },
    desc: { type: "string", description: "Feature description, 14–28 words." },
  },
};

const testimonialSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "location", "quote", "score"],
  properties: {
    name: { type: "string" },
    location: { type: "string", description: 'e.g. "Mumbai → Toronto"' },
    quote: { type: "string", description: "20–55 words, plain-spoken." },
    score: { type: "string", description: 'e.g. "CLB 9"' },
  },
};

const faqSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["q", "a"],
  properties: {
    q: { type: "string" },
    a: { type: "string", description: "30–60 words, no immigration advice." },
  },
};

const metricSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["value", "label"],
  properties: {
    value: { type: "string", description: 'e.g. "3–4 days", "3 hrs"' },
    label: { type: "string", description: "2–4 words." },
  },
};

const trustItemSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["label", "subLabel"],
  properties: {
    label: { type: "string", description: 'Authority short name, e.g. "IRCC"' },
    subLabel: { type: "string", description: "1–4 words, what it covers." },
  },
};

const sittingSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["city", "centreName", "date", "time", "seatsLeft"],
  properties: {
    city: { type: "string" },
    centreName: { type: "string", description: 'e.g. "Mumbai — Prometric Testing"' },
    date: { type: "string", description: 'Human format, e.g. "Sat, May 16"' },
    time: { type: "string", description: 'e.g. "9:00 AM"' },
    seatsLeft: { type: "integer", minimum: 1, maximum: 12 },
  },
};

const roadmapStepSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["number", "title", "desc"],
  properties: {
    number: { type: "integer", minimum: 1, maximum: 4 },
    title: { type: "string", description: "Step title, 2–5 words." },
    desc: { type: "string", description: "12–28 words." },
  },
};

const objectionSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["worry", "reassurance"],
  properties: {
    worry: { type: "string", description: 'In first person, e.g. "I work nights — can I prepare?"' },
    reassurance: { type: "string", description: "30–80 words, empathetic, no immigration advice." },
  },
};

const scoreRowSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["celpip", "clb", "cefr", "dha", "desc"],
  properties: {
    celpip: { type: "string" },
    clb: { type: "string" },
    cefr: { type: "string" },
    dha: { type: "string" },
    desc: { type: "string" },
  },
};

const galleryImageSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["alt", "caption"],
  properties: {
    alt: { type: "string" },
    caption: { type: "string" },
  },
};

const richTextBlockSchema: JSONSchema = {
  oneOf: [
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "text"],
      properties: { type: { const: "lead" }, text: { type: "string" } },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "text"],
      properties: { type: { const: "p" }, text: { type: "string" } },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["type", "text"],
      properties: { type: { const: "h2" }, text: { type: "string" } },
    },
  ],
};

const formFieldSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["type", "placeholder"],
  properties: {
    type: { type: "string", enum: ["text", "email", "tel", "select"] },
    placeholder: { type: "string" },
  },
};

const pillarSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  required: ["icon", "title", "desc"],
  properties: {
    icon: { type: "string", description: "Single emoji or short symbol." },
    title: { type: "string", description: "2–5 words." },
    desc: { type: "string", description: "16–32 words." },
  },
};

/** Map kind → JSON schema for the LLM call. */
export const PROP_SCHEMAS: Record<WidgetKind, JSONSchema> = {
  HeroGradient: { type: "object", additionalProperties: false, required: heroBaseRequired, properties: heroBaseProperties },
  HeroSplit: { type: "object", additionalProperties: false, required: heroBaseRequired, properties: heroBaseProperties },
  HeroFormInHeader: {
    type: "object",
    additionalProperties: false,
    required: [...heroBaseRequired, "badge", "bullets", "formHeading", "formCtaLabel"],
    properties: {
      ...heroBaseProperties,
      badge: { type: "string", description: "Short badge, 2–5 words." },
      bullets: { type: "array", minItems: 3, maxItems: 4, items: { type: "string", description: "8–14 words each." } },
      formHeading: { type: "string", description: "Form heading, 4–8 words." },
      formCtaLabel: { type: "string", description: "2–4 words." },
    },
  },
  HeroFullBleedImage: { type: "object", additionalProperties: false, required: heroBaseRequired, properties: heroBaseProperties },
  HeroSplitForm: {
    type: "object",
    additionalProperties: false,
    required: [...heroBaseRequired, "formHeading", "formCtaLabel"],
    properties: {
      ...heroBaseProperties,
      formHeading: { type: "string" },
      formCtaLabel: { type: "string" },
      fields: { type: "array", minItems: 2, maxItems: 4, items: formFieldSchema },
    },
  },
  HeroFloatingPanel: { type: "object", additionalProperties: false, required: heroBaseRequired, properties: heroBaseProperties },
  HeroBigStat: {
    type: "object",
    additionalProperties: false,
    required: [...heroBaseRequired, "stat"],
    properties: {
      ...heroBaseProperties,
      stat: {
        type: "object",
        additionalProperties: false,
        required: ["value", "label"],
        properties: { value: { type: "string" }, label: { type: "string" } },
      },
    },
  },
  HeroCentered: { type: "object", additionalProperties: false, required: heroBaseRequired, properties: heroBaseProperties },

  CTABoldBanner: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "primaryCta"],
    properties: {
      heading: { type: "string", description: "5–10 words." },
      subheading: { type: "string", description: "16–32 words." },
      primaryCta: ctaSchema,
      secondaryCta: ctaSchema,
    },
  },
  CTANavyAccent: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "primaryCta"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      primaryCta: ctaSchema,
      secondaryCta: ctaSchema,
    },
  },
  CTACardWithIcon: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "primaryCta"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      primaryCta: ctaSchema,
      secondaryCta: ctaSchema,
    },
  },

  FeatureGrid: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "features"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string", description: "Sub of heading, 14–28 words." },
      features: { type: "array", minItems: 3, maxItems: 3, items: featureSchema },
    },
  },
  FeatureNavyCards: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "features"],
    properties: {
      heading: { type: "string" },
      features: { type: "array", minItems: 3, maxItems: 3, items: featureSchema },
    },
  },

  TestimonialQuoteCards: {
    type: "object",
    additionalProperties: false,
    required: ["testimonials"],
    properties: { testimonials: { type: "array", minItems: 3, maxItems: 3, items: testimonialSchema } },
  },
  TestimonialSpotlight: {
    type: "object",
    additionalProperties: false,
    required: ["testimonial"],
    properties: { testimonial: testimonialSchema },
  },
  TestimonialVideo: {
    type: "object",
    additionalProperties: false,
    required: ["testimonial", "eyebrow", "heading"],
    properties: {
      testimonial: testimonialSchema,
      eyebrow: { type: "string" },
      heading: { type: "string" },
    },
  },

  FAQAccordion: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "faqs"],
    properties: {
      heading: { type: "string" },
      faqs: { type: "array", minItems: 3, maxItems: 4, items: faqSchema },
    },
  },
  FAQTabbedByCategory: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "faqs", "categories"],
    properties: {
      heading: { type: "string" },
      categories: { type: "array", minItems: 2, maxItems: 3, items: { type: "string" } },
      faqs: {
        type: "array",
        minItems: 4,
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["q", "a", "cat"],
          properties: { q: { type: "string" }, a: { type: "string" }, cat: { type: "string" } },
        },
      },
    },
  },

  MetricsRow: {
    type: "object",
    additionalProperties: false,
    required: ["metrics"],
    properties: { metrics: { type: "array", minItems: 4, maxItems: 4, items: metricSchema } },
  },
  MetricsNavyDividers: {
    type: "object",
    additionalProperties: false,
    required: ["metrics"],
    properties: { metrics: { type: "array", minItems: 4, maxItems: 4, items: metricSchema } },
  },
  MetricsCards: {
    type: "object",
    additionalProperties: false,
    required: ["metrics"],
    properties: { metrics: { type: "array", minItems: 3, maxItems: 4, items: metricSchema } },
  },

  FormSimpleLead: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "ctaLabel"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      ctaLabel: { type: "string" },
    },
  },
  FormInline: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "ctaLabel"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      ctaLabel: { type: "string" },
    },
  },
  FormB2BContact: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "ctaLabel"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      ctaLabel: { type: "string" },
    },
  },

  ResourceCardGrid: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "resources"],
    properties: {
      heading: { type: "string" },
      resources: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["type", "title", "date", "tag"],
          properties: {
            type: { type: "string", description: "Article | Webinar | PDF | Practice Test" },
            title: { type: "string" },
            date: { type: "string" },
            tag: { type: "string" },
          },
        },
      },
    },
  },
  ResourceFilteredList: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "resources", "filters"],
    properties: {
      heading: { type: "string" },
      filters: { type: "array", minItems: 2, maxItems: 4, items: { type: "string" } },
      resources: {
        type: "array",
        minItems: 4,
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["type", "title", "date", "tag"],
          properties: {
            type: { type: "string" },
            title: { type: "string" },
            date: { type: "string" },
            tag: { type: "string" },
          },
        },
      },
    },
  },

  ScoreEquivalencyTable: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "rows"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      rows: { type: "array", minItems: 4, maxItems: 5, items: scoreRowSchema },
    },
  },

  ImageGalleryGrid: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "images"],
    properties: {
      heading: { type: "string" },
      images: { type: "array", minItems: 4, maxItems: 6, items: galleryImageSchema },
    },
  },
  ImageGalleryCarousel: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "images"],
    properties: {
      heading: { type: "string" },
      images: { type: "array", minItems: 4, maxItems: 6, items: galleryImageSchema },
    },
  },

  RichTextEditorial: {
    type: "object",
    additionalProperties: false,
    required: ["content"],
    properties: {
      content: {
        type: "object",
        additionalProperties: false,
        required: ["blocks"],
        properties: {
          blocks: { type: "array", minItems: 3, maxItems: 6, items: richTextBlockSchema },
        },
      },
    },
  },
  RichTextCompact: {
    type: "object",
    additionalProperties: false,
    required: ["content"],
    properties: {
      content: {
        type: "object",
        additionalProperties: false,
        required: ["blocks"],
        properties: {
          blocks: { type: "array", minItems: 2, maxItems: 4, items: richTextBlockSchema },
        },
      },
    },
  },

  // Conversion-stage widgets
  TrustStrip: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "items"],
    properties: {
      heading: { type: "string" },
      items: { type: "array", minItems: 4, maxItems: 5, items: trustItemSchema },
    },
  },
  MomentSpotlightLargePhoto: {
    type: "object",
    additionalProperties: false,
    required: ["imageAlt", "oneLineMoment", "paragraphQuote", "attribution"],
    properties: {
      imageAlt: { type: "string" },
      oneLineMoment: { type: "string", description: "12–24 words, single moment." },
      paragraphQuote: { type: "string", description: "55–110 words, first person, plain-spoken." },
      attribution: {
        type: "object",
        additionalProperties: false,
        required: ["name", "location", "score", "date"],
        properties: {
          name: { type: "string" },
          location: { type: "string", description: 'e.g. "Mumbai → Ontario"' },
          score: { type: "string", description: 'e.g. "CLB 9"' },
          date: { type: "string", description: 'e.g. "March 2026"' },
        },
      },
    },
  },
  MomentSpotlightInline: {
    type: "object",
    additionalProperties: false,
    required: ["imageAlt", "oneLineMoment", "paragraphQuote", "attribution"],
    properties: {
      imageAlt: { type: "string" },
      oneLineMoment: { type: "string", description: "12–24 words." },
      paragraphQuote: { type: "string", description: "40–80 words." },
      attribution: {
        type: "object",
        additionalProperties: false,
        required: ["name", "location", "score", "date"],
        properties: {
          name: { type: "string" },
          location: { type: "string" },
          score: { type: "string" },
          date: { type: "string" },
        },
      },
    },
  },
  BookingPanelInline: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "sittings"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string", description: "20–40 words framing the sittings list." },
      sittings: { type: "array", minItems: 3, maxItems: 4, items: sittingSchema },
    },
  },
  BookingPanelStacked: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "sittings"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      sittings: { type: "array", minItems: 2, maxItems: 3, items: sittingSchema },
    },
  },
  NextStepsHorizontal: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "steps"],
    properties: {
      heading: { type: "string", description: "5–10 words." },
      steps: { type: "array", minItems: 3, maxItems: 4, items: roadmapStepSchema },
    },
  },
  NextStepsVertical: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "steps"],
    properties: {
      heading: { type: "string" },
      steps: { type: "array", minItems: 3, maxItems: 4, items: roadmapStepSchema },
    },
  },
  UrgencyBar: {
    type: "object",
    additionalProperties: false,
    required: ["city", "date", "seatsLeft", "ctaLabel"],
    properties: {
      city: { type: "string" },
      date: { type: "string", description: 'e.g. "Sat, May 16"' },
      seatsLeft: { type: "integer", minimum: 1, maximum: 12 },
      ctaLabel: { type: "string", description: "2–4 words." },
    },
  },
  PrepStarterPackHero: {
    type: "object",
    additionalProperties: false,
    required: ["eyebrow", "headline", "benefits", "ctaLabel"],
    properties: {
      eyebrow: { type: "string" },
      headline: { type: "string", description: "5–10 words." },
      benefits: { type: "array", minItems: 3, maxItems: 4, items: { type: "string", description: "10–18 words each." } },
      ctaLabel: { type: "string" },
    },
  },
  PrepStarterPackInline: {
    type: "object",
    additionalProperties: false,
    required: ["eyebrow", "headline", "benefits", "ctaLabel"],
    properties: {
      eyebrow: { type: "string" },
      headline: { type: "string" },
      benefits: { type: "array", minItems: 3, maxItems: 4, items: { type: "string" } },
      ctaLabel: { type: "string" },
    },
  },
  ObjectionHandlerFAQ: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "objections"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      objections: { type: "array", minItems: 3, maxItems: 4, items: objectionSchema },
    },
  },
  ReadinessQuiz: {
    type: "object",
    additionalProperties: false,
    required: ["heading", "subheading", "questions", "results"],
    properties: {
      heading: { type: "string" },
      subheading: { type: "string" },
      questions: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "question", "options"],
          properties: {
            id: { type: "string" },
            question: { type: "string" },
            options: {
              type: "array",
              minItems: 3,
              maxItems: 4,
              items: {
                type: "object",
                additionalProperties: false,
                required: ["label", "score"],
                properties: { label: { type: "string" }, score: { type: "integer", minimum: 0, maximum: 3 } },
              },
            },
          },
        },
      },
      results: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["thresholdMin", "title", "body", "ctaLabel"],
          properties: {
            thresholdMin: { type: "integer", minimum: 0, maximum: 9 },
            title: { type: "string" },
            body: { type: "string", description: "30–60 words." },
            ctaLabel: { type: "string" },
          },
        },
      },
    },
  },
  WhyCelpipPillars: {
    type: "object",
    additionalProperties: false,
    required: ["eyebrow", "heading", "pillars"],
    properties: {
      eyebrow: { type: "string" },
      heading: { type: "string" },
      pillars: { type: "array", minItems: 3, maxItems: 3, items: pillarSchema },
    },
  },
  WhyCelpipTestCards: {
    type: "object",
    additionalProperties: false,
    required: ["eyebrow", "heading", "pillars"],
    properties: {
      eyebrow: { type: "string" },
      heading: { type: "string" },
      pillars: { type: "array", minItems: 3, maxItems: 3, items: pillarSchema },
    },
  },
  WhyCelpipMomentum: {
    type: "object",
    additionalProperties: false,
    required: ["eyebrow", "heading", "pillars"],
    properties: {
      eyebrow: { type: "string" },
      heading: { type: "string" },
      pillars: { type: "array", minItems: 3, maxItems: 3, items: pillarSchema },
    },
  },
};
