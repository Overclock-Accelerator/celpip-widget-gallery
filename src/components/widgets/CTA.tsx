import { VariantLabel } from "./VariantLabel";

export function CTAVariants() {
  return (
    <>
      {/* Variant A: Bold green banner */}
      <VariantLabel label="A — Bold Banner" />
      <div className="rounded-xl bg-[#00A651] text-white p-10 text-center">
        <h3 className="font-heading text-2xl font-bold mb-3">Ready to Book Your CELPIP Test?</h3>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">Find available test dates near you. Results in 4-5 business days.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-white text-[#00A651] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Find Test Dates
          </button>
          <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
            Prep Resources
          </button>
        </div>
      </div>

      {/* Variant B: Navy with accent line */}
      <VariantLabel label="B — Navy with Accent" />
      <div className="rounded-xl bg-[#0B2341] text-white p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A651] to-[#17FFDC]" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">Prepare with Free Resources</h3>
            <p className="text-gray-300">Access practice tests, webinars, and study guides at no cost.</p>
          </div>
          <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
            Start Preparing
          </button>
        </div>
      </div>

      {/* Variant C: Card with icon */}
      <VariantLabel label="C — Card with Icon" />
      <div className="rounded-xl border-2 border-[#0B2341] bg-white p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-[#0B2341] rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-[#17FFDC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-1">Check Available Dates</h3>
          <p className="text-gray-500">Browse upcoming CELPIP test sittings by location and date.</p>
        </div>
        <button className="bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          View Calendar
        </button>
      </div>
    </>
  );
}
