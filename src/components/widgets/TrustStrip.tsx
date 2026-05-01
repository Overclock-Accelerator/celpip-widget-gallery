import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type TrustItem = { label: string; subLabel?: string };

export type TrustStripProps = {
  heading?: string;
  items?: TrustItem[];
};

// ─────────────────────────────────────────────────────────────────────────────
// TrustStrip — gray bg, monochrome label "logos", 2-row stack on mobile.
// ─────────────────────────────────────────────────────────────────────────────

const defaultItems: TrustItem[] = [
  { label: "IRCC", subLabel: "Canada" },
  { label: "DHA", subLabel: "Australia" },
  { label: "UBC", subLabel: "Research origin" },
  { label: "Paragon Testing", subLabel: "Operator" },
  { label: "90+", subLabel: "Professional bodies" },
  { label: "200+", subLabel: "Test centres" },
];

export function TrustStrip({
  heading = "Recognized by",
  items = defaultItems,
}: TrustStripProps = {}) {
  return (
    <div className="rounded-xl bg-gray-100 border border-gray-200 px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        {heading && (
          <p className="text-[#0B2341]/60 font-heading font-semibold text-xs uppercase tracking-[0.25em] md:max-w-[140px] text-center md:text-left shrink-0">
            {heading}
          </p>
        )}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-[#0B2341]/15 bg-white rounded-lg px-3 py-3 md:py-4 text-center transition-colors hover:border-[#0B2341]/30"
            >
              <p className="font-heading text-[#0B2341] text-sm md:text-base font-bold uppercase tracking-wider leading-tight">
                {item.label}
              </p>
              {item.subLabel && (
                <p className="text-[#0B2341]/50 text-[10px] md:text-xs mt-1 uppercase tracking-wider">
                  {item.subLabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TrustStripVariants — gallery showcase (single variant)
// ─────────────────────────────────────────────────────────────────────────────

export function TrustStripVariants() {
  return (
    <>
      <VariantLabel label="A — Recognized-By Strip" />
      <TrustStrip />
    </>
  );
}
