"use client";

/**
 * #35 - "Testimonial Wall" (Social Proof Overload)
 *
 * Grid of 12+ short testimonial cards with filter pills, alternating
 * card sizes, and a sticky header CTA. Client component for filter state.
 */

import { useState } from "react";

/* ---------- types ---------- */

type Category = "All" | "Nurses" | "Engineers" | "Teachers" | "IT" | "Trades";

type TestimonialCard = {
  name: string;
  country: string;
  score: string;
  quote: string;
  category: Category;
  featured?: boolean;
};

/* ---------- data ---------- */

const TESTIMONIALS: TestimonialCard[] = [
  {
    name: "Priya S.",
    country: "India",
    score: "CELPIP 10",
    quote:
      "I got my score in 3 days. Three days! My Express Entry profile was updated the same week.",
    category: "Nurses",
    featured: true,
  },
  {
    name: "Carlos M.",
    country: "Colombia",
    score: "CELPIP 9",
    quote:
      "The computer-based format meant no awkward face-to-face speaking test. I could just focus on my answers.",
    category: "Engineers",
  },
  {
    name: "Fatima A.",
    country: "UAE",
    score: "CELPIP 8",
    quote:
      "The free practice tests were almost identical to the real thing. No surprises on test day.",
    category: "Teachers",
  },
  {
    name: "Wei L.",
    country: "China",
    score: "CELPIP 11",
    quote:
      "I needed CLB 10 for my NOC code. CELPIP delivered. My provincial nomination came through two months later.",
    category: "IT",
    featured: true,
  },
  {
    name: "Amara K.",
    country: "Nigeria",
    score: "CELPIP 9",
    quote:
      "Finished all four components in one sitting. By lunchtime I was done. No coming back for a second day.",
    category: "Nurses",
  },
  {
    name: "Raj P.",
    country: "India",
    score: "CELPIP 10",
    quote:
      "The speaking section felt natural. Talking to a computer removed the pressure of a live examiner watching me.",
    category: "Engineers",
  },
  {
    name: "Sofia R.",
    country: "Brazil",
    score: "CELPIP 8",
    quote:
      "I booked my test on a Tuesday and sat it the following Saturday. That speed was a game-changer for my timeline.",
    category: "Teachers",
  },
  {
    name: "Ahmed H.",
    country: "Egypt",
    score: "CELPIP 9",
    quote:
      "The webinars taught me exactly what the scoring rubric rewards. I went from 7 to 9 in six weeks of focused prep.",
    category: "IT",
  },
  {
    name: "Maria T.",
    country: "Philippines",
    score: "CELPIP 10",
    quote:
      "My recruiter specifically recommended CELPIP because the results come back so fast. She was right.",
    category: "Nurses",
    featured: true,
  },
  {
    name: "James O.",
    country: "UK",
    score: "CELPIP 12",
    quote:
      "Even as a native speaker I appreciated how smooth and modern the test experience was. Everything just worked.",
    category: "Trades",
  },
  {
    name: "Ananya D.",
    country: "India",
    score: "CELPIP 9",
    quote:
      "The study plan they gave me was free and incredibly structured. I followed it for four weeks and hit my target score.",
    category: "Engineers",
  },
  {
    name: "Li Na W.",
    country: "China",
    score: "CELPIP 8",
    quote:
      "My friend took a different test and waited two weeks for results. I had mine in two business days.",
    category: "Teachers",
  },
  {
    name: "Viktor S.",
    country: "Ukraine",
    score: "CELPIP 10",
    quote:
      "I was nervous about Speaking. But recording my answers on a computer felt private and calm. I scored higher than I expected.",
    category: "Trades",
  },
  {
    name: "Deepika N.",
    country: "India",
    score: "CELPIP 11",
    quote:
      "CLB 9 across the board. That is exactly what I needed for my nursing licence application in Ontario.",
    category: "Nurses",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Nurses",
  "Engineers",
  "Teachers",
  "IT",
  "Trades",
];

/* ---------- main component ---------- */

export default function TestimonialWall() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === active);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---- sticky header ---- */}
      <div className="sticky top-16 z-10 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <p className="font-heading font-semibold text-navy text-sm sm:text-base truncate">
            Real candidates. Real scores.
          </p>
          <a
            href="#book"
            className="shrink-0 px-6 py-2 text-sm font-heading font-semibold rounded-lg bg-celpip-green hover:bg-green-light text-white shadow transition-all"
          >
            Book Your Test
          </a>
        </div>
      </div>

      {/* ---- hero ---- */}
      <section className="px-4 pt-16 pb-8 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
          What candidates say
          <br />
          <span className="text-celpip-green">after taking CELPIP.</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">
          Thousands of test-takers, one consistent theme: CELPIP is fast,
          modern, and designed around the candidate experience.
        </p>

        {/* filter pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ---- testimonial grid ---- */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((t) => (
            <div
              key={t.name}
              className={`break-inside-avoid bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${
                t.featured ? "p-8" : "p-6"
              }`}
            >
              <blockquote
                className={`text-gray-700 leading-relaxed mb-4 ${
                  t.featured ? "text-lg" : "text-sm"
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-semibold text-navy text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.country}</p>
                </div>
                <span className="text-xs font-semibold text-celpip-green bg-celpip-green/10 px-2.5 py-1 rounded-full">
                  {t.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- bottom CTA ---- */}
      <section className="px-4 py-20 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Join them.
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto mb-10">
            Your CELPIP success story starts with booking a test date. Find your
            nearest centre and get started.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center px-12 py-4 text-lg font-heading font-semibold rounded-lg bg-celpip-green hover:bg-green-light text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Find a Test Date
          </a>
        </div>
      </section>
    </div>
  );
}
