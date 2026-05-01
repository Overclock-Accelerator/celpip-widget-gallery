import { VariantLabel } from "./VariantLabel";

export type Metric = { value: string; label: string };

export type MetricsProps = {
  metrics?: Metric[];
};

const defaultMetrics: Metric[] = [
  { value: "2M+", label: "Tests Completed" },
  { value: "30+", label: "Countries" },
  { value: "4-5", label: "Days to Results" },
  { value: "100+", label: "Test Centres" },
  { value: "3hrs", label: "One Sitting" },
];

export function MetricsRow({ metrics = defaultMetrics }: MetricsProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="font-heading text-3xl font-bold text-[#00A651]">{m.value}</div>
            <div className="text-gray-500 text-sm mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricsNavyDividers({ metrics = defaultMetrics }: MetricsProps = {}) {
  return (
    <div className="rounded-xl bg-[#0B2341] p-8">
      <div className="flex flex-wrap justify-center divide-x divide-[#153A5C]">
        {metrics.map((m, i) => (
          <div key={i} className="text-center px-8 py-4">
            <div className="font-heading text-4xl font-bold text-[#17FFDC]">{m.value}</div>
            <div className="text-gray-400 text-sm mt-2 uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricsCards({ metrics = defaultMetrics }: MetricsProps = {}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="bg-white border-2 border-gray-100 rounded-xl p-5 text-center hover:border-[#00A651] transition-colors">
          <div className="font-heading text-3xl font-extrabold text-[#0B2341]">{m.value}</div>
          <div className="text-gray-500 text-xs mt-2 uppercase tracking-wider font-medium">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

export function VanityMetrics() {
  return (
    <>
      <VariantLabel label="A — Clean Row" />
      <MetricsRow />

      <VariantLabel label="B — Navy with Dividers" />
      <MetricsNavyDividers />

      <VariantLabel label="C — Metric Cards" />
      <MetricsCards />
    </>
  );
}
