"use client";

/**
 * /builder — Widget Composer wizard.
 *
 * Three-step single-page flow:
 *   1. Pick audience (preset card + free-form override)
 *   2. Pick widget variants (full catalog grouped by category, multi-select,
 *      sticky reorderable selection sidebar)
 *   3. Review + generate (SSE progress → redirect to /builder/sample/{id})
 *
 * Distinct from /campaigns (the AI campaign generator) — the composer is
 * about lifting marketer-curated widget *kinds* into one cohesive microsite,
 * not about generating ads from a creative brief.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { AUDIENCE_PRESETS, ALL_CATEGORIES, CATALOG } from "@/composer/catalog";
import type {
  AudiencePreset,
  CatalogEntry,
  ComposerStreamEvent,
  WidgetKind,
} from "@/composer/types";

import { VariantThumbnail } from "./components/VariantThumbnail";

type Step = 1 | 2 | 3;

type ProgressLine = {
  label: string;
  blockIndex?: number;
  totalBlocks?: number;
  done: boolean;
};

export default function BuilderPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);

  // Step 1 state
  const [audienceKey, setAudienceKey] = useState<string>("");
  const [customAudience, setCustomAudience] = useState<string>("");

  // Step 2 state
  const [selectedKinds, setSelectedKinds] = useState<WidgetKind[]>([]);

  // Step 3 state
  const [sampleName, setSampleName] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [progressLines, setProgressLines] = useState<ProgressLine[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const selectedPreset = useMemo<AudiencePreset | null>(
    () => AUDIENCE_PRESETS.find((a) => a.key === audienceKey) ?? null,
    [audienceKey],
  );

  const audienceLabel = selectedPreset?.label ?? "Custom audience";

  const canContinueStep1 =
    audienceKey.length > 0 || customAudience.trim().length >= 20;
  const canContinueStep2 = selectedKinds.length >= 3;
  const canSubmit = !busy && canContinueStep1 && canContinueStep2;

  const toggleKind = useCallback((kind: WidgetKind) => {
    setSelectedKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    );
  }, []);

  const removeKind = useCallback((kind: WidgetKind) => {
    setSelectedKinds((prev) => prev.filter((k) => k !== kind));
  }, []);

  const moveKind = useCallback((from: number, to: number) => {
    setSelectedKinds((prev) => {
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  const handleEvent = useCallback(
    (ev: ComposerStreamEvent) => {
      switch (ev.type) {
        case "step": {
          setProgressLines((prev) => {
            // Mark previously-active lines as done; append the new one.
            const next = prev.map((p) => ({ ...p, done: true }));
            if (ev.step !== "complete") {
              next.push({
                label: ev.label,
                blockIndex: ev.blockIndex,
                totalBlocks: ev.totalBlocks,
                done: false,
              });
            } else {
              // Last "complete" event marks everything done.
              return prev.map((p) => ({ ...p, done: true }));
            }
            return next;
          });
          break;
        }
        case "warning":
          setWarnings((prev) => [...prev, ev.message]);
          break;
        case "error":
          setError(ev.message);
          break;
        case "done":
          setProgressLines((prev) => prev.map((p) => ({ ...p, done: true })));
          router.push(`/builder/sample/${ev.sample.id}`);
          break;
      }
    },
    [router],
  );

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setProgressLines([]);
    setWarnings([]);
    setError(null);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/composer/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audienceKey: audienceKey || "custom",
          customAudience: !audienceKey ? customAudience : undefined,
          selectedKinds,
          sampleName: sampleName.trim() || undefined,
        }),
        signal: ctrl.signal,
      });
      if (!res.ok) {
        const text = await res.text();
        let msg = text;
        try {
          msg = (JSON.parse(text) as { error?: string }).error ?? text;
        } catch {
          // not JSON
        }
        throw new Error(msg || `Server returned ${res.status}`);
      }
      if (!res.body) throw new Error("No response stream from server.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const frames = buf.split(/\n\n/);
        buf = frames.pop() ?? "";
        for (const frame of frames) {
          const line = frame.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;
          const payload = line.replace(/^data:\s?/, "").trim();
          if (!payload) continue;
          try {
            const ev = JSON.parse(payload) as ComposerStreamEvent;
            handleEvent(ev);
          } catch {
            // ignore malformed line
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "Composer build failed.");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <p className="font-heading text-sm tracking-[0.2em] uppercase text-[#00A651]">
          Widget Composer
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0B2341] mt-1">
          Compose a sample microsite from your favourite widgets.
        </h1>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Pick an audience. Pick the variants you like. We&rsquo;ll write
          cohesive copy across all of them so they form one microsite — no ads,
          no immigration advice, just a polished sample you can save and share.
        </p>
      </header>

      <Stepper step={step} />

      {step === 1 && (
        <Step1
          audienceKey={audienceKey}
          setAudienceKey={(k) => {
            setAudienceKey(k);
            if (k) setCustomAudience("");
          }}
          customAudience={customAudience}
          setCustomAudience={(s) => {
            setCustomAudience(s);
            if (s.trim().length > 0) setAudienceKey("");
          }}
          onContinue={() => canContinueStep1 && setStep(2)}
          canContinue={canContinueStep1}
        />
      )}

      {step === 2 && (
        <Step2
          selectedKinds={selectedKinds}
          toggleKind={toggleKind}
          removeKind={removeKind}
          moveKind={moveKind}
          onBack={() => setStep(1)}
          onContinue={() => canContinueStep2 && setStep(3)}
          canContinue={canContinueStep2}
        />
      )}

      {step === 3 && (
        <Step3
          audienceLabel={audienceLabel}
          audienceContext={
            selectedPreset?.context ?? customAudience.trim()
          }
          selectedKinds={selectedKinds}
          sampleName={sampleName}
          setSampleName={setSampleName}
          busy={busy}
          progressLines={progressLines}
          warnings={warnings}
          error={error}
          onBack={() => !busy && setStep(2)}
          onSubmit={submit}
          onCancel={cancel}
          canSubmit={canSubmit}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Stepper
// ─────────────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: Step }) {
  const stops: { n: Step; label: string }[] = [
    { n: 1, label: "Audience" },
    { n: 2, label: "Variants" },
    { n: 3, label: "Generate" },
  ];
  return (
    <ol className="flex items-center gap-2 mb-8">
      {stops.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n;
        return (
          <li key={s.n} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                done
                  ? "bg-[#00A651] text-white"
                  : active
                    ? "bg-[#0B2341] text-[#17FFDC]"
                    : "bg-gray-200 text-gray-500"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {done ? "✓" : s.n}
            </span>
            <span
              className={`text-sm ${
                active ? "text-[#0B2341] font-semibold" : "text-gray-500"
              }`}
            >
              {s.label}
            </span>
            {i < stops.length - 1 && (
              <span aria-hidden className="mx-2 text-gray-300">
                —
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Step 1 — Pick audience
// ─────────────────────────────────────────────────────────────────────────

function Step1({
  audienceKey,
  setAudienceKey,
  customAudience,
  setCustomAudience,
  onContinue,
  canContinue,
}: {
  audienceKey: string;
  setAudienceKey: (k: string) => void;
  customAudience: string;
  setCustomAudience: (s: string) => void;
  onContinue: () => void;
  canContinue: boolean;
}) {
  return (
    <section className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
      <h2 className="font-heading text-xl font-bold text-[#0B2341]">
        Step 1 — Who&rsquo;s this microsite for?
      </h2>
      <p className="text-gray-600 mt-1 text-sm">
        Pick an audience preset, or describe your own below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {AUDIENCE_PRESETS.map((preset) => {
          const selected = audienceKey === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setAudienceKey(preset.key)}
              className={`text-left rounded-xl border p-4 transition-all ${
                selected
                  ? "border-[#00A651] bg-[#00A651]/5 ring-2 ring-[#00A651]/30"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-pressed={selected}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    selected ? "bg-[#00A651] text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {preset.region}
                </span>
                <span className="text-[11px] text-gray-500">
                  → {preset.destination}
                </span>
                {selected && (
                  <span aria-hidden className="text-[#00A651] font-bold">
                    ✓
                  </span>
                )}
              </div>
              <p className="font-heading text-sm font-bold text-[#0B2341]">
                {preset.profession}
              </p>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed line-clamp-3">
                {preset.context}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <label
          htmlFor="custom-audience"
          className="block text-sm font-semibold text-[#0B2341] mb-1.5"
        >
          Or describe your own audience
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Region, profession, life stage. 20+ characters.
        </p>
        <textarea
          id="custom-audience"
          rows={3}
          value={customAudience}
          onChange={(e) => setCustomAudience(e.target.value)}
          placeholder="Mid-career nurses in Lagos pursuing AHPRA registration in Australia…"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#0B2341] focus:ring-4 focus:ring-[#0B2341]/10 resize-y"
        />
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="bg-[#00A651] hover:bg-[#00C764] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Continue →
        </button>
        {!canContinue && (
          <p className="text-xs text-gray-500">
            Select a preset or write at least 20 characters.
          </p>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Step 2 — Pick variants
// ─────────────────────────────────────────────────────────────────────────

function Step2({
  selectedKinds,
  toggleKind,
  removeKind,
  moveKind,
  onBack,
  onContinue,
  canContinue,
}: {
  selectedKinds: WidgetKind[];
  toggleKind: (k: WidgetKind) => void;
  removeKind: (k: WidgetKind) => void;
  moveKind: (from: number, to: number) => void;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
}) {
  // Group catalog by category, in display order.
  const byCategory = useMemo(() => {
    const groups = new Map<string, CatalogEntry[]>();
    for (const cat of ALL_CATEGORIES) groups.set(cat, []);
    for (const c of CATALOG) {
      groups.get(c.category)?.push(c);
    }
    return groups;
  }, []);

  const recommendedRangeWarning =
    selectedKinds.length > 10
      ? `${selectedKinds.length} selected — that's a lot. Consider trimming to 4–10 for a focused microsite.`
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {/* Catalog */}
      <section className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-[#0B2341]">
          Step 2 — Pick the look
        </h2>
        <p className="text-gray-600 mt-1 text-sm">
          Multi-select the variants you like. We recommend 4–10. Click to add or
          remove. Re-order in the sidebar once you have your set.
        </p>

        <div className="mt-6 space-y-8">
          {ALL_CATEGORIES.map((cat) => {
            const entries = byCategory.get(cat) ?? [];
            if (entries.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="font-heading text-sm font-semibold text-[#0B2341] uppercase tracking-wider mb-3">
                  {cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {entries.map((entry) => {
                    const selected = selectedKinds.includes(entry.kind);
                    return (
                      <button
                        key={entry.kind}
                        type="button"
                        onClick={() => toggleKind(entry.kind)}
                        className={`relative text-left rounded-xl border p-3 transition-all flex gap-3 items-start ${
                          selected
                            ? "border-[#00A651] bg-[#00A651]/5 ring-2 ring-[#00A651]/20"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        aria-pressed={selected}
                      >
                        <VariantThumbnail kind={entry.kind} category={entry.category} />
                        <span className="flex-1 min-w-0">
                          <span className="block font-heading text-sm font-bold text-[#0B2341] truncate">
                            {entry.displayName}
                          </span>
                          <span className="block text-xs text-gray-600 mt-1 leading-snug line-clamp-2">
                            {entry.intent}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={`flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                            selected
                              ? "bg-[#00A651] text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {selected ? "✓" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-[#0B2341] hover:text-[#00A651]"
          >
            ← Back
          </button>
          <button
            type="button"
            disabled={!canContinue}
            onClick={onContinue}
            className="ml-auto bg-[#00A651] hover:bg-[#00C764] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Review →
          </button>
        </div>
      </section>

      {/* Sidebar — selection list */}
      <aside className="lg:sticky lg:top-16 self-start rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="font-heading text-sm font-semibold text-[#0B2341] uppercase tracking-wider">
          Selected ({selectedKinds.length})
        </h3>
        <p className="text-xs text-gray-500 mt-1">Drag to reorder.</p>

        {selectedKinds.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            Pick at least 3 variants from the catalog.
          </p>
        ) : (
          <ul className="mt-4 space-y-1.5">
            {selectedKinds.map((kind, idx) => (
              <SelectedRow
                key={kind}
                index={idx}
                kind={kind}
                onMove={moveKind}
                onRemove={() => removeKind(kind)}
              />
            ))}
          </ul>
        )}

        {recommendedRangeWarning && (
          <p className="mt-4 text-xs text-amber-700">{recommendedRangeWarning}</p>
        )}

        {selectedKinds.length > 0 && selectedKinds.length < 3 && (
          <p className="mt-4 text-xs text-amber-700">
            Pick at least 3 to continue.
          </p>
        )}
      </aside>
    </div>
  );
}

function SelectedRow({
  index,
  kind,
  onMove,
  onRemove,
}: {
  index: number;
  kind: WidgetKind;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  const entry = CATALOG.find((c) => c.kind === kind);
  // Lightweight HTML5 drag — no library, draggable rows.
  const [over, setOver] = useState(false);
  return (
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(index));
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        const from = Number(e.dataTransfer.getData("text/plain"));
        if (Number.isInteger(from) && from !== index) onMove(from, index);
        setOver(false);
      }}
      className={`group flex items-center gap-2 rounded-lg border px-2.5 py-2 cursor-grab ${
        over ? "border-[#00A651] bg-[#00A651]/5" : "border-gray-200 bg-white"
      }`}
    >
      <span aria-hidden className="text-gray-300 text-xs leading-none">
        ⋮⋮
      </span>
      <span className="text-xs font-mono text-gray-400 w-5 text-right">{index + 1}</span>
      <span className="flex-1 min-w-0 text-sm text-[#0B2341] truncate font-medium">
        {entry?.displayName ?? kind}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${kind}`}
        className="text-gray-300 hover:text-red-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M8 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h3a1 1 0 1 1 0 2h-.5l-.7 9.06A2 2 0 0 1 11.81 18H8.19a2 2 0 0 1-1.99-1.94L5.5 7H5a1 1 0 1 1 0-2h3V4Zm2 4a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Step 3 — Review + generate
// ─────────────────────────────────────────────────────────────────────────

function Step3({
  audienceLabel,
  audienceContext,
  selectedKinds,
  sampleName,
  setSampleName,
  busy,
  progressLines,
  warnings,
  error,
  onBack,
  onSubmit,
  onCancel,
  canSubmit,
}: {
  audienceLabel: string;
  audienceContext: string;
  selectedKinds: WidgetKind[];
  sampleName: string;
  setSampleName: (s: string) => void;
  busy: boolean;
  progressLines: ProgressLine[];
  warnings: string[];
  error: string | null;
  onBack: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  canSubmit: boolean;
}) {
  const suggestedName = useMemo(() => {
    const date = new Date().toISOString().slice(0, 10);
    return `${audienceLabel} Sample — ${date}`;
  }, [audienceLabel]);

  return (
    <section className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
      <h2 className="font-heading text-xl font-bold text-[#0B2341]">
        Step 3 — Generate your sample
      </h2>
      <p className="text-gray-600 mt-1 text-sm">
        We&rsquo;ll write cohesive copy across {selectedKinds.length} blocks for
        this audience.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-[11px] uppercase tracking-wider text-[#00A651] font-semibold mb-1.5">
            Audience
          </p>
          <p className="text-sm font-bold text-[#0B2341]">{audienceLabel}</p>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            {audienceContext}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-[11px] uppercase tracking-wider text-[#00A651] font-semibold mb-1.5">
            Selected widgets ({selectedKinds.length})
          </p>
          <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
            {selectedKinds.map((k) => {
              const entry = CATALOG.find((c) => c.kind === k);
              return <li key={k}>{entry?.displayName ?? k}</li>;
            })}
          </ol>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="sample-name"
          className="block text-sm font-semibold text-[#0B2341] mb-1.5"
        >
          Sample name (optional)
        </label>
        <input
          id="sample-name"
          type="text"
          value={sampleName}
          onChange={(e) => setSampleName(e.target.value)}
          disabled={busy}
          placeholder={suggestedName}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0B2341] focus:ring-4 focus:ring-[#0B2341]/10 disabled:bg-gray-50"
        />
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="text-sm font-semibold text-[#0B2341] hover:text-[#00A651] disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="ml-auto bg-[#00A651] hover:bg-[#00C764] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          {busy ? "Generating…" : "Generate cohesive sample"}
        </button>
        {busy && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-[#0B2341]"
          >
            Cancel
          </button>
        )}
      </div>

      {(busy || progressLines.length > 0 || warnings.length > 0 || error) && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="font-heading text-sm font-semibold text-[#0B2341] mb-3">
            Progress
          </h3>
          <ol className="space-y-2">
            {progressLines.map((line, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <Indicator done={line.done} />
                <span className={line.done ? "text-[#0B2341]" : "text-[#0B2341] font-medium"}>
                  {line.label}
                </span>
              </li>
            ))}
          </ol>
          {warnings.length > 0 && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-semibold text-amber-900 mb-1">Warnings</p>
              <ul className="text-xs text-amber-800 list-disc pl-4 space-y-0.5">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold text-red-900 mb-1">Error</p>
              <p className="text-xs text-red-800">{error}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Indicator({ done }: { done: boolean }) {
  if (done) {
    return (
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00A651] text-white text-[10px]"
      >
        ✓
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="inline-block w-5 h-5 rounded-full border-2 border-[#0B2341] border-t-transparent animate-spin"
    />
  );
}
