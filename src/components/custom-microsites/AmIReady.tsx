"use client";

/**
 * #33 - "Am I Ready?" (Interactive Quiz -> CTA)
 *
 * 4-question self-assessment quiz. Results in 3 tiers with tailored CTAs.
 * Uses client-side state for quiz interactivity.
 */

import { useState } from "react";

/* ---------- types ---------- */

type Question = {
  question: string;
  options: { label: string; score: number }[];
};

type Tier = {
  heading: string;
  subheading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  colour: "green" | "gold" | "teal";
};

/* ---------- data ---------- */

const QUESTIONS: Question[] = [
  {
    question: "How often do you use English at work or school?",
    options: [
      { label: "Every day - it is my primary language at work", score: 3 },
      { label: "A few times a week in meetings or emails", score: 2 },
      { label: "Occasionally, mostly in writing", score: 1 },
      { label: "Rarely - I use another language most of the time", score: 0 },
    ],
  },
  {
    question: "Can you write a formal email in English without help?",
    options: [
      { label: "Yes, confidently and quickly", score: 3 },
      { label: "Yes, but I double-check grammar and phrasing", score: 2 },
      { label: "I can manage, but it takes a while", score: 1 },
      { label: "I would need significant help", score: 0 },
    ],
  },
  {
    question:
      "How comfortable are you listening to fast-paced English conversations?",
    options: [
      { label: "Very comfortable - I follow along easily", score: 3 },
      { label: "Mostly fine, but I miss details sometimes", score: 2 },
      { label: "I need people to slow down or repeat", score: 1 },
      { label: "I struggle to keep up", score: 0 },
    ],
  },
  {
    question:
      "Could you describe a graph or chart in English during a presentation?",
    options: [
      { label: "Yes, with clear and organised language", score: 3 },
      { label: "Yes, but I might pause to find the right words", score: 2 },
      { label: "I could try, but I would be hesitant", score: 1 },
      { label: "I would not feel confident doing that", score: 0 },
    ],
  },
];

function getTier(score: number): Tier {
  if (score >= 9) {
    return {
      heading: "You are ready.",
      subheading: "Your self-assessment suggests strong English proficiency.",
      description:
        "Based on your answers, you are likely well-prepared to sit CELPIP and achieve a competitive score. The best next step is to book your test and lock in a date.",
      ctaLabel: "Book Your Test Now",
      ctaHref: "#book",
      colour: "green",
    };
  }
  if (score >= 5) {
    return {
      heading: "Almost there.",
      subheading:
        "You have a solid foundation - a little practice will go a long way.",
      description:
        "Your English is strong in many areas but could benefit from targeted practice. Try a free CELPIP practice test to see exactly where you stand and identify focus areas.",
      ctaLabel: "Take a Free Practice Test",
      ctaHref: "#practice",
      colour: "gold",
    };
  }
  return {
    heading: "Let us build your plan.",
    subheading:
      "Everyone starts somewhere - and CELPIP has free resources to get you there.",
    description:
      "Your answers suggest you would benefit from structured preparation before testing. The good news: CELPIP offers 100+ hours of free prep materials, webinars, and study plans designed for every level.",
    ctaLabel: "Explore Free Prep Resources",
    ctaHref: "#prep",
    colour: "teal",
  };
}

/* ---------- sub-components ---------- */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-celpip-green rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ResultCard({ tier, onReset }: { tier: Tier; onReset: () => void }) {
  const borderMap = {
    green: "border-celpip-green",
    gold: "border-gold",
    teal: "border-teal",
  };
  const bgMap = {
    green: "bg-celpip-green",
    gold: "bg-gold",
    teal: "bg-teal",
  };
  return (
    <div className="max-w-xl mx-auto text-center">
      <div
        className={`border-2 ${borderMap[tier.colour]} rounded-2xl p-8 sm:p-12 bg-white shadow-xl`}
      >
        <div
          className={`inline-flex w-16 h-16 rounded-full ${bgMap[tier.colour]} items-center justify-center mb-6`}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            {tier.colour === "green" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            ) : tier.colour === "gold" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            )}
          </svg>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">
          {tier.heading}
        </h2>
        <p className="text-gray-500 font-medium mb-6">{tier.subheading}</p>
        <p className="text-gray-600 leading-relaxed mb-8">
          {tier.description}
        </p>
        <a
          href={tier.ctaHref}
          className={`inline-flex items-center justify-center px-10 py-4 text-lg font-heading font-semibold rounded-lg ${bgMap[tier.colour]} text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
        >
          {tier.ctaLabel}
        </a>
      </div>
      <button
        onClick={onReset}
        className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
      >
        Retake the quiz
      </button>
    </div>
  );
}

/* ---------- main component ---------- */

export default function AmIReady() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleSelect = (score: number) => {
    setSelected(score);
  };

  const handleNext = () => {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);

    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const tier = getTier(totalScore);
  const q = QUESTIONS[current];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---- header ---- */}
      <section className="px-4 pt-16 pb-8 text-center">
        <p className="text-celpip-green font-heading font-semibold text-sm uppercase tracking-widest mb-3">
          Self-assessment
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-3">
          Am I ready for CELPIP?
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Answer four quick questions and we will tell you the best next step.
        </p>
      </section>

      {/* ---- quiz body ---- */}
      <section className="px-4 pb-24">
        {!finished ? (
          <div className="max-w-xl mx-auto">
            <div className="mb-6">
              <ProgressBar current={current} total={QUESTIONS.length} />
              <p className="text-xs text-gray-400 mt-2 text-right">
                Question {current + 1} of {QUESTIONS.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-navy mb-8">
                {q.question}
              </h2>

              <div className="space-y-3">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.score;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.score)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-celpip-green bg-celpip-green/5 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base ${
                          isSelected
                            ? "text-navy font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className={`px-8 py-3 rounded-lg font-heading font-semibold text-white transition-all ${
                    selected !== null
                      ? "bg-celpip-green hover:bg-green-light shadow hover:shadow-md"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {current + 1 === QUESTIONS.length ? "See my result" : "Next"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ResultCard tier={tier} onReset={handleReset} />
        )}
      </section>
    </div>
  );
}
