import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type UrgencyBarProps = {
  city?: string;
  date?: string;
  seatsLeft?: number;
  ctaLabel?: string;
  ctaHref?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// UrgencyBar — slim navy banner, green pulsing dot, microcopy + CTA.
// Sticky-feel even when not actually fixed-positioned.
// ─────────────────────────────────────────────────────────────────────────────

export function UrgencyBar({
  city = "Toronto",
  date = "Sat Oct 18",
  seatsLeft = 6,
  ctaLabel = "Reserve your seat",
}: UrgencyBarProps = {}) {
  return (
    <div className="rounded-lg bg-[#0B2341] text-white px-4 py-3 md:px-6 md:py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 shadow-md">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00A651] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00C764]" />
        </span>
        <p className="text-sm md:text-base flex-1 min-w-0">
          <span className="font-heading font-semibold text-[#17FFDC] uppercase tracking-wider text-xs mr-2">
            Next sitting in {city}:
          </span>
          <span className="font-semibold">{date}</span>
          <span className="text-gray-300 mx-2">&middot;</span>
          <span className="text-[#00C764] font-bold">{seatsLeft} seats left</span>
        </p>
      </div>
      <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-5 py-2 rounded-md text-sm transition-colors whitespace-nowrap shrink-0">
        {ctaLabel} &rarr;
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UrgencyBarVariants — gallery showcase (single variant)
// ─────────────────────────────────────────────────────────────────────────────

export function UrgencyBarVariants() {
  return (
    <>
      <VariantLabel label="A — Slim Urgency Bar" />
      <UrgencyBar />
    </>
  );
}
