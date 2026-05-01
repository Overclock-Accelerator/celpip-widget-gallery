"use client";

/**
 * #31 - "Book This Weekend" (Urgency/Scarcity)
 *
 * Full-bleed countdown-style page with urgency signals, social proof,
 * and maximum CTA density. Conversion-focused for candidates who have
 * already decided on CELPIP and need to book.
 */

import { useEffect, useState } from "react";

/* ---------- helpers ---------- */

function useCountdown(offsetMs: number) {
  // Pin the target on mount only. Computing it inline in render with
  // Date.now() trips React Compiler's purity guard and pings HMR loops.
  const [target] = useState(() => Date.now() + offsetMs);
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return t;
}

const SITTINGS = [
  { city: "Toronto", date: "Sat 10 May", seats: 4 },
  { city: "Vancouver", date: "Sun 11 May", seats: 2 },
  { city: "Calgary", date: "Sat 10 May", seats: 7 },
  { city: "Mumbai", date: "Sun 11 May", seats: 3 },
  { city: "Manila", date: "Sat 10 May", seats: 5 },
];

function BookButton({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <a
      href="#book"
      className={`inline-flex items-center justify-center font-heading font-semibold rounded-lg transition-all
        ${
          size === "lg"
            ? "px-10 py-4 text-lg bg-celpip-green hover:bg-green-light text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            : "px-6 py-2.5 text-sm bg-celpip-green hover:bg-green-light text-white shadow hover:shadow-md"
        }`}
    >
      Book Your Sitting
    </a>
  );
}

/* ---------- main component ---------- */

export default function BookThisWeekend() {
  // 2 days + 14 hours from mount.
  const countdown = useCountdown(2 * 86_400_000 + 14 * 3_600_000);

  const [booked, setBooked] = useState(847);
  useEffect(() => {
    const id = setInterval(
      () => setBooked((b) => b + Math.floor(Math.random() * 3)),
      8000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* ---- urgency bar ---- */}
      <div className="relative overflow-hidden bg-celpip-green">
        <div className="absolute inset-0 bg-gradient-to-r from-celpip-green via-green-light to-celpip-green animate-pulse opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-sm font-semibold text-white">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{booked.toLocaleString()} candidates booked this week</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Seats are filling fast</span>
        </div>
      </div>

      {/* ---- hero / countdown ---- */}
      <section className="relative px-4 pt-16 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-teal font-heading font-semibold text-sm uppercase tracking-widest mb-4">
            Limited availability
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Book your CELPIP test
            <span className="block text-teal mt-1">this weekend.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
            Seats are limited and filling quickly. Pick your city, lock in your
            date, and take the next step towards your goals.
          </p>

          {/* countdown */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-10">
            {(
              [
                ["days", countdown.days],
                ["hours", countdown.hours],
                ["mins", countdown.minutes],
                ["secs", countdown.seconds],
              ] as const
            ).map(([label, val]) => (
              <div key={label} className="text-center">
                <div className="bg-navy-light border border-white/10 rounded-xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-teal tabular-nums">
                    {String(val).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wide text-gray-400 mt-2 block">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <BookButton />

          <p className="text-gray-500 text-xs mt-4">
            Registration closes 48 hours before each sitting
          </p>
        </div>
      </section>

      {/* ---- sittings grid ---- */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">
            Next available sittings
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITTINGS.map((s) => (
              <div
                key={s.city + s.date}
                className="bg-navy-light border border-white/10 rounded-xl p-6 flex flex-col"
              >
                <h3 className="font-heading text-xl font-semibold mb-1">
                  {s.city}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{s.date}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      s.seats <= 3 ? "text-gold" : "text-teal"
                    }`}
                  >
                    {s.seats <= 3
                      ? `Only ${s.seats} seat${s.seats === 1 ? "" : "s"} left`
                      : `${s.seats} seats available`}
                  </span>
                  <BookButton size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- social proof strip ---- */}
      <section className="border-t border-white/10 px-4 py-12">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            ["200,000+", "Tests delivered in 2024"],
            ["2-4 days", "Average score turnaround"],
            ["98%", "Test-day satisfaction rate"],
          ].map(([stat, label]) => (
            <div key={stat}>
              <p className="font-heading text-3xl font-bold text-teal">
                {stat}
              </p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- final CTA ---- */}
      <section className="px-4 py-16 text-center bg-gradient-to-b from-transparent to-navy-light">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          Don&apos;t wait until seats are gone.
        </h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          The longer you wait, the fewer options remain. Book now and choose the
          date and centre that works best for you.
        </p>
        <BookButton />
      </section>
    </div>
  );
}
