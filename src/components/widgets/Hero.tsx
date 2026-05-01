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
              <select key={i} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-400 text-sm">
                <option>{f.placeholder}</option>
                {f.options?.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                key={i}
                type={f.type}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 text-sm"
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
