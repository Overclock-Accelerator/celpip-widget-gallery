"use client";

import { useState } from "react";
import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types — anxieties + reassurance + soft CTA.
// ─────────────────────────────────────────────────────────────────────────────

export type ObjectionCta = { label: string; href?: string };

export type Objection = {
  worry: string;
  reassurance: string;
  softCta?: ObjectionCta;
};

export type ObjectionHandlerFAQProps = {
  heading?: string;
  subheading?: string;
  objections?: Objection[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Defaults — 5 realistic worries, empathetic reassurance, soft CTAs.
// ─────────────────────────────────────────────────────────────────────────────

const defaultObjections: Objection[] = [
  {
    worry: "What if I'm not ready?",
    reassurance:
      "Most people overestimate how much prep they need. Take the official practice test — if you score within range, you're ready. If not, our prep pack will get you there in two to three weeks of focused study.",
    softCta: { label: "Try a free practice test first" },
  },
  {
    worry: "What if I fail?",
    reassurance:
      "There's no \"fail\" — CELPIP gives you a CLB level. If your score isn't where you need it, you can rebook in as little as four days. There's no waiting period and no penalty for retaking the test.",
    softCta: { label: "See retake policy" },
  },
  {
    worry: "How fast will I see results?",
    reassurance:
      "Results post to your online account in 4–5 business days. You can share them directly with IRCC, employers, or designation bodies — no paper, no mail-in delays.",
  },
  {
    worry: "What if I'm not comfortable on a computer?",
    reassurance:
      "The interface is designed to feel familiar — basic keyboard typing, click-to-select, and an on-screen timer. Our free familiarization tutorial walks you through every screen before test day so there are no surprises.",
    softCta: { label: "Watch the 4-min walkthrough" },
  },
  {
    worry: "What if something comes up and I can't make my date?",
    reassurance:
      "You can reschedule up to four days before your test for a small fee, or rebook within 14 days if you're a no-show. Centres also offer multiple sittings per week in most cities, so finding a new slot is easy.",
    softCta: { label: "Read rescheduling rules" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ObjectionHandlerFAQ — anxious-question framing with soft CTAs in answer.
// Disclosure pattern with one open at a time.
// ─────────────────────────────────────────────────────────────────────────────

export function ObjectionHandlerFAQ({
  heading = "Worried? Read this first.",
  subheading = "The real questions people ask before booking — answered honestly.",
  objections = defaultObjections,
}: ObjectionHandlerFAQProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-10">
      <div className="mb-8 max-w-2xl">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0B2341]">
          {heading}
        </h3>
        {subheading && <p className="text-gray-500 mt-2">{subheading}</p>}
      </div>
      <ul className="space-y-3">
        {objections.map((obj, i) => {
          const isOpen = openIndex === i;
          return (
            <li
              key={i}
              className={`rounded-lg border transition-colors ${
                isOpen
                  ? "border-[#00A651] bg-[#00A651]/5"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`objection-panel-${i}`}
                className="w-full flex items-start gap-4 text-left p-4 md:p-5"
              >
                <span
                  aria-hidden
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isOpen
                      ? "bg-[#00A651] text-white"
                      : "bg-[#0B2341]/10 text-[#0B2341]"
                  }`}
                >
                  ?
                </span>
                <span className="font-heading font-semibold text-[#0B2341] text-base md:text-lg leading-tight flex-1 italic">
                  &ldquo;{obj.worry}&rdquo;
                </span>
                <span
                  aria-hidden
                  className={`shrink-0 text-[#0B2341] text-xl transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div
                  id={`objection-panel-${i}`}
                  className="px-4 md:px-5 pb-5 pl-16 md:pl-[4.25rem]"
                >
                  <p className="text-gray-700 leading-relaxed">{obj.reassurance}</p>
                  {obj.softCta && (
                    <button
                      type="button"
                      className="mt-3 text-[#00A651] hover:text-[#00C764] font-semibold text-sm underline underline-offset-4 decoration-2"
                    >
                      {obj.softCta.label} &rarr;
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ObjectionHandlerFAQVariants — gallery showcase (single variant)
// ─────────────────────────────────────────────────────────────────────────────

export function ObjectionHandlerFAQVariants() {
  return (
    <>
      <VariantLabel label="A — Anxious-Question FAQ" />
      <ObjectionHandlerFAQ />
    </>
  );
}
