import { VariantLabel } from "./VariantLabel";

export type Feature = { icon: string; title: string; desc: string };

export type FeatureProps = {
  heading?: string;
  subheading?: string;
  features?: Feature[];
};

const defaultFeatures: Feature[] = [
  { icon: "&#128187;", title: "Computer-Delivered", desc: "Take your test on a computer in a secure test centre environment." },
  { icon: "&#9201;", title: "Quick Results", desc: "Receive your results online in just 4-5 business days." },
  { icon: "&#127758;", title: "Globally Accepted", desc: "Recognized by IRCC, DHA Australia, and professional bodies." },
  { icon: "&#128274;", title: "One Sitting", desc: "Complete all four components in a single 3-hour session." },
  { icon: "&#128218;", title: "Free Prep", desc: "Access free practice tests, webinars, and study materials." },
  { icon: "&#127919;", title: "Real-Life Content", desc: "Test questions reflect everyday Canadian English scenarios." },
];

export function FeatureGrid({
  heading = "Why Choose CELPIP?",
  subheading = "The most convenient English language test for Canadian immigration.",
  features = defaultFeatures,
}: FeatureProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-bold text-[#0B2341]">{heading}</h3>
        {subheading && <p className="text-gray-500 mt-2">{subheading}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-4xl mb-3" dangerouslySetInnerHTML={{ __html: f.icon }} />
            <h4 className="font-heading font-semibold text-[#0B2341] mb-2">{f.title}</h4>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureNavyCards({
  heading = "The CELPIP Advantage",
  features = defaultFeatures.slice(0, 4),
}: FeatureProps = {}) {
  return (
    <div className="rounded-xl bg-[#0B2341] p-8">
      <h3 className="font-heading text-2xl font-bold text-white text-center mb-8">{heading}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4 bg-[#153A5C] rounded-lg p-5">
            <div className="w-10 h-10 bg-[#00A651] rounded-lg flex items-center justify-center flex-shrink-0 text-xl" dangerouslySetInnerHTML={{ __html: f.icon }} />
            <div>
              <h4 className="font-heading font-semibold text-white mb-1">{f.title}</h4>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureHighlights() {
  return (
    <>
      <VariantLabel label="A — Icon Grid" />
      <FeatureGrid />

      <VariantLabel label="B — Horizontal Cards" />
      <FeatureNavyCards />
    </>
  );
}
