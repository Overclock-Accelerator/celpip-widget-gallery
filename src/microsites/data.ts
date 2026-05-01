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

import type { HeroProps, HeroFormInHeaderProps } from "@/components/widgets/Hero";
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
  | { kind: "RichTextCompact"; props: { content: RichTextContent } };

export type MicrositeTag = "Regional" | "Layout";

export type Microsite = {
  id: number;
  title: string;
  tag: MicrositeTag;
  description: string;
  /** Optional path or URL for HeroSplit / HeroGradient / HeroFormInHeader imagery. */
  heroImageSrc?: string;
  blocks: WidgetBlock[];
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
];

export const TOTAL_MICROSITES = microsites.length;

export function getMicrosite(id: number): Microsite | undefined {
  return microsites.find((m) => m.id === id);
}
