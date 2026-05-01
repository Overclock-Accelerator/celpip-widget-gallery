/**
 * #34 - "Your Score, Your Future" (Outcome Visualisation)
 *
 * Split into career path tiers by CLB level. Each tier shows specific
 * jobs, provinces, and salary ranges. Visual cards with gradient backgrounds.
 * Server component - no interactivity needed.
 */

/* ---------- data ---------- */

type CareerPath = {
  title: string;
  province: string;
  salaryRange: string;
};

type Tier = {
  clb: string;
  celpipScore: string;
  tagline: string;
  gradient: string;
  borderAccent: string;
  careers: CareerPath[];
};

const TIERS: Tier[] = [
  {
    clb: "CLB 7",
    celpipScore: "CELPIP 7",
    tagline: "Opens the door to skilled trades and essential services",
    gradient: "from-celpip-green/10 to-teal/5",
    borderAccent: "border-celpip-green",
    careers: [
      {
        title: "Licensed Practical Nurse",
        province: "British Columbia",
        salaryRange: "$55,000 - $72,000",
      },
      {
        title: "Electrician (Red Seal)",
        province: "Alberta",
        salaryRange: "$62,000 - $85,000",
      },
      {
        title: "Early Childhood Educator",
        province: "Ontario",
        salaryRange: "$40,000 - $55,000",
      },
      {
        title: "Pharmacy Technician",
        province: "Manitoba",
        salaryRange: "$42,000 - $58,000",
      },
    ],
  },
  {
    clb: "CLB 9",
    celpipScore: "CELPIP 9",
    tagline: "Unlocks professional roles and higher CRS scores",
    gradient: "from-navy/5 to-celpip-green/10",
    borderAccent: "border-teal",
    careers: [
      {
        title: "Registered Nurse",
        province: "Ontario",
        salaryRange: "$72,000 - $95,000",
      },
      {
        title: "Software Developer",
        province: "British Columbia",
        salaryRange: "$80,000 - $130,000",
      },
      {
        title: "Civil Engineer",
        province: "Alberta",
        salaryRange: "$75,000 - $110,000",
      },
      {
        title: "Financial Analyst",
        province: "Quebec (federal stream)",
        salaryRange: "$65,000 - $95,000",
      },
    ],
  },
  {
    clb: "CLB 10+",
    celpipScore: "CELPIP 10-12",
    tagline: "Maximum CRS language points and premium career paths",
    gradient: "from-gold/10 to-navy/5",
    borderAccent: "border-gold",
    careers: [
      {
        title: "Medical Specialist",
        province: "Ontario",
        salaryRange: "$150,000 - $350,000",
      },
      {
        title: "Senior Engineering Manager",
        province: "British Columbia",
        salaryRange: "$130,000 - $200,000",
      },
      {
        title: "University Professor",
        province: "Alberta",
        salaryRange: "$100,000 - $160,000",
      },
      {
        title: "Corporate Lawyer",
        province: "Ontario",
        salaryRange: "$120,000 - $250,000",
      },
    ],
  },
];

/* ---------- main component ---------- */

export default function YourScoreYourFuture() {
  return (
    <div className="min-h-screen bg-white">
      {/* ---- hero ---- */}
      <section className="px-4 pt-20 pb-16 text-center bg-gradient-to-b from-navy to-navy-light">
        <div className="max-w-3xl mx-auto">
          <p className="text-teal font-heading font-semibold text-sm uppercase tracking-widest mb-4">
            Outcome visualisation
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Your score.
            <br />
            <span className="text-teal">Your future.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Every CLB level unlocks new career opportunities, higher CRS
            rankings, and broader provincial nomination options. See what each
            score tier could mean for you.
          </p>
        </div>
      </section>

      {/* ---- tiers ---- */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {TIERS.map((tier) => (
            <div key={tier.clb}>
              {/* tier header */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 mb-6">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
                  {tier.clb}{" "}
                  <span className="text-lg font-normal text-gray-400">
                    ({tier.celpipScore})
                  </span>
                </h2>
                <p className="text-gray-500 text-lg">{tier.tagline}</p>
              </div>

              {/* career cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {tier.careers.map((career) => (
                  <div
                    key={career.title}
                    className={`bg-gradient-to-br ${tier.gradient} border-l-4 ${tier.borderAccent} rounded-xl p-6`}
                  >
                    <h3 className="font-heading text-lg font-semibold text-navy mb-1">
                      {career.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {career.province}
                    </p>
                    <p className="font-heading text-xl font-bold text-navy">
                      {career.salaryRange}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        /year
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- disclaimer ---- */}
      <section className="px-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-gray-400 text-center">
            Salary ranges are approximate and based on publicly available 2024
            Canadian labour market data. Actual compensation varies by employer,
            experience, and location. CELPIP does not provide immigration or
            career advice.
          </p>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-4 py-20 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Find out where you stand.
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto mb-10">
            Book your CELPIP test and get the score that opens the right doors
            for your career and your life in Canada.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center px-12 py-4 text-lg font-heading font-semibold rounded-lg bg-celpip-green hover:bg-green-light text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Book Your Test
          </a>
        </div>
      </section>
    </div>
  );
}
