"use client";

import { useMemo, useState } from "react";
import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type QuizOption = { label: string; score: number };

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export type QuizResult = {
  thresholdMin: number;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
};

export type ReadinessQuizProps = {
  heading?: string;
  subheading?: string;
  questions?: QuizQuestion[];
  results?: QuizResult[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Defaults — 3 questions, 3 result tiers (score range 0–9).
// ─────────────────────────────────────────────────────────────────────────────

const defaultQuestions: QuizQuestion[] = [
  {
    id: "prep",
    question: "How prepared do you feel right now?",
    options: [
      { label: "I've taken a practice test and felt good about it.", score: 3 },
      { label: "I've studied a bit but haven't done a full mock test.", score: 2 },
      { label: "I haven't really started yet.", score: 0 },
    ],
  },
  {
    id: "computer",
    question: "How comfortable are you taking a 3-hour test on a computer?",
    options: [
      { label: "Very comfortable — I work on a computer every day.", score: 3 },
      { label: "Mostly fine — I'd want a quick walkthrough beforehand.", score: 2 },
      { label: "A bit nervous — I'd prefer to try the interface first.", score: 1 },
    ],
  },
  {
    id: "time",
    question: "How much time before you need your CELPIP results?",
    options: [
      { label: "I need them in the next 4 weeks.", score: 3 },
      { label: "I have 1–3 months.", score: 2 },
      { label: "I have 3+ months — no rush.", score: 1 },
    ],
  },
];

const defaultResults: QuizResult[] = [
  {
    thresholdMin: 7,
    title: "You're ready. Book your test.",
    body: "Based on your answers, you're well-positioned to take the test now. Most people in your situation pass on their first attempt — the longer you wait, the more you forget.",
    ctaLabel: "See available dates",
  },
  {
    thresholdMin: 4,
    title: "Almost there. One more step first.",
    body: "You're close. A free official practice test will tell you exactly where you stand — and whether you should book this month or do another two weeks of focused review.",
    ctaLabel: "Try a free practice test",
  },
  {
    thresholdMin: 0,
    title: "Start with the prep pack.",
    body: "Don't worry — most people start here. Our free prep pack is designed for exactly your situation. Two to three weeks of focused study and you'll be ready to take the practice test, then book.",
    ctaLabel: "Send me the prep pack",
  },
];

// Pick the highest-threshold result the score qualifies for. Sort defensively.
function pickResult(score: number, results: QuizResult[]): QuizResult {
  const sorted = [...results].sort((a, b) => b.thresholdMin - a.thresholdMin);
  return sorted.find((r) => score >= r.thresholdMin) ?? sorted[sorted.length - 1];
}

// ─────────────────────────────────────────────────────────────────────────────
// ReadinessQuiz — interactive 3-question quiz with personalized result.
// ─────────────────────────────────────────────────────────────────────────────

export function ReadinessQuiz({
  heading = "Are you ready?",
  subheading = "A 30-second check. We'll tell you what to do next based on your answers.",
  questions = defaultQuestions,
  results = defaultResults,
}: ReadinessQuizProps = {}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, s) => sum + s, 0),
    [answers],
  );
  const result = submitted ? pickResult(totalScore, results) : null;

  const handleSelect = (qId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
  };

  const handleSubmit = () => {
    if (allAnswered) setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-10">
      <div className="mb-8 max-w-2xl">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341]">
          {heading}
        </h3>
        {subheading && <p className="text-gray-500 mt-2">{subheading}</p>}
      </div>

      {!submitted && (
        <div className="space-y-6">
          {questions.map((q, qi) => {
            const selected = answers[q.id];
            return (
              <fieldset key={q.id} className="border border-gray-200 rounded-lg p-5">
                <legend className="font-heading font-semibold text-[#0B2341] text-base md:text-lg px-2">
                  <span className="text-[#00A651] mr-2">{qi + 1}.</span>
                  {q.question}
                </legend>
                <div className="space-y-2 mt-3">
                  {q.options.map((opt, oi) => {
                    const isSelected = selected === opt.score;
                    return (
                      <label
                        key={oi}
                        className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors border ${
                          isSelected
                            ? "border-[#00A651] bg-[#00A651]/5"
                            : "border-transparent hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.score}
                          checked={isSelected}
                          onChange={() => handleSelect(q.id, opt.score)}
                          className="mt-1 accent-[#00A651]"
                        />
                        <span className="text-gray-700 text-sm md:text-base">
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {Object.keys(answers).length} of {questions.length} answered
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`font-semibold px-6 py-3 rounded-lg transition-colors ${
                allAnswered
                  ? "bg-[#00A651] hover:bg-[#00C764] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              See my result
            </button>
          </div>
        </div>
      )}

      {submitted && result && (
        <div className="rounded-lg bg-gradient-to-br from-[#0B2341] to-[#153A5C] text-white p-8 md:p-10">
          <p className="text-[#17FFDC] font-semibold text-xs uppercase tracking-[0.25em] mb-3">
            Your result
          </p>
          <h4 className="font-heading text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {result.title}
          </h4>
          <p className="text-gray-300 leading-relaxed mb-6">{result.body}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {result.ctaLabel} &rarr;
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Retake quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ReadinessQuizVariants — gallery showcase (single variant)
// ─────────────────────────────────────────────────────────────────────────────

export function ReadinessQuizVariants() {
  return (
    <>
      <VariantLabel label="A — 3-Question Readiness Check" />
      <ReadinessQuiz />
    </>
  );
}
