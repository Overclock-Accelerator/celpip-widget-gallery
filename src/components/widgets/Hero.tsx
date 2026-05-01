import { VariantLabel } from "./VariantLabel";

export type Cta = { label: string; href?: string };

export type HeroProps = {
  eyebrow?: string;
  headline?: string;
  headlineAccent?: string;
  subhead?: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export type HeroFormField = {
  type: "text" | "email" | "tel" | "select";
  placeholder: string;
  options?: string[];
};

export type HeroFormInHeaderProps = HeroProps & {
  badge?: string;
  bullets?: string[];
  formHeading?: string;
  formCtaLabel?: string;
  formDisclaimer?: string;
  fields?: HeroFormField[];
};

const defaultGradient: Required<Pick<HeroProps, "eyebrow" | "headline" | "headlineAccent" | "subhead">> & {
  primaryCta: Cta;
  secondaryCta: Cta;
} = {
  eyebrow: "Canadian English Language Proficiency",
  headline: "Prove Your English.",
  headlineAccent: "Unlock Your Future.",
  subhead:
    "CELPIP is Canada's leading English language test, accepted by IRCC for immigration, citizenship, and professional designation.",
  primaryCta: { label: "Book Your Test" },
  secondaryCta: { label: "Explore Test Dates" },
};

export function HeroGradient({
  eyebrow = defaultGradient.eyebrow,
  headline = defaultGradient.headline,
  headlineAccent = defaultGradient.headlineAccent,
  subhead = defaultGradient.subhead,
  primaryCta = defaultGradient.primaryCta,
  secondaryCta = defaultGradient.secondaryCta,
}: HeroProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#0B2341] to-[#153A5C] text-white p-12 md:p-16">
      <div className="max-w-3xl mx-auto text-center">
        {eyebrow && (
          <p className="text-[#00A651] font-semibold text-sm uppercase tracking-wider mb-4">{eyebrow}</p>
        )}
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {headline}
          {headlineAccent && (
            <>
              <br />
              <span className="text-[#17FFDC]">{headlineAccent}</span>
            </>
          )}
        </h1>
        {subhead && <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">{subhead}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCta && (
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultSplit: Required<Pick<HeroProps, "eyebrow" | "headline" | "subhead">> & {
  primaryCta: Cta;
  secondaryCta: Cta;
} = {
  eyebrow: "CELPIP General",
  headline: "Your Path to Canadian Immigration Starts Here",
  subhead:
    "Accepted by Immigration, Refugees and Citizenship Canada (IRCC) for permanent residency and citizenship applications.",
  primaryCta: { label: "Register Now" },
  secondaryCta: { label: "Free Prep Materials" },
};

export function HeroSplit({
  eyebrow = defaultSplit.eyebrow,
  headline = defaultSplit.headline,
  subhead = defaultSplit.subhead,
  primaryCta = defaultSplit.primaryCta,
  secondaryCta = defaultSplit.secondaryCta,
  imageSrc,
  imageAlt = "Hero image",
}: HeroProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
        {eyebrow && (
          <p className="text-[#00A651] font-semibold text-sm uppercase tracking-wider mb-3">{eyebrow}</p>
        )}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#0B2341] mb-4 leading-tight">{headline}</h1>
        {subhead && <p className="text-gray-600 mb-6">{subhead}</p>}
        <div className="flex gap-3">
          {primaryCta && (
            <button className="bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button className="text-[#0B2341] border border-[#0B2341] hover:bg-[#0B2341] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
      <div className="md:w-1/2 bg-gradient-to-br from-[#0B2341] to-[#00A651] min-h-[300px] flex items-center justify-center">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-white/60 p-8">
            <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
            <p className="text-sm">Hero Image / Video</p>
          </div>
        )}
      </div>
    </div>
  );
}

const defaultFormInHeader: Required<
  Pick<HeroFormInHeaderProps, "badge" | "headline" | "subhead" | "bullets" | "formHeading" | "formCtaLabel" | "formDisclaimer" | "fields">
> = {
  badge: "SPECIAL OFFER",
  headline: "CELPIP Test in the Philippines",
  subhead:
    "New test centres now open in Manila, Cebu, and Davao. Book your CELPIP test today and take the first step toward your Canadian dream.",
  bullets: [
    "Computer-delivered — results in 4-5 days",
    "Accepted by IRCC for all immigration programs",
    "One sitting — complete in 3 hours",
  ],
  formHeading: "Get Test Dates & Pricing",
  formCtaLabel: "Send Me Info",
  formDisclaimer: "We respect your privacy. No spam.",
  fields: [
    { type: "text", placeholder: "Full Name" },
    { type: "email", placeholder: "Email Address" },
    { type: "tel", placeholder: "Phone Number" },
    { type: "select", placeholder: "Select Your City", options: ["Manila", "Cebu", "Davao"] },
  ],
};

export function HeroFormInHeader({
  badge = defaultFormInHeader.badge,
  headline = defaultFormInHeader.headline,
  subhead = defaultFormInHeader.subhead,
  bullets = defaultFormInHeader.bullets,
  formHeading = defaultFormInHeader.formHeading,
  formCtaLabel = defaultFormInHeader.formCtaLabel,
  formDisclaimer = defaultFormInHeader.formDisclaimer,
  fields = defaultFormInHeader.fields,
}: HeroFormInHeaderProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-[#0B2341] text-white flex flex-col md:flex-row">
      <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
        {badge && (
          <div className="inline-block bg-[#00A651] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
            {badge}
          </div>
        )}
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">{headline}</h1>
        {subhead && <p className="text-gray-300 mb-6">{subhead}</p>}
        {bullets.length > 0 && (
          <ul className="space-y-2 text-gray-300">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-[#00A651]">&#10003;</span> {b}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="md:w-2/5 bg-white p-8 flex flex-col justify-center">
        <h3 className="font-heading text-lg font-bold text-[#0B2341] mb-4">{formHeading}</h3>
        <div className="space-y-3">
          {fields.map((f, i) =>
            f.type === "select" ? (
              <select
                key={i}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 text-gray-400 text-sm bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  {f.placeholder}
                </option>
                {f.options?.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                key={i}
                type={f.type}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 text-gray-800 text-sm"
                placeholder={f.placeholder}
              />
            ),
          )}
          <button className="w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-3 rounded-lg transition-colors">
            {formCtaLabel}
          </button>
        </div>
        {formDisclaimer && <p className="text-xs text-gray-400 mt-3 text-center">{formDisclaimer}</p>}
      </div>
    </div>
  );
}

export function HeroVariants() {
  return (
    <>
      <VariantLabel label="A — Full-Width Gradient" />
      <HeroGradient />

      <VariantLabel label="B — Split Layout" />
      <HeroSplit />

      <VariantLabel label="C — Form-in-Header (Campaign Landing)" />
      <HeroFormInHeader />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bold above-the-fold variants — bigger imagery, more variation, lead-capture
// ─────────────────────────────────────────────────────────────────────────────

export type HeroSplitFormProps = HeroProps & {
  formHeading?: string;
  formCtaLabel?: string;
  formDisclaimer?: string;
  fields?: HeroFormField[];
};

export type HeroBigStatProps = HeroProps & {
  stat?: { value: string; label: string };
};

// 1) Full-Bleed Image — image fills hero as background, text floats over dark gradient.
const defaultFullBleed: Required<Pick<HeroProps, "eyebrow" | "headline" | "subhead">> & {
  primaryCta: Cta;
  secondaryCta: Cta;
} = {
  eyebrow: "Accelerate Your Future",
  headline: "Your Canada-bound career, in one English test.",
  subhead:
    "CELPIP-General is officially designated by IRCC for permanent residency. Less than 3 hours, computer-delivered, results in 2–4 days.",
  primaryCta: { label: "Find a Test Date" },
  secondaryCta: { label: "See Test Centres" },
};

export function HeroFullBleedImage({
  eyebrow = defaultFullBleed.eyebrow,
  headline = defaultFullBleed.headline,
  subhead = defaultFullBleed.subhead,
  primaryCta = defaultFullBleed.primaryCta,
  secondaryCta = defaultFullBleed.secondaryCta,
  imageSrc,
  imageAlt = "Hero image",
}: HeroProps = {}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden text-white flex items-end"
      style={{ minHeight: "70vh" }}
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2341] to-[#00A651]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341]/95 via-[#0B2341]/60 to-[#0B2341]/20" />
      <div className="relative z-10 w-full p-8 md:p-16 max-w-5xl">
        {eyebrow && (
          <p className="text-[#17FFDC] font-semibold text-sm uppercase tracking-wider mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
          {headline}
        </h1>
        {subhead && (
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">{subhead}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          {primaryCta && (
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 2) Split-Form — large image LEFT (60%), white form panel RIGHT (40%).
const defaultSplitForm: Required<
  Pick<HeroSplitFormProps, "eyebrow" | "headline" | "subhead" | "formHeading" | "formCtaLabel" | "formDisclaimer" | "fields">
> = {
  eyebrow: "CELPIP — Approved by IRCC",
  headline: "Get the official CELPIP practice test, free.",
  subhead:
    "Two free practice tests, weekly webinars, and 100+ hours of guided prep. Tell us where you are testing and we will send everything to your inbox.",
  formHeading: "Get free prep + test dates",
  formCtaLabel: "Send Me the Free Prep",
  formDisclaimer: "We respect your privacy. No spam.",
  fields: [
    { type: "text", placeholder: "Full Name" },
    { type: "email", placeholder: "Email Address" },
    { type: "tel", placeholder: "Phone Number" },
    {
      type: "select",
      placeholder: "Target Test City",
      options: ["Toronto", "Vancouver", "Mumbai", "Manila", "Lagos", "Dubai"],
    },
  ],
};

export function HeroSplitForm({
  eyebrow = defaultSplitForm.eyebrow,
  headline = defaultSplitForm.headline,
  subhead = defaultSplitForm.subhead,
  formHeading = defaultSplitForm.formHeading,
  formCtaLabel = defaultSplitForm.formCtaLabel,
  formDisclaimer = defaultSplitForm.formDisclaimer,
  fields = defaultSplitForm.fields,
  imageSrc,
  imageAlt = "Hero image",
}: HeroSplitFormProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col md:flex-row">
      <div className="md:w-3/5 relative bg-gradient-to-br from-[#0B2341] to-[#00A651] min-h-[320px] md:min-h-[560px]">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/60 p-8 text-sm">
            Hero Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341]/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          {eyebrow && (
            <p className="text-[#17FFDC] font-semibold text-xs uppercase tracking-wider mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight max-w-xl">
            {headline}
          </h1>
          {subhead && (
            <p className="text-gray-200 mt-4 max-w-lg hidden md:block">{subhead}</p>
          )}
        </div>
      </div>
      <div className="md:w-2/5 bg-white p-8 md:p-10 flex flex-col justify-center">
        <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-2">{formHeading}</h3>
        {subhead && <p className="text-gray-500 text-sm md:hidden mb-4">{subhead}</p>}
        <div className="space-y-3 mt-2">
          {fields.map((f, i) =>
            f.type === "select" ? (
              <select
                key={i}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 text-gray-400 text-sm bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  {f.placeholder}
                </option>
                {f.options?.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                key={i}
                type={f.type}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 text-gray-800 text-sm"
                placeholder={f.placeholder}
              />
            ),
          )}
          <button className="w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-3 rounded-lg transition-colors">
            {formCtaLabel}
          </button>
        </div>
        {formDisclaimer && (
          <p className="text-xs text-gray-400 mt-3 text-center">{formDisclaimer}</p>
        )}
      </div>
    </div>
  );
}

// 3) Floating Panel — wide image, navy card overlaps lower portion.
const defaultFloating: Required<Pick<HeroProps, "eyebrow" | "headline" | "subhead">> & {
  primaryCta: Cta;
  secondaryCta: Cta;
} = {
  eyebrow: "Approved by IRCC · Approved by DHA",
  headline: "200+ test centres across 40+ countries — find yours.",
  subhead:
    "CELPIP English exams are globally accepted for immigration to Canada and Australia. Computer-delivered. One sitting. Results in 2–4 days.",
  primaryCta: { label: "Find a Test Centre" },
  secondaryCta: { label: "See Test Dates" },
};

export function HeroFloatingPanel({
  eyebrow = defaultFloating.eyebrow,
  headline = defaultFloating.headline,
  subhead = defaultFloating.subhead,
  primaryCta = defaultFloating.primaryCta,
  secondaryCta = defaultFloating.secondaryCta,
  imageSrc,
  imageAlt = "Hero image",
}: HeroProps = {}) {
  return (
    <div className="relative pb-24 md:pb-32">
      <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#0B2341] to-[#153A5C]" style={{ height: "480px" }}>
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
            Hero Image
          </div>
        )}
      </div>
      <div className="md:absolute md:left-1/2 md:bottom-0 md:-translate-x-1/2 md:translate-y-0 mt-4 md:mt-0 mx-auto max-w-2xl bg-[#0B2341] text-white rounded-xl shadow-2xl p-8 md:p-10">
        {eyebrow && (
          <p className="text-[#17FFDC] font-semibold text-xs uppercase tracking-wider mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-tight">
          {headline}
        </h1>
        {subhead && <p className="text-gray-300 text-sm md:text-base mb-6">{subhead}</p>}
        <div className="flex flex-col sm:flex-row gap-3">
          {primaryCta && (
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button className="border-2 border-white hover:bg-white/10 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 4) Big-Stat — image left, navy stat panel right with one giant number.
const defaultBigStat: Required<Pick<HeroBigStatProps, "eyebrow" | "headline" | "subhead">> & {
  primaryCta: Cta;
  secondaryCta: Cta;
  stat: { value: string; label: string };
} = {
  eyebrow: "CELPIP — Speed, Reliability, Credibility",
  headline: "Results that move at the speed of your decision.",
  subhead:
    "Self-paced test, completed in one sitting in 3 hours or less. Official PDF score report — accepted by IRCC for permanent residency and citizenship.",
  primaryCta: { label: "Book Your Test" },
  secondaryCta: { label: "View Score Equivalency" },
  stat: { value: "2–4", label: "days to your CELPIP results" },
};

export function HeroBigStat({
  eyebrow = defaultBigStat.eyebrow,
  headline = defaultBigStat.headline,
  subhead = defaultBigStat.subhead,
  primaryCta = defaultBigStat.primaryCta,
  secondaryCta = defaultBigStat.secondaryCta,
  stat = defaultBigStat.stat,
  imageSrc,
  imageAlt = "Hero image",
}: HeroBigStatProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-br from-[#0B2341] to-[#00A651] min-h-[320px] md:min-h-[520px]">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/60 p-8 text-sm">
            Hero Image
          </div>
        )}
      </div>
      <div className="md:w-1/2 bg-[#0B2341] text-white p-10 md:p-14 flex flex-col justify-center">
        {eyebrow && (
          <p className="text-[#17FFDC] font-semibold text-xs uppercase tracking-wider mb-4">
            {eyebrow}
          </p>
        )}
        <div className="mb-6">
          <p className="font-heading text-7xl md:text-8xl font-bold text-[#17FFDC] leading-none">
            {stat.value}
          </p>
          <p className="text-gray-300 text-sm md:text-base mt-2 uppercase tracking-wide">
            {stat.label}
          </p>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-tight">
          {headline}
        </h1>
        {subhead && <p className="text-gray-300 mb-6">{subhead}</p>}
        <div className="flex flex-col sm:flex-row gap-3">
          {primaryCta && (
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button className="border-2 border-white hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 5) Centered — wide cinematic banner image, centered text below on white.
const defaultCentered: Required<Pick<HeroProps, "eyebrow" | "headline" | "subhead">> & {
  primaryCta: Cta;
  secondaryCta: Cta;
} = {
  eyebrow: "Accelerate Your Future",
  headline: "The English test that fits your life.",
  subhead:
    "Take CELPIP, the leading English language proficiency test for immigration, professional designation, and university admission — globally accepted, supportively delivered.",
  primaryCta: { label: "Find a Test Date" },
  secondaryCta: { label: "Free Prep Resources" },
};

export function HeroCentered({
  eyebrow = defaultCentered.eyebrow,
  headline = defaultCentered.headline,
  subhead = defaultCentered.subhead,
  primaryCta = defaultCentered.primaryCta,
  secondaryCta = defaultCentered.secondaryCta,
  imageSrc,
  imageAlt = "Hero image",
}: HeroProps = {}) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-200">
      <div className="relative bg-gradient-to-br from-[#0B2341] to-[#00A651]" style={{ height: "360px" }}>
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
            Hero Image
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="max-w-3xl mx-auto text-center px-6 py-12 md:py-16">
        {eyebrow && (
          <p className="text-[#00A651] font-semibold text-sm uppercase tracking-wider mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#0B2341] mb-5 leading-tight">
          {headline}
        </h1>
        {subhead && <p className="text-gray-600 text-lg mb-8">{subhead}</p>}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {primaryCta && (
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              {primaryCta.label}
            </button>
          )}
          {secondaryCta && (
            <button className="text-[#0B2341] border border-[#0B2341] hover:bg-[#0B2341] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              {secondaryCta.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeroBoldVariants() {
  return (
    <>
      <VariantLabel label="D — Full-Bleed Image (editorial / aspirational)" />
      <HeroFullBleedImage imageSrc="/heroes/12.png" imageAlt="Aspirational candidate portrait" />

      <VariantLabel label="E — Split with Lead-Capture Form" />
      <HeroSplitForm imageSrc="/heroes/9.png" imageAlt="Candidate at test centre" />

      <VariantLabel label="F — Wide Image with Floating Navy Panel" />
      <HeroFloatingPanel imageSrc="/heroes/3.png" imageAlt="Test centre exterior" />

      <VariantLabel label="G — Big Stat (image left, giant number right)" />
      <HeroBigStat imageSrc="/heroes/8.png" imageAlt="Candidate reviewing score report" />

      <VariantLabel label="H — Centered (cinematic banner above centered text)" />
      <HeroCentered imageSrc="/heroes/5.png" imageAlt="Cinematic candidate moment" />
    </>
  );
}
