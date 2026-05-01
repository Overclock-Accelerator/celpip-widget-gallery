/**
 * VariantLabel — pill above each widget variant in the gallery.
 *
 * Wave 2 addition: a small reaction-stub strip (👍 👎 💬) aligned to the
 * right of the label. The strip is purely visual — no onClick, no state —
 * and shares the same title attribute and visual language as the
 * microsite shell stubs in src/app/microsites/[id]/layout.tsx so the
 * "async feedback layer coming next week" affordance reads the same
 * across both surfaces.
 *
 * Pass `withReactions={false}` to hide the strip on a specific variant.
 */

export function VariantLabel({
  label,
  withReactions = true,
}: {
  label: string;
  withReactions?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <span className="inline-block bg-[#0B2341] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Variant {label}
      </span>
      {withReactions ? <ReactionStubStrip /> : null}
    </div>
  );
}

function ReactionStubStrip() {
  return (
    <div
      className="flex items-center gap-1"
      aria-label="Reactions (coming soon)"
    >
      <ReactionStub emoji={"\u{1F44D}"} />
      <ReactionStub emoji={"\u{1F44E}"} />
      <ReactionStub emoji={"\u{1F4AC}"} />
    </div>
  );
}

function ReactionStub({ emoji }: { emoji: string }) {
  return (
    <span
      title="Coming next week — async feedback layer"
      aria-label="Reaction (coming soon)"
      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-sm bg-[#0B2341]/5 text-[#0B2341] border border-[#0B2341]/10 opacity-70 hover:opacity-90 cursor-default select-none"
    >
      {emoji}
    </span>
  );
}
