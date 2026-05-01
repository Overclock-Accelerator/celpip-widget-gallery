import { VariantLabel } from "./VariantLabel";

const features = [
  { icon: "&#128187;", title: "Computer-Delivered", desc: "Take your test on a computer in a secure test centre environment." },
  { icon: "&#9201;", title: "Quick Results", desc: "Receive your results online in just 4-5 business days." },
  { icon: "&#127758;", title: "Globally Accepted", desc: "Recognized by IRCC, DHA Australia, and professional bodies." },
  { icon: "&#128274;", title: "One Sitting", desc: "Complete all four components in a single 3-hour session." },
  { icon: "&#128218;", title: "Free Prep", desc: "Access free practice tests, webinars, and study materials." },
  { icon: "&#127919;", title: "Real-Life Content", desc: "Test questions reflect everyday Canadian English scenarios." },
];

export function FeatureHighlights() {
  return (
    <>
      {/* Variant A: Icon grid */}
      <VariantLabel label="A — Icon Grid" />
      <div className="rounded-xl bg-white border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h3 className="font-heading text-2xl font-bold text-[#0B2341]">Why Choose CELPIP?</h3>
          <p className="text-gray-500 mt-2">The most convenient English language test for Canadian immigration.</p>
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

      {/* Variant B: Horizontal cards with green accent */}
      <VariantLabel label="B — Horizontal Cards" />
      <div className="rounded-xl bg-[#0B2341] p-8">
        <h3 className="font-heading text-2xl font-bold text-white text-center mb-8">The CELPIP Advantage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.slice(0, 4).map((f, i) => (
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
    </>
  );
}
