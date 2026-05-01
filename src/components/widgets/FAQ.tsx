"use client";
import { useState } from "react";
import { VariantLabel } from "./VariantLabel";

const faqs = [
  { q: "What is CELPIP?", a: "CELPIP (Canadian English Language Proficiency Index Program) is an English language testing program that assesses functional listening, reading, writing, and speaking proficiency.", cat: "General" },
  { q: "How long is the CELPIP test?", a: "The CELPIP-General test takes approximately 3 hours to complete. All four components are done in a single sitting.", cat: "General" },
  { q: "How quickly do I get my results?", a: "CELPIP results are typically available online within 4-5 business days after your test date.", cat: "Results" },
  { q: "Is CELPIP accepted for Canadian immigration?", a: "Yes, CELPIP-General is accepted by IRCC for permanent residency and citizenship applications in Canada.", cat: "Immigration" },
  { q: "Where can I take the CELPIP test?", a: "CELPIP is available at test centres across Canada, India, the Philippines, UAE, and other locations worldwide.", cat: "Logistics" },
];

function AccordionItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button onClick={onClick} className="w-full flex items-center justify-between py-4 text-left hover:text-[#00A651] transition-colors">
        <span className="font-heading font-semibold text-[#0B2341] pr-4">{q}</span>
        <span className={`text-[#00A651] transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      {isOpen && <p className="pb-4 text-gray-600 text-sm">{a}</p>}
    </div>
  );
}

export function FAQVariants() {
  const [openA, setOpenA] = useState(0);
  const [openB, setOpenB] = useState(0);

  return (
    <>
      {/* Variant A: Simple accordion */}
      <VariantLabel label="A — Simple Accordion" />
      <div className="rounded-xl bg-white border border-gray-200 p-8">
        <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-6">Frequently Asked Questions</h3>
        <div>
          {faqs.map((f, i) => (
            <AccordionItem key={i} q={f.q} a={f.a} isOpen={openA === i} onClick={() => setOpenA(openA === i ? -1 : i)} />
          ))}
        </div>
      </div>

      {/* Variant B: Tabbed by category */}
      <VariantLabel label="B — Category Tabs" />
      <div className="rounded-xl bg-[#0B2341] p-8">
        <h3 className="font-heading text-xl font-bold text-white mb-6">Questions? We Have Answers</h3>
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "General", "Results", "Immigration", "Logistics"].map((cat) => (
            <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === "All" ? "bg-[#00A651] text-white" : "bg-[#153A5C] text-gray-300 hover:bg-[#1e4a6e]"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="bg-[#153A5C] rounded-lg p-6">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-[#1e4a6e] last:border-b-0">
              <button onClick={() => setOpenB(openB === i ? -1 : i)} className="w-full flex items-center justify-between py-4 text-left">
                <span className="text-white font-medium pr-4">{f.q}</span>
                <span className={`text-[#17FFDC] transition-transform ${openB === i ? "rotate-180" : ""}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              {openB === i && <p className="pb-4 text-gray-400 text-sm">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
