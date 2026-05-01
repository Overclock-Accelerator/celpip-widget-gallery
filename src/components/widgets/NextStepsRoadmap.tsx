import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type RoadmapStep = {
  number: number;
  icon?: string;
  title: string;
  desc: string;
  cta?: { label: string; href?: string };
};

export type NextStepsRoadmapProps = {
  heading?: string;
  steps?: RoadmapStep[];
};

const defaultSteps: RoadmapStep[] = [
  {
    number: 1,
    icon: "&#128197;",
    title: "Book your test",
    desc: "Pick a date and a centre. Pay online. Confirmation arrives instantly.",
    cta: { label: "See dates" },
  },
  {
    number: 2,
    icon: "&#128218;",
    title: "Prepare with free resources",
    desc: "Practice tests, sample writing responses, and free webinars to get exam-ready.",
    cta: { label: "Get prep pack" },
  },
  {
    number: 3,
    icon: "&#9999;",
    title: "Test day",
    desc: "Three hours, one sitting, one location. Bring photo ID and arrive 30 min early.",
  },
  {
    number: 4,
    icon: "&#128229;",
    title: "Results in 4–5 days",
    desc: "Your CLB-aligned scores arrive online. Use them right away for IRCC or DHA.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NextStepsHorizontal — 4 numbered steps in a row, with connectors.
// ─────────────────────────────────────────────────────────────────────────────

export function NextStepsHorizontal({
  heading = "From 'I should book' to 'results in hand' — in four steps.",
  steps = defaultSteps,
}: NextStepsRoadmapProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-10">
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341] text-center mb-10 max-w-2xl mx-auto leading-tight">
        {heading}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center px-2">
            {/* Connector line — between steps on md+ only */}
            {i < steps.length - 1 && (
              <div
                className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-[#00A651]/30 -z-0"
                aria-hidden="true"
              />
            )}
            <div className="relative z-10 w-12 h-12 rounded-full bg-[#00A651] text-white font-heading font-bold text-lg flex items-center justify-center mb-4 ring-4 ring-white">
              {step.number}
            </div>
            {step.icon && (
              <div
                className="text-2xl mb-2 text-[#0B2341]"
                dangerouslySetInnerHTML={{ __html: step.icon }}
              />
            )}
            <p className="font-heading font-semibold text-[#0B2341] mb-1.5">{step.title}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.desc}</p>
            {step.cta && (
              <button className="text-[#00A651] hover:text-[#00C764] text-sm font-semibold underline-offset-4 hover:underline transition-colors">
                {step.cta.label} &rarr;
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NextStepsVertical — same steps stacked vertically with more text room.
// ─────────────────────────────────────────────────────────────────────────────

export function NextStepsVertical({
  heading = "Your path to a CELPIP score",
  steps = defaultSteps,
}: NextStepsRoadmapProps = {}) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 md:p-10">
      <h3 className="font-heading text-2xl font-bold text-[#0B2341] mb-8 text-center">
        {heading}
      </h3>
      <ol className="relative border-l-2 border-[#00A651]/30 ml-3 md:ml-6 max-w-2xl mx-auto space-y-8">
        {steps.map((step, i) => (
          <li key={i} className="pl-6 md:pl-10 relative">
            <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#00A651] text-white font-heading font-bold flex items-center justify-center text-sm ring-4 ring-gray-50">
              {step.number}
            </span>
            <div className="flex items-start gap-3 mb-1">
              {step.icon && (
                <span
                  className="text-xl text-[#0B2341]"
                  dangerouslySetInnerHTML={{ __html: step.icon }}
                />
              )}
              <p className="font-heading text-lg font-semibold text-[#0B2341]">{step.title}</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">{step.desc}</p>
            {step.cta && (
              <button className="text-[#00A651] hover:text-[#00C764] text-sm font-semibold underline-offset-4 hover:underline transition-colors">
                {step.cta.label} &rarr;
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NextStepsRoadmapVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

export function NextStepsRoadmapVariants() {
  return (
    <>
      <VariantLabel label="A — Horizontal Roadmap" />
      <NextStepsHorizontal />

      <VariantLabel label="B — Vertical Roadmap" />
      <NextStepsVertical />
    </>
  );
}
