import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type RoadmapCta = { label: string; href?: string };

export type RoadmapStep = {
  number: number;
  icon?: string;
  title: string;
  desc: string;
  cta?: RoadmapCta;
};

export type NextStepsRoadmapProps = {
  heading?: string;
  steps?: RoadmapStep[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Defaults — 4 concrete steps from booking through results.
// ─────────────────────────────────────────────────────────────────────────────

const defaultSteps: RoadmapStep[] = [
  {
    number: 1,
    icon: "&#128197;", // calendar
    title: "Book your test",
    desc: "Pick a date, centre, and time. Instant confirmation by email.",
    cta: { label: "See dates" },
  },
  {
    number: 2,
    icon: "&#128218;", // book
    title: "Prepare with free resources",
    desc: "Practice tests, study guides, and sample answers — all free.",
    cta: { label: "Get prep pack" },
  },
  {
    number: 3,
    icon: "&#128187;", // computer
    title: "Test day",
    desc: "Three hours, one sitting, on a computer. Bring valid ID and arrive 30 min early.",
  },
  {
    number: 4,
    icon: "&#9989;", // check
    title: "Results in 4–5 days",
    desc: "Scores delivered online. Share directly with IRCC, employers, or designation bodies.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NextStepsHorizontal — 4 numbered steps with arrow connectors.
// ─────────────────────────────────────────────────────────────────────────────

export function NextStepsHorizontal({
  heading = "Your path from here to test day",
  steps = defaultSteps,
}: NextStepsRoadmapProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-10">
      <h3 className="font-heading text-2xl font-bold text-[#0B2341] mb-8 text-center">
        {heading}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2">
        {steps.map((step, i) => (
          <div key={step.number} className="relative">
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className="hidden md:block absolute top-7 left-[55%] right-[-25%] h-0.5 bg-gradient-to-r from-[#00A651] to-[#00A651]/30"
              />
            )}
            <div className="text-center px-2">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-[#0B2341] text-white flex items-center justify-center font-heading text-xl font-bold">
                  {step.number}
                </div>
                {step.icon && (
                  <span
                    className="absolute -top-1 -right-2 w-7 h-7 rounded-full bg-[#00A651] text-white text-sm flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: step.icon }}
                  />
                )}
              </div>
              <h4 className="font-heading font-semibold text-[#0B2341] mb-2">
                {step.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.desc}</p>
              {step.cta && (
                <button className="text-[#00A651] hover:text-[#00C764] font-semibold text-sm underline underline-offset-4 decoration-2">
                  {step.cta.label} &rarr;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NextStepsVertical — same steps stacked, more text room.
// ─────────────────────────────────────────────────────────────────────────────

export function NextStepsVertical({
  heading = "What happens next",
  steps = defaultSteps,
}: NextStepsRoadmapProps = {}) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 md:p-10">
      <h3 className="font-heading text-2xl font-bold text-[#0B2341] mb-8">{heading}</h3>
      <ol className="relative space-y-6">
        {steps.map((step, i) => (
          <li key={step.number} className="relative pl-16">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[27px] top-12 bottom-[-1.5rem] w-0.5 bg-[#00A651]/30"
              />
            )}
            <div className="absolute left-0 top-0 w-14 h-14 rounded-full bg-[#0B2341] text-white flex items-center justify-center font-heading text-xl font-bold">
              {step.number}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                {step.icon && (
                  <span
                    className="w-9 h-9 rounded-md bg-[#00A651]/10 text-lg flex items-center justify-center shrink-0"
                    dangerouslySetInnerHTML={{ __html: step.icon }}
                  />
                )}
                <div>
                  <h4 className="font-heading font-semibold text-[#0B2341] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {step.cta && (
                <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap shrink-0 self-start md:self-auto">
                  {step.cta.label}
                </button>
              )}
            </div>
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
      <VariantLabel label="A — Horizontal Steps" />
      <NextStepsHorizontal />

      <VariantLabel label="B — Vertical Detailed Roadmap" />
      <NextStepsVertical />
    </>
  );
}
