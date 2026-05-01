import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type MomentSpotlightProps = {
  imageSrc?: string;
  imageAlt?: string;
  oneLineMoment?: string;
  paragraphQuote?: string;
  attribution?: { name: string; location: string; score?: string; date?: string };
};

// ─────────────────────────────────────────────────────────────────────────────
// MomentSpotlightLargePhoto — magazine feature: full-width photo on left,
// pull-quote + attribution on right.
// ─────────────────────────────────────────────────────────────────────────────

const defaultLargePhoto: Required<MomentSpotlightProps> = {
  imageSrc: "https://picsum.photos/seed/celpip-moment-1/1200/1400",
  imageAlt: "Liam at his kitchen table looking at his Express Entry result on a laptop",
  oneLineMoment: "From “I should book my CELPIP” to PR result, in eight weeks.",
  paragraphQuote:
    "I kept putting the test off because I thought I needed months of prep. I finally booked it on a Sunday, took it the following Tuesday, and had my CLB scores by Friday. I uploaded them to Express Entry the same afternoon. Six weeks later my PR was approved. The hardest part was just clicking 'register'.",
  attribution: {
    name: "Liam O'Connor",
    location: "Cork, Ireland → Calgary",
    score: "CLB 10",
    date: "March 2026",
  },
};

export function MomentSpotlightLargePhoto({
  imageSrc = defaultLargePhoto.imageSrc,
  imageAlt = defaultLargePhoto.imageAlt,
  oneLineMoment = defaultLargePhoto.oneLineMoment,
  paragraphQuote = defaultLargePhoto.paragraphQuote,
  attribution = defaultLargePhoto.attribution,
}: MomentSpotlightProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gray-100 min-h-[320px] md:min-h-[480px] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {attribution.date && (
          <span className="absolute bottom-4 left-4 bg-white/90 text-[#0B2341] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {attribution.date}
          </span>
        )}
      </div>
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <p className="text-[#00A651] font-semibold text-xs uppercase tracking-[0.2em] mb-3">
          A CELPIP Moment
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341] leading-tight mb-6">
          {oneLineMoment}
        </h3>
        <blockquote className="text-gray-700 leading-relaxed italic border-l-4 border-[#00A651] pl-4 mb-6">
          &ldquo;{paragraphQuote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-12 h-12 rounded-full bg-[#0B2341] flex items-center justify-center text-white font-bold text-lg shrink-0">
            {attribution.name[0]}
          </div>
          <div>
            <p className="font-heading font-semibold text-[#0B2341]">{attribution.name}</p>
            <p className="text-gray-500 text-sm">
              {attribution.location}
              {attribution.score && (
                <>
                  {" "}
                  &middot;{" "}
                  <span className="text-[#0B2341] font-semibold">{attribution.score}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MomentSpotlightInline — smaller editorial format with circular avatar,
// italic one-line moment, paragraph below.
// ─────────────────────────────────────────────────────────────────────────────

const defaultInline: Required<MomentSpotlightProps> = {
  imageSrc: "https://picsum.photos/seed/celpip-moment-2/300/300",
  imageAlt: "Portrait of Aastha smiling outdoors",
  oneLineMoment: "She booked the test on a Tuesday and had her score before the weekend.",
  paragraphQuote:
    "Aastha was working full-time as a nurse in Mumbai while preparing her CRNBC application. She didn't have time for a test that demanded weeks of leave. CELPIP fit her life: one Saturday morning, three hours, results in five business days. By the next month her credentialing file was complete.",
  attribution: {
    name: "Aastha Patel",
    location: "Mumbai → Vancouver",
    score: "CLB 9",
    date: "February 2026",
  },
};

export function MomentSpotlightInline({
  imageSrc = defaultInline.imageSrc,
  imageAlt = defaultInline.imageAlt,
  oneLineMoment = defaultInline.oneLineMoment,
  paragraphQuote = defaultInline.paragraphQuote,
  attribution = defaultInline.attribution,
}: MomentSpotlightProps = {}) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 px-6 py-10 md:px-12 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-4 ring-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-heading font-semibold text-[#0B2341]">{attribution.name}</p>
            <p className="text-gray-500 text-sm">
              {attribution.location}
              {attribution.score && (
                <>
                  {" "}
                  &middot;{" "}
                  <span className="text-[#0B2341] font-semibold">{attribution.score}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <p className="font-heading italic text-xl md:text-2xl text-[#0B2341] leading-snug mb-4">
          &ldquo;{oneLineMoment}&rdquo;
        </p>
        <p className="text-gray-600 leading-relaxed">{paragraphQuote}</p>
        {attribution.date && (
          <p className="text-gray-400 text-xs uppercase tracking-wider mt-6">
            {attribution.date}
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MomentSpotlightVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

export function MomentSpotlightVariants() {
  return (
    <>
      <VariantLabel label="A — Large Photo Feature" />
      <MomentSpotlightLargePhoto />

      <VariantLabel label="B — Inline Avatar Moment" />
      <MomentSpotlightInline />
    </>
  );
}
