import { VariantLabel } from "./VariantLabel";

export function FormVariants() {
  return (
    <>
      {/* Variant A: Simple lead capture */}
      <VariantLabel label="A — Simple Lead Capture" />
      <div className="rounded-xl bg-white border border-gray-200 p-8 max-w-xl">
        <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-2">Stay Updated</h3>
        <p className="text-gray-500 text-sm mb-6">Get notified about new test dates and prep resources in your area.</p>
        <div className="space-y-3">
          <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" placeholder="Your Name" />
          <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" placeholder="Email Address" />
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-400">
            <option>Select Country</option>
            <option>Canada</option>
            <option>India</option>
            <option>Philippines</option>
            <option>UAE</option>
            <option>Australia</option>
          </select>
          <button className="w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-3 rounded-lg transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Variant B: Inline / horizontal */}
      <VariantLabel label="B — Inline Horizontal" />
      <div className="rounded-xl bg-[#0B2341] p-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <h3 className="font-heading text-xl font-bold text-white mb-1">Download Free Practice Test</h3>
            <p className="text-gray-400 text-sm">Enter your email and we&apos;ll send it right over.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <input className="flex-1 border border-[#153A5C] bg-[#153A5C] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-400" placeholder="Your Email" />
            <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              Send It
            </button>
          </div>
        </div>
      </div>

      {/* Variant C: Multi-step feel */}
      <VariantLabel label="C — Contact Form (B2B)" />
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-8 max-w-2xl">
        <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-1">Institutional Inquiries</h3>
        <p className="text-gray-500 text-sm mb-6">For organizations interested in using CELPIP scores for admissions or hiring.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm" placeholder="First Name" />
          <input className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm" placeholder="Last Name" />
          <input className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm" placeholder="Work Email" />
          <input className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm" placeholder="Organization" />
          <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-400 md:col-span-2">
            <option>How can we help?</option>
            <option>Score acceptance</option>
            <option>Bulk testing</option>
            <option>Partnership inquiry</option>
          </select>
          <textarea className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm md:col-span-2" rows={3} placeholder="Additional details..." />
          <button className="bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold py-3 rounded-lg transition-colors md:col-span-2">
            Submit Inquiry
          </button>
        </div>
      </div>
    </>
  );
}
