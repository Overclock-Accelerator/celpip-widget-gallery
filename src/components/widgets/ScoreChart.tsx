import { VariantLabel } from "./VariantLabel";

const scoreData = [
  { celpip: "12", clb: "12", cefr: "C2", dha: "Superior", desc: "Expert proficiency" },
  { celpip: "11", clb: "11", cefr: "C1+", dha: "Superior", desc: "Advanced proficiency" },
  { celpip: "10", clb: "10", cefr: "C1", dha: "Proficient", desc: "High professional proficiency" },
  { celpip: "9", clb: "9", cefr: "B2+", dha: "Proficient", desc: "Professional working proficiency" },
  { celpip: "8", clb: "8", cefr: "B2", dha: "Competent", desc: "Upper intermediate" },
  { celpip: "7", clb: "7", cefr: "B2", dha: "Competent", desc: "Intermediate" },
  { celpip: "6", clb: "6", cefr: "B1+", dha: "Competent", desc: "Lower intermediate" },
  { celpip: "5", clb: "5", cefr: "B1", dha: "Vocational", desc: "Pre-intermediate" },
  { celpip: "4", clb: "4", cefr: "A2+", dha: "Vocational", desc: "Elementary" },
];

export function ScoreChart() {
  return (
    <>
      <VariantLabel label="A — Interactive Score Table" />
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="bg-[#0B2341] p-6">
          <h3 className="font-heading text-xl font-bold text-white">Score Equivalency Chart</h3>
          <p className="text-gray-400 text-sm mt-1">CELPIP &middot; CLB &middot; CEFR &middot; DHA (Australia)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-heading font-bold text-[#0B2341] uppercase tracking-wider">CELPIP</th>
                <th className="px-6 py-3 text-left text-xs font-heading font-bold text-[#0B2341] uppercase tracking-wider">CLB Level</th>
                <th className="px-6 py-3 text-left text-xs font-heading font-bold text-[#0B2341] uppercase tracking-wider">CEFR</th>
                <th className="px-6 py-3 text-left text-xs font-heading font-bold text-[#0B2341] uppercase tracking-wider">DHA (Australia)</th>
                <th className="px-6 py-3 text-left text-xs font-heading font-bold text-[#0B2341] uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scoreData.map((row, i) => (
                <tr key={i} className="hover:bg-[#f0fdf4] transition-colors cursor-pointer">
                  <td className="px-6 py-3">
                    <span className="font-heading font-bold text-[#00A651] text-lg">{row.celpip}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-700 font-medium">{row.clb}</td>
                  <td className="px-6 py-3 text-gray-700">{row.cefr}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      row.dha === "Superior" ? "bg-[#0B2341] text-[#17FFDC]" :
                      row.dha === "Proficient" ? "bg-[#00A651] text-white" :
                      row.dha === "Competent" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-600"
                    }`}>{row.dha}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-500 text-sm">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
