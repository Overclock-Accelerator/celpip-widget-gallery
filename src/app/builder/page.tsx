"use client";

/**
 * /builder — AI-Assisted Page Builder form.
 *
 * The marketer fills in audience + ad concept + country + tone, hits
 * Generate, and watches a multi-step progress indicator while the
 * /api/builder/generate SSE stream emits step events. On the final
 * `done` event we redirect to /builder/result/{sessionId}.
 *
 * SSE format here is one JSON-encoded BuilderStreamEvent per `data:`
 * line, separated by blank lines. We parse with a tiny streaming reader
 * rather than EventSource (which only supports GET).
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  STEP_LABELS,
  type BuilderInput,
  type BuilderStep,
  type BuilderStreamEvent,
  type CountryTarget,
  type ToneLeaning,
} from "@/builder/types";

const COUNTRIES: CountryTarget[] = ["Canada", "Australia", "Both"];
const TONES: ToneLeaning[] = ["Inspiring", "Reassuring", "Practical"];

const STEP_ORDER: BuilderStep[] = [
  "drafting-copy",
  "generating-hero",
  "generating-square",
  "generating-story",
  "generating-portrait",
  "composing-microsite",
  "complete",
];

const SAMPLE_AUDIENCE =
  "Filipino healthcare workers in their late 20s preparing for Canadian PR. They've already been working as nurses in Manila, are bilingual, balancing clinical shifts with study at home.";
const SAMPLE_CONCEPT =
  "An aspirational moment showing a candidate calmly finishing the test on her laptop with morning light, conveying control and progress.";

export default function BuilderPage() {
  const router = useRouter();

  const [audience, setAudience] = useState(SAMPLE_AUDIENCE);
  const [concept, setConcept] = useState(SAMPLE_CONCEPT);
  const [country, setCountry] = useState<CountryTarget>("Canada");
  const [tone, setTone] = useState<ToneLeaning>("Inspiring");

  const [busy, setBusy] = useState(false);
  const [activeSteps, setActiveSteps] = useState<Set<BuilderStep>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<BuilderStep>>(new Set());
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Random-prompt state. One in-flight kind at a time + a per-kind error
  // we surface as a small inline "Try again" hint without blocking the form.
  const [randomBusy, setRandomBusy] = useState<null | "audience" | "concept">(
    null,
  );
  const [randomError, setRandomError] = useState<{
    kind: "audience" | "concept";
    message: string;
  } | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const requestRandomPrompt = useCallback(
    async (kind: "audience" | "concept") => {
      if (busy || randomBusy) return;
      const previous = kind === "audience" ? audience : concept;
      const setter = kind === "audience" ? setAudience : setConcept;
      setRandomBusy(kind);
      setRandomError(null);
      setter("Generating…");
      try {
        const res = await fetch("/api/builder/random-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind }),
        });
        if (!res.ok) {
          const text = await res.text();
          let msg = text;
          try {
            msg = (JSON.parse(text) as { error?: string }).error ?? text;
          } catch {
            // not JSON — keep raw
          }
          throw new Error(msg || `Server returned ${res.status}`);
        }
        const data = (await res.json()) as { prompt?: string };
        if (!data.prompt) throw new Error("Empty prompt from server.");
        setter(data.prompt);
      } catch (err) {
        setter(previous);
        setRandomError({
          kind,
          message: (err as Error).message || "Couldn't generate a prompt.",
        });
      } finally {
        setRandomBusy(null);
      }
    },
    [audience, concept, busy, randomBusy],
  );

  const canSubmit = useMemo(
    () =>
      !busy &&
      audience.trim().length >= 10 &&
      concept.trim().length >= 10,
    [busy, audience, concept],
  );

  const reset = () => {
    setActiveSteps(new Set());
    setCompletedSteps(new Set());
    setWarnings([]);
    setError(null);
  };

  const handleEvent = useCallback(
    (ev: BuilderStreamEvent) => {
      switch (ev.type) {
        case "step": {
          // When a new step starts, mark all earlier steps as completed.
          const idx = STEP_ORDER.indexOf(ev.step);
          if (idx >= 0) {
            setCompletedSteps((prev) => {
              const next = new Set(prev);
              for (let i = 0; i < idx; i++) next.add(STEP_ORDER[i]);
              return next;
            });
            setActiveSteps((prev) => {
              const next = new Set(prev);
              next.add(ev.step);
              return next;
            });
          }
          break;
        }
        case "warning":
          setWarnings((prev) => [...prev, ev.message]);
          break;
        case "error":
          setError(ev.message);
          break;
        case "done":
          // Mark everything complete and navigate.
          setCompletedSteps(new Set(STEP_ORDER));
          router.push(`/builder/result/${ev.result.sessionId}`);
          break;
      }
    },
    [router],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    reset();
    setBusy(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const input: BuilderInput = {
      audience: audience.trim(),
      concept: concept.trim(),
      country,
      tone,
    };

    try {
      const res = await fetch("/api/builder/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const text = await res.text();
        let parsedMsg = text;
        try {
          parsedMsg = (JSON.parse(text) as { error?: string }).error ?? text;
        } catch {
          // Not JSON; keep raw.
        }
        throw new Error(parsedMsg || `Server returned ${res.status}`);
      }
      if (!res.body) throw new Error("No response stream from server.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      // Read SSE: split by blank-line frame separator.
      // Each frame is `data: {...}` (we ignore other SSE fields here).
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const frames = buf.split(/\n\n/);
        buf = frames.pop() ?? "";
        for (const frame of frames) {
          const line = frame
            .split("\n")
            .find((l) => l.startsWith("data:"));
          if (!line) continue;
          const payload = line.replace(/^data:\s?/, "").trim();
          if (!payload) continue;
          try {
            const ev = JSON.parse(payload) as BuilderStreamEvent;
            handleEvent(ev);
          } catch {
            // Ignore malformed lines.
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "Generation failed.");
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const cancel = () => {
    abortRef.current?.abort();
    setBusy(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <header className="mb-10">
        <p className="font-heading text-sm tracking-[0.2em] uppercase text-[#00A651]">
          AI-Assisted Page Builder
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0B2341] mt-2">
          Describe your audience and concept.
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl text-base sm:text-lg">
          We&rsquo;ll generate three ad creatives, a structured copy brief, and a
          complete microsite &mdash; all themed to your concept &mdash; in under 90 seconds.
        </p>
      </header>

      {/* Form */}
      <form
        onSubmit={submit}
        className="rounded-xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="audience"
                className="block text-sm font-semibold text-[#0B2341]"
              >
                Audience description
              </label>
              <RandomButton
                label="Random audience"
                busy={randomBusy === "audience"}
                disabled={busy || randomBusy !== null}
                onClick={() => requestRandomPrompt("audience")}
              />
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Who is this for? Background, life stage, what they&rsquo;re juggling.
            </p>
            <textarea
              id="audience"
              rows={4}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              disabled={busy || randomBusy === "audience"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#0B2341] disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Filipino healthcare workers in their late 20s preparing for Canadian PR…"
              required
            />
            <div className="mt-1 flex items-start justify-between gap-3">
              {randomError?.kind === "audience" ? (
                <button
                  type="button"
                  onClick={() => requestRandomPrompt("audience")}
                  className="text-xs text-amber-700 hover:text-amber-900 underline"
                >
                  Couldn&rsquo;t generate &mdash; try again
                </button>
              ) : (
                <span />
              )}
              <CharCount value={audience} min={10} max={1500} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="concept"
                className="block text-sm font-semibold text-[#0B2341]"
              >
                Ad concept
              </label>
              <RandomButton
                label="Random concept"
                busy={randomBusy === "concept"}
                disabled={busy || randomBusy !== null}
                onClick={() => requestRandomPrompt("concept")}
              />
            </div>
            <p className="text-xs text-gray-500 mb-2">
              What scene, mood, or moment should the creative show?
            </p>
            <textarea
              id="concept"
              rows={3}
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              disabled={busy || randomBusy === "concept"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#0B2341] disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="An aspirational moment showing a candidate calmly finishing the test…"
              required
            />
            <div className="mt-1 flex items-start justify-between gap-3">
              {randomError?.kind === "concept" ? (
                <button
                  type="button"
                  onClick={() => requestRandomPrompt("concept")}
                  className="text-xs text-amber-700 hover:text-amber-900 underline"
                >
                  Couldn&rsquo;t generate &mdash; try again
                </button>
              ) : (
                <span />
              )}
              <CharCount value={concept} min={10} max={1500} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-[#0B2341] mb-1"
              >
                Country target
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryTarget)}
                disabled={busy}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-semibold text-[#0B2341] mb-1"
              >
                Tone leaning
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneLeaning)}
                disabled={busy}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className="bg-[#00A651] hover:bg-[#00C764] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {busy ? "Generating…" : "Generate"}
          </button>
          {busy && (
            <button
              type="button"
              onClick={cancel}
              className="text-sm text-gray-500 hover:text-[#0B2341]"
            >
              Cancel
            </button>
          )}
          <p className="text-xs text-gray-400 ml-auto">
            Typical run: 60&ndash;90 seconds &middot; 1 hero + 3 ad images
          </p>
        </div>
      </form>

      {/* Progress + state */}
      {(busy || completedSteps.size > 0 || warnings.length > 0 || error) && (
        <section className="mt-8 rounded-xl bg-white border border-gray-200 p-6 sm:p-8">
          <h2 className="font-heading text-lg font-semibold text-[#0B2341] mb-4">
            Progress
          </h2>
          <ol className="space-y-2">
            {STEP_ORDER.filter((s) => s !== "complete").map((step) => {
              const done = completedSteps.has(step);
              const active = !done && activeSteps.has(step);
              return (
                <li
                  key={step}
                  className="flex items-center gap-3 text-sm"
                  aria-live="polite"
                >
                  <Indicator done={done} active={active} />
                  <span
                    className={
                      done
                        ? "text-[#0B2341]"
                        : active
                          ? "text-[#0B2341] font-medium"
                          : "text-gray-400"
                    }
                  >
                    {STEP_LABELS[step]}
                  </span>
                </li>
              );
            })}
          </ol>

          {warnings.length > 0 && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-semibold text-amber-900 mb-1">
                Warnings
              </p>
              <ul className="text-xs text-amber-800 list-disc pl-4 space-y-0.5">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold text-red-900 mb-1">Error</p>
              <p className="text-xs text-red-800">{error}</p>
              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="mt-2 text-xs font-semibold text-red-900 underline"
              >
                Dismiss and try again
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function CharCount({
  value,
  min,
  max,
}: {
  value: string;
  min: number;
  max: number;
}) {
  const len = value.trim().length;
  const ok = len >= min && len <= max;
  return (
    <div className="mt-1 text-xs text-right">
      <span className={ok ? "text-gray-400" : "text-amber-700"}>
        {len} / {max}
      </span>
    </div>
  );
}

function RandomButton({
  label,
  busy,
  disabled,
  onClick,
}: {
  label: string;
  busy: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-busy={busy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0B2341]/70 hover:text-[#0B2341] disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-2 py-1 rounded-md hover:bg-[#0B2341]/5"
    >
      {busy ? (
        <span
          aria-hidden
          className="inline-block w-3 h-3 rounded-full border-2 border-[#0B2341]/40 border-t-transparent animate-spin"
        />
      ) : (
        <span aria-hidden>🎲</span>
      )}
      <span>{busy ? "Generating…" : label}</span>
    </button>
  );
}

function Indicator({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00A651] text-white text-[11px]"
      >
        &#10003;
      </span>
    );
  }
  if (active) {
    return (
      <span
        aria-hidden
        className="inline-block w-5 h-5 rounded-full border-2 border-[#0B2341] border-t-transparent animate-spin"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="inline-block w-5 h-5 rounded-full border-2 border-gray-200"
    />
  );
}
