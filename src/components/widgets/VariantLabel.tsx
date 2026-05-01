export function VariantLabel({ label }: { label: string }) {
  return (
    <div className="mb-4">
      <span className="inline-block bg-[#0B2341] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Variant {label}
      </span>
    </div>
  );
}
