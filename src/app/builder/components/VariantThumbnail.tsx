/**
 * VariantThumbnail — lightweight schematic of a widget variant's layout, shown
 * inside selectable cards in the /builder Step 2 wizard. NOT a live render of
 * the variant — too expensive to mount 30+ live previews. Instead, a 240×140
 * tinted SVG-style sketch that gestures at the variant's shape so the marketer
 * can scan and pick.
 *
 * Color tint comes from the WidgetCategory; the inner layout sketch comes from
 * the kind discriminator. Kinds without a hand-tuned sketch fall back to a
 * generic block layout.
 */

import type { WidgetKind, WidgetCategory } from "@/composer/types";

const CATEGORY_TINT: Record<WidgetCategory, { bg: string; fg: string; accent: string }> = {
  Hero: { bg: "bg-[#0B2341]", fg: "bg-white/90", accent: "bg-[#17FFDC]" },
  "Trust & Social Proof": { bg: "bg-[#F0F4FE]", fg: "bg-[#0B2341]/80", accent: "bg-[#00A651]" },
  Conversion: { bg: "bg-[#00A651]", fg: "bg-white/90", accent: "bg-[#0B2341]" },
  Features: { bg: "bg-white", fg: "bg-[#0B2341]/70", accent: "bg-[#00A651]" },
  Testimonials: { bg: "bg-[#F7F8FA]", fg: "bg-[#0B2341]/70", accent: "bg-[#6F0E49]" },
  "Score & FAQ": { bg: "bg-[#0B2341]", fg: "bg-white/80", accent: "bg-[#17FFDC]" },
  "Forms & Resources": { bg: "bg-white", fg: "bg-[#0B2341]/70", accent: "bg-[#678FEF]" },
  Content: { bg: "bg-white", fg: "bg-[#0B2341]/60", accent: "bg-[#0B2341]" },
  CTA: { bg: "bg-[#00A651]", fg: "bg-white/90", accent: "bg-white" },
};

export function VariantThumbnail({
  kind,
  category,
}: {
  kind: WidgetKind;
  category: WidgetCategory;
}) {
  const tint = CATEGORY_TINT[category];
  return (
    <div
      className={`relative w-full aspect-[12/7] rounded-md overflow-hidden ${tint.bg} border border-black/5`}
      aria-hidden
    >
      {renderSketch(kind, tint)}
    </div>
  );
}

function renderSketch(
  kind: WidgetKind,
  tint: { bg: string; fg: string; accent: string },
) {
  // Each return below is a hand-tuned mini layout. Kept compact — roughly 4-8
  // shape divs per variant. The point is for a marketer to recognise "split
  // hero" vs "full bleed" vs "stacked pillars" at a glance, not pixel parity.
  switch (kind) {
    // Heroes
    case "HeroGradient":
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-1.5">
          <div className={`h-1.5 w-12 rounded ${tint.accent}`} />
          <div className={`h-2.5 w-3/4 rounded ${tint.fg}`} />
          <div className={`h-2.5 w-2/3 rounded ${tint.fg}`} />
          <div className={`mt-2 h-2 w-20 rounded ${tint.accent}`} />
        </div>
      );
    case "HeroSplit":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 p-3 flex flex-col gap-1.5 justify-center">
            <div className={`h-1.5 w-10 rounded ${tint.accent}`} />
            <div className={`h-2.5 w-full rounded ${tint.fg}`} />
            <div className={`h-2.5 w-3/4 rounded ${tint.fg}`} />
            <div className={`mt-1 h-2 w-16 rounded ${tint.accent}`} />
          </div>
          <div className="w-1/2 bg-gradient-to-br from-black/30 to-black/10" />
        </div>
      );
    case "HeroFormInHeader":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-3/5 p-3 flex flex-col gap-1.5 justify-center">
            <div className={`h-1.5 w-10 rounded ${tint.accent}`} />
            <div className={`h-2.5 w-full rounded ${tint.fg}`} />
            <div className={`h-2.5 w-3/4 rounded ${tint.fg}`} />
          </div>
          <div className="w-2/5 bg-white p-2 flex flex-col gap-1 justify-center">
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2.5 rounded bg-[#00A651]" />
          </div>
        </div>
      );
    case "HeroFullBleedImage":
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20 flex flex-col items-center justify-center gap-1.5 p-4">
          <div className={`h-3 w-2/3 rounded ${tint.fg}`} />
          <div className={`h-3 w-1/2 rounded ${tint.fg}`} />
          <div className="flex gap-2 mt-1">
            <div className="h-2.5 w-14 rounded bg-[#00A651]" />
            <div className="h-2.5 w-14 rounded bg-white/80" />
          </div>
        </div>
      );
    case "HeroSplitForm":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-3/5 bg-gradient-to-br from-black/30 to-black/5" />
          <div className="w-2/5 bg-white p-2 flex flex-col gap-1 justify-center">
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2.5 rounded bg-[#00A651]" />
          </div>
        </div>
      );
    case "HeroFloatingPanel":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-3/4 rounded-md bg-[#0B2341] p-2 shadow-lg flex flex-col gap-1">
            <div className={`h-1.5 w-10 rounded ${tint.accent}`} />
            <div className="h-2.5 rounded bg-white" />
            <div className="h-2 w-3/4 rounded bg-white/70" />
          </div>
        </div>
      );
    case "HeroBigStat":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gradient-to-br from-black/30 to-black/10" />
          <div className="w-1/2 p-3 flex flex-col items-center justify-center gap-1">
            <div className="text-[#00A651] font-heading font-bold text-2xl leading-none">2–4</div>
            <div className={`h-1.5 w-12 rounded ${tint.fg}`} />
            <div className={`h-1.5 w-16 rounded ${tint.fg}`} />
          </div>
        </div>
      );
    case "HeroCentered":
      return (
        <div className="absolute inset-0 flex flex-col">
          <div className="h-1/2 bg-gradient-to-br from-black/40 to-black/10" />
          <div className="flex-1 bg-white p-3 flex flex-col items-center justify-center gap-1">
            <div className="h-2.5 w-2/3 rounded bg-[#0B2341]/80" />
            <div className="h-2 w-1/2 rounded bg-[#0B2341]/40" />
          </div>
        </div>
      );

    // CTAs
    case "CTABoldBanner":
      return (
        <div className="absolute inset-0 bg-[#00A651] flex flex-col items-center justify-center gap-1 p-3">
          <div className="h-2.5 w-2/3 rounded bg-white" />
          <div className="h-2 w-1/2 rounded bg-white/70" />
          <div className="mt-1 h-2.5 w-20 rounded bg-white" />
        </div>
      );
    case "CTANavyAccent":
      return (
        <div className="absolute inset-0 bg-[#0B2341] p-3 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-2 w-24 rounded bg-white" />
            <div className="h-1.5 w-20 rounded bg-white/60" />
          </div>
          <div className="h-3 w-16 rounded bg-[#00A651]" />
        </div>
      );
    case "CTACardWithIcon":
      return (
        <div className="absolute inset-0 bg-white p-3 flex items-center gap-3 border-2 border-[#0B2341] rounded-md">
          <div className="w-8 h-8 rounded-full bg-[#0B2341]" />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-3/4 rounded bg-[#0B2341]" />
            <div className="h-1.5 w-1/2 rounded bg-[#0B2341]/60" />
          </div>
          <div className="h-3 w-12 rounded bg-[#0B2341]" />
        </div>
      );

    // Conversion stage
    case "TrustStrip":
      return (
        <div className="absolute inset-0 p-3 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-8 flex-1 rounded ${tint.fg}/20 border border-current/10`} />
          ))}
        </div>
      );
    case "MomentSpotlightLargePhoto":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gradient-to-br from-black/40 to-black/10" />
          <div className="w-1/2 p-3 flex flex-col gap-1 justify-center">
            <div className={`h-1.5 w-10 rounded ${tint.accent}`} />
            <div className="h-2.5 w-full rounded bg-[#0B2341]/70" />
            <div className="h-2 w-3/4 rounded bg-[#0B2341]/40" />
          </div>
        </div>
      );
    case "MomentSpotlightInline":
      return (
        <div className="absolute inset-0 p-3 flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#0B2341]/20" />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-3/4 rounded bg-[#0B2341]/70" />
            <div className="h-1.5 w-full rounded bg-[#0B2341]/40" />
          </div>
        </div>
      );
    case "BookingPanelInline":
      return (
        <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
          <div className="h-2 w-1/3 rounded bg-[#0B2341]/70" />
          <div className="flex gap-1.5 flex-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-1 rounded border border-gray-300 p-1 flex flex-col justify-between">
                <div className="h-1.5 rounded bg-[#0B2341]/60" />
                <div className="h-2 rounded bg-[#00A651]" />
              </div>
            ))}
          </div>
        </div>
      );
    case "BookingPanelStacked":
      return (
        <div className="absolute inset-0 p-3 flex flex-col gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 border border-gray-300 rounded p-1">
              <div className="h-1.5 flex-1 rounded bg-[#0B2341]/60" />
              <div className="h-2 w-10 rounded bg-[#00A651]" />
            </div>
          ))}
        </div>
      );
    case "NextStepsHorizontal":
      return (
        <div className="absolute inset-0 p-3 flex items-center justify-between gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-6 h-6 rounded-full bg-[#0B2341] text-white text-[10px] font-bold flex items-center justify-center">
                {n}
              </div>
              <div className="h-1 w-3/4 rounded bg-[#0B2341]/40" />
            </div>
          ))}
        </div>
      );
    case "NextStepsVertical":
      return (
        <div className="absolute inset-0 p-3 flex flex-col gap-1">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#0B2341] text-white text-[9px] font-bold flex items-center justify-center">
                {n}
              </div>
              <div className="flex-1 h-1.5 rounded bg-[#0B2341]/40" />
            </div>
          ))}
        </div>
      );
    case "UrgencyBar":
      return (
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-7 bg-[#0B2341] rounded flex items-center px-2 gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#17FFDC] animate-pulse" />
          <div className="flex-1 h-1.5 rounded bg-white/70" />
          <div className="h-2 w-10 rounded bg-[#00A651]" />
        </div>
      );
    case "PrepStarterPackHero":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gradient-to-br from-[#00A651]/30 to-[#00A651]/10" />
          <div className="w-1/2 p-3 flex flex-col gap-1 justify-center">
            <div className="h-1.5 w-8 rounded bg-[#00A651]" />
            <div className="h-2.5 w-full rounded bg-[#0B2341]/70" />
            <div className="h-2 rounded bg-gray-300" />
            <div className="h-2.5 mt-1 w-3/4 rounded bg-[#00A651]" />
          </div>
        </div>
      );
    case "PrepStarterPackInline":
      return (
        <div className="absolute inset-0 bg-[#F0F4FE] p-3 flex items-center gap-3 rounded">
          <div className="flex-1 space-y-1">
            <div className="h-2 w-3/4 rounded bg-[#0B2341]/70" />
            <div className="h-1.5 w-full rounded bg-[#0B2341]/40" />
          </div>
          <div className="h-3 w-14 rounded bg-[#00A651]" />
        </div>
      );
    case "ObjectionHandlerFAQ":
      return (
        <div className="absolute inset-0 p-3 flex flex-col gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 border-b border-gray-200 pb-1">
              <div className="flex-1 h-1.5 rounded bg-[#0B2341]/60" />
              <div className="text-[#0B2341] text-xs">+</div>
            </div>
          ))}
        </div>
      );
    case "ReadinessQuiz":
      return (
        <div className="absolute inset-0 p-3 flex flex-col items-center justify-center gap-2">
          <div className="h-2 w-1/2 rounded bg-[#0B2341]/70" />
          <div className="flex gap-1.5 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-6 rounded border-2 border-[#0B2341]/40" />
            ))}
          </div>
          <div className="h-2.5 w-20 rounded bg-[#00A651]" />
        </div>
      );

    // Features
    case "FeatureGrid":
      return (
        <div className="absolute inset-0 p-3 grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#0B2341]/20" />
              <div className="h-1.5 w-3/4 rounded bg-[#0B2341]/60" />
              <div className="h-1 w-full rounded bg-[#0B2341]/30" />
            </div>
          ))}
        </div>
      );
    case "FeatureNavyCards":
      return (
        <div className="absolute inset-0 bg-[#0B2341] p-2 grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#153A5C] rounded p-1.5 flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-[#00A651]" />
              <div className="flex-1 h-1.5 rounded bg-white/70" />
            </div>
          ))}
        </div>
      );
    case "WhyCelpipPillars":
      return (
        <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
          <div className="h-1.5 w-1/3 mx-auto rounded bg-[#00A651]" />
          <div className="grid grid-cols-4 gap-1.5 flex-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 justify-center">
                <div className="w-5 h-5 rounded-full bg-[#E8F8EE]" />
                <div className="h-1 w-3/4 rounded bg-[#0B2341]/60" />
              </div>
            ))}
          </div>
        </div>
      );
    case "WhyCelpipTestCards":
      return (
        <div className="absolute inset-0 p-3 grid grid-cols-2 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded border border-gray-200 p-1.5 flex flex-col gap-1">
              <div className="w-4 h-4 rounded bg-[#0B2341]" />
              <div className="h-1.5 rounded bg-[#0B2341]/70" />
            </div>
          ))}
        </div>
      );
    case "WhyCelpipMomentum":
      return (
        <div className="absolute inset-0 bg-[#0B2341] p-2 grid grid-cols-2 gap-1.5">
          {["200+", "2-4", "100+", "1"].map((n, i) => (
            <div key={i} className="bg-[#153A5C] rounded p-1.5 flex items-center gap-1">
              <div className="text-[#00A651] text-xs font-bold">{n}</div>
              <div className="flex-1 h-1.5 rounded bg-white/60" />
            </div>
          ))}
        </div>
      );

    // Testimonials
    case "TestimonialQuoteCards":
      return (
        <div className="absolute inset-0 p-3 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded border border-gray-200 p-1.5 flex flex-col gap-1">
              <div className="text-[#00A651] text-xs">&ldquo;</div>
              <div className="h-1 rounded bg-gray-300" />
              <div className="h-1 w-3/4 rounded bg-gray-300" />
            </div>
          ))}
        </div>
      );
    case "TestimonialSpotlight":
      return (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341] to-[#153A5C] p-3 flex flex-col items-center justify-center gap-1">
          <div className="text-[#00A651]">&ldquo;</div>
          <div className="h-1.5 w-3/4 rounded bg-white/80" />
          <div className="h-1.5 w-2/3 rounded bg-white/80" />
          <div className="mt-1 w-6 h-6 rounded-full bg-[#00A651]" />
        </div>
      );
    case "TestimonialVideo":
      return (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gray-900 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-lg">▶</div>
          </div>
          <div className="w-1/2 bg-white p-2 flex flex-col gap-1 justify-center">
            <div className="h-1.5 w-1/2 rounded bg-[#00A651]" />
            <div className="h-2 w-3/4 rounded bg-[#0B2341]/70" />
            <div className="h-1.5 rounded bg-[#0B2341]/40" />
          </div>
        </div>
      );

    // Score & FAQ
    case "ScoreEquivalencyTable":
      return (
        <div className="absolute inset-0 bg-white p-2 flex flex-col">
          <div className="bg-[#0B2341] h-3 rounded-t" />
          <div className="flex-1 grid grid-cols-4 gap-px bg-gray-100 p-px">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white" />
            ))}
          </div>
        </div>
      );
    case "FAQAccordion":
      return (
        <div className="absolute inset-0 bg-white p-3 flex flex-col gap-1.5 border border-gray-200 rounded">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-1">
              <div className="h-1.5 w-3/4 rounded bg-[#0B2341]/60" />
              <div className="text-[#00A651] text-xs">▾</div>
            </div>
          ))}
        </div>
      );
    case "FAQTabbedByCategory":
      return (
        <div className="absolute inset-0 bg-[#0B2341] p-2 flex flex-col gap-1.5">
          <div className="flex gap-1">
            {["All", "Gen", "Imm"].map((t, i) => (
              <div key={i} className={`h-3 rounded-full px-2 ${i === 0 ? "bg-[#00A651]" : "bg-[#153A5C]"}`} />
            ))}
          </div>
          <div className="flex-1 bg-[#153A5C] rounded p-1.5 flex flex-col gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-1.5 rounded bg-white/70" />
            ))}
          </div>
        </div>
      );

    // Vanity Metrics
    case "MetricsRow":
      return (
        <div className="absolute inset-0 bg-white border border-gray-200 rounded p-3 flex items-center justify-around">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="text-center space-y-0.5">
              <div className="h-3 w-8 rounded bg-[#00A651]" />
              <div className="h-1 w-10 rounded bg-[#0B2341]/40 mx-auto" />
            </div>
          ))}
        </div>
      );
    case "MetricsNavyDividers":
      return (
        <div className="absolute inset-0 bg-[#0B2341] p-3 flex items-center justify-around divide-x divide-[#153A5C]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center px-2 space-y-0.5">
              <div className="h-3 w-8 rounded bg-[#17FFDC]" />
              <div className="h-1 w-10 rounded bg-white/40 mx-auto" />
            </div>
          ))}
        </div>
      );
    case "MetricsCards":
      return (
        <div className="absolute inset-0 p-3 grid grid-cols-5 gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded p-1 flex flex-col items-center gap-0.5">
              <div className="h-2.5 w-6 rounded bg-[#0B2341]" />
              <div className="h-1 w-full rounded bg-[#0B2341]/30" />
            </div>
          ))}
        </div>
      );

    // Forms & Resources
    case "FormSimpleLead":
      return (
        <div className="absolute inset-0 bg-white border border-gray-200 rounded p-3 flex flex-col gap-1.5">
          <div className="h-2 w-1/2 rounded bg-[#0B2341]/70" />
          <div className="h-2.5 rounded bg-gray-200" />
          <div className="h-2.5 rounded bg-gray-200" />
          <div className="h-2.5 rounded bg-gray-200" />
          <div className="h-3 rounded bg-[#00A651]" />
        </div>
      );
    case "FormInline":
      return (
        <div className="absolute inset-0 bg-[#0B2341] p-3 flex items-center gap-2">
          <div className="flex-1 space-y-1">
            <div className="h-2 rounded bg-white/80" />
            <div className="h-1.5 w-3/4 rounded bg-white/40" />
          </div>
          <div className="h-3 w-1/3 rounded bg-[#153A5C]" />
          <div className="h-3 w-1/4 rounded bg-[#00A651]" />
        </div>
      );
    case "FormB2BContact":
      return (
        <div className="absolute inset-0 bg-gray-50 border border-gray-200 rounded p-2 grid grid-cols-2 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2 rounded bg-gray-200" />
          ))}
          <div className="col-span-2 h-3 rounded bg-gray-200" />
          <div className="col-span-2 h-3 rounded bg-[#0B2341]" />
        </div>
      );
    case "ResourceCardGrid":
      return (
        <div className="absolute inset-0 p-3 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="h-1/2 bg-gradient-to-br from-[#0B2341] to-[#153A5C]" />
              <div className="p-1 space-y-0.5">
                <div className="h-1 rounded bg-[#0B2341]/40" />
                <div className="h-1.5 rounded bg-[#0B2341]/70" />
              </div>
            </div>
          ))}
        </div>
      );
    case "ResourceFilteredList":
      return (
        <div className="absolute inset-0 bg-white border border-gray-200 rounded p-2 flex flex-col gap-1.5">
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-2.5 px-2 rounded-full ${i === 0 ? "bg-[#0B2341]" : "bg-gray-200"}`} />
            ))}
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5 border-b border-gray-100 pb-1">
              <div className="h-2 w-12 rounded bg-[#00A651]" />
              <div className="flex-1 h-1.5 rounded bg-[#0B2341]/40" />
            </div>
          ))}
        </div>
      );

    // Image gallery
    case "ImageGalleryGrid":
      return (
        <div className="absolute inset-0 p-2 grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gradient-to-br from-[#0B2341]/40 to-[#0B2341]/10 rounded" />
          ))}
        </div>
      );
    case "ImageGalleryCarousel":
      return (
        <div className="absolute inset-0 p-2 flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#0B2341] flex items-center justify-center text-white text-[8px]">‹</div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded ${i === 1 ? "h-full" : "h-3/4"} bg-gradient-to-br from-[#0B2341]/40 to-[#0B2341]/10`}
            />
          ))}
          <div className="w-3 h-3 rounded-full bg-[#0B2341] flex items-center justify-center text-white text-[8px]">›</div>
        </div>
      );

    // Rich text
    case "RichTextEditorial":
      return (
        <div className="absolute inset-0 bg-white p-4 flex flex-col items-center gap-1">
          <div className="h-3 w-3/4 rounded bg-[#0B2341]/70" />
          <div className="h-1 w-2/3 rounded bg-[#0B2341]/40" />
          <div className="h-1 w-3/4 rounded bg-[#0B2341]/40" />
          <div className="h-1 w-2/3 rounded bg-[#0B2341]/40" />
        </div>
      );
    case "RichTextCompact":
      return (
        <div className="absolute inset-0 bg-white p-3 flex flex-col gap-1">
          <div className="h-2 w-1/2 rounded bg-[#0B2341]/70" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-1 rounded bg-[#0B2341]/40" />
          ))}
        </div>
      );

    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs font-mono">
          {kind}
        </div>
      );
  }
}
