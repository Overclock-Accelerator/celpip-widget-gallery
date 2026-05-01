import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type PrepStarterPackProps = {
  eyebrow?: string;
  headline?: string;
  benefits?: string[];
  ctaLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Defaults — lead-magnet style: free practice test + study guide.
// ─────────────────────────────────────────────────────────────────────────────

const defaultBenefits: string[] = [
  "Full-length sample exam",
  "Score yourself with rubrics",
  "Sample writing responses",
  "Audio for listening section",
];

const defaultProps: Required<
  Pick<PrepStarterPackProps, "eyebrow" | "headline" | "ctaLabel" | "imageSrc" | "imageAlt">
> = {
  eyebrow: "FREE",
  headline: "Get the official CELPIP practice test",
  ctaLabel: "Send me the prep pack",
  imageSrc: "https://picsum.photos/seed/celpip-prep/900/700",
  imageAlt: "Open CELPIP study guide and practice test booklet on a desk with a laptop",
};

// ─────────────────────────────────────────────────────────────────────────────
// PrepStarterPackHero — large card with image + bullets + email-capture form.
// ─────────────────────────────────────────────────────────────────────────────

export function PrepStarterPackHero({
  eyebrow = defaultProps.eyebrow,
  headline = defaultProps.headline,
  benefits = defaultBenefits,
  ctaLabel = defaultProps.ctaLabel,
  imageSrc = defaultProps.imageSrc,
  imageAlt = defaultProps.imageAlt,
}: PrepStarterPackProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gray-100 min-h-[260px] md:min-h-[420px] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {eyebrow && (
          <span className="absolute top-4 left-4 bg-[#FFBD17] text-[#0B2341] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {eyebrow}
          </span>
        )}
      </div>
      <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341] leading-tight mb-4">
          {headline}
        </h3>
        <ul className="space-y-2 mb-6">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-[#00A651] mt-0.5 shrink-0" aria-hidden>
                &#10003;
              </span>
              <span className="text-sm md:text-base">{b}</span>
            </li>
          ))}
        </ul>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651]/40 focus:border-[#00A651]"
          />
          <button
            type="button"
            className="w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {ctaLabel}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-3">
          We&rsquo;ll email you the prep pack — no spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PrepStarterPackInline — narrower module, no image, mid-page friendly.
// ─────────────────────────────────────────────────────────────────────────────

export function PrepStarterPackInline({
  eyebrow = defaultProps.eyebrow,
  headline = defaultProps.headline,
  benefits = defaultBenefits,
  ctaLabel = defaultProps.ctaLabel,
}: PrepStarterPackProps = {}) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#0B2341] to-[#153A5C] text-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {eyebrow && (
              <span className="bg-[#FFBD17] text-[#0B2341] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                {eyebrow}
              </span>
            )}
            <h3 className="font-heading text-lg md:text-xl font-bold">{headline}</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-[#17FFDC]" aria-hidden>
                  &#10003;
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <form className="flex flex-col sm:flex-row md:flex-col gap-2 md:w-72 shrink-0">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#17FFDC]/40 focus:border-[#17FFDC]"
          />
          <button
            type="button"
            className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            {ctaLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PrepStarterPackVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

export function PrepStarterPackVariants() {
  return (
    <>
      <VariantLabel label="A — Hero Lead Magnet" />
      <PrepStarterPackHero />

      <VariantLabel label="B — Inline Lead Magnet" />
      <PrepStarterPackInline />
    </>
  );
}
