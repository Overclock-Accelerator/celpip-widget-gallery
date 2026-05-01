import { VariantLabel } from "./VariantLabel";

export type Cta = { label: string; href?: string };

export type CTAProps = {
  heading?: string;
  subheading?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

const defaultBoldBanner: Required<Omit<CTAProps, "secondaryCta">> & { secondaryCta: Cta } = {
  heading: "Ready to Book Your CELPIP Test?",
  subheading: "Find available test dates near you. Results in 4-5 business days.",
  primaryCta: { label: "Find Test Dates" },
  secondaryCta: { label: "Prep Resources" },
};

export function CTABoldBanner({
  heading = defaultBoldBanner.heading,
  subheading = defaultBoldBanner.subheading,
  primaryCta = defaultBoldBanner.primaryCta,
  secondaryCta = defaultBoldBanner.secondaryCta,
}: CTAProps = {}) {
  return (
    <div className="rounded-xl bg-[#00A651] text-white p-10 text-center">
      <h3 className="font-heading text-2xl font-bold mb-3">{heading}</h3>
      {subheading && <p className="text-white/80 mb-6 max-w-lg mx-auto">{subheading}</p>}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {primaryCta && (
          <button className="bg-white text-[#00A651] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {primaryCta.label}
          </button>
        )}
        {secondaryCta && (
          <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
            {secondaryCta.label}
          </button>
        )}
      </div>
    </div>
  );
}

const defaultNavyAccent: Required<Pick<CTAProps, "heading" | "subheading" | "primaryCta">> = {
  heading: "Prepare with Free Resources",
  subheading: "Access practice tests, webinars, and study guides at no cost.",
  primaryCta: { label: "Start Preparing" },
};

export function CTANavyAccent({
  heading = defaultNavyAccent.heading,
  subheading = defaultNavyAccent.subheading,
  primaryCta = defaultNavyAccent.primaryCta,
}: CTAProps = {}) {
  return (
    <div className="rounded-xl bg-[#0B2341] text-white p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A651] to-[#17FFDC]" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading text-2xl font-bold mb-2">{heading}</h3>
          {subheading && <p className="text-gray-300">{subheading}</p>}
        </div>
        {primaryCta && (
          <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
            {primaryCta.label}
          </button>
        )}
      </div>
    </div>
  );
}

const defaultCardWithIcon: Required<Pick<CTAProps, "heading" | "subheading" | "primaryCta">> = {
  heading: "Check Available Dates",
  subheading: "Browse upcoming CELPIP test sittings by location and date.",
  primaryCta: { label: "View Calendar" },
};

export function CTACardWithIcon({
  heading = defaultCardWithIcon.heading,
  subheading = defaultCardWithIcon.subheading,
  primaryCta = defaultCardWithIcon.primaryCta,
}: CTAProps = {}) {
  return (
    <div className="rounded-xl border-2 border-[#0B2341] bg-white p-8 flex flex-col md:flex-row items-center gap-6">
      <div className="w-16 h-16 bg-[#0B2341] rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-8 h-8 text-[#17FFDC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-1">{heading}</h3>
        {subheading && <p className="text-gray-500">{subheading}</p>}
      </div>
      {primaryCta && (
        <button className="bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          {primaryCta.label}
        </button>
      )}
    </div>
  );
}

export function CTAVariants() {
  return (
    <>
      <VariantLabel label="A — Bold Banner" />
      <CTABoldBanner />

      <VariantLabel label="B — Navy with Accent" />
      <CTANavyAccent />

      <VariantLabel label="C — Card with Icon" />
      <CTACardWithIcon />
    </>
  );
}
