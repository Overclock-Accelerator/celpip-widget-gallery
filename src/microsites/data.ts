/**
 * Microsite content data — Wave 2.
 *
 * Replaces the placeholder shape in registry.ts with a richer schema:
 * each microsite is a sequence of typed widget blocks rendered in order
 * by /microsites/[id]/page.tsx. Block kinds are a discriminated union;
 * `props` for each kind are typed against the actual widget prop interface
 * exported by src/components/widgets/*.tsx.
 *
 * The legacy `MicrositeEntry`-shaped surface (id/title/tag/description) is
 * preserved by registry.ts re-exporting from this file, so the index page
 * keeps working unchanged.
 *
 * Voice: supportive, expert, encouraging. We describe what CELPIP IS
 * recognized for — never give immigration advice.
 */

import type {
  HeroProps,
  HeroFormInHeaderProps,
  HeroSplitFormProps,
  HeroBigStatProps,
} from "@/components/widgets/Hero";
import type { CTAProps } from "@/components/widgets/CTA";
import type { Feature } from "@/components/widgets/FeatureHighlights";
import type { Testimonial } from "@/components/widgets/Testimonials";
import type { Faq } from "@/components/widgets/FAQ";
import type { Metric } from "@/components/widgets/VanityMetrics";
import type { FormProps } from "@/components/widgets/Forms";
import type { Resource } from "@/components/widgets/ResourceList";
import type { ScoreRow } from "@/components/widgets/ScoreChart";
import type { GalleryImage } from "@/components/widgets/ImageGallery";
import type { TrustStripProps } from "@/components/widgets/TrustStrip";
import type { MomentSpotlightProps } from "@/components/widgets/MomentSpotlight";
import type { BookingPanelProps } from "@/components/widgets/BookingPanel";
import type { NextStepsRoadmapProps } from "@/components/widgets/NextStepsRoadmap";
import type { UrgencyBarProps } from "@/components/widgets/UrgencyBar";
import type { PrepStarterPackProps } from "@/components/widgets/PrepStarterPack";
import type { ObjectionHandlerFAQProps } from "@/components/widgets/ObjectionHandlerFAQ";
import type { ReadinessQuizProps } from "@/components/widgets/ReadinessQuiz";
import type { WhyCelpipProps } from "@/components/widgets/WhyCelpip";

// ─────────────────────────────────────────────────────────────────────────────
// RichText block shape
// ─────────────────────────────────────────────────────────────────────────────
//
// RichTextEditorial / RichTextCompact accept `children: ReactNode`. Rather
// than push raw HTML through dangerouslySetInnerHTML, we serialize content
// as an ordered list of typed pieces and the page renderer turns them into
// JSX. This keeps content in plain TS and avoids any HTML-injection risk.

export type RichTextBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string };

export type RichTextContent = {
  blocks: RichTextBlock[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Widget block discriminated union
// ─────────────────────────────────────────────────────────────────────────────

export type WidgetBlock =
  | { kind: "HeroGradient"; props: Partial<HeroProps> }
  | { kind: "HeroSplit"; props: Partial<HeroProps> }
  | { kind: "HeroFormInHeader"; props: Partial<HeroFormInHeaderProps> }
  | { kind: "HeroFullBleedImage"; props: Partial<HeroProps> }
  | { kind: "HeroSplitForm"; props: Partial<HeroSplitFormProps> }
  | { kind: "HeroFloatingPanel"; props: Partial<HeroProps> }
  | { kind: "HeroBigStat"; props: Partial<HeroBigStatProps> }
  | { kind: "HeroCentered"; props: Partial<HeroProps> }
  | { kind: "CTABoldBanner"; props: Partial<CTAProps> }
  | { kind: "CTANavyAccent"; props: Partial<CTAProps> }
  | { kind: "CTACardWithIcon"; props: Partial<CTAProps> }
  | { kind: "FeatureGrid"; props: { heading?: string; subheading?: string; features?: Feature[] } }
  | { kind: "FeatureNavyCards"; props: { heading?: string; features?: Feature[] } }
  | { kind: "TestimonialQuoteCards"; props: { testimonials?: Testimonial[] } }
  | { kind: "TestimonialSpotlight"; props: { testimonial?: Testimonial } }
  | {
      kind: "TestimonialVideo";
      props: { testimonial?: Testimonial; eyebrow?: string; heading?: string; videoUrl?: string };
    }
  | { kind: "FAQAccordion"; props: { heading?: string; faqs?: Faq[] } }
  | { kind: "FAQTabbedByCategory"; props: { heading?: string; faqs?: Faq[]; categories?: string[] } }
  | { kind: "MetricsRow"; props: { metrics?: Metric[] } }
  | { kind: "MetricsNavyDividers"; props: { metrics?: Metric[] } }
  | { kind: "MetricsCards"; props: { metrics?: Metric[] } }
  | { kind: "FormSimpleLead"; props: Partial<FormProps> }
  | { kind: "FormInline"; props: Partial<FormProps> }
  | { kind: "FormB2BContact"; props: Partial<FormProps> }
  | { kind: "ResourceCardGrid"; props: { heading?: string; resources?: Resource[] } }
  | {
      kind: "ResourceFilteredList";
      props: { heading?: string; resources?: Resource[]; filters?: string[]; activeFilter?: string };
    }
  | { kind: "ScoreEquivalencyTable"; props: { heading?: string; subheading?: string; rows?: ScoreRow[] } }
  | { kind: "ImageGalleryGrid"; props: { heading?: string; images: GalleryImage[] } }
  | { kind: "ImageGalleryCarousel"; props: { heading?: string; images: GalleryImage[] } }
  | { kind: "RichTextEditorial"; props: { content: RichTextContent } }
  | { kind: "RichTextCompact"; props: { content: RichTextContent } }
  // Conversion-stage widgets (microsites #11–#20)
  | { kind: "TrustStrip"; props: TrustStripProps }
  | { kind: "MomentSpotlightLargePhoto"; props: MomentSpotlightProps }
  | { kind: "MomentSpotlightInline"; props: MomentSpotlightProps }
  | { kind: "BookingPanelInline"; props: BookingPanelProps }
  | { kind: "BookingPanelStacked"; props: BookingPanelProps }
  | { kind: "NextStepsHorizontal"; props: NextStepsRoadmapProps }
  | { kind: "NextStepsVertical"; props: NextStepsRoadmapProps }
  | { kind: "UrgencyBar"; props: UrgencyBarProps }
  | { kind: "PrepStarterPackHero"; props: PrepStarterPackProps }
  | { kind: "PrepStarterPackInline"; props: PrepStarterPackProps }
  | { kind: "ObjectionHandlerFAQ"; props: ObjectionHandlerFAQProps }
  | { kind: "ReadinessQuiz"; props: ReadinessQuizProps }
  | { kind: "WhyCelpipPillars"; props: WhyCelpipProps }
  | { kind: "WhyCelpipTestCards"; props: WhyCelpipProps }
  | { kind: "WhyCelpipMomentum"; props: WhyCelpipProps };

export type MicrositeTag = "Regional" | "Layout" | "Custom";

export type Microsite = {
  id: number;
  title: string;
  tag: MicrositeTag;
  description: string;
  /** Optional path or URL for HeroSplit / HeroGradient / HeroFormInHeader imagery. */
  heroImageSrc?: string;
  blocks: WidgetBlock[];
  /** When set, [id]/page.tsx renders a custom component instead of blocks. */
  customPage?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Reusable mock images (Picsum placeholders — Ahmed will swap for Nano Banana)
// ─────────────────────────────────────────────────────────────────────────────

const indiaImages: GalleryImage[] = [];
const standardHomeImages: GalleryImage[] = [
  {
    src: "https://picsum.photos/seed/celpip-home-1/800/800",
    alt: "Candidate checking in at a CELPIP test centre reception desk",
    caption: "Modern, computer-delivered test centres across Canada",
  },
  {
    src: "https://picsum.photos/seed/celpip-home-2/800/800",
    alt: "Test taker wearing headphones at a workstation",
    caption: "Listening section — one component, one sitting",
  },
  {
    src: "https://picsum.photos/seed/celpip-home-3/800/800",
    alt: "Two candidates reviewing practice materials together",
    caption: "Free practice tests and webinars",
  },
  {
    src: "https://picsum.photos/seed/celpip-home-4/800/800",
    alt: "Score report on a laptop screen",
    caption: "Results in 4–5 business days",
  },
  {
    src: "https://picsum.photos/seed/celpip-home-5/800/800",
    alt: "Smiling candidate after completing the test",
    caption: "One sitting, three hours, all four components",
  },
  {
    src: "https://picsum.photos/seed/celpip-home-6/800/800",
    alt: "Group prep session with an instructor at a whiteboard",
    caption: "Saturday prep workshops with certified coaches",
  },
];

const resourceHubCarouselImages: GalleryImage[] = [
  {
    src: "https://picsum.photos/seed/celpip-rhub-1/1200/675",
    alt: "Coach demonstrating speaking practice technique on a webinar",
    caption: "Live speaking webinar — every Tuesday at 18:00 ET",
  },
  {
    src: "https://picsum.photos/seed/celpip-rhub-2/1200/675",
    alt: "Open notebook with structured CELPIP writing notes",
    caption: "Writing Task 1 walkthrough — downloadable PDF",
  },
  {
    src: "https://picsum.photos/seed/celpip-rhub-3/1200/675",
    alt: "Podcast microphone and headphones on a wooden desk",
    caption: "From Test to PR — full podcast season",
  },
  {
    src: "https://picsum.photos/seed/celpip-rhub-4/1200/675",
    alt: "Whiteboard with a CLB-to-CEFR conversion diagram",
    caption: "Score systems explained, plainly",
  },
  {
    src: "https://picsum.photos/seed/celpip-rhub-5/1200/675",
    alt: "Calm test-day setup with water bottle and pencil",
    caption: "Test day morning — what to bring, what to leave",
  },
  {
    src: "https://picsum.photos/seed/celpip-rhub-6/1200/675",
    alt: "Mentor and student reviewing a printed score report",
    caption: "How to read your CELPIP score report",
  },
];

const prepFocusedResourceCards: GalleryImage[] = [];
void indiaImages;
void prepFocusedResourceCards;

// ─────────────────────────────────────────────────────────────────────────────
// Reusable score-equivalency rows (already realistic — slight per-microsite trim)
// ─────────────────────────────────────────────────────────────────────────────

const fullScoreRows: ScoreRow[] = [
  { celpip: "12", clb: "12", cefr: "C2", dha: "Superior", desc: "Expert proficiency" },
  { celpip: "11", clb: "11", cefr: "C1+", dha: "Superior", desc: "Advanced proficiency" },
  { celpip: "10", clb: "10", cefr: "C1", dha: "Proficient", desc: "High professional proficiency" },
  { celpip: "9", clb: "9", cefr: "B2+", dha: "Proficient", desc: "Professional working proficiency" },
  { celpip: "8", clb: "8", cefr: "B2", dha: "Competent", desc: "Upper intermediate" },
  { celpip: "7", clb: "7", cefr: "B2", dha: "Competent", desc: "Intermediate" },
  { celpip: "6", clb: "6", cefr: "B1+", dha: "Competent", desc: "Lower intermediate" },
  { celpip: "5", clb: "5", cefr: "B1", dha: "Vocational", desc: "Pre-intermediate" },
  { celpip: "4", clb: "4", cefr: "A2+", dha: "Vocational", desc: "Elementary" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10 microsites
// ─────────────────────────────────────────────────────────────────────────────

export const microsites: Microsite[] = [
  // ───────────────────── 1. India ─────────────────────
  {
    id: 1,
    title: "India",
    tag: "Regional",
    description: "Lead-gen landing for Indian test takers, IRCC-focused.",
    blocks: [
      {
        kind: "HeroFormInHeader",
        props: {
          badge: "NEW DELHI · MUMBAI · BENGALURU · CHANDIGARH",
          headline: "CELPIP in India — Your CLB, Done in One Sitting",
          subhead:
            "CELPIP-General is recognized by IRCC for permanent residency and citizenship applications. Take it on a computer, finish in three hours, and get scored within a week.",
          bullets: [
            "Test centres in Delhi NCR, Mumbai, Bengaluru, Chandigarh, Hyderabad, and Pune",
            "Computer-delivered — no live examiner, no second sitting",
            "Results online in 4–5 business days",
          ],
          formHeading: "Get test dates in your city",
          formCtaLabel: "Send Me Dates",
          formDisclaimer: "We respect your privacy. No spam — ever.",
          fields: [
            { type: "text", placeholder: "Full Name" },
            { type: "email", placeholder: "Email Address" },
            { type: "tel", placeholder: "Phone (with country code)" },
            {
              type: "select",
              placeholder: "Nearest test centre",
              options: ["New Delhi", "Mumbai", "Bengaluru", "Chandigarh", "Hyderabad", "Pune"],
            },
          ],
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "6", label: "Cities in India" },
            { value: "4–5 days", label: "Result Turnaround" },
            { value: "3 hrs", label: "One Sitting" },
            { value: "CLB 9", label: "Common PR Target" },
            { value: "100%", label: "Computer-Delivered" },
          ],
        },
      },
      {
        kind: "FeatureGrid",
        props: {
          heading: "Why Indian test takers choose CELPIP",
          subheading:
            "Built for working professionals balancing work, family, and a busy prep window.",
          features: [
            {
              icon: "&#128187;",
              title: "Fully computer-delivered",
              desc: "No live speaking interview. You speak into a headset on a computer — same format as your practice tests.",
            },
            {
              icon: "&#128205;",
              title: "Familiar test centres",
              desc: "Modern, air-conditioned centres in Delhi NCR, Mumbai, Bengaluru, Chandigarh, Hyderabad, and Pune.",
            },
            {
              icon: "&#9201;",
              title: "Done in one morning",
              desc: "All four components — listening, reading, writing, speaking — in a single 3-hour sitting.",
            },
            {
              icon: "&#128218;",
              title: "Free official prep",
              desc: "Two free practice tests, on-demand webinars, and a writing rubric walkthrough — no cost, no email wall.",
            },
            {
              icon: "&#127919;",
              title: "Real-life Canadian English",
              desc: "Workplace emails, voicemails, and casual conversations — not academic essays.",
            },
            {
              icon: "&#128338;",
              title: "Results in days, not weeks",
              desc: "Online score report in 4–5 business days. Print or share directly with your immigration consultant.",
            },
          ],
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Priya Sharma",
              location: "New Delhi, India",
              quote:
                "I took CELPIP at the Connaught Place centre on a Saturday morning. Walked out by lunch. The computer-based speaking section felt natural — I'd practiced the same way at home.",
              score: "CLB 9",
            },
            {
              name: "Rohan Mehta",
              location: "Mumbai, India",
              quote:
                "I'd been preparing for the other test for months and felt stuck. Switched to CELPIP six weeks before my booking and hit my target on the first try. The free practice tests are the real deal.",
              score: "CLB 10",
            },
            {
              name: "Simran Kaur",
              location: "Chandigarh, India",
              quote:
                "Mom of two, full-time job, no time for evening classes. CELPIP fit because it's one sitting and the prep is self-paced. My score came back exactly when they said it would.",
              score: "CLB 9",
            },
          ],
        },
      },
      {
        kind: "FAQAccordion",
        props: {
          heading: "Common questions from Indian candidates",
          faqs: [
            {
              q: "Which Indian cities have CELPIP test centres?",
              a: "CELPIP currently runs in New Delhi, Mumbai, Bengaluru, Chandigarh, Hyderabad, and Pune, with new dates added every month. Sign up for the city list above to get notified when new sittings open near you.",
            },
            {
              q: "Is CELPIP accepted by IRCC?",
              a: "Yes — CELPIP-General is one of the designated tests IRCC recognizes for permanent residency and Canadian citizenship applications. We're not immigration advisors, so for program-specific questions please speak with a licensed RCIC.",
            },
            {
              q: "How is CELPIP different from the other English test?",
              a: "CELPIP is fully computer-delivered, completed in one sitting, scored against the CLB scale directly, and uses everyday Canadian English. There's no live examiner — your speaking responses are recorded and scored later.",
            },
            {
              q: "How much prep time do most candidates need?",
              a: "Candidates already comfortable with English typically prep for 3–6 weeks using the free official practice tests. If you're aiming for CLB 9+ on a tighter timeline, the writing and speaking rubrics deserve focused attention.",
            },
            {
              q: "Can I book in INR?",
              a: "Test fees are charged in CAD on the official CELPIP booking site. Most major Indian credit cards work, and your bank handles the conversion. There are no hidden India-side surcharges.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Ready to book your CELPIP test in India?",
          subheading:
            "Pick your city, pick your date, and walk in prepared. We'll send you the official prep links — no spam.",
          primaryCta: { label: "See Test Dates" },
          secondaryCta: { label: "Get the Free Prep Pack" },
        },
      },
    ],
  },

  // ───────────────────── 2. Philippines ─────────────────────
  {
    id: 2,
    title: "Philippines",
    tag: "Regional",
    description: "Healthcare-worker focused, Manila/Cebu/Davao.",
    blocks: [
      {
        kind: "HeroFormInHeader",
        props: {
          badge: "NEW CENTRES OPEN — MANILA · CEBU · DAVAO",
          headline: "CELPIP in the Philippines — Built Around Your Schedule",
          subhead:
            "Whether you're a nurse, caregiver, or skilled worker preparing for Canada, CELPIP gives you a computer-delivered English test you can fit around a hospital shift.",
          bullets: [
            "New test centres in Manila, Cebu, and Davao",
            "Saturday and weekday evening sittings",
            "Computer-delivered, results in 4–5 business days",
          ],
          formHeading: "Reserve a seat — Manila, Cebu, Davao",
          formCtaLabel: "Send Me Dates",
          formDisclaimer: "We respect your privacy. No spam.",
          fields: [
            { type: "text", placeholder: "Full Name" },
            { type: "email", placeholder: "Email Address" },
            { type: "tel", placeholder: "Mobile Number" },
            { type: "select", placeholder: "Nearest test centre", options: ["Manila", "Cebu", "Davao"] },
          ],
        },
      },
      {
        kind: "FeatureNavyCards",
        props: {
          heading: "Why CELPIP works for Filipino professionals",
          features: [
            {
              icon: "&#127973;",
              title: "Healthcare-friendly schedule",
              desc: "Saturday morning and Tuesday/Thursday evening sittings designed around 12-hour hospital shifts.",
            },
            {
              icon: "&#128187;",
              title: "Computer-delivered, end-to-end",
              desc: "All four components on the same workstation. No live speaking examiner — you speak into a headset.",
            },
            {
              icon: "&#127968;",
              title: "Three cities, growing",
              desc: "Manila, Cebu, and Davao centres now open. Iloilo and Cagayan de Oro opening late 2026.",
            },
            {
              icon: "&#9989;",
              title: "Recognized by IRCC",
              desc: "CELPIP-General is accepted by Immigration, Refugees and Citizenship Canada — same as for any other CLB test taker.",
            },
          ],
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Carlos Mendoza",
              location: "Manila, Philippines",
              quote:
                "I'm a registered nurse working night shifts at a private hospital. CELPIP's Saturday morning slots meant I could test without taking leave. Got my CLB 10 on the first sitting.",
              score: "CLB 10",
            },
            {
              name: "Maria Santos",
              location: "Cebu, Philippines",
              quote:
                "The Cebu centre opened just in time — I didn't have to fly to Manila. Walked in, took the test, walked out three hours later. Result came in five business days, exactly as promised.",
              score: "CLB 9",
            },
            {
              name: "Joshua Reyes",
              location: "Davao, Philippines",
              quote:
                "I work as a caregiver and English isn't my first language at home. The free practice tests were honest about where I stood, and the writing rubric walkthrough actually showed me how to score higher.",
              score: "CLB 8",
            },
          ],
        },
      },
      {
        kind: "ScoreEquivalencyTable",
        props: {
          heading: "What CLB level do you need?",
          subheading: "How CELPIP scores map across the major frameworks",
          rows: fullScoreRows,
        },
      },
      {
        kind: "FormSimpleLead",
        props: {
          heading: "Get the free CELPIP prep pack",
          subheading: "Two practice tests, a writing rubric, and a speaking guide — sent straight to your inbox.",
          ctaLabel: "Send Me the Prep Pack",
          fields: [
            { type: "text", placeholder: "Your Name" },
            { type: "email", placeholder: "Email Address" },
            {
              type: "select",
              placeholder: "Where will you test?",
              options: ["Manila", "Cebu", "Davao", "Not sure yet"],
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Book your CELPIP test in the Philippines",
          subheading: "Manila, Cebu, and Davao centres — Saturday and weekday evening sittings.",
          primaryCta: { label: "View Test Dates" },
        },
      },
    ],
  },

  // ───────────────────── 3. Australia ─────────────────────
  {
    id: 3,
    title: "Australia",
    tag: "Regional",
    description: "DHA-focused, skilled trades persona.",
    heroImageSrc: "/heroes/3.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP in Australia",
          headline: "Prove Your English for Skilled Migration — On a Computer, in One Sitting",
          subhead:
            "CELPIP-General is recognized by the Department of Home Affairs for general skilled migration English proficiency. Sydney, Melbourne, Brisbane, and Perth test centres now open.",
          primaryCta: { label: "See Australian Test Dates" },
          secondaryCta: { label: "DHA Score Equivalents" },
          imageAlt: "Sydney skyline at sunrise",
        },
      },
      {
        kind: "ScoreEquivalencyTable",
        props: {
          heading: "CELPIP score → DHA proficiency band",
          subheading: "How your CELPIP overall maps to Vocational, Competent, Proficient, and Superior English",
          rows: fullScoreRows,
        },
      },
      {
        kind: "TestimonialSpotlight",
        props: {
          testimonial: {
            name: "Liam O'Connor",
            location: "Melbourne, Australia",
            quote:
              "Working as an electrician means I needed Proficient English for my skilled visa points. CELPIP felt fair — the questions were everyday situations, not academic essays. Got my Proficient band on the first try and submitted my points test a week later.",
            score: "CLB 10 · Proficient",
          },
        },
      },
      {
        kind: "FAQTabbedByCategory",
        props: {
          heading: "DHA, scoring, and logistics — answered",
          faqs: [
            {
              q: "Is CELPIP accepted by the Department of Home Affairs?",
              a: "Yes — CELPIP-General is recognized by DHA for general skilled migration English proficiency. The CELPIP-to-DHA band mapping is published in the score table above. We're not migration agents; for program-specific advice please contact a registered MARA agent.",
              cat: "DHA",
            },
            {
              q: "Which DHA band do most skilled visa applicants need?",
              a: "Most skilled migration streams require at least Competent English (CELPIP 7 across all four bands). Higher bands such as Proficient (CELPIP 9) and Superior (CELPIP 10+) earn additional points on the points test.",
              cat: "DHA",
            },
            {
              q: "How is CELPIP scored?",
              a: "Each component (listening, reading, writing, speaking) is scored on the CLB scale 1–12. Your overall band is the lowest of the four — same approach as other accepted English tests.",
              cat: "Scoring",
            },
            {
              q: "Can I retake just one component?",
              a: "CELPIP is taken as a complete test — all four components in one sitting. If you'd like to improve a single band, you re-sit the full test. Most candidates do this once they've targeted prep on the weaker section.",
              cat: "Scoring",
            },
            {
              q: "Where in Australia can I take CELPIP?",
              a: "Test centres are now open in Sydney (CBD and Parramatta), Melbourne CBD, Brisbane CBD, and Perth CBD. Adelaide opens mid-2026.",
              cat: "Logistics",
            },
            {
              q: "Do I need to bring anything on test day?",
              a: "Just a valid passport. No phones, no notes, no calculators. Lockers are provided. Plan to arrive 30 minutes before your sitting.",
              cat: "Logistics",
            },
          ],
        },
      },
      {
        kind: "CTACardWithIcon",
        props: {
          heading: "Check available CELPIP sittings in Australia",
          subheading: "Sydney, Melbourne, Brisbane, and Perth — weekday and Saturday slots.",
          primaryCta: { label: "View Calendar" },
        },
      },
    ],
  },

  // ───────────────────── 4. Campaign Landing ─────────────────────
  {
    id: 4,
    title: "Campaign Landing",
    tag: "Layout",
    description: "Form-in-header optimized for paid campaigns.",
    blocks: [
      {
        kind: "HeroFormInHeader",
        props: {
          badge: "LIMITED SEATS — APRIL & MAY SITTINGS",
          headline: "Book Your CELPIP Test — Get Scored in 4–5 Business Days",
          subhead:
            "One computer-delivered test, one sitting, all four components. CELPIP is recognized by IRCC for permanent residency and citizenship — and by DHA Australia for skilled migration.",
          bullets: [
            "Most candidates finish in 3 hours",
            "Free official practice tests included",
            "100+ test centres across Canada and abroad",
          ],
          formHeading: "Reserve your seat",
          formCtaLabel: "Send Me Dates",
          formDisclaimer: "By submitting, you agree to receive test-date emails. Unsubscribe any time.",
          fields: [
            { type: "text", placeholder: "Full Name" },
            { type: "email", placeholder: "Email Address" },
            { type: "tel", placeholder: "Phone Number" },
            {
              type: "select",
              placeholder: "Where will you test?",
              options: ["Canada", "India", "Philippines", "Australia", "UAE", "Other"],
            },
          ],
        },
      },
      {
        kind: "MetricsNavyDividers",
        props: {
          metrics: [
            { value: "2M+", label: "Tests Completed" },
            { value: "30+", label: "Countries" },
            { value: "4–5", label: "Days to Results" },
            { value: "100+", label: "Test Centres" },
          ],
        },
      },
      {
        kind: "FeatureGrid",
        props: {
          heading: "What makes CELPIP different",
          subheading: "Designed for working adults who need a clear, fast English score.",
          features: [
            {
              icon: "&#128187;",
              title: "Computer-delivered",
              desc: "Take the entire test on a workstation in a quiet, monitored centre.",
            },
            {
              icon: "&#9201;",
              title: "One sitting",
              desc: "All four components — listening, reading, writing, speaking — in three hours.",
            },
            {
              icon: "&#128338;",
              title: "Quick results",
              desc: "Online score report in 4–5 business days, ready to download or share.",
            },
            {
              icon: "&#128274;",
              title: "Recognized for immigration",
              desc: "Accepted by IRCC for Canadian PR and citizenship, and by DHA Australia for skilled migration.",
            },
            {
              icon: "&#128218;",
              title: "Free official prep",
              desc: "Two practice tests, writing rubric guides, and on-demand webinars at no cost.",
            },
            {
              icon: "&#127919;",
              title: "Real-life content",
              desc: "Everyday workplace and community English — no obscure academic vocabulary.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Seats filling fast — book this week",
          subheading: "Most April and May sittings are 60% full. Lock in your date now and get the free prep pack.",
          primaryCta: { label: "Book My Test" },
          secondaryCta: { label: "Talk to a Coach" },
        },
      },
    ],
  },

  // ───────────────────── 5. Standard Home ─────────────────────
  {
    id: 5,
    title: "Standard Home",
    tag: "Layout",
    description: "Balanced feature-rich landing page.",
    heroImageSrc: "/heroes/5.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "Canadian English Language Proficiency Index Program",
          headline: "Prove your English. Move forward with confidence.",
          subhead:
            "CELPIP is Canada's leading English language test — recognized by IRCC for permanent residency and citizenship, and by DHA Australia for skilled migration.",
          primaryCta: { label: "Book Your Test" },
          secondaryCta: { label: "Free Practice Tests" },
          imageAlt: "Confident professional reviewing their CELPIP score report",
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "2M+", label: "Tests Completed" },
            { value: "30+", label: "Countries" },
            { value: "4–5", label: "Days to Results" },
            { value: "100+", label: "Test Centres" },
            { value: "3 hrs", label: "One Sitting" },
          ],
        },
      },
      {
        kind: "FeatureGrid",
        props: {
          heading: "Why candidates choose CELPIP",
          subheading: "A modern, computer-delivered test built around working adults.",
          features: [
            {
              icon: "&#128187;",
              title: "Computer-Delivered",
              desc: "All four components on a workstation — no live examiner, no second appointment.",
            },
            {
              icon: "&#9201;",
              title: "Quick Results",
              desc: "Score report online in 4–5 business days. Share directly with your consultant.",
            },
            {
              icon: "&#127758;",
              title: "Globally Accepted",
              desc: "Recognized by IRCC, DHA Australia, and a growing list of professional bodies.",
            },
            {
              icon: "&#128274;",
              title: "One Sitting",
              desc: "Listening, reading, writing, and speaking — all completed in three hours.",
            },
            {
              icon: "&#128218;",
              title: "Free Official Prep",
              desc: "Two free practice tests, webinars, and rubric walkthroughs at no charge.",
            },
            {
              icon: "&#127919;",
              title: "Real-Life Content",
              desc: "Everyday English — workplace emails, community signs, casual conversations.",
            },
          ],
        },
      },
      {
        kind: "ScoreEquivalencyTable",
        props: {
          heading: "Where does your score fit?",
          subheading: "CELPIP · CLB · CEFR · DHA — at a glance",
          rows: fullScoreRows,
        },
      },
      {
        kind: "ImageGalleryGrid",
        props: {
          heading: "Inside a CELPIP test centre",
          images: standardHomeImages,
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Priya Sharma",
              location: "New Delhi, India",
              quote:
                "Straightforward, stress-free, and finished in one morning. The result came back exactly when CELPIP said it would.",
              score: "CLB 9",
            },
            {
              name: "Carlos Mendoza",
              location: "Manila, Philippines",
              quote:
                "The computer-based format felt natural — same way I'd practiced at home. The free practice tests were the real deal.",
              score: "CLB 10",
            },
            {
              name: "Liam O'Connor",
              location: "Melbourne, Australia",
              quote:
                "I needed Proficient English for skilled migration points. CELPIP felt fair, and I hit my band on the first sitting.",
              score: "CLB 10 · Proficient",
            },
          ],
        },
      },
      {
        kind: "FAQAccordion",
        props: {
          heading: "Frequently asked questions",
          faqs: [
            {
              q: "What is CELPIP?",
              a: "CELPIP — the Canadian English Language Proficiency Index Program — is a fully computer-delivered English test that assesses listening, reading, writing, and speaking in everyday Canadian English contexts.",
            },
            {
              q: "How long is the test?",
              a: "All four components are completed in one sitting of approximately 3 hours, including breaks and instructions.",
            },
            {
              q: "How quickly do I get my results?",
              a: "Score reports are typically available online in 4–5 business days after your test date. You can download a PDF or share it directly with your immigration consultant or institution.",
            },
            {
              q: "Where is CELPIP accepted?",
              a: "CELPIP-General is recognized by IRCC for Canadian permanent residency and citizenship applications, and by DHA Australia for general skilled migration. Many professional designation bodies also accept it.",
            },
            {
              q: "Where can I take the test?",
              a: "Test centres are open across Canada and in India, the Philippines, Australia, the UAE, and several other countries. New centres open regularly — check the booking site for the latest list.",
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Ready when you are",
          subheading: "Pick a date, book online, and walk in prepared. Free prep included.",
          primaryCta: { label: "Find Test Dates" },
        },
      },
    ],
  },

  // ───────────────────── 6. Resource Hub ─────────────────────
  {
    id: 6,
    title: "Resource Hub",
    tag: "Layout",
    description: "Content-led with prep materials and webinars.",
    blocks: [
      {
        kind: "HeroGradient",
        props: {
          eyebrow: "CELPIP Resource Hub",
          headline: "Free official prep —",
          headlineAccent: "all in one place.",
          subhead:
            "Practice tests, webinars, podcasts, and rubric walkthroughs from the team that builds the test. No paywalls, no email gates.",
          primaryCta: { label: "Browse All Resources" },
          secondaryCta: { label: "Subscribe for Updates" },
        },
      },
      {
        kind: "ResourceCardGrid",
        props: {
          heading: "Latest from the CELPIP team",
          resources: [
            { type: "Blog", title: "5 Tips to Ace the CELPIP Speaking Test", date: "Apr 15, 2026", tag: "Speaking" },
            { type: "Webinar", title: "Understanding CLB Levels and CELPIP Scores", date: "Apr 10, 2026", tag: "Scoring" },
            {
              type: "Podcast",
              title: "From Test to PR: Three Real Candidate Stories",
              date: "Apr 5, 2026",
              tag: "Stories",
            },
            { type: "YouTube", title: "CELPIP Writing Task 1 — Live Walkthrough", date: "Mar 28, 2026", tag: "Writing" },
            { type: "Blog", title: "How to Read Your CELPIP Score Report", date: "Mar 22, 2026", tag: "Scoring" },
            { type: "Webinar", title: "Listening Section Strategies for CLB 9+", date: "Mar 15, 2026", tag: "Listening" },
          ],
        },
      },
      {
        kind: "ImageGalleryCarousel",
        props: {
          heading: "Behind the scenes — CELPIP coaching sessions",
          images: resourceHubCarouselImages,
        },
      },
      {
        kind: "FormInline",
        props: {
          heading: "Get the weekly prep digest",
          subheading: "One email, every Friday. New webinars, practice tasks, and tips.",
          ctaLabel: "Subscribe",
          fields: [{ type: "email", placeholder: "you@example.com" }],
        },
      },
      {
        kind: "FormSimpleLead",
        props: {
          heading: "Download the free prep pack",
          subheading: "Two practice tests, a writing rubric, and a speaking guide — sent to your inbox.",
          ctaLabel: "Send Me the Prep Pack",
          fields: [
            { type: "text", placeholder: "Your Name" },
            { type: "email", placeholder: "Email Address" },
            {
              type: "select",
              placeholder: "Where are you testing?",
              options: ["Canada", "India", "Philippines", "Australia", "UAE", "Other"],
            },
          ],
        },
      },
      {
        kind: "CTACardWithIcon",
        props: {
          heading: "Have a content suggestion?",
          subheading: "Tell us what topic you'd like covered next — we read every note.",
          primaryCta: { label: "Send Suggestion" },
        },
      },
    ],
  },

  // ───────────────────── 7. Score Path ─────────────────────
  {
    id: 7,
    title: "Score Path",
    tag: "Layout",
    description: "Score equivalency-focused, CLB/CEFR/DHA emphasis.",
    blocks: [
      {
        kind: "HeroGradient",
        props: {
          eyebrow: "Score Conversion Guide",
          headline: "Know exactly what your",
          headlineAccent: "CELPIP score means.",
          subhead:
            "How CELPIP maps to CLB, CEFR, and the DHA Australia bands — explained in plain language, with the official conversion table below.",
          primaryCta: { label: "See the Score Table" },
          secondaryCta: { label: "Download the Guide (PDF)" },
        },
      },
      {
        kind: "ScoreEquivalencyTable",
        props: {
          heading: "Official CELPIP score conversion",
          subheading: "CELPIP overall · CLB · CEFR · DHA proficiency band",
          rows: fullScoreRows,
        },
      },
      {
        kind: "RichTextCompact",
        props: {
          content: {
            blocks: [
              { type: "h2", text: "How CELPIP maps to CLB" },
              {
                type: "p",
                text: "CELPIP scores each component on a 1–12 scale that aligns directly with the Canadian Language Benchmarks (CLB). A CELPIP overall of 9 corresponds to CLB 9 — there is no separate conversion math. Your overall is the lowest of your four component scores.",
              },
              { type: "h2", text: "How CELPIP maps to CEFR" },
              {
                type: "p",
                text: "The Common European Framework of Reference (CEFR) uses A1–C2 levels. CLB 7 generally aligns with B2 (independent user), CLB 9 with B2+ approaching C1, and CLB 10+ with C1 (proficient user). Universities and employers outside Canada often quote CEFR levels.",
              },
              { type: "h2", text: "How CELPIP maps to DHA proficiency bands" },
              {
                type: "p",
                text: "The Australian Department of Home Affairs uses four English proficiency bands: Vocational, Competent, Proficient, and Superior. CELPIP 7 generally meets Competent, CELPIP 9 meets Proficient, and CELPIP 10+ meets Superior. We're not migration agents — for visa-specific score requirements, please consult a registered MARA agent.",
              },
              {
                type: "blockquote",
                text: "Your overall CELPIP score is the lowest of your four component scores. If three components are CLB 10 and one is CLB 8, your overall is 8.",
              },
            ],
          },
        },
      },
      {
        kind: "MetricsCards",
        props: {
          metrics: [
            { value: "1–12", label: "CLB Range" },
            { value: "A1–C2", label: "CEFR Levels" },
            { value: "4 bands", label: "DHA Tiers" },
            { value: "2 yrs", label: "Score Validity" },
            { value: "4 skills", label: "Listening / Reading / Writing / Speaking" },
          ],
        },
      },
      {
        kind: "FAQAccordion",
        props: {
          heading: "Score-conversion questions",
          faqs: [
            {
              q: "Is the CELPIP-to-CLB mapping 1:1?",
              a: "Yes. A CELPIP score of 9 in any component is CLB 9 in that component. The CELPIP scoring scale was designed against CLB from the start.",
            },
            {
              q: "How long are CELPIP scores valid?",
              a: "CELPIP results are valid for two years from the test date for most immigration purposes. Always check the latest IRCC or DHA guidance — we're not licensed to give immigration advice.",
            },
            {
              q: "Can I improve my overall score by retaking just one component?",
              a: "CELPIP is taken as a complete test — all four components in one sitting. To improve a single component you re-sit the full test. Most candidates do this once after focused prep on the weakest component.",
            },
            {
              q: "Do universities accept CELPIP for academic admission?",
              a: "Many Canadian universities and colleges accept CELPIP-General for admission, particularly for graduate programs and professional designations. Check with each institution for the specific score they require.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Know your target — book with confidence",
          subheading: "Pick the CLB you need, prep with the free official materials, and lock in a date.",
          primaryCta: { label: "Find Test Dates" },
          secondaryCta: { label: "Download Score Guide" },
        },
      },
    ],
  },

  // ───────────────────── 8. B2B / Institutional ─────────────────────
  {
    id: 8,
    title: "B2B / Institutional",
    tag: "Layout",
    description: "For universities and immigration agents.",
    heroImageSrc: "/heroes/8.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "For Institutions & Partners",
          headline: "CELPIP for universities, employers, and licensed consultants",
          subhead:
            "Recognized score reports, partner verification APIs, and bulk-testing arrangements for institutions that need verified English proficiency.",
          primaryCta: { label: "Talk to Partnerships" },
          secondaryCta: { label: "API Documentation" },
          imageAlt: "Boardroom with diverse partners reviewing a partnership agreement",
        },
      },
      {
        kind: "ScoreEquivalencyTable",
        props: {
          heading: "Score acceptance reference",
          subheading: "Use this table to set or verify minimum CLB / CEFR / DHA bands for your program",
          rows: fullScoreRows,
        },
      },
      {
        kind: "TestimonialVideo",
        props: {
          eyebrow: "Partner Story",
          heading: "“CELPIP gave us a clearer picture of applicant English”",
          testimonial: {
            name: "Dr. Margaret Chen",
            location: "Director of Admissions, Western Canada University",
            quote:
              "We integrated CELPIP score verification into our graduate admissions workflow last year. The API is straightforward, scores arrive in real time, and our admissions committee finally has consistent English proficiency data across applicant cohorts.",
            score: "Partner since 2023",
          },
        },
      },
      {
        kind: "FormB2BContact",
        props: {
          heading: "Institutional inquiries",
          subheading:
            "For universities, employers, regulated professional bodies, and licensed immigration consultants. We respond within one business day.",
          ctaLabel: "Submit Inquiry",
          fields: [
            { type: "text", placeholder: "First Name", span: 1 },
            { type: "text", placeholder: "Last Name", span: 1 },
            { type: "email", placeholder: "Work Email", span: 1 },
            { type: "text", placeholder: "Organization", span: 1 },
            {
              type: "select",
              placeholder: "How can we help?",
              options: [
                "Score acceptance for our program",
                "Bulk testing for our cohort",
                "API / verification integration",
                "Partnership inquiry",
                "Other",
              ],
              span: 2,
            },
            { type: "textarea", placeholder: "Tell us a bit about your needs…", span: 2 },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Become a CELPIP-recognizing institution",
          subheading: "Join 200+ universities, employers, and agencies who use CELPIP to verify English proficiency.",
          primaryCta: { label: "Talk to Our Team" },
        },
      },
    ],
  },

  // ───────────────────── 9. Prep-Focused ─────────────────────
  {
    id: 9,
    title: "Prep-Focused",
    tag: "Layout",
    description: "Test preparation and study materials.",
    heroImageSrc: "/heroes/9.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "Prep Smart, Test Once",
          headline: "Walk into your CELPIP test knowing exactly what to expect.",
          subhead:
            "Free official practice tests, rubric walkthroughs, and on-demand webinars — built by the people who write the real test.",
          primaryCta: { label: "Start the Free Practice Test" },
          secondaryCta: { label: "See All Prep Materials" },
          imageAlt: "Candidate reviewing CELPIP practice notes with a coach",
        },
      },
      {
        kind: "FeatureGrid",
        props: {
          heading: "What's in the prep library",
          subheading: "Everything you need to prepare — at no cost.",
          features: [
            {
              icon: "&#128221;",
              title: "Two full practice tests",
              desc: "Same format, same timing, same scoring rubric as the real CELPIP. Take them in test-like conditions.",
            },
            {
              icon: "&#127909;",
              title: "On-demand webinars",
              desc: "Live and recorded sessions on listening strategies, writing tasks, speaking pacing, and reading techniques.",
            },
            {
              icon: "&#128203;",
              title: "Writing rubric walkthroughs",
              desc: "See exactly how each writing task is scored — with sample responses at CLB 7, 9, and 11.",
            },
            {
              icon: "&#127908;",
              title: "Speaking pacing guide",
              desc: "How to use the prep window, how to structure responses, and how to recover from small slips.",
            },
            {
              icon: "&#128175;",
              title: "Self-scoring keys",
              desc: "Listening and reading answer keys with explanations for every option.",
            },
            {
              icon: "&#127942;",
              title: "Goal-setter worksheet",
              desc: "Tie your target CLB to the components that need the most work — clear, honest, and time-boxed.",
            },
          ],
        },
      },
      {
        kind: "RichTextEditorial",
        props: {
          content: {
            blocks: [
              { type: "h2", text: "How to plan your six-week CELPIP prep" },
              {
                type: "lead",
                text: "Six weeks is the sweet spot for most candidates already comfortable with English. Less, and you risk under-preparing one component. More, and motivation tends to fade.",
              },
              { type: "h3", text: "Weeks 1–2 — Diagnostic and rubric" },
              {
                type: "p",
                text: "Take a full practice test under timed conditions. Score it honestly. Read the writing and speaking rubrics carefully — most candidates discover their ceiling is set by structure, not vocabulary.",
              },
              { type: "h3", text: "Weeks 3–4 — Targeted practice" },
              {
                type: "p",
                text: "Pick the weakest two components and spend 70% of your prep time there. Most candidates find writing and speaking benefit most from focused work — listening and reading are often closer to ceiling than they think.",
              },
              { type: "h3", text: "Weeks 5–6 — Simulation and recovery" },
              {
                type: "p",
                text: "Take the second practice test under strict conditions. Don't grind every day in the final week — sleep, hydration, and a clear head matter more than one extra study hour.",
              },
              {
                type: "blockquote",
                text: "The candidates who score CLB 9+ aren't the ones who studied the longest. They're the ones who diagnosed early and trained the right components.",
              },
            ],
          },
        },
      },
      {
        kind: "ResourceCardGrid",
        props: {
          heading: "Most-used prep resources this month",
          resources: [
            { type: "Blog", title: "How to Use the 30-Second Prep Window in Speaking", date: "Apr 18, 2026", tag: "Speaking" },
            { type: "Webinar", title: "Writing Task 2 — Hitting CLB 10", date: "Apr 12, 2026", tag: "Writing" },
            { type: "YouTube", title: "Listening Section: Top 10 Trap Patterns", date: "Apr 8, 2026", tag: "Listening" },
            { type: "Blog", title: "Reading Comprehension — Skim, Then Hunt", date: "Apr 1, 2026", tag: "Reading" },
            { type: "Podcast", title: "Test-Day Anxiety: What Actually Helps", date: "Mar 26, 2026", tag: "Mindset" },
            { type: "YouTube", title: "Sample CELPIP Speaking — CLB 11 Response", date: "Mar 18, 2026", tag: "Speaking" },
          ],
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Anjali Verma",
              location: "Bengaluru, India",
              quote:
                "I followed the six-week plan to the letter. Diagnosed early, focused on writing for two weeks, and walked into the test knowing exactly what each task required. CLB 10 on the first try.",
              score: "CLB 10",
            },
            {
              name: "Diego Ramirez",
              location: "Toronto, Canada",
              quote:
                "The free practice tests were a wake-up call — I thought I was ready and I wasn't. The rubric walkthrough showed me what was actually being scored. Saved me from a re-sit.",
              score: "CLB 9",
            },
            {
              name: "Aisha Bello",
              location: "Lagos, Nigeria",
              quote:
                "Speaking was my weakest component until the pacing guide. Once I learned to use the prep window, my responses got tighter and my score jumped two CLB levels.",
              score: "CLB 9",
            },
          ],
        },
      },
      {
        kind: "FormSimpleLead",
        props: {
          heading: "Get the prep planner in your inbox",
          subheading: "A printable six-week schedule, with the official practice tests linked.",
          ctaLabel: "Send Me the Planner",
          fields: [
            { type: "text", placeholder: "Your Name" },
            { type: "email", placeholder: "Email Address" },
            {
              type: "select",
              placeholder: "When is your test?",
              options: ["Within 4 weeks", "4–8 weeks", "2–3 months", "Not booked yet"],
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Prep is free — the ceiling is up to you",
          subheading: "Open the practice test and start where you are. No payment, no email wall.",
          primaryCta: { label: "Start Free Practice Test" },
          secondaryCta: { label: "Browse Webinars" },
        },
      },
    ],
  },

  // ───────────────────── 10. Testimonials-Led ─────────────────────
  {
    id: 10,
    title: "Testimonials-Led",
    tag: "Layout",
    description: "Social-proof-heavy storytelling layout.",
    blocks: [
      {
        kind: "HeroGradient",
        props: {
          eyebrow: "Real Stories from Real Test-Takers",
          headline: "You've got this.",
          headlineAccent: "And we've got you.",
          subhead:
            "Two million candidates have taken CELPIP across more than 30 countries. Here's what a few of them want you to know.",
          primaryCta: { label: "Read More Stories" },
          secondaryCta: { label: "Book Your Test" },
        },
      },
      {
        kind: "TestimonialSpotlight",
        props: {
          testimonial: {
            name: "Priya Sharma",
            location: "New Delhi, India · Now living in Toronto",
            quote:
              "I was so nervous walking into the test centre. By the end of the first section, I realized — the test was talking to me in the same English I use every day at work. I finished, walked out, and got my result five days later. That score was the first step in my whole life moving to Canada.",
            score: "CLB 9 → PR Approved",
          },
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Carlos Mendoza",
              location: "Manila, Philippines",
              quote:
                "I'm a nurse working night shifts. CELPIP's Saturday slot meant I didn't have to take leave. The whole thing felt fair — no surprises, no tricks.",
              score: "CLB 10",
            },
            {
              name: "Liam O'Connor",
              location: "Melbourne, Australia",
              quote:
                "I'm an electrician. English isn't my second language, but academic essays aren't my world either. CELPIP asks about real situations — and I scored Proficient on the first try.",
              score: "CLB 10 · Proficient",
            },
            {
              name: "Anjali Verma",
              location: "Bengaluru, India",
              quote:
                "The free practice tests showed me exactly where I stood. Six focused weeks later, I walked into the real test feeling like I'd already done it once.",
              score: "CLB 10",
            },
            {
              name: "Maria Santos",
              location: "Cebu, Philippines",
              quote:
                "When the Cebu centre opened, I didn't have to fly to Manila. Booked, tested, scored. Five business days, exactly as promised.",
              score: "CLB 9",
            },
            {
              name: "Diego Ramirez",
              location: "Toronto, Canada",
              quote:
                "I was over-confident going in. The practice test humbled me. The rubric showed me what was actually being scored. I prepped properly — and passed.",
              score: "CLB 9",
            },
            {
              name: "Aisha Bello",
              location: "Lagos, Nigeria",
              quote:
                "Speaking was my weakest section. The pacing guide changed everything — I learned to plan in the prep window, and my score jumped two CLB levels.",
              score: "CLB 9",
            },
          ],
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "2M+", label: "Candidates" },
            { value: "30+", label: "Countries" },
            { value: "94%", label: "Recommend CELPIP" },
            { value: "4.6/5", label: "Average Rating" },
            { value: "4–5", label: "Days to Results" },
          ],
        },
      },
      {
        kind: "CTACardWithIcon",
        props: {
          heading: "Your story could be next",
          subheading: "Pick a date, prep with the free materials, and walk in confident.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // Microsites #11–#20 — conversion-stage, copy anchored in research/
  // celpip-positioning.md (verbatim/lightly adapted from celpip.ca).
  // Audience: leads who have already chosen CELPIP and need a final push to
  // register. Voice rules: "officially designated by IRCC", "officially
  // recognized by DHA", "Find a Test Date" as primary CTA, no immigration
  // advice, no competitor names, no pass-rate claims, no pricing on hero,
  // Sitting.price left undefined throughout.
  // ═════════════════════════════════════════════════════════════════════════

  // ───────────────────── 11. India · Nurses → Canada ─────────────────────
  {
    id: 11,
    title: "India · Nurses → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian nurses pursuing licensure and PR in Canada.",
    heroImageSrc: "/heroes/11.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR HEALTHCARE PROFESSIONALS",
          headline: "Your nursing career in Canada starts with one English test.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency, and accepted by FMRAC and CAPR for nursing licensure. Test in 9 centres across India, computer-delivered in one sitting, results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Indian nurse reviewing her CELPIP score report at home",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "FMRAC", subLabel: "Medical regulators of Canada" },
            { label: "CAPR", subLabel: "Physiotherapy regulators" },
            { label: "BC HCAP", subLabel: "Health care assistant program" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-11-moment/1200/1400",
          imageAlt:
            "Aastha at her kitchen table reviewing her CELPIP score report on a laptop",
          oneLineMoment:
            "From a night shift in Mumbai to a PSW pathway in Ontario, in one sitting.",
          paragraphQuote:
            "I was working night shifts as a staff nurse and didn't think I had time to prepare. The CELPIP questions felt like easy-to-understand English and vocabulary taken from everyday situations — the same conversations I have on the ward. I tested on a Saturday morning and had my CLB scores by the next Wednesday.",
          attribution: {
            name: "Aastha Patel",
            location: "Mumbai → Ontario",
            score: "CLB 9",
            date: "March 2026",
          },
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in India",
          subheading:
            "Open sittings across 9 CELPIP test centres in India — computer-delivered in one sitting, results in 3 to 4 business days.",
          sittings: [
            {
              city: "New Delhi",
              centreName: "New Delhi — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Mumbai",
              centreName: "Mumbai — Prometric Testing",
              date: "Sun, May 17",
              time: "1:00 PM",
              seatsLeft: 3,
            },
            {
              city: "Bengaluru",
              centreName: "Bengaluru — Prometric Testing",
              date: "Sat, May 23",
              time: "9:30 AM",
              seatsLeft: 8,
            },
            {
              city: "Chennai",
              centreName: "Chennai — Prometric Testing",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Indian nurses ask before booking — answered honestly.",
          objections: [
            {
              worry: "I work night shifts — can I prepare in a few weeks?",
              reassurance:
                "Yes. CELPIP offers 100+ hours of free prep — practice tests, weekly webinars, study guides, and self-paced courses. Two free practice tests come with your CELPIP Account, and recordings of every webinar are on YouTube so you can prep around your shift schedule.",
              softCta: { label: "See free prep resources" },
            },
            {
              worry: "Will my English skills hold up?",
              reassurance:
                "CELPIP is built on easy-to-understand English and vocabulary taken from everyday situations — workplace conversations, voicemails, and community signs. It is focused on practical, real-world communication for school, career, and life, not academic essays.",
            },
            {
              worry: "What CELPIP score do nurses need?",
              reassurance:
                "FMRAC requires CELPIP 9 in each component; CAPR requires CELPIP 8 in each component. Specific licensing requirements vary by province — please check with your provincial licensing body. We are not licensed to give immigration advice.",
              softCta: { label: "View score concordance" },
            },
            {
              worry: "How fast will I get my results?",
              reassurance:
                "Your PDF score report is available online in 3 to 4 business days after the test date. The PDF score report is official and accepted by IRCC, FMRAC, CAPR, and other licensing bodies — no paper, no waiting on mail.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 12. India · Software Engineers → Canada ─────────────────────
  {
    id: 12,
    title: "India · Software Engineers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian software engineers on the Express Entry path.",
    heroImageSrc: "/heroes/12.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR TECH PROFESSIONALS",
          headline: "Your Express Entry score starts here.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Test in less than 3 hours with results in 2 to 4 days, computer-delivered in one sitting, in 9 centres across India's tech corridors.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "See Test Centres" },
          imageAlt:
            "Bengaluru software engineer working on a laptop in a modern office",
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from here to PR",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc:
                "Pick a date and centre — Bengaluru, Hyderabad, Pune, Chennai, or Gurgaon. Confirmed instantly.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Practice with free materials",
              desc:
                "Two free practice tests, 100+ hours of prep videos, and weekly webinars — all free.",
              cta: { label: "Get prep pack" },
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc:
                "Self-paced test is completed during one sitting in 3 hours or less, computer-delivered.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Get results in 2–4 days",
              desc:
                "Official PDF score report online, ready to upload to your Express Entry profile.",
            },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in India",
          subheading:
            "Open sittings in India's tech corridors — secure an available test date within 2 weeks in most major cities.",
          sittings: [
            {
              city: "Bengaluru",
              centreName: "Bengaluru — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Hyderabad",
              centreName: "Hyderabad — Prometric Testing",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 9,
            },
            {
              city: "Pune",
              centreName: "Pune — Prometric Testing",
              date: "Sat, May 23",
              time: "1:00 PM",
              seatsLeft: 2,
            },
            {
              city: "Gurgaon",
              centreName: "Gurgaon — Prometric Testing",
              date: "Sun, May 24",
              time: "9:30 AM",
              seatsLeft: 7,
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-12-moment/300/300",
          imageAlt: "Portrait of Vikram, a software engineer from Bengaluru",
          oneLineMoment:
            "He booked CELPIP on a Tuesday and uploaded his CLB scores to Express Entry the same week.",
          paragraphQuote:
            "Vikram had been putting the test off for months. CELPIP fit his life: register online in minutes, test in less than 3 hours, results in 2 to 4 days. He took it on a Saturday morning in Bengaluru and had his Express Entry profile updated by Wednesday.",
          attribution: {
            name: "Vikram Iyer",
            location: "Bengaluru → Toronto",
            score: "CLB 10",
            date: "April 2026",
          },
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Express Entry · PR" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "CLB", subLabel: "Aligned scoring" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "200+", subLabel: "Centres in 40+ countries" },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Ready when you are.",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 13. India · Finance & Accounting → Canada ─────────────────────
  {
    id: 13,
    title: "India · Finance & Accounting → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian CAs and finance professionals moving to Canada.",
    heroImageSrc: "/heroes/13.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR FINANCE PROFESSIONALS",
          headline: "From Mumbai to your Canadian career, in one English test.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Test in less than 3 hours with results in 2 to 4 days, computer-delivered in one sitting.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt:
            "Indian chartered accountant reviewing financial documents at her desk",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "IRCC", subLabel: "Citizenship" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in India",
          subheading:
            "Open sittings across India's finance hubs — secure an available test date within 2 weeks.",
          sittings: [
            {
              city: "Mumbai",
              centreName: "Mumbai — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Gurgaon",
              centreName: "Gurgaon — Prometric Testing",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Kolkata",
              centreName: "Kolkata — Prometric Testing",
              date: "Sat, May 23",
              time: "9:30 AM",
              seatsLeft: 2,
            },
            {
              city: "New Delhi",
              centreName: "New Delhi — Prometric Testing",
              date: "Sun, May 24",
              time: "1:00 PM",
              seatsLeft: 8,
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-13-moment/300/300",
          imageAlt: "Portrait of Neha, a chartered accountant from Mumbai",
          oneLineMoment:
            "She finished her CELPIP on a Saturday morning and had her CLB scores by Thursday.",
          paragraphQuote:
            "Neha is a CA with seven years at a Big 4 firm in Mumbai. She had no time for a test that demanded weeks of leave. CELPIP fit because the self-paced test is completed during one sitting in 3 hours or less with results in 2 to 4 days. Her credentialing file with the Canadian firm closed two weeks later.",
          attribution: {
            name: "Neha Krishnan",
            location: "Mumbai → Toronto",
            score: "CLB 10",
            date: "February 2026",
          },
        },
      },
      {
        kind: "ReadinessQuiz",
        props: {
          heading: "Are you ready to book?",
          subheading:
            "A 30-second check. We will tell you what to do next based on your answers.",
          questions: [
            {
              id: "computer",
              question: "How comfortable are you with computer-based tests?",
              options: [
                {
                  label: "Very comfortable — I work on a computer every day.",
                  score: 3,
                },
                {
                  label: "Mostly fine — I would want a quick walkthrough first.",
                  score: 2,
                },
                {
                  label: "A bit nervous — I would prefer to try the interface first.",
                  score: 1,
                },
              ],
            },
            {
              id: "since-exam",
              question: "How long since your last English exam?",
              options: [
                { label: "Within the last 12 months.", score: 3 },
                { label: "1–3 years ago.", score: 2 },
                { label: "More than 3 years — or never.", score: 1 },
              ],
            },
            {
              id: "daily-english",
              question: "How much daily English do you use at work?",
              options: [
                { label: "All day — meetings, emails, client calls.", score: 3 },
                { label: "Most of the day, but in writing more than speaking.", score: 2 },
                { label: "Some — mostly written reports.", score: 1 },
              ],
            },
          ],
          results: [
            {
              thresholdMin: 7,
              title: "You are ready. Find a test date.",
              body:
                "Based on your answers, you are well-positioned to book now. Most people in your situation are within range on the first official practice test.",
              ctaLabel: "Find a Test Date",
            },
            {
              thresholdMin: 4,
              title: "Almost there. Try a free practice test first.",
              body:
                "You are close. Two free practice tests come with your CELPIP Account — take one to confirm your range, then book.",
              ctaLabel: "Try a free practice test",
            },
            {
              thresholdMin: 0,
              title: "Start with the prep pack.",
              body:
                "No problem — most people start here. CELPIP offers 100+ hours of free prep. Two to three weeks of focused study and you will be ready for the practice test.",
              ctaLabel: "Send me the prep pack",
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading: "The real questions finance professionals ask before booking.",
          objections: [
            {
              worry: "I have not taken a standardized test in years.",
              reassurance:
                "CELPIP is computer-delivered in one sitting and uses easy-to-understand English and vocabulary taken from everyday situations. Two free practice tests come with your CELPIP Account so you can rehearse the format before test day.",
              softCta: { label: "Try a free practice test" },
            },
            {
              worry: "Will my CELPIP score be accepted by Canadian employers?",
              reassurance:
                "CELPIP is officially designated by IRCC for permanent residency, and the CELPIP Tests are officially accepted by several governments, professional organizations, colleges, universities, and employers. The PDF score report is official.",
            },
            {
              worry: "How long are CELPIP scores valid?",
              reassurance:
                "CELPIP scores are valid for 2 years from the test date for most immigration purposes. For program-specific score requirements, please consult a licensed immigration consultant.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 14. Philippines · Nurses → Canada ─────────────────────
  {
    id: 14,
    title: "Philippines · Nurses → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Filipino nurses pursuing Canadian PR and licensure.",
    heroImageSrc: "/heroes/14.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN PHILIPPINES · FOR HEALTHCARE PROFESSIONALS",
          headline: "Your Canadian nursing career — closer than you think.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency, and accepted by FMRAC and CAPR for nursing licensure. Computer-delivered tests done in one sitting with quick online results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Filipino nurse in scrubs smiling at the nurses' station",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "FMRAC", subLabel: "Medical regulators of Canada" },
            { label: "CAPR", subLabel: "Physiotherapy regulators" },
            { label: "BC HCAP", subLabel: "Health care assistant program" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-14-moment/1200/1400",
          imageAlt:
            "Filipino nurse Maria reviewing her CELPIP score report on a laptop at home in Manila",
          oneLineMoment:
            "From a hospital ward in Manila to a PSW pathway in Ontario — in one sitting.",
          paragraphQuote:
            "I am a registered nurse working night shifts at a private hospital in Manila. CELPIP fit because all four components are computer-delivered in one sitting — no separate speaking session, no second appointment. The questions felt like easy-to-understand English and vocabulary taken from everyday situations, the same conversations I have on the ward every day.",
          attribution: {
            name: "Maria Santos",
            location: "Manila → Ontario",
            score: "CLB 9",
            date: "March 2026",
          },
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Available CELPIP sittings in the Philippines",
          subheading:
            "87 options nationwide — pick the date and centre that works around your shift.",
          sittings: [
            {
              city: "Manila",
              centreName: "Manila — Makati Test Centre",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 5,
              address: "Makati City, Metro Manila",
              parkingNote: "Accessible by Ayala MRT station — 5 min walk.",
            },
            {
              city: "Cebu",
              centreName: "Cebu City Test Centre",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 2,
              address: "Cebu Business Park, Cebu City",
              parkingNote: "Free parking on premises.",
            },
            {
              city: "Davao",
              centreName: "Davao Test Centre",
              date: "Sat, May 23",
              time: "1:00 PM",
              seatsLeft: 8,
              address: "Davao City, Davao del Sur",
            },
            {
              city: "Bacolod",
              centreName: "Bacolod City Test Centre",
              date: "Sun, May 24",
              time: "9:30 AM",
              seatsLeft: 4,
              address: "Bacolod City, Negros Occidental",
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Filipino nurses ask before booking — answered honestly.",
          objections: [
            {
              worry: "I work 12-hour hospital shifts — can I prepare in time?",
              reassurance:
                "Yes. CELPIP offers 100+ hours of free prep — practice tests, weekly webinars, and self-paced courses you can take around your roster. Two free practice tests come with your CELPIP Account, and Webinar Study Materials specific to the Philippines are available on celpip.ca.",
              softCta: { label: "See free prep resources" },
            },
            {
              worry: "Will my English skills hold up under test conditions?",
              reassurance:
                "CELPIP uses easy-to-understand English and vocabulary taken from everyday situations — workplace conversations, voicemails, and community signs. It is focused on practical, real-world communication for school, career, and life.",
            },
            {
              worry: "What CELPIP score do nurses need?",
              reassurance:
                "FMRAC requires CELPIP 9 in each component; CAPR requires CELPIP 8 in each component. Specific licensing requirements vary by province — please check with your provincial licensing body. We are not licensed to give immigration advice.",
              softCta: { label: "View score concordance" },
            },
            {
              worry: "How fast will I see my results?",
              reassurance:
                "Your PDF score report is available online in 3 to 4 business days after the test date. The PDF score report is official and accepted by IRCC, FMRAC, CAPR, and other licensing bodies.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 15. Philippines · Engineers → Canada ─────────────────────
  {
    id: 15,
    title: "Philippines · Engineers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Filipino engineers on the Express Entry path.",
    heroImageSrc: "/heroes/15.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN PHILIPPINES · FOR ENGINEERS",
          headline: "Build your career in Canada — starting in one sitting.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered tests done in one sitting with quick online results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "See Test Centres" },
          imageAlt: "Filipino engineer reviewing technical drawings on a tablet",
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from here to PR",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc:
                "Pick a date and centre — Manila, Cebu, or Makati. Register online in minutes.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Practice with free materials",
              desc:
                "Two free practice tests, 100+ hours of prep videos, weekly webinars — all free.",
              cta: { label: "Get prep pack" },
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc:
                "Self-paced test is completed during one sitting in 3 hours or less, computer-delivered.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Results in 2–4 days",
              desc:
                "Official PDF score report online — upload to your Express Entry profile.",
            },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in the Philippines",
          subheading:
            "Open sittings — 87 options nationwide. Find an available exam to schedule within 2 weeks.",
          sittings: [
            {
              city: "Manila",
              centreName: "Manila — Makati Test Centre",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Cebu",
              centreName: "Cebu City Test Centre",
              date: "Sun, May 17",
              time: "1:00 PM",
              seatsLeft: 3,
            },
            {
              city: "Makati",
              centreName: "Makati Business District",
              date: "Sat, May 23",
              time: "9:30 AM",
              seatsLeft: 9,
            },
            {
              city: "Manila",
              centreName: "Manila — Quezon City Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-15-moment/300/300",
          imageAlt: "Portrait of Joshua, a Filipino engineer from Cebu",
          oneLineMoment:
            "He registered online in minutes and tested in Cebu the following weekend.",
          paragraphQuote:
            "Joshua is a mechanical engineer in Cebu. He had been waiting to take an English test for over a year. CELPIP made it simple — register online in minutes, test in less than 3 hours, results in 2 to 4 days. He uploaded his CLB scores to Express Entry the same week.",
          attribution: {
            name: "Joshua Reyes",
            location: "Cebu → Vancouver",
            score: "CLB 9",
            date: "April 2026",
          },
        },
      },
      {
        kind: "ReadinessQuiz",
        props: {
          heading: "Are you ready to book?",
          subheading:
            "A 30-second check. We will tell you what to do next based on your answers.",
          questions: [
            {
              id: "computer",
              question: "How comfortable are you with a 3-hour test on a computer?",
              options: [
                { label: "Very comfortable — I work on a computer daily.", score: 3 },
                { label: "Mostly fine — I want a quick walkthrough first.", score: 2 },
                { label: "A bit nervous — I want to try the interface first.", score: 1 },
              ],
            },
            {
              id: "english-use",
              question: "How much daily English do you use at work?",
              options: [
                { label: "All day — meetings, technical reports, calls.", score: 3 },
                { label: "Most of the day, mostly written.", score: 2 },
                { label: "Some — mostly emails.", score: 1 },
              ],
            },
            {
              id: "timeline",
              question: "How urgent is your timeline?",
              options: [
                { label: "I need scores in the next 4 weeks.", score: 3 },
                { label: "I have 1–3 months.", score: 2 },
                { label: "3+ months — no rush.", score: 1 },
              ],
            },
          ],
          results: [
            {
              thresholdMin: 7,
              title: "You are ready. Find a test date.",
              body:
                "Based on your answers, you are well-positioned to book now. The longer you wait, the more you forget.",
              ctaLabel: "Find a Test Date",
            },
            {
              thresholdMin: 4,
              title: "Almost there. Try a free practice test first.",
              body:
                "You are close. A free official practice test will tell you exactly where you stand.",
              ctaLabel: "Try a free practice test",
            },
            {
              thresholdMin: 0,
              title: "Start with the prep pack.",
              body:
                "Most people start here. 100+ hours of free prep — two to three weeks of focused study and you will be ready.",
              ctaLabel: "Send me the prep pack",
            },
          ],
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Express Entry · PR" },
            { label: "Engineers Canada", subLabel: "Designation pathway" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Ready when you are.",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 16. Philippines · Finance Professionals → Canada ─────────────────────
  {
    id: 16,
    title: "Philippines · Finance Professionals → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Filipino finance professionals targeting Canadian PR.",
    heroImageSrc: "/heroes/16.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN PHILIPPINES · FOR FINANCE PROFESSIONALS",
          headline: "Take the CELPIP Test in Philippines — your Canadian PR pathway.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered tests done in one sitting with quick online results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt:
            "Filipino finance professional working in a Makati office tower",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "IRCC", subLabel: "Citizenship" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in the Philippines",
          subheading:
            "Open sittings across Makati, Manila, and Cebu — 87 options nationwide.",
          sittings: [
            {
              city: "Makati",
              centreName: "Makati Business District",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Manila",
              centreName: "Manila — Quezon City Centre",
              date: "Sun, May 17",
              time: "1:00 PM",
              seatsLeft: 7,
            },
            {
              city: "Cebu",
              centreName: "Cebu City Test Centre",
              date: "Sat, May 23",
              time: "9:30 AM",
              seatsLeft: 2,
            },
            {
              city: "Manila",
              centreName: "Manila — Ortigas Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 6,
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-16-moment/300/300",
          imageAlt: "Portrait of Carla, a CPA in Makati",
          oneLineMoment:
            "She registered online in minutes and uploaded her CLB scores the same week.",
          paragraphQuote:
            "Carla is a CPA at a multinational bank in Makati. She did not have time for an exam that took weeks to schedule and weeks to score. CELPIP fit: register online in minutes, test in less than 3 hours, results in 2 to 4 days. Two months later her Canadian PR application was complete.",
          attribution: {
            name: "Carla Reyes",
            location: "Makati → Toronto",
            score: "CLB 10",
            date: "March 2026",
          },
        },
      },
      {
        kind: "PrepStarterPackInline",
        props: {
          eyebrow: "FREE",
          headline: "Get the official CELPIP practice test, free.",
          benefits: [
            "Two free practice tests with your CELPIP Account",
            "100+ hours of prep videos and webinars",
            "Self-scoring rubrics for writing and speaking",
            "Audio for the listening section",
          ],
          ctaLabel: "Send me the prep pack",
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions finance professionals ask before booking.",
          objections: [
            {
              worry: "I have not taken a standardized test in years.",
              reassurance:
                "CELPIP is computer-delivered in one sitting and uses easy-to-understand English and vocabulary taken from everyday situations. Two free practice tests come with your CELPIP Account.",
              softCta: { label: "Try a free practice test" },
            },
            {
              worry: "Will my CELPIP score be accepted by Canadian employers?",
              reassurance:
                "The CELPIP Tests are officially accepted by several governments, professional organizations, colleges, universities, and employers. The PDF score report is official.",
            },
            {
              worry: "How long are CELPIP scores valid?",
              reassurance:
                "CELPIP scores are valid for 2 years from the test date for most immigration purposes. For program-specific requirements, please consult a licensed immigration consultant.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 17. Nigeria · Healthcare → Canada ─────────────────────
  {
    id: 17,
    title: "Nigeria · Healthcare → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Nigerian healthcare professionals targeting Canadian licensure and PR.",
    heroImageSrc: "/heroes/17.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP · FOR HEALTHCARE PROFESSIONALS",
          headline: "Your medical career in Canada is one test away.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency, and accepted by FMRAC and Colleges of Physicians and Surgeons across Canada. Computer-delivered tests done in one sitting with quick online results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Nigerian doctor in a Lagos hospital reviewing patient charts",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "FMRAC", subLabel: "Medical regulators of Canada" },
            { label: "CAPR", subLabel: "Physiotherapy regulators" },
            { label: "CPSCs", subLabel: "Physicians and Surgeons across Canada" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-17-moment/1200/1400",
          imageAlt:
            "Dr. Adekunle reviewing his CELPIP score report on a laptop in his Lagos office",
          oneLineMoment:
            "From a Lagos teaching hospital to specialist licensure in Toronto — in one sitting.",
          paragraphQuote:
            "I am a consultant in internal medicine at a Lagos teaching hospital. I had been delaying the English test because I thought it would take months. CELPIP fit my schedule — register online in minutes, all four components in one sitting in 3 hours or less, official PDF score report in 3 to 4 business days. The questions were easy-to-understand English and vocabulary taken from everyday situations.",
          attribution: {
            name: "Dr. Tunde Adekunle",
            location: "Lagos → Toronto",
            score: "CLB 10",
            date: "March 2026",
          },
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Available CELPIP sittings in Nigeria",
          subheading:
            "Pick the date and centre that works for you — booking is confirmed instantly with payment.",
          sittings: [
            {
              city: "Lagos",
              centreName: "Lagos — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 6,
              address: "Victoria Island, Lagos",
              parkingNote: "Secure on-site parking available.",
            },
            {
              city: "Abuja",
              centreName: "Abuja — Prometric Testing",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 4,
              address: "Wuse 2, Abuja",
            },
            {
              city: "Port Harcourt",
              centreName: "Port Harcourt — Prometric Testing",
              date: "Sat, May 23",
              time: "1:00 PM",
              seatsLeft: 2,
              address: "Trans Amadi, Port Harcourt",
            },
          ],
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from here to licensure",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc: "Pick a date and centre — Lagos, Abuja, or Port Harcourt.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Prepare with free resources",
              desc: "100+ hours of free prep — two free practice tests, weekly webinars.",
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc: "Computer-delivered, all four components in 3 hours or less.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Submit to your regulator",
              desc:
                "Official PDF score report in 3 to 4 business days — share directly with FMRAC or your CPSC.",
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Nigerian healthcare professionals ask before booking.",
          objections: [
            {
              worry: "I work long clinical hours — can I prepare in time?",
              reassurance:
                "Yes. CELPIP offers 100+ hours of free prep — practice tests, weekly webinars, and self-paced courses. Two free practice tests come with your CELPIP Account.",
              softCta: { label: "See free prep resources" },
            },
            {
              worry: "What CELPIP score do healthcare professionals need?",
              reassurance:
                "FMRAC requires CELPIP 9 in each component; CAPR requires CELPIP 8 in each component. Specific licensing requirements vary by province and college — please check with your provincial licensing body.",
            },
            {
              worry: "Will my English skills hold up?",
              reassurance:
                "CELPIP uses easy-to-understand English and vocabulary taken from everyday situations. It is focused on practical, real-world communication for school, career, and life.",
            },
            {
              worry: "How fast will I see my results?",
              reassurance:
                "Your PDF score report is available online in 3 to 4 business days after the test date. The PDF score report is official and accepted by IRCC, FMRAC, CAPR, and the Colleges of Physicians and Surgeons across Canada.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 18. Nigeria · Engineers → Canada ─────────────────────
  {
    id: 18,
    title: "Nigeria · Engineers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Nigerian engineers on the Express Entry path.",
    heroImageSrc: "/heroes/18.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP · FOR ENGINEERS",
          headline: "Your Express Entry path — one English test, one sitting.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered tests done in one sitting with quick online results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "See Test Centres" },
          imageAlt: "Nigerian engineer at a construction site in Lagos with a tablet",
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from here to PR",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc: "Pick a date and centre — Lagos, Abuja, or Port Harcourt.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Practice with free materials",
              desc: "Two free practice tests, 100+ hours of free prep videos and webinars.",
              cta: { label: "Get prep pack" },
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc: "Self-paced test in 3 hours or less, computer-delivered.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Results in 2–4 days",
              desc: "Official PDF score report — upload to your Express Entry profile.",
            },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in Nigeria",
          subheading:
            "Open sittings across Lagos, Abuja, and Port Harcourt — secure an available test date within 2 weeks.",
          sittings: [
            {
              city: "Lagos",
              centreName: "Lagos — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 7,
            },
            {
              city: "Abuja",
              centreName: "Abuja — Prometric Testing",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Port Harcourt",
              centreName: "Port Harcourt — Prometric Testing",
              date: "Sat, May 23",
              time: "1:00 PM",
              seatsLeft: 3,
            },
            {
              city: "Lagos",
              centreName: "Lagos — Lekki Centre",
              date: "Sun, May 24",
              time: "9:30 AM",
              seatsLeft: 8,
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-18-moment/300/300",
          imageAlt: "Portrait of Chinedu, a Nigerian engineer in Lagos",
          oneLineMoment:
            "He booked CELPIP on a Tuesday and uploaded his CLB scores to Express Entry the same week.",
          paragraphQuote:
            "Chinedu is a structural engineer in Lagos. He had been preparing on his own for six months. CELPIP fit his life — register online in minutes, test in less than 3 hours, results in 2 to 4 days. The questions felt like easy-to-understand English from everyday situations, not academic essays.",
          attribution: {
            name: "Chinedu Okeke",
            location: "Lagos → Calgary",
            score: "CLB 10",
            date: "April 2026",
          },
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Express Entry · PR" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "CLB", subLabel: "Aligned scoring" },
            { label: "200+", subLabel: "Centres in 40+ countries" },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading: "The real questions engineers ask before booking.",
          objections: [
            {
              worry: "How long does the whole test take?",
              reassurance:
                "Self-paced test is completed during one sitting in 3 hours or less, with no separate speaking session. All four components — listening, reading, writing, speaking — on the same computer.",
            },
            {
              worry: "What CELPIP score do most Express Entry candidates target?",
              reassurance:
                "Higher CELPIP scores translate to higher CLB levels and more Express Entry points. CLB 9 across all four components is a common target. We are not licensed to give immigration advice — please check the IRCC website for current program requirements.",
              softCta: { label: "View score concordance" },
            },
            {
              worry: "Are my scores accepted internationally?",
              reassurance:
                "The CELPIP Tests are officially accepted by several governments, professional organizations, colleges, universities, and employers. CELPIP scores are aligned to CLB and CEFR standards.",
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Ready when you are.",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 19. Nigeria · Finance → Canada ─────────────────────
  {
    id: 19,
    title: "Nigeria · Finance → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Nigerian finance professionals targeting Canadian PR.",
    heroImageSrc: "/heroes/19.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP · FOR FINANCE PROFESSIONALS",
          headline: "Take the leading English test for Canadian PR.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered tests done in one sitting with quick online results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Nigerian finance professional in a Lagos office tower",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "IRCC", subLabel: "Citizenship" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in Nigeria",
          subheading:
            "Open sittings across Lagos and Abuja — find an available exam to schedule within 2 weeks.",
          sittings: [
            {
              city: "Lagos",
              centreName: "Lagos — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Abuja",
              centreName: "Abuja — Prometric Testing",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Lagos",
              centreName: "Lagos — Victoria Island",
              date: "Sat, May 23",
              time: "1:00 PM",
              seatsLeft: 2,
            },
            {
              city: "Abuja",
              centreName: "Abuja — Wuse 2",
              date: "Sun, May 24",
              time: "9:30 AM",
              seatsLeft: 5,
            },
          ],
        },
      },
      {
        kind: "ReadinessQuiz",
        props: {
          heading: "Are you ready to book?",
          subheading:
            "A 30-second check. We will tell you what to do next based on your answers.",
          questions: [
            {
              id: "computer",
              question: "How comfortable are you with computer-based tests?",
              options: [
                { label: "Very comfortable — I work on a computer daily.", score: 3 },
                { label: "Mostly fine — I would want a quick walkthrough.", score: 2 },
                { label: "A bit nervous — I want to try the interface first.", score: 1 },
              ],
            },
            {
              id: "since-exam",
              question: "How long since your last formal English exam?",
              options: [
                { label: "Within the last 12 months.", score: 3 },
                { label: "1–3 years ago.", score: 2 },
                { label: "More than 3 years — or never.", score: 1 },
              ],
            },
            {
              id: "english-use",
              question: "How much daily English do you use at work?",
              options: [
                { label: "All day — meetings, audits, emails.", score: 3 },
                { label: "Most of the day, mostly written.", score: 2 },
                { label: "Some — mostly written reports.", score: 1 },
              ],
            },
          ],
          results: [
            {
              thresholdMin: 7,
              title: "You are ready. Find a test date.",
              body:
                "Based on your answers, you are well-positioned to book now. Take a free official practice test to confirm your range, then register.",
              ctaLabel: "Find a Test Date",
            },
            {
              thresholdMin: 4,
              title: "Almost there. Try a free practice test first.",
              body:
                "You are close. Two free practice tests come with your CELPIP Account.",
              ctaLabel: "Try a free practice test",
            },
            {
              thresholdMin: 0,
              title: "Start with the prep pack.",
              body:
                "Most people start here. CELPIP offers 100+ hours of free prep. Two to three weeks of focused study and you will be ready for the practice test.",
              ctaLabel: "Send me the prep pack",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-19-moment/300/300",
          imageAlt: "Portrait of Aisha, a Nigerian finance professional",
          oneLineMoment:
            "She booked CELPIP on a Wednesday, tested Saturday, and uploaded her CLB scores to Express Entry the next Friday.",
          paragraphQuote:
            "Aisha is a senior auditor at a Lagos bank. She had been planning her PR application for two years. CELPIP fit because the self-paced test is completed during one sitting in 3 hours or less with results in 2 to 4 days. The questions used easy-to-understand English from everyday situations.",
          attribution: {
            name: "Aisha Bello",
            location: "Lagos → Toronto",
            score: "CLB 9",
            date: "March 2026",
          },
        },
      },
      {
        kind: "PrepStarterPackInline",
        props: {
          eyebrow: "FREE",
          headline: "Get the official CELPIP practice test, free.",
          benefits: [
            "Two free practice tests with your CELPIP Account",
            "100+ hours of prep videos and webinars",
            "Self-scoring rubrics for writing and speaking",
            "Audio for the listening section",
          ],
          ctaLabel: "Send me the prep pack",
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 20. India · Nurses → Australia (DHA path) ─────────────────────
  {
    id: 20,
    title: "India · Nurses → Australia",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian nurses pursuing an Australian visa via the DHA path.",
    heroImageSrc: "/heroes/20.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR AUSTRALIAN VISA APPLICANTS",
          headline: "Apply for an Australian Visa with confidence.",
          subhead:
            "Immigrate to Australia with the CELPIP English proficiency test, officially recognized by the Department of Home Affairs (DHA) to meet several program requirements. Test in India — your scores travel with you.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "DHA Score Levels" },
          imageAlt: "Indian nurse with a suitcase outside Sydney Opera House",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "DHA Australia", subLabel: "Department of Home Affairs" },
            { label: "Engineers Australia", subLabel: "National engineering body" },
            { label: "TAFE", subLabel: "Vocational education Australia" },
            { label: "Visa 482 / 485 / PR", subLabel: "Skilled migration pathways" },
            { label: "200+", subLabel: "Centres in 40+ countries" },
          ],
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Test in India — scores recognized in Australia",
          subheading:
            "Take CELPIP at a centre near you in India. Your DHA-recognized PDF score report is delivered online in 2 to 4 days, ready to submit with your visa application.",
          sittings: [
            {
              city: "Mumbai",
              centreName: "Mumbai — Prometric Testing",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 5,
              address: "Andheri East, Mumbai",
            },
            {
              city: "Bengaluru",
              centreName: "Bengaluru — Prometric Testing",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 3,
              address: "Whitefield, Bengaluru",
            },
            {
              city: "Hyderabad",
              centreName: "Hyderabad — Prometric Testing",
              date: "Sat, May 23",
              time: "1:00 PM",
              seatsLeft: 7,
              address: "HITEC City, Hyderabad",
            },
            {
              city: "New Delhi",
              centreName: "New Delhi — CPS Global",
              date: "Sun, May 24",
              time: "9:30 AM",
              seatsLeft: 2,
              address: "Connaught Place, New Delhi",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-20-moment/1200/1400",
          imageAlt:
            "Indian nurse with her CELPIP score report and an Australian Visa 482 application",
          oneLineMoment:
            "From a Mumbai ward to a Sydney hospital — recognized by the DHA on the first attempt.",
          paragraphQuote:
            "I am a registered nurse in Mumbai with five years of experience. I needed Proficient English for my Visa 482 application. CELPIP fit: register online in minutes, test in less than 3 hours, results in 2 to 4 days. The questions were easy-to-understand English and vocabulary taken from everyday situations — the same conversations I have on the ward. My visa was lodged within a fortnight of my test.",
          attribution: {
            name: "Priya Nair",
            location: "Mumbai → Sydney",
            score: "DHA Proficient",
            date: "March 2026",
          },
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "DHA-specific questions for nurses applying for an Australian visa.",
          objections: [
            {
              worry: "Which DHA level do I need for my visa?",
              reassurance:
                "DHA recognises four English proficiency levels: Vocational (CELPIP 5 in each component), Competent (CELPIP 7 in each component), Proficient (typically CELPIP 8–9), and Superior (CELPIP 10+). Specific level requirements vary by visa subclass — please check with a registered MARA agent or the Department of Home Affairs for your stream.",
              softCta: { label: "View DHA score levels" },
            },
            {
              worry: "Will my CELPIP score be accepted by the DHA?",
              reassurance:
                "Yes. CELPIP is officially recognized by the Department of Home Affairs (DHA) to meet several program requirements, including Visa 482 (Temporary Skills Shortage), Visa 485 (Temporary Graduate), and Permanent Residency.",
            },
            {
              worry: "Can I take the test in India even though I am applying to Australia?",
              reassurance:
                "Yes. CELPIP has 9 test centres in India and 200+ test centres in 40+ countries worldwide. Your DHA-recognized PDF score report is delivered online in 2 to 4 days and travels with you.",
            },
            {
              worry: "How long are CELPIP scores valid for DHA purposes?",
              reassurance:
                "CELPIP scores are valid for 2 years from the test date. We are not migration agents — for visa-specific score and validity requirements please consult a registered MARA agent.",
            },
          ],
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from here to your Australian visa",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test in India",
              desc: "Pick a date and centre — Mumbai, Bengaluru, Hyderabad, or New Delhi.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Prepare with free resources",
              desc: "100+ hours of free prep, two free practice tests, weekly webinars.",
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc: "All four components in 3 hours or less, computer-delivered.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Submit to DHA",
              desc:
                "Official PDF score report in 2 to 4 days — submit with your visa application.",
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "Ready when you are.",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // WAVE 3 — Conversion-stage microsites #21–30
  // ═════════════════════════════════════════════════════════════════════════

  // ───────────────────── 21. India · Teachers → Canada ─────────────────────
  {
    id: 21,
    title: "India · Teachers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian teachers pursuing Express Entry or provincial nomination to teach in Canada.",
    heroImageSrc: "/heroes/21.png",
    blocks: [
      {
        kind: "HeroGradient",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR TEACHERS",
          headline: "Your classroom in Canada",
          headlineAccent: "starts with one test.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered in one sitting, results in 3 to 4 business days. Nine test centres across India.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
        },
      },
      {
        kind: "UrgencyBar",
        props: {
          city: "New Delhi",
          date: "Sat May 23",
          seatsLeft: 4,
          ctaLabel: "Reserve your seat",
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "9", label: "Test Centres in India" },
            { value: "3–4 days", label: "Results Online" },
            { value: "3 hrs", label: "One Sitting" },
            { value: "CLB 7+", label: "Common Teaching Target" },
            { value: "100%", label: "Computer-Delivered" },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-21-moment/1200/1400",
          imageAlt:
            "Deepa reviewing her CELPIP score report at her desk at home in Pune",
          oneLineMoment:
            "From a Pune classroom to a teaching position in Alberta — tested on a Saturday.",
          paragraphQuote:
            "I have been teaching secondary maths for eight years. Preparing for an academic-style English test felt daunting alongside my marking schedule. CELPIP was different — the questions felt like everyday conversations, the kind of English I already use with colleagues. I booked a Saturday sitting in Pune, finished before lunch, and had my CLB scores by Wednesday.",
          attribution: {
            name: "Deepa Krishnan",
            location: "Pune → Edmonton",
            score: "CLB 9",
            date: "March 2026",
          },
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in India",
          subheading:
            "Open sittings across 9 centres — pick the date that fits your teaching schedule.",
          sittings: [
            {
              city: "New Delhi",
              centreName: "New Delhi — Prometric Testing",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Pune",
              centreName: "Pune — Prometric Testing",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 7,
            },
            {
              city: "Hyderabad",
              centreName: "Hyderabad — Prometric Testing",
              date: "Sat, Jun 6",
              time: "9:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Bengaluru",
              centreName: "Bengaluru — Prometric Testing",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 3,
            },
          ],
        },
      },
      {
        kind: "FAQAccordion",
        props: {
          heading: "Common questions from Indian teachers",
          faqs: [
            {
              q: "Which CLB score do I need to teach in Canada?",
              a: "CLB requirements vary by province and territory. Most provincial teacher certification bodies require CLB 7 or higher. Please check with your target province's certification authority for specific requirements — we are not licensed to give immigration advice.",
            },
            {
              q: "Is CELPIP accepted for provincial teacher certification?",
              a: "CELPIP-General is designated by IRCC for permanent residency and citizenship. For teacher certification specifically, acceptance varies by province. Check with the relevant provincial body.",
            },
            {
              q: "How long are CELPIP scores valid?",
              a: "CELPIP scores are valid for 2 years from the test date. Your official PDF score report is available online in 3 to 4 business days.",
            },
            {
              q: "Can I prepare around my teaching schedule?",
              a: "Yes. Two free practice tests come with your CELPIP Account, plus 100+ hours of free prep videos and weekly webinars. All self-paced — study evenings and weekends.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "You have already decided. Now book.",
          subheading:
            "Finish your registration online in minutes. Saturday and Sunday sittings available across India.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 22. India · Pharmacists → Canada ─────────────────────
  {
    id: 22,
    title: "India · Pharmacists → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian pharmacists pursuing licensure and PR in Canada.",
    heroImageSrc: "/heroes/22.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR PHARMACISTS",
          headline: "Your pharmacy licence in Canada starts with one English test.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. The Pharmacy Examining Board of Canada (PEBC) sets language requirements for licensure — CELPIP delivers CLB scores accepted for Express Entry. Test in 9 centres across India.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "View Score Equivalency" },
          imageAlt: "Indian pharmacist reviewing CELPIP preparation materials on a tablet",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "Express Entry", subLabel: "CLB scores" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "WhyCelpipTestCards",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Built for healthcare professionals with demanding schedules",
          pillars: [
            {
              icon: "&#9201;",
              title: "Done in one sitting",
              desc: "All four components in 3 hours or less — no coming back for a second day.",
            },
            {
              icon: "&#128187;",
              title: "Computer-delivered",
              desc: "No live examiner for speaking. You speak into a headset at your own pace.",
            },
            {
              icon: "&#128200;",
              title: "Results in 3–4 days",
              desc: "Official PDF score report online — upload to your Express Entry profile immediately.",
            },
            {
              icon: "&#127973;",
              title: "Real-world English",
              desc: "Questions use everyday vocabulary — the kind of English you already use with patients and colleagues.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-22-moment/300/300",
          imageAlt: "Portrait of Arjun, an Indian pharmacist from Chennai",
          oneLineMoment:
            "He tested in Chennai on Saturday and uploaded his CLB scores by Thursday.",
          paragraphQuote:
            "Arjun is a hospital pharmacist in Chennai with six years of experience. He needed CLB 7 for Express Entry. CELPIP felt natural — the listening tasks sounded like the conversations he has at work every day. He registered online, tested one Saturday morning, and had his scores four days later.",
          attribution: {
            name: "Arjun Venkatesh",
            location: "Chennai → Toronto",
            score: "CLB 9",
            date: "April 2026",
          },
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Available CELPIP sittings in India",
          subheading:
            "Pick the date and centre that works for you — weekend and weekday options available.",
          sittings: [
            {
              city: "Chennai",
              centreName: "Chennai — Prometric Testing",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 6,
              address: "T. Nagar, Chennai",
            },
            {
              city: "Mumbai",
              centreName: "Mumbai — Prometric Testing",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
              address: "Andheri East, Mumbai",
            },
            {
              city: "New Delhi",
              centreName: "New Delhi — Prometric Testing",
              date: "Sat, Jun 6",
              time: "9:30 AM",
              seatsLeft: 5,
              address: "Connaught Place, New Delhi",
            },
            {
              city: "Chandigarh",
              centreName: "Chandigarh — Prometric Testing",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 3,
              address: "Sector 17, Chandigarh",
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Indian pharmacists ask before booking.",
          objections: [
            {
              worry: "Does PEBC accept CELPIP scores directly?",
              reassurance:
                "PEBC sets its own language requirements for pharmacy licensure. CELPIP-General is designated by IRCC for permanent residency and delivers CLB scores used in Express Entry. For PEBC-specific language requirements, please check directly with the Pharmacy Examining Board of Canada.",
              softCta: { label: "View CLB score chart" },
            },
            {
              worry: "What CLB score do I need for Express Entry?",
              reassurance:
                "Express Entry minimum is CLB 7 in each component for the Federal Skilled Worker programme. Higher scores earn more Comprehensive Ranking System points. We are not licensed to give immigration advice — please visit IRCC for current requirements.",
            },
            {
              worry: "I have not taken a standardised test in years.",
              reassurance:
                "CELPIP uses easy-to-understand English and vocabulary taken from everyday situations — the kind of English you already use at work. Two free practice tests come with your CELPIP Account so you know exactly what to expect.",
              softCta: { label: "Try a free practice test" },
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You have already decided. Now book.",
          subheading:
            "Finish your registration online in minutes. Results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 23. Philippines · Hospitality Workers → Canada ─────────────────────
  {
    id: 23,
    title: "Philippines · Hospitality Workers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Filipino hospitality professionals pursuing work permits and PR in Canada.",
    heroImageSrc: "/heroes/23.png",
    blocks: [
      {
        kind: "HeroFormInHeader",
        props: {
          badge: "MANILA · CEBU · DAVAO",
          headline: "CELPIP for Hospitality Professionals — Book Your Test in the Philippines",
          subhead:
            "Hotels, restaurants, resorts — your English skills are already strong. CELPIP tests the everyday communication you use on the job. Computer-delivered in one sitting, results in 2 to 4 days.",
          bullets: [
            "Test centres in Manila, Cebu, and Davao",
            "Saturday and weekday sittings available",
            "Results online in 2–4 business days",
          ],
          formHeading: "Get test dates near you",
          formCtaLabel: "Send Me Dates",
          formDisclaimer: "No spam — ever. We respect your privacy.",
          fields: [
            { type: "text", placeholder: "Full Name" },
            { type: "email", placeholder: "Email Address" },
            {
              type: "select",
              placeholder: "Nearest city",
              options: ["Manila", "Cebu", "Davao"],
            },
          ],
        },
      },
      {
        kind: "MetricsCards",
        props: {
          metrics: [
            { value: "3", label: "Cities in the Philippines" },
            { value: "2–4 days", label: "Results Online" },
            { value: "3 hrs", label: "One Sitting" },
            { value: "CLB 5+", label: "Common Hospitality Target" },
          ],
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Maria Santos",
              location: "Manila, Philippines",
              quote:
                "I worked front desk at a resort in Boracay for five years. The CELPIP speaking section felt like talking to a guest — no pressure from a live examiner. Booked on Monday, tested Saturday, scores by Wednesday.",
              score: "CLB 8",
            },
            {
              name: "Carlo Reyes",
              location: "Cebu, Philippines",
              quote:
                "I managed a restaurant kitchen and needed CLB 5 for my work permit. CELPIP was straightforward — everyday English, not textbook language. I finished the whole test before lunch.",
              score: "CLB 7",
            },
            {
              name: "Jasmine Dela Cruz",
              location: "Davao, Philippines",
              quote:
                "My hotel manager role meant I spoke English all day. CELPIP tested exactly the kind of conversations I already have. Registered online, tested in Davao, uploaded my score to Express Entry the same week.",
              score: "CLB 9",
            },
          ],
        },
      },
      {
        kind: "PrepStarterPackInline",
        props: {
          eyebrow: "FREE",
          headline: "Get the official CELPIP practice test, free.",
          benefits: [
            "Two free practice tests with your CELPIP Account",
            "100+ hours of prep videos and webinars",
            "Self-scoring rubrics for writing and speaking",
            "Audio samples for the listening section",
          ],
          ctaLabel: "Send me the prep pack",
        },
      },
      {
        kind: "CTACardWithIcon",
        props: {
          heading: "Ready to book your CELPIP test?",
          subheading: "Manila, Cebu, and Davao — Saturday and weekday sittings available.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 24. Philippines · Teachers → Canada ─────────────────────
  {
    id: 24,
    title: "Philippines · Teachers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Filipino teachers pursuing teaching positions and PR in Canada.",
    heroImageSrc: "/heroes/24.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN PHILIPPINES · FOR TEACHERS",
          headline: "Teach in Canada — one test, one sitting, done.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Filipino teachers already communicate in English every day — CELPIP tests exactly that. Computer-delivered, results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Filipino teacher preparing for CELPIP at home with study materials",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "Express Entry", subLabel: "CLB scores" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "NextStepsVertical",
        props: {
          heading: "Your path from here to a Canadian classroom",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc: "Pick a date — Manila, Cebu, or Davao. Register online in minutes.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Prepare with free materials",
              desc: "Two free practice tests, 100+ hours of free videos, weekly webinars — all self-paced.",
              cta: { label: "Get prep pack" },
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc: "All four components in under 3 hours. No live examiner — speak into a headset.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Results in 2–4 days",
              desc: "Official PDF score report online. Upload to Express Entry or send to your provincial teacher certification body.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-24-moment/1200/1400",
          imageAlt:
            "Grace at a coffee shop reviewing her CELPIP score report on her phone",
          oneLineMoment:
            "From a Manila classroom to a teaching contract in Manitoba — scored on the first attempt.",
          paragraphQuote:
            "I have been teaching primary school in Manila for twelve years. English is my language of instruction, but I was nervous about a formal test. CELPIP felt different — the listening tasks were conversations, not lectures. The writing prompts were practical situations. I tested on a Saturday and had my CLB 9 by Tuesday. My Express Entry profile was updated that same week.",
          attribution: {
            name: "Grace Villanueva",
            location: "Manila → Winnipeg",
            score: "CLB 9",
            date: "April 2026",
          },
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in the Philippines",
          subheading:
            "Open sittings in Manila, Cebu, and Davao — weekend and weekday options.",
          sittings: [
            {
              city: "Manila",
              centreName: "Manila — Makati Test Centre",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Cebu",
              centreName: "Cebu City Test Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 7,
            },
            {
              city: "Davao",
              centreName: "Davao City Test Centre",
              date: "Sat, Jun 6",
              time: "9:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Manila",
              centreName: "Manila — Quezon City Centre",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 6,
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Filipino teachers ask before booking.",
          objections: [
            {
              worry: "Will my Filipino English accent affect my score?",
              reassurance:
                "CELPIP accepts all accents, including Filipino English. The test measures communication ability, not accent. Your years of teaching in English are an advantage.",
            },
            {
              worry: "What CLB score do Canadian schools require?",
              reassurance:
                "Requirements vary by province and school board. Most provincial teacher certification bodies require CLB 7 or higher. Please check with your target province for specific requirements — we are not licensed to give immigration advice.",
              softCta: { label: "View CLB score chart" },
            },
            {
              worry: "Can I prepare around my teaching workload?",
              reassurance:
                "Yes. All CELPIP prep is free and self-paced — two practice tests, 100+ hours of videos, and weekly webinars you can watch on replay. Many teachers prepare in the evenings over two to three weeks.",
              softCta: { label: "See free prep resources" },
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Your English is already strong. Prove it.",
          subheading:
            "Finish your registration online in minutes. Join thousands of Filipino professionals who test with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 25. Nigeria · Teachers → Canada ─────────────────────
  {
    id: 25,
    title: "Nigeria · Teachers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Nigerian teachers pursuing Express Entry and teaching positions in Canada.",
    heroImageSrc: "/heroes/25.png",
    blocks: [
      {
        kind: "HeroGradient",
        props: {
          eyebrow: "CELPIP IN NIGERIA · FOR TEACHERS",
          headline: "From Nigerian classrooms",
          headlineAccent: "to Canadian schools.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered in one sitting with results in 2 to 4 business days. Test centres in Lagos and Abuja.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "Express Entry", subLabel: "CLB scores" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-25-moment/300/300",
          imageAlt: "Portrait of Adaeze, a Nigerian teacher from Lagos",
          oneLineMoment:
            "She registered online in minutes and tested in Lagos on a Saturday morning.",
          paragraphQuote:
            "Adaeze has taught secondary English literature in Lagos for nine years. She needed CLB 7 for Express Entry. CELPIP felt like a natural extension of the English she uses every day in her classroom — no obscure vocabulary, no trick questions. She tested at the Lekki centre on a Saturday and had her scores by the following Wednesday.",
          attribution: {
            name: "Adaeze Okafor",
            location: "Lagos → Calgary",
            score: "CLB 9",
            date: "March 2026",
          },
        },
      },
      {
        kind: "WhyCelpipPillars",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Why Nigerian teachers choose CELPIP",
          pillars: [
            {
              icon: "&#9201;",
              title: "Fast and accessible",
              desc: "Self-paced test completed in one sitting in 3 hours or less with results in 2 to 4 days.",
            },
            {
              icon: "&#128218;",
              title: "Guided test prep",
              desc: "Free practice tests, webinars, study guides, and self-paced courses — all included.",
            },
            {
              icon: "&#127758;",
              title: "Real-world English",
              desc: "Focused on practical communication for school, career, and life — not academic essays.",
            },
            {
              icon: "&#9989;",
              title: "Officially recognized",
              desc: "Designated by IRCC for Express Entry, PR, and citizenship applications.",
            },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in Nigeria",
          subheading:
            "Open sittings in Lagos and Abuja — register online in minutes.",
          sittings: [
            {
              city: "Lagos",
              centreName: "Lagos — Lekki Test Centre",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Abuja",
              centreName: "Abuja — Wuse Test Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 8,
            },
            {
              city: "Lagos",
              centreName: "Lagos — Victoria Island Centre",
              date: "Sat, Jun 6",
              time: "9:00 AM",
              seatsLeft: 3,
            },
            {
              city: "Abuja",
              centreName: "Abuja — Central Business Centre",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 6,
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You teach in English every day. Prove it officially.",
          subheading:
            "Finish your registration online in minutes. Results in 2 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 26. Nigeria · Trades (Electricians/Plumbers) → Canada ─────────────────────
  {
    id: 26,
    title: "Nigeria · Trades → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Nigerian tradespeople (electricians, plumbers) pursuing skilled worker PR in Canada.",
    heroImageSrc: "/heroes/26.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN NIGERIA · FOR SKILLED TRADES",
          headline: "Your trade skills are in demand in Canada. Get your CLB scores.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency, including the Federal Skilled Trades programme. Computer-delivered in one sitting, results in 2 to 4 days. Test centres in Lagos and Abuja.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "See CLB Requirements" },
          imageAlt: "Nigerian electrician reviewing CELPIP study materials on a tablet",
        },
      },
      {
        kind: "MetricsNavyDividers",
        props: {
          metrics: [
            { value: "2", label: "Cities in Nigeria" },
            { value: "2–4 days", label: "Results Online" },
            { value: "3 hrs", label: "One Sitting" },
            { value: "CLB 5+", label: "Skilled Trades Target" },
          ],
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from Lagos or Abuja to a Canadian trade licence",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc: "Pick a date — Lagos or Abuja. Register online in minutes.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Practice with free materials",
              desc: "Two free practice tests, 100+ hours of prep videos — all free and self-paced.",
              cta: { label: "Get prep pack" },
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc: "All four components in 3 hours or less. No live examiner — speak into a headset.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Submit to Express Entry",
              desc: "Official PDF score report in 2 to 4 days — upload to your profile.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-26-moment/1200/1400",
          imageAlt:
            "Chukwuemeka checking his CELPIP score on a phone at a job site in Lagos",
          oneLineMoment:
            "From wiring buildings in Lagos to a Red Seal apprenticeship in Ontario.",
          paragraphQuote:
            "I have been an electrician in Lagos for eleven years. I was worried about taking a formal English test — my English is practical, not academic. CELPIP tested exactly the kind of communication I use on site every day: instructions, safety procedures, workplace conversations. I booked an early Saturday sitting at the Lekki centre, finished before noon, and had my CLB 7 by midweek.",
          attribution: {
            name: "Chukwuemeka Obi",
            location: "Lagos → Hamilton",
            score: "CLB 7",
            date: "April 2026",
          },
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Nigerian tradespeople ask before booking.",
          objections: [
            {
              worry: "I did not go to university — will the test be too academic?",
              reassurance:
                "Not at all. CELPIP uses easy-to-understand English and vocabulary taken from everyday situations — workplace conversations, notices, voicemails. It is designed for real-world communication, not academic writing.",
              softCta: { label: "Try a free practice test" },
            },
            {
              worry: "What CLB score do I need for the Federal Skilled Trades programme?",
              reassurance:
                "The Federal Skilled Trades programme requires CLB 5 for speaking and listening, and CLB 4 for reading and writing. Higher scores earn more CRS points. We are not licensed to give immigration advice — please visit IRCC for current requirements.",
            },
            {
              worry: "Can I take the test on a weekend?",
              reassurance:
                "Yes. Saturday sittings are available in both Lagos and Abuja. Register online and pick the date that works around your schedule.",
            },
          ],
        },
      },
      {
        kind: "PrepStarterPackHero",
        props: {
          eyebrow: "FREE",
          headline: "Get the official CELPIP practice test, free.",
          benefits: [
            "Two free practice tests with your CELPIP Account",
            "100+ hours of prep videos and webinars",
            "Self-scoring rubrics for writing and speaking",
            "Audio samples for the listening section",
          ],
          ctaLabel: "Send me the prep pack",
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Canada needs your skills. Book your test.",
          subheading:
            "Finish your registration online in minutes. Saturday sittings in Lagos and Abuja.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 27. Australia · IT Project Managers → Canada ─────────────────────
  {
    id: 27,
    title: "Australia · IT Project Managers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Australian IT project managers pursuing Express Entry PR in Canada.",
    heroImageSrc: "/heroes/27.png",
    blocks: [
      {
        kind: "HeroGradient",
        props: {
          eyebrow: "CELPIP IN AUSTRALIA · FOR IT PROJECT MANAGERS",
          headline: "Your PM career in Canada",
          headlineAccent: "starts with one sitting.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Computer-delivered in one sitting, results in 2 to 4 business days. Test centres in Sydney, Melbourne, Brisbane, and Perth.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "View Test Centres" },
        },
      },
      {
        kind: "UrgencyBar",
        props: {
          city: "Sydney",
          date: "Sat May 23",
          seatsLeft: 3,
          ctaLabel: "Reserve your seat",
        },
      },
      {
        kind: "TestimonialSpotlight",
        props: {
          testimonial: {
            name: "James Thornton",
            location: "Melbourne, Australia",
            quote:
              "I manage a team of fifteen developers in Melbourne. When I decided to move to Toronto for a PM role, I needed CLB scores fast. CELPIP was perfect — the test felt like a normal work day. Reading technical correspondence, listening to a meeting scenario, writing a professional email. I tested in Melbourne on Saturday and had my scores by Wednesday. My Express Entry profile was live the same week.",
            score: "CLB 10",
          },
        },
      },
      {
        kind: "FeatureNavyCards",
        props: {
          heading: "Why Australian IT professionals choose CELPIP",
          features: [
            {
              icon: "&#128187;",
              title: "Computer-delivered, end-to-end",
              desc: "All four components on the same workstation. No live speaking examiner — you speak into a headset.",
            },
            {
              icon: "&#9201;",
              title: "Three hours or less",
              desc: "Done in one sitting. No coming back for a second appointment.",
            },
            {
              icon: "&#128200;",
              title: "Results in 2–4 days",
              desc: "Official PDF score report online — upload to Express Entry immediately.",
            },
            {
              icon: "&#127758;",
              title: "Real-world English",
              desc: "Workplace scenarios, professional emails, everyday conversations — not academic essays.",
            },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in Australia",
          subheading:
            "Open sittings in Sydney, Melbourne, Brisbane, and Perth.",
          sittings: [
            {
              city: "Sydney",
              centreName: "Sydney — CBD Test Centre",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 3,
            },
            {
              city: "Melbourne",
              centreName: "Melbourne — Southbank Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Brisbane",
              centreName: "Brisbane — Fortitude Valley Centre",
              date: "Sat, Jun 6",
              time: "9:30 AM",
              seatsLeft: 5,
            },
            {
              city: "Perth",
              centreName: "Perth — Northbridge Centre",
              date: "Sun, Jun 7",
              time: "10:00 AM",
              seatsLeft: 4,
            },
          ],
        },
      },
      {
        kind: "CTACardWithIcon",
        props: {
          heading: "You manage projects for a living. Manage this one.",
          subheading: "Register online in minutes. Results in 2 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 28. India · Social Workers → Canada ─────────────────────
  {
    id: 28,
    title: "India · Social Workers → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Indian social workers pursuing licensure and PR in Canada.",
    heroImageSrc: "/heroes/28.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN INDIA · FOR SOCIAL WORKERS",
          headline: "Your social work career in Canada starts here.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Social work regulatory bodies across Canada set their own language requirements — CELPIP delivers the CLB scores you need for Express Entry. Nine test centres across India.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Indian social worker reviewing CELPIP materials at a community centre",
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "9", label: "Test Centres in India" },
            { value: "3–4 days", label: "Results Online" },
            { value: "3 hrs", label: "One Sitting" },
            { value: "CLB 7+", label: "Common Social Work Target" },
            { value: "100%", label: "Computer-Delivered" },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-28-moment/300/300",
          imageAlt: "Portrait of Kavitha, a social worker from Bengaluru",
          oneLineMoment:
            "She tested in Bengaluru on Saturday and was invited to apply within three weeks.",
          paragraphQuote:
            "Kavitha has worked with vulnerable communities in Bengaluru for seven years. She needed CLB 7 for Express Entry. CELPIP tested the kind of English she uses every day — empathetic conversations, clear professional writing, active listening. She tested on a Saturday, had her scores by Wednesday, and submitted her Express Entry profile that evening.",
          attribution: {
            name: "Kavitha Ramesh",
            location: "Bengaluru → Ottawa",
            score: "CLB 8",
            date: "March 2026",
          },
        },
      },
      {
        kind: "ReadinessQuiz",
        props: {
          heading: "Are you ready to book?",
          subheading:
            "A 30-second check. We will tell you what to do next based on your answers.",
          questions: [
            {
              id: "english-comfort",
              question: "How comfortable are you communicating in English at work?",
              options: [
                { label: "Very comfortable — I counsel clients in English daily.", score: 3 },
                { label: "Mostly comfortable — written reports are fine, speaking takes focus.", score: 2 },
                { label: "Getting there — I switch between languages.", score: 1 },
              ],
            },
            {
              id: "computer-test",
              question: "How do you feel about a 3-hour computer-based test?",
              options: [
                { label: "No problem — I use a computer every day.", score: 3 },
                { label: "Mostly fine — I would like to try the interface first.", score: 2 },
                { label: "A bit nervous — I prefer paper.", score: 1 },
              ],
            },
            {
              id: "timeline",
              question: "How urgent is your timeline?",
              options: [
                { label: "I need scores in the next 4 weeks.", score: 3 },
                { label: "I have 1–3 months.", score: 2 },
                { label: "3+ months — exploring options.", score: 1 },
              ],
            },
          ],
          results: [
            {
              thresholdMin: 7,
              title: "You are ready. Find a test date.",
              body:
                "Based on your answers, you are well-positioned to book now. Social workers who communicate in English daily tend to do very well.",
              ctaLabel: "Find a Test Date",
            },
            {
              thresholdMin: 4,
              title: "Almost there. Try a free practice test first.",
              body:
                "A free official practice test will show you exactly what to expect — no surprises on test day.",
              ctaLabel: "Try a free practice test",
            },
            {
              thresholdMin: 0,
              title: "Start with the prep pack.",
              body:
                "100+ hours of free prep materials. Two to three weeks of focused study and you will be ready.",
              ctaLabel: "Send me the prep pack",
            },
          ],
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Available CELPIP sittings in India",
          subheading:
            "Pick the date and centre that works for you.",
          sittings: [
            {
              city: "Bengaluru",
              centreName: "Bengaluru — Prometric Testing",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 7,
              address: "Koramangala, Bengaluru",
            },
            {
              city: "Mumbai",
              centreName: "Mumbai — Prometric Testing",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
              address: "Andheri East, Mumbai",
            },
            {
              city: "New Delhi",
              centreName: "New Delhi — Prometric Testing",
              date: "Sat, Jun 6",
              time: "9:30 AM",
              seatsLeft: 5,
              address: "Connaught Place, New Delhi",
            },
            {
              city: "Hyderabad",
              centreName: "Hyderabad — Prometric Testing",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 3,
              address: "Gachibowli, Hyderabad",
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You help people every day. Let us help you take the next step.",
          subheading:
            "Finish your registration online in minutes. Results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 29. Philippines · Trades (Welders/Pipefitters) → Canada ─────────────────────
  {
    id: 29,
    title: "Philippines · Trades (Welders/Pipefitters) → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Filipino welders and pipefitters pursuing skilled worker PR in Canada.",
    heroImageSrc: "/heroes/29.png",
    blocks: [
      {
        kind: "HeroFormInHeader",
        props: {
          badge: "MANILA · CEBU · DAVAO",
          headline: "CELPIP for Welders and Pipefitters — Your Skills Are in Demand",
          subhead:
            "Canada's construction sector needs skilled tradespeople. CELPIP-General is designated by IRCC for the Federal Skilled Trades programme. Test the everyday English you already use on site.",
          bullets: [
            "CLB 5 speaking/listening, CLB 4 reading/writing for Skilled Trades",
            "Computer-delivered in one sitting — 3 hours or less",
            "Results in 2 to 4 business days",
          ],
          formHeading: "Get the next available test dates",
          formCtaLabel: "Send Me Dates",
          formDisclaimer: "No spam. We respect your privacy.",
          fields: [
            { type: "text", placeholder: "Full Name" },
            { type: "email", placeholder: "Email Address" },
            {
              type: "select",
              placeholder: "Nearest city",
              options: ["Manila", "Cebu", "Davao"],
            },
          ],
        },
      },
      {
        kind: "WhyCelpipMomentum",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Built for working tradespeople",
          pillars: [
            {
              icon: "&#128295;",
              title: "Practical English, not academic",
              desc: "Questions use everyday workplace vocabulary — safety signs, instructions, conversations with supervisors.",
            },
            {
              icon: "&#9201;",
              title: "Done in one sitting",
              desc: "All four components in 3 hours or less. No coming back for a second day.",
            },
            {
              icon: "&#128187;",
              title: "No live examiner",
              desc: "Speak into a headset at your own pace. No pressure from face-to-face interaction.",
            },
            {
              icon: "&#128200;",
              title: "Fast results",
              desc: "Official PDF score report online in 2 to 4 business days.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-29-moment/1200/1400",
          imageAlt:
            "Renato reviewing his CELPIP score report on his phone after a shift",
          oneLineMoment:
            "From a Cebu shipyard to a pipefitting apprenticeship in Alberta — one test, one sitting.",
          paragraphQuote:
            "I have been welding and pipefitting in the Cebu shipyard for fourteen years. I was nervous about an English test — my English is the English of the job site, not the classroom. CELPIP tested exactly that. The listening section sounded like instructions from a foreman. The reading section had workplace notices and safety memos. I passed with CLB 7 on my first try.",
          attribution: {
            name: "Renato Magpantay",
            location: "Cebu → Fort McMurray",
            score: "CLB 7",
            date: "April 2026",
          },
        },
      },
      {
        kind: "ScoreEquivalencyTable",
        props: {
          heading: "What CLB level do you need?",
          subheading: "How CELPIP scores map to CLB levels and immigration programmes",
          rows: fullScoreRows,
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in the Philippines",
          subheading:
            "Saturday and weekday sittings in Manila, Cebu, and Davao.",
          sittings: [
            {
              city: "Cebu",
              centreName: "Cebu City Test Centre",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Manila",
              centreName: "Manila — Makati Test Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Davao",
              centreName: "Davao City Test Centre",
              date: "Sat, Jun 6",
              time: "9:00 AM",
              seatsLeft: 7,
            },
            {
              city: "Manila",
              centreName: "Manila — Quezon City Centre",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 3,
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Canada needs your skills. Book your test today.",
          subheading:
            "Register online in minutes. Results in 2 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 30. Australia · Hospitality/Tourism → Canada ─────────────────────
  {
    id: 30,
    title: "Australia · Hospitality/Tourism → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Australian hospitality and tourism professionals pursuing PR in Canada.",
    heroImageSrc: "/heroes/30.png",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN AUSTRALIA · FOR HOSPITALITY & TOURISM",
          headline: "From Australian resorts to Canadian hospitality — one test, done.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Your guest-facing English is exactly what CELPIP tests. Computer-delivered in one sitting, results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt: "Australian hospitality professional reviewing CELPIP prep materials",
        },
      },
      {
        kind: "UrgencyBar",
        props: {
          city: "Melbourne",
          date: "Sat Jun 6",
          seatsLeft: 5,
          ctaLabel: "Reserve your seat",
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              name: "Sophie Nguyen",
              location: "Sydney, Australia",
              quote:
                "I managed a boutique hotel in Surry Hills for six years. CELPIP felt like a day at work — reading guest correspondence, listening to a colleague explain a process, writing a professional response. Tested on Saturday, scores by Tuesday.",
              score: "CLB 9",
            },
            {
              name: "Daniel McCarthy",
              location: "Melbourne, Australia",
              quote:
                "Working in tourism means I speak English all day with people from everywhere. CELPIP tested that exact skill — real-world communication. No obscure vocabulary. I hit CLB 10 on my first try.",
              score: "CLB 10",
            },
            {
              name: "Priya Bhandari",
              location: "Brisbane, Australia",
              quote:
                "I was a restaurant manager in Fortitude Valley. Between lunch and dinner services, finding time for an English test seemed impossible. CELPIP is one sitting, three hours, done. My scores were online before my next roster.",
              score: "CLB 8",
            },
          ],
        },
      },
      {
        kind: "FeatureGrid",
        props: {
          heading: "Why hospitality professionals choose CELPIP",
          subheading:
            "Designed for people who communicate in English every day at work.",
          features: [
            {
              icon: "&#127973;",
              title: "Guest-facing English",
              desc: "The test uses everyday scenarios — workplace conversations, professional emails, community notices.",
            },
            {
              icon: "&#9201;",
              title: "One sitting, three hours",
              desc: "All four components done in a single appointment. No second visit.",
            },
            {
              icon: "&#128187;",
              title: "Computer-delivered",
              desc: "No live speaking examiner. Speak into a headset at your own pace.",
            },
            {
              icon: "&#128200;",
              title: "Results in 2–4 days",
              desc: "Official PDF score report available online — upload to Express Entry immediately.",
            },
          ],
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Available CELPIP sittings in Australia",
          subheading:
            "Sydney, Melbourne, Brisbane, and Perth — weekday and Saturday options.",
          sittings: [
            {
              city: "Melbourne",
              centreName: "Melbourne — Southbank Centre",
              date: "Sat, Jun 6",
              time: "9:00 AM",
              seatsLeft: 5,
              address: "Southbank, Melbourne VIC",
            },
            {
              city: "Sydney",
              centreName: "Sydney — CBD Test Centre",
              date: "Sun, Jun 7",
              time: "10:00 AM",
              seatsLeft: 4,
              address: "George Street, Sydney NSW",
            },
            {
              city: "Brisbane",
              centreName: "Brisbane — Fortitude Valley Centre",
              date: "Sat, Jun 13",
              time: "9:30 AM",
              seatsLeft: 7,
              address: "Fortitude Valley, Brisbane QLD",
            },
            {
              city: "Perth",
              centreName: "Perth — Northbridge Centre",
              date: "Sun, Jun 14",
              time: "10:00 AM",
              seatsLeft: 3,
              address: "Northbridge, Perth WA",
            },
          ],
        },
      },
      {
        kind: "FAQAccordion",
        props: {
          heading: "Common questions from Australian hospitality professionals",
          faqs: [
            {
              q: "Is CELPIP accepted by IRCC for Canadian PR?",
              a: "Yes. CELPIP-General is officially designated by Immigration, Refugees and Citizenship Canada for permanent residency, citizenship, and Express Entry applications.",
            },
            {
              q: "What CLB score do I need for Express Entry?",
              a: "The Federal Skilled Worker programme requires CLB 7 in each component. Higher scores earn significantly more CRS points. We are not licensed to give immigration advice — please visit IRCC for current requirements.",
            },
            {
              q: "Can I take the test in Australia even though I am applying to Canada?",
              a: "Yes. CELPIP has test centres in Sydney, Melbourne, Brisbane, and Perth. Your official PDF score report is delivered online and accepted by IRCC regardless of where you test.",
            },
            {
              q: "How long are CELPIP scores valid?",
              a: "CELPIP scores are valid for 2 years from the test date. Your PDF score report is available online in 2 to 4 business days.",
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You already speak the language. Make it official.",
          subheading:
            "Finish your registration online in minutes. Join thousands worldwide who test with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CUSTOM MICROSITES (#31-35) — bespoke JSX pages, no widget blocks
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 31,
    title: "Book This Weekend",
    tag: "Custom" as MicrositeTag,
    description:
      "Urgency-driven booking page with countdown timer and scarcity signals.",
    blocks: [],
    customPage: "BookThisWeekend",
  },
  {
    id: 32,
    title: "3-Minute Decision",
    tag: "Custom" as MicrositeTag,
    description:
      "Ultra-minimal single-scroll page: what you need, what you get, book now.",
    blocks: [],
    customPage: "ThreeMinuteDecision",
  },
  {
    id: 33,
    title: "Am I Ready?",
    tag: "Custom" as MicrositeTag,
    description:
      "Interactive 4-question self-assessment quiz with tiered results and tailored CTAs.",
    blocks: [],
    customPage: "AmIReady",
  },
  {
    id: 34,
    title: "Your Score, Your Future",
    tag: "Custom" as MicrositeTag,
    description:
      "Outcome visualisation showing career paths unlocked at CLB 7, 9, and 10+.",
    blocks: [],
    customPage: "YourScoreYourFuture",
  },
  {
    id: 35,
    title: "Testimonial Wall",
    tag: "Custom" as MicrositeTag,
    description:
      "Social proof grid of 14 candidate testimonials with profession filter pills.",
    blocks: [],
    customPage: "TestimonialWall",
  },

  // ───────────────────── 36. Aspirational · Express Entry (HeroFullBleedImage) ─────────────────────
  {
    id: 36,
    title: "Aspirational · Express Entry",
    tag: "Layout",
    description:
      "Editorial above-the-fold using the new full-bleed hero. Aspirational, image-led, conversion-focused.",
    heroImageSrc: "/heroes/12.png",
    blocks: [
      {
        kind: "HeroFullBleedImage",
        props: {
          eyebrow: "ACCELERATE YOUR FUTURE",
          headline: "Your Canada-bound nursing career, in one English test.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Less than 3 hours, computer-delivered, results in 2 to 4 days — globally accepted in 200+ centres across 40+ countries.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "See Test Centres" },
          imageSrc: "/heroes/12.png",
          imageAlt: "Aspirational candidate portrait — software engineer en route to PR",
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "2–4", label: "days to results" },
            { value: "3hrs", label: "one sitting, all four skills" },
            { value: "200+", label: "test centres worldwide" },
            { value: "40+", label: "countries served" },
          ],
        },
      },
      {
        kind: "WhyCelpipPillars",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Speed, reliability, flexibility, ease, and credibility.",
          pillars: [
            {
              icon: "&#9201;",
              title: "Fast and accessible",
              desc: "Self-paced test is completed during one sitting in 3 hours or less with results in 2 to 4 days.",
            },
            {
              icon: "&#128218;",
              title: "Guided test prep",
              desc: "Free practice tests, webinars, study guides, and courses to help you succeed.",
            },
            {
              icon: "&#127758;",
              title: "Real-world English",
              desc: "Focused on practical, real-world communication for school, career, and life.",
            },
            {
              icon: "&#9989;",
              title: "Trusted credibility",
              desc: "Developed at the University of British Columbia and aligned with CLB and CEFR standards.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightLargePhoto",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-36-moment/1200/1400",
          imageAlt:
            "Candidate at her desk reviewing CELPIP score report on a laptop",
          oneLineMoment:
            "She tested in Bengaluru on a Saturday and uploaded her CLB scores by Wednesday.",
          paragraphQuote:
            "I worked on weekend prep with the free practice tests. The CELPIP listening tasks sounded like the conversations I have at work every day. I tested at the Bengaluru centre on a Saturday morning and had my official PDF score report by the next Wednesday.",
          attribution: {
            name: "Priya Iyer",
            location: "Bengaluru → Toronto",
            score: "CLB 9",
            date: "April 2026",
          },
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Find your CELPIP sitting",
          subheading:
            "Open sittings worldwide — register online in minutes, results in 2 to 4 business days.",
          sittings: [
            {
              city: "Toronto",
              centreName: "Toronto — Yonge & Bloor",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 5,
            },
            {
              city: "Bengaluru",
              centreName: "Bengaluru — Prometric Testing",
              date: "Sat, May 23",
              time: "9:30 AM",
              seatsLeft: 8,
            },
            {
              city: "Manila",
              centreName: "Manila — Makati Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Dubai",
              centreName: "Dubai — DIFC Test Centre",
              date: "Sat, Jun 6",
              time: "1:00 PM",
              seatsLeft: 6,
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Accelerate your future. Book your CELPIP test today.",
          subheading:
            "Finish your registration online in minutes to join thousands worldwide who achieve their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 37. Lead-Magnet Form-First (HeroSplitForm) ─────────────────────
  {
    id: 37,
    title: "Lead-Magnet · Free Prep",
    tag: "Layout",
    description:
      "Form-first above-the-fold using the new split-form hero. Optimized for top-funnel email capture via the official free practice test.",
    heroImageSrc: "/heroes/9.png",
    blocks: [
      {
        kind: "HeroSplitForm",
        props: {
          eyebrow: "CELPIP — APPROVED BY IRCC",
          headline: "Get the official CELPIP practice test, free.",
          subhead:
            "Two free practice tests, weekly webinars, and 100+ hours of guided prep. Tell us where you are testing and we will send everything to your inbox.",
          formHeading: "Get free prep + test dates",
          formCtaLabel: "Send Me the Free Prep",
          formDisclaimer: "We respect your privacy. No spam.",
          fields: [
            { type: "text", placeholder: "Full Name" },
            { type: "email", placeholder: "Email Address" },
            { type: "tel", placeholder: "Phone Number" },
            {
              type: "select",
              placeholder: "Target Test City",
              options: ["Toronto", "Vancouver", "Mumbai", "Manila", "Lagos", "Dubai"],
            },
          ],
          imageSrc: "/heroes/9.png",
          imageAlt: "Candidate at a CELPIP test centre workstation",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "DHA", subLabel: "Australian visas" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "Paragon", subLabel: "Operating subsidiary" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "WhyCelpipTestCards",
        props: {
          eyebrow: "WHAT YOU GET",
          heading: "Everything you need, on the house.",
          pillars: [
            {
              icon: "&#128218;",
              title: "Two free practice tests",
              desc: "Full-length, official, and timed — included with your free CELPIP Account.",
            },
            {
              icon: "&#127909;",
              title: "Weekly live webinars",
              desc: "Walkthroughs of every section, hosted by certified CELPIP coaches. Recordings on YouTube.",
            },
            {
              icon: "&#128214;",
              title: "Study guides + courses",
              desc: "Self-paced courses, downloadable PDFs, and writing-task walkthroughs.",
            },
            {
              icon: "&#9201;",
              title: "Done in one sitting",
              desc: "All four components in 3 hours or less — no second day, no live examiner.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-37-moment/300/300",
          imageAlt: "Portrait of Maria, a Filipina nurse",
          oneLineMoment:
            "She started with the free practice tests. Six weeks later she had her CLB 9 score.",
          paragraphQuote:
            "I downloaded the free practice tests on a Tuesday night after my shift. Four weekends of study, one Saturday at the Manila centre, and four days later I had my official PDF score report in my inbox. The CELPIP English felt like the way I already speak with patients and colleagues.",
          attribution: {
            name: "Maria Santos",
            location: "Manila → Vancouver",
            score: "CLB 9",
            date: "March 2026",
          },
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions candidates ask before booking — answered honestly.",
          objections: [
            {
              worry: "How much does the practice test really cost?",
              reassurance:
                "Two full-length practice tests come free with your CELPIP Account — no credit card required. Additional practice tests are available if you want extra reps.",
              softCta: { label: "Create your free account" },
            },
            {
              worry: "I have not taken a standardised test in years.",
              reassurance:
                "CELPIP uses easy-to-understand English and vocabulary taken from everyday situations — workplace conversations, voicemails, and community signs. The free practice tests show you exactly what to expect, and the weekly webinars walk through every question type.",
              softCta: { label: "Watch a sample webinar" },
            },
            {
              worry: "What CLB score do I actually need?",
              reassurance:
                "It depends on the programme. Express Entry requires CLB 7 in each component for the Federal Skilled Worker programme. Higher scores earn more CRS points. We are not licensed to give immigration advice — please visit IRCC for current requirements.",
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You have already decided. Now book.",
          subheading:
            "Finish your registration online in minutes. Results in 2 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 38. Big-Stat Editorial (HeroBigStat) ─────────────────────
  {
    id: 38,
    title: "Big-Stat Editorial",
    tag: "Layout",
    description:
      "Stat-led above-the-fold using the new big-stat hero. Anchors the page on a single dominant credibility number.",
    heroImageSrc: "/heroes/8.png",
    blocks: [
      {
        kind: "HeroBigStat",
        props: {
          eyebrow: "CELPIP — GLOBALLY ACCEPTED",
          headline: "200+ test centres across 40+ countries — find yours.",
          subhead:
            "CELPIP English exams are globally accepted and approved by IRCC and DHA for immigration to Canada and Australia. Less than 3 hours, computer-delivered, results in 2 to 4 days.",
          primaryCta: { label: "Find a Test Centre" },
          secondaryCta: { label: "See Test Dates" },
          stat: { value: "200+", label: "centres in 40+ countries" },
          imageSrc: "/heroes/8.png",
          imageAlt: "Candidate reviewing CELPIP score report",
        },
      },
      {
        kind: "WhyCelpipMomentum",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Speed, reliability, flexibility, ease, and credibility.",
          pillars: [
            {
              icon: "&#127758;",
              title: "Globally accepted",
              desc: "Approved by IRCC for permanent residency and citizenship, and by DHA for Australian visas.",
            },
            {
              icon: "&#128187;",
              title: "Computer-delivered",
              desc: "Done in just one sitting, with features like a personal timer, word counter, and spell-check.",
            },
            {
              icon: "&#9201;",
              title: "Quick online results",
              desc: "Available online within 3 to 4 business days. The PDF score report is official and accepted by institutions.",
            },
            {
              icon: "&#128218;",
              title: "Free study materials",
              desc: "Free sample tests, videos, online information sessions, preparation courses, and webinars.",
            },
          ],
        },
      },
      {
        kind: "TestimonialQuoteCards",
        props: {
          testimonials: [
            {
              quote:
                "I tested at the Dubai DIFC centre on a Saturday and had my CLB scores by Wednesday. The whole experience felt human — supportive staff, clear instructions, no surprises.",
              name: "Omar Al-Rashid",
              location: "Project Manager · Dubai → Calgary",
              score: "CLB 9",
            },
            {
              quote:
                "CELPIP felt like a natural extension of the English I already use at work — practical, real-world, no obscure vocabulary. I prepped with the free practice tests on weekends.",
              name: "Liya Tesfaye",
              location: "Civil Engineer · Addis Ababa → Toronto",
              score: "CLB 10",
            },
            {
              quote:
                "One sitting, three hours, all four components. I was done by lunch and had my PDF score report on my laptop screen by the next Wednesday morning.",
              name: "Tomas Reyes",
              location: "Registered Nurse · Manila → Edmonton",
              score: "CLB 9",
            },
          ],
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "Open sittings, around the world.",
          subheading:
            "Pick the date and centre that works for you — weekend and weekday options at every region.",
          sittings: [
            {
              city: "Toronto",
              centreName: "Toronto — Yonge & Bloor",
              date: "Sat, May 16",
              time: "9:00 AM",
              seatsLeft: 5,
              address: "Yonge St, Toronto",
            },
            {
              city: "London",
              centreName: "London — King's Cross Centre",
              date: "Sun, May 17",
              time: "10:00 AM",
              seatsLeft: 7,
              address: "King's Cross, London",
            },
            {
              city: "Dubai",
              centreName: "Dubai — DIFC Test Centre",
              date: "Sat, Jun 6",
              time: "1:00 PM",
              seatsLeft: 6,
              address: "DIFC, Dubai",
            },
            {
              city: "Sydney",
              centreName: "Sydney — Circular Quay",
              date: "Sun, Jun 7",
              time: "9:00 AM",
              seatsLeft: 3,
              address: "Circular Quay, Sydney",
            },
          ],
        },
      },
      {
        kind: "NextStepsHorizontal",
        props: {
          heading: "Your path from here to results",
          steps: [
            {
              number: 1,
              icon: "&#128197;",
              title: "Book your CELPIP test",
              desc:
                "Pick a date and centre — confirmed instantly. 200+ centres across 40+ countries.",
              cta: { label: "Find a Test Date" },
            },
            {
              number: 2,
              icon: "&#128218;",
              title: "Practice with free materials",
              desc:
                "Two free practice tests, 100+ hours of prep videos, and weekly webinars — all free.",
              cta: { label: "Get prep pack" },
            },
            {
              number: 3,
              icon: "&#128187;",
              title: "Test in one sitting",
              desc:
                "Self-paced test is completed during one sitting in 3 hours or less, computer-delivered.",
            },
            {
              number: 4,
              icon: "&#9989;",
              title: "Get results in 2–4 days",
              desc:
                "Official PDF score report online — accepted by IRCC, DHA, and professional bodies.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "Find your centre. Book your date. Get on with your life.",
          subheading:
            "200+ test centres across 40+ countries. Results in 2 to 4 business days.",
          primaryCta: { label: "Find a Test Centre" },
        },
      },
    ],
  },

  // ───────────────────── 39. Mexico · Pharmacists → Canada ─────────────────────
  {
    id: 39,
    title: "Mexico · Pharmacists → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Mexican pharmacists pursuing PEBC licensure and Canadian PR.",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN MEXICO · FOR PHARMACISTS",
          headline: "Su carrera de farmacéutico en Canadá empieza con un examen.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Mexican pharmacists pursuing PEBC licensure rely on CLB scores accepted in Express Entry. Test centres in Mexico City, Guadalajara, and Monterrey — done in one sitting, results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "View Score Equivalency" },
          imageAlt:
            "Mexican pharmacist in a Mexico City pharmacy reviewing prescriptions with a colleague",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "Express Entry", subLabel: "CLB scores" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "UBC", subLabel: "Test origin" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "WhyCelpipTestCards",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Designed for healthcare professionals on a tight schedule",
          pillars: [
            {
              icon: "&#9201;",
              title: "Done in one sitting",
              desc: "All four components in 3 hours — no second test day required.",
            },
            {
              icon: "&#128187;",
              title: "Computer-delivered",
              desc: "No live examiner. You speak into a headset at your own pace.",
            },
            {
              icon: "&#128200;",
              title: "Results in 3–4 days",
              desc: "Official PDF score report — upload directly into your Express Entry profile.",
            },
            {
              icon: "&#127973;",
              title: "Plain, real-world English",
              desc: "Vocabulary from everyday clinical and retail pharmacy contexts — the English you already use with patients.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-39-moment/300/300",
          imageAlt: "Portrait of Daniela, a Mexican hospital pharmacist from Monterrey",
          oneLineMoment:
            "She tested in Monterrey on a Saturday and uploaded her CLB scores by Wednesday.",
          paragraphQuote:
            "Daniela is a hospital pharmacist in Monterrey with seven years of inpatient experience. She needed CLB 7 in each component for Express Entry. CELPIP felt familiar — the listening tasks sounded like the same conversations she has at the bedside. She registered online, tested one Saturday morning, and had her score report four days later.",
          attribution: {
            name: "Daniela Rivera",
            location: "Monterrey → Calgary",
            score: "CLB 9",
            date: "April 2026",
          },
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "CELPIP sittings across Mexico",
          subheading:
            "Weekend and weekday options at three centres — pick what fits your shift schedule.",
          sittings: [
            {
              city: "Mexico City",
              centreName: "Mexico City — Polanco Test Centre",
              date: "Sat, May 30",
              time: "9:00 AM",
              seatsLeft: 5,
              address: "Polanco, CDMX",
            },
            {
              city: "Guadalajara",
              centreName: "Guadalajara — Providencia Centre",
              date: "Sun, May 31",
              time: "10:00 AM",
              seatsLeft: 4,
              address: "Providencia, Guadalajara",
            },
            {
              city: "Monterrey",
              centreName: "Monterrey — San Pedro Centre",
              date: "Sat, Jun 13",
              time: "9:30 AM",
              seatsLeft: 6,
              address: "San Pedro Garza García",
            },
            {
              city: "Mexico City",
              centreName: "Mexico City — Santa Fe Centre",
              date: "Sun, Jun 14",
              time: "1:00 PM",
              seatsLeft: 3,
              address: "Santa Fe, CDMX",
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Mexican pharmacists ask before booking.",
          objections: [
            {
              worry: "Does PEBC accept CELPIP scores directly?",
              reassurance:
                "PEBC sets its own language requirements for pharmacy licensure. CELPIP-General is designated by IRCC for permanent residency and delivers CLB scores used in Express Entry. For PEBC-specific language requirements, please confirm directly with the Pharmacy Examining Board of Canada.",
              softCta: { label: "View CLB score chart" },
            },
            {
              worry: "What CLB do I need for Express Entry?",
              reassurance:
                "Federal Skilled Worker requires a minimum of CLB 7 in each of the four components. Higher scores earn more Comprehensive Ranking System points. We are not licensed to give immigration advice — please visit IRCC for current requirements.",
            },
            {
              worry: "My English is mostly conversational. Will that be enough?",
              reassurance:
                "CELPIP uses vocabulary and situations taken from everyday life — the kind of English you already use at work. Two free practice tests come with your CELPIP Account so you can measure where you stand before booking.",
              softCta: { label: "Try a free practice test" },
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You have already decided. Now book.",
          subheading:
            "Finish your registration online in minutes. Results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 40. Brazil · Accountants → Canada ─────────────────────
  {
    id: 40,
    title: "Brazil · Accountants → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for Brazilian accountants and finance professionals targeting Canadian PR.",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP NO BRASIL · PARA CONTADORES",
          headline: "Sua carreira contábil no Canadá começa com um exame de inglês.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Brazilian accountants, auditors, and finance managers use CLB scores accepted in Express Entry and Provincial Nominee Programmes. Computer-delivered, three hours, results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "Free Practice Test" },
          imageAlt:
            "Brazilian accountant working at a São Paulo office overlooking Avenida Paulista",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "IRCC", subLabel: "Citizenship" },
            { label: "PNP", subLabel: "Provincial nominee" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "MetricsRow",
        props: {
          metrics: [
            { value: "3", label: "Cities in Brazil" },
            { value: "3–4 days", label: "Result Turnaround" },
            { value: "3 hrs", label: "One Sitting" },
            { value: "CLB 9", label: "Common PR Target" },
            { value: "100%", label: "Computer-Delivered" },
          ],
        },
      },
      {
        kind: "BookingPanelInline",
        props: {
          heading: "Book your CELPIP test in Brazil",
          subheading:
            "Open sittings in São Paulo, Rio de Janeiro, and Belo Horizonte.",
          sittings: [
            {
              city: "São Paulo",
              centreName: "São Paulo — Itaim Bibi Centre",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 6,
            },
            {
              city: "Rio de Janeiro",
              centreName: "Rio de Janeiro — Botafogo Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
            },
            {
              city: "Belo Horizonte",
              centreName: "Belo Horizonte — Savassi Centre",
              date: "Sat, Jun 6",
              time: "9:30 AM",
              seatsLeft: 3,
            },
            {
              city: "São Paulo",
              centreName: "São Paulo — Pinheiros Centre",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 5,
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-40-moment/300/300",
          imageAlt: "Portrait of Lucas, a CPA-track accountant from São Paulo",
          oneLineMoment:
            "He registered on a Tuesday, tested that Saturday, and uploaded his CLB scores the next week.",
          paragraphQuote:
            "Lucas is a senior auditor at a Big Four firm in São Paulo. He needed CLB 9 to maximise his Express Entry CRS score. CELPIP fit his calendar — register online, test in less than three hours, results in 3 to 4 business days. Two months later his Canadian PR application was complete.",
          attribution: {
            name: "Lucas Almeida",
            location: "São Paulo → Toronto",
            score: "CLB 10",
            date: "March 2026",
          },
        },
      },
      {
        kind: "PrepStarterPackInline",
        props: {
          eyebrow: "FREE",
          headline: "Get the official CELPIP practice test, free.",
          benefits: [
            "Two free practice tests with your CELPIP Account",
            "100+ hours of prep videos and webinars",
            "Self-scoring rubrics for writing and speaking",
            "Audio for the listening section",
          ],
          ctaLabel: "Send me the prep pack",
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions Brazilian accountants ask before booking.",
          objections: [
            {
              worry: "I have not taken a standardised test in years.",
              reassurance:
                "CELPIP is computer-delivered in one sitting and uses vocabulary taken from everyday life — the kind of English you already use at work. Two free practice tests come with your CELPIP Account.",
              softCta: { label: "Try a free practice test" },
            },
            {
              worry: "Will my CELPIP score be accepted by CPA Canada?",
              reassurance:
                "CPA Canada and provincial CPA bodies set their own English language requirements for licensure. CELPIP-General is designated by IRCC for permanent residency and delivers CLB scores used in Express Entry. Confirm provincial CPA requirements with the body in your destination province.",
            },
            {
              worry: "How long are CELPIP scores valid?",
              reassurance:
                "CELPIP scores are valid for 2 years from the test date for most immigration purposes. For program-specific requirements, please consult a licensed immigration consultant.",
            },
          ],
        },
      },
      {
        kind: "CTABoldBanner",
        props: {
          heading: "What are you waiting for?",
          subheading:
            "Finish your registration online in minutes and join thousands worldwide who reach their immigration goals with CELPIP.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },

  // ───────────────────── 41. UAE · Medical Lab Technicians → Canada ─────────────────────
  {
    id: 41,
    title: "UAE · Medical Lab Technicians → Canada",
    tag: "Regional",
    description:
      "Conversion-stage microsite for medical laboratory technicians in the UAE pursuing CSMLS certification and Canadian PR.",
    blocks: [
      {
        kind: "HeroSplit",
        props: {
          eyebrow: "CELPIP IN UAE · FOR MEDICAL LAB TECHNICIANS",
          headline: "Your lab career in Canada starts with one English test.",
          subhead:
            "CELPIP-General is officially designated by IRCC for permanent residency. Medical laboratory technologists pursuing CSMLS certification rely on CLB scores accepted in Express Entry. Test centres in Dubai and Abu Dhabi — three hours, one sitting, results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
          secondaryCta: { label: "View Score Equivalency" },
          imageAlt:
            "Medical laboratory technician in scrubs running tests at a hospital lab in Dubai",
        },
      },
      {
        kind: "TrustStrip",
        props: {
          heading: "Recognized by",
          items: [
            { label: "IRCC", subLabel: "Permanent residency" },
            { label: "Express Entry", subLabel: "CLB scores" },
            { label: "PNP", subLabel: "Provincial nominee" },
            { label: "PGWP", subLabel: "Post-grad work permit" },
            { label: "200+", subLabel: "Centres worldwide" },
          ],
        },
      },
      {
        kind: "WhyCelpipTestCards",
        props: {
          eyebrow: "WHY CELPIP",
          heading: "Built around lab schedules and shift work",
          pillars: [
            {
              icon: "&#9201;",
              title: "Done in one sitting",
              desc: "All four components in 3 hours — book around a single day off.",
            },
            {
              icon: "&#128187;",
              title: "Computer-delivered",
              desc: "No live examiner for speaking. You speak into a headset at your own pace.",
            },
            {
              icon: "&#128200;",
              title: "Results in 3–4 days",
              desc: "Official PDF score report — upload directly into your Express Entry profile.",
            },
            {
              icon: "&#129514;",
              title: "Real workplace English",
              desc: "Vocabulary from everyday clinical and laboratory settings — the English you already use on shift.",
            },
          ],
        },
      },
      {
        kind: "MomentSpotlightInline",
        props: {
          imageSrc: "https://picsum.photos/seed/celpip-41-moment/300/300",
          imageAlt: "Portrait of Reema, a medical lab technologist from Dubai",
          oneLineMoment:
            "She tested in Dubai on Saturday and uploaded her CLB scores by Wednesday.",
          paragraphQuote:
            "Reema is a medical laboratory technologist at a Dubai hospital with five years of haematology experience. She needed CLB 7 in each component to clear her Express Entry threshold. CELPIP felt natural — the listening tasks sounded like the briefings she gives at handover. She registered online, tested one Saturday morning, and had her score report four days later.",
          attribution: {
            name: "Reema Khan",
            location: "Dubai → Edmonton",
            score: "CLB 9",
            date: "April 2026",
          },
        },
      },
      {
        kind: "BookingPanelStacked",
        props: {
          heading: "CELPIP sittings in the UAE",
          subheading:
            "Weekend and weekday options across Dubai and Abu Dhabi — pick the date that fits your shift roster.",
          sittings: [
            {
              city: "Dubai",
              centreName: "Dubai — Business Bay Centre",
              date: "Sat, May 23",
              time: "9:00 AM",
              seatsLeft: 5,
              address: "Business Bay, Dubai",
            },
            {
              city: "Dubai",
              centreName: "Dubai — Knowledge Park Centre",
              date: "Sun, May 24",
              time: "10:00 AM",
              seatsLeft: 4,
              address: "Knowledge Park, Dubai",
            },
            {
              city: "Abu Dhabi",
              centreName: "Abu Dhabi — Al Maryah Island Centre",
              date: "Sat, Jun 6",
              time: "9:30 AM",
              seatsLeft: 6,
              address: "Al Maryah Island, Abu Dhabi",
            },
            {
              city: "Dubai",
              centreName: "Dubai — Deira Centre",
              date: "Sun, Jun 7",
              time: "1:00 PM",
              seatsLeft: 3,
              address: "Deira, Dubai",
            },
          ],
        },
      },
      {
        kind: "ObjectionHandlerFAQ",
        props: {
          heading: "Worried? Read this first.",
          subheading:
            "The real questions medical lab technologists ask before booking.",
          objections: [
            {
              worry: "Does CSMLS accept CELPIP scores directly?",
              reassurance:
                "CSMLS sets its own English language requirements for medical laboratory technologist certification. CELPIP-General is designated by IRCC for permanent residency and delivers CLB scores used in Express Entry. For CSMLS-specific language requirements, please confirm directly with the Canadian Society for Medical Laboratory Science.",
              softCta: { label: "View CLB score chart" },
            },
            {
              worry: "What CLB do I need for Express Entry?",
              reassurance:
                "Federal Skilled Worker requires a minimum of CLB 7 in each of the four components. Higher scores earn more Comprehensive Ranking System points. We are not licensed to give immigration advice — please visit IRCC for current requirements.",
            },
            {
              worry: "I work shifts. Can I prepare without a long course?",
              reassurance:
                "CELPIP uses everyday English, and the practice resources are self-paced. Two free practice tests come with your CELPIP Account, plus 100+ hours of free prep videos you can watch between shifts.",
              softCta: { label: "Try a free practice test" },
            },
          ],
        },
      },
      {
        kind: "CTANavyAccent",
        props: {
          heading: "You have already decided. Now book.",
          subheading:
            "Finish your registration online in minutes. Results in 3 to 4 business days.",
          primaryCta: { label: "Find a Test Date" },
        },
      },
    ],
  },
];

export const TOTAL_MICROSITES = microsites.length;

export function getMicrosite(id: number): Microsite | undefined {
  return microsites.find((m) => m.id === id);
}
