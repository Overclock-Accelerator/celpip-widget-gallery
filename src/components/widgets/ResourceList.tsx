import { VariantLabel } from "./VariantLabel";

const resources = [
  { type: "Blog", title: "5 Tips to Ace the CELPIP Speaking Test", date: "Apr 15, 2026", tag: "Speaking" },
  { type: "Webinar", title: "Understanding CLB Levels and CELPIP Scores", date: "Apr 10, 2026", tag: "Scoring" },
  { type: "Podcast", title: "Immigration Success Stories: From Test to PR", date: "Apr 5, 2026", tag: "Immigration" },
  { type: "YouTube", title: "CELPIP Writing Task 1 Walkthrough", date: "Mar 28, 2026", tag: "Writing" },
  { type: "Blog", title: "CELPIP vs. IELTS: Which Test Is Right for You?", date: "Mar 20, 2026", tag: "General" },
  { type: "Webinar", title: "Prep Strategies for CELPIP Listening", date: "Mar 15, 2026", tag: "Listening" },
];

const typeColors: Record<string, string> = {
  Blog: "bg-[#00A651] text-white",
  Webinar: "bg-[#0B2341] text-white",
  Podcast: "bg-purple-600 text-white",
  YouTube: "bg-red-600 text-white",
};

export function ResourceList() {
  return (
    <>
      {/* Variant A: Card grid */}
      <VariantLabel label="A — Card Grid" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.slice(0, 6).map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-br from-[#0B2341] to-[#153A5C] flex items-center justify-center">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeColors[r.type]}`}>{r.type}</span>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-400 mb-1">{r.date}</p>
              <h4 className="font-heading font-semibold text-[#0B2341] text-sm mb-2 leading-snug">{r.title}</h4>
              <span className="text-xs text-[#00A651] font-medium">{r.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Variant B: List with filters */}
      <VariantLabel label="B — Filtered List" />
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Blog", "Webinar", "Podcast", "YouTube"].map((f) => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${f === "All" ? "bg-[#0B2341] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-100">
          {resources.map((r, i) => (
            <div key={i} className="flex items-center gap-4 py-4 hover:bg-gray-50 px-2 rounded transition-colors cursor-pointer">
              <span className={`text-xs font-bold px-2.5 py-1 rounded ${typeColors[r.type]} w-20 text-center`}>{r.type}</span>
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-[#0B2341] text-sm">{r.title}</h4>
                <p className="text-xs text-gray-400">{r.date} &middot; {r.tag}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
