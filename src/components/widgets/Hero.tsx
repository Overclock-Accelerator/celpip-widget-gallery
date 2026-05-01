import { VariantLabel } from "./VariantLabel";

export function HeroVariants() {
  return (
    <>
      {/* Variant A: Full-width gradient with centered text */}
      <VariantLabel label="A — Full-Width Gradient" />
      <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#0B2341] to-[#153A5C] text-white p-12 md:p-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#00A651] font-semibold text-sm uppercase tracking-wider mb-4">Canadian English Language Proficiency</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Prove Your English.<br />
            <span className="text-[#17FFDC]">Unlock Your Future.</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            CELPIP is Canada&apos;s leading English language test, accepted by IRCC for immigration, citizenship, and professional designation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Book Your Test
            </button>
            <button className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Explore Test Dates
            </button>
          </div>
        </div>
      </div>

      {/* Variant B: Split layout with image placeholder */}
      <VariantLabel label="B — Split Layout" />
      <div className="rounded-xl overflow-hidden bg-white border border-gray-200 flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <p className="text-[#00A651] font-semibold text-sm uppercase tracking-wider mb-3">CELPIP General</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#0B2341] mb-4 leading-tight">
            Your Path to Canadian Immigration Starts Here
          </h1>
          <p className="text-gray-600 mb-6">
            Accepted by Immigration, Refugees and Citizenship Canada (IRCC) for permanent residency and citizenship applications.
          </p>
          <div className="flex gap-3">
            <button className="bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Register Now
            </button>
            <button className="text-[#0B2341] border border-[#0B2341] hover:bg-[#0B2341] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Free Prep Materials
            </button>
          </div>
        </div>
        <div className="md:w-1/2 bg-gradient-to-br from-[#0B2341] to-[#00A651] min-h-[300px] flex items-center justify-center">
          <div className="text-center text-white/60 p-8">
            <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
            <p className="text-sm">Hero Image / Video</p>
          </div>
        </div>
      </div>

      {/* Variant C: Form-in-header (campaign optimized) */}
      <VariantLabel label="C — Form-in-Header (Campaign Landing)" />
      <div className="rounded-xl overflow-hidden bg-[#0B2341] text-white flex flex-col md:flex-row">
        <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
          <div className="inline-block bg-[#00A651] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
            SPECIAL OFFER
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
            CELPIP Test in the Philippines
          </h1>
          <p className="text-gray-300 mb-6">
            New test centres now open in Manila, Cebu, and Davao. Book your CELPIP test today and take the first step toward your Canadian dream.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2"><span className="text-[#00A651]">&#10003;</span> Computer-delivered — results in 4-5 days</li>
            <li className="flex items-center gap-2"><span className="text-[#00A651]">&#10003;</span> Accepted by IRCC for all immigration programs</li>
            <li className="flex items-center gap-2"><span className="text-[#00A651]">&#10003;</span> One sitting — complete in 3 hours</li>
          </ul>
        </div>
        <div className="md:w-2/5 bg-white p-8 flex flex-col justify-center">
          <h3 className="font-heading text-lg font-bold text-[#0B2341] mb-4">Get Test Dates & Pricing</h3>
          <div className="space-y-3">
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 text-sm" placeholder="Full Name" />
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 text-sm" placeholder="Email Address" />
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 text-sm" placeholder="Phone Number" />
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-400 text-sm">
              <option>Select Your City</option>
              <option>Manila</option>
              <option>Cebu</option>
              <option>Davao</option>
            </select>
            <button className="w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-3 rounded-lg transition-colors">
              Send Me Info
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">We respect your privacy. No spam.</p>
        </div>
      </div>
    </>
  );
}
