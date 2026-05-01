import { VariantLabel } from "./VariantLabel";

/**
 * WhyCelpip — branded "Why CELPIP" benefit-pillar block, modelled on
 * celpip.ca/india and the homepage's "Achieve your immigration goals with
 * confidence." 4-pillar section. Distinct from the generic FeatureHighlights
 * widget: the copy here is canonical CELPIP brand language, and the visual
 * treatment matches the country / homepage pillar tile pattern.
 *
 * Three variants:
 *   - WhyCelpipPillars      — canonical 4-pillar block (homepage style)
 *   - WhyCelpipTestCards    — India-page style test cards (4 navy-icon tiles)
 *   - WhyCelpipMomentum     — stat-led horizontal rows with claim copy
 *
 * All defaults are verbatim from research/celpip-positioning.md.
 */

export type WhyPillar = {
  icon: string;
  title: string;
  desc: string;
};

export type WhyCelpipProps = {
  eyebrow?: string;
  heading?: string;
  pillars?: WhyPillar[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Default content (canonical celpip.ca homepage 4-pillar block)
// ─────────────────────────────────────────────────────────────────────────────

const HOMEPAGE_PILLARS: WhyPillar[] = [
  {
    icon: "⏱",
    title: "Fast and accessible",
    desc: "Self-paced test is completed during one sitting in 3 hours or less with results in 2–4 days.",
  },
  {
    icon: "📚",
    title: "Guided test prep",
    desc: "Free practice tests, webinars, study guides, and courses to help you succeed.",
  },
  {
    icon: "🌍",
    title: "Real-world English",
    desc: "Focused on practical, real-world communication for school, career, and life.",
  },
  {
    icon: "🏛",
    title: "Trusted credibility",
    desc: "Developed at the University of British Columbia and aligned with CLB and CEFR standards.",
  },
];

const COUNTRY_TEST_CARDS: WhyPillar[] = [
  {
    icon: "⏱",
    title: "Single 3-Hour Test Sitting",
    desc: "Takes approximately 3 hours to complete and can be done in one sitting with no separate speaking session.",
  },
  {
    icon: "🛂",
    title: "Accepted for Visa and Immigration Purposes",
    desc: "The CELPIP-General test is accepted by the Australian and Canadian governments for visa and immigration purposes.",
  },
  {
    icon: "💻",
    title: "Computer Delivered",
    desc: "Includes features such as a personal timer, word counter, and spell-check.",
  },
  {
    icon: "✉️",
    title: "Quick Online Results",
    desc: "Available online in just 3 to 4 business days after the test date.",
  },
];

const MOMENTUM_CLAIMS: WhyPillar[] = [
  {
    icon: "200+",
    title: "Test centres in 40+ countries",
    desc: "Find an available exam to schedule within 2 weeks at 200+ test centres in 40+ countries.",
  },
  {
    icon: "2–4",
    title: "Days to your results",
    desc: "Results delivered online in 2–4 business days. The PDF score report is official and accepted by institutions.",
  },
  {
    icon: "100+",
    title: "Hours of free prep",
    desc: "Watch 100+ hours of in-depth preparation videos, practice tests, study tips, and more — all free.",
  },
  {
    icon: "1",
    title: "Sitting. No separate speaking session",
    desc: "Listening, Reading, Writing, and Speaking — all completed in one sitting on a single computer.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Variant A — WhyCelpipPillars (homepage 4-pillar block)
// ─────────────────────────────────────────────────────────────────────────────

export function WhyCelpipPillars({
  eyebrow = "WHY CELPIP",
  heading = "Achieve your immigration goals with confidence.",
  pillars = HOMEPAGE_PILLARS,
}: WhyCelpipProps) {
  return (
    <section className="rounded-xl bg-white border border-gray-200 p-8 md:p-12">
      <div className="text-center mb-10">
        <p className="font-heading text-xs tracking-[0.2em] uppercase text-[#00A651] mb-3">
          {eyebrow}
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341] max-w-2xl mx-auto leading-tight">
          {heading}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((p, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F8EE] flex items-center justify-center text-2xl mb-4">
              <span aria-hidden>{p.icon}</span>
            </div>
            <h4 className="font-heading font-semibold text-[#0B2341] mb-2">{p.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant B — WhyCelpipTestCards (India-page test cards)
// ─────────────────────────────────────────────────────────────────────────────

export function WhyCelpipTestCards({
  eyebrow = "WHY TEST TAKERS CHOOSE CELPIP",
  heading = "Built for working professionals balancing work, family, and a busy prep window.",
  pillars = COUNTRY_TEST_CARDS,
}: WhyCelpipProps) {
  return (
    <section className="py-2">
      <div className="text-center mb-8">
        <p className="font-heading text-xs tracking-[0.2em] uppercase text-[#00A651] mb-3">
          {eyebrow}
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341] max-w-3xl mx-auto leading-tight">
          {heading}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#00A651] hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-[#0B2341] text-[#17FFDC] flex items-center justify-center text-xl mb-4">
              <span aria-hidden>{p.icon}</span>
            </div>
            <h4 className="font-heading font-bold text-[#0B2341] mb-2 leading-snug">
              {p.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant C — WhyCelpipMomentum (stat-led horizontal rows on navy bg)
// ─────────────────────────────────────────────────────────────────────────────

export function WhyCelpipMomentum({
  eyebrow = "BUILT FOR MOMENTUM",
  heading = "Speed, reliability, flexibility, ease, and credibility — when it matters most.",
  pillars = MOMENTUM_CLAIMS,
}: WhyCelpipProps) {
  return (
    <section className="rounded-xl bg-[#0B2341] text-white p-8 md:p-12">
      <div className="text-center mb-10">
        <p className="font-heading text-xs tracking-[0.2em] uppercase text-[#17FFDC] mb-3">
          {eyebrow}
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-tight">
          {heading}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-5 bg-[#153A5C] rounded-lg p-5"
          >
            <div className="font-heading text-3xl md:text-4xl font-bold text-[#00A651] leading-none whitespace-nowrap pt-1">
              {p.icon}
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white mb-1.5">{p.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery wrapper
// ─────────────────────────────────────────────────────────────────────────────

export function WhyCelpipVariants() {
  return (
    <>
      <VariantLabel label="A — Homepage 4-Pillar Block" />
      <WhyCelpipPillars />

      <VariantLabel label="B — Country Test Cards" />
      <WhyCelpipTestCards />

      <VariantLabel label="C — Stat-Led Momentum" />
      <WhyCelpipMomentum />
    </>
  );
}
