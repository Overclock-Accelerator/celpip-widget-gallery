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
// UrgencyBar — slim navy banner with green pulse dot, imminent-action microcopy.
// ─────────────────────────────────────────────────────────────────────────────

export function UrgencyBar({
  city = "Toronto",
  date = "Sat Oct 18",
  seatsLeft = 6,
  ctaLabel = "Reserve your seat",
}: UrgencyBarProps = {}) {
  return (
    <div className="rounded-lg bg-[#0B2341] text-white px-4 py-3 md:px-6 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <span className="relative flex h-3 w-3 shrink-0" aria-hidden>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A651] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00A651]" />
        </span>
        <p className="text-sm md:text-base font-medium truncate">
          Next sitting in <span className="font-bold text-[#17FFDC]">{city}</span>:{" "}
          <span className="font-bold">{date}</span>{" "}
          <span className="text-[#17FFDC]">&middot;</span>{" "}
          <span className="font-bold text-[#FFBD17]">{seatsLeft} seats left</span>
        </p>
      </div>
      <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-5 py-2 rounded-md transition-colors text-sm whitespace-nowrap self-start sm:self-auto shrink-0">
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
      <VariantLabel label="A — Imminent Sitting Bar" />
      <UrgencyBar />
    </>
  );
}
