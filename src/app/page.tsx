import Link from "next/link";

export default function ChooserHome() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B2341] text-white relative overflow-hidden">
      {/* subtle radial accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, rgba(23,255,220,0.10) 0%, transparent 60%), radial-gradient(50% 50% at 90% 100%, rgba(0,166,81,0.18) 0%, transparent 60%)",
        }}
      />

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-5xl w-full text-center">
          <p className="font-heading text-sm tracking-[0.2em] uppercase text-[#17FFDC] mb-4">
            Overclock Accelerator &times; Prometric
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            CELPIP Microsite Infrastructure
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">
            Phase 1 exploration &middot; Overclock Accelerator &times; Prometric
          </p>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ChooserCard
              href="/widgets"
              eyebrow="Component library"
              title="Widget Gallery"
              description="Browse the component library and design variants."
              accent="teal"
            />
            <ChooserCard
              href="/microsites"
              eyebrow="35 sample microsites"
              title="Microsite Concepts"
              description="Walk through 35 sample microsites — widget layouts, regional conversions, and custom landing pages."
              accent="green"
            />
            <ChooserCard
              href="/campaigns"
              eyebrow="AI page builder"
              title="Campaigns"
              description="Describe an audience and concept — get ad creatives plus a full microsite."
              accent="purple"
            />
            <ChooserCard
              href="/builder"
              eyebrow="Widget composer"
              title="Builder"
              description="Pick widget variants you like — AI rewrites the copy into one cohesive, shareable microsite sample."
              accent="gold"
            />
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 py-6 text-center">
        <p className="text-xs text-gray-400">Built for Zoom demo &middot; 2026-05-01</p>
      </footer>
    </main>
  );
}

function ChooserCard({
  href,
  eyebrow,
  title,
  description,
  accent,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "teal" | "green" | "purple" | "gold";
}) {
  const accentMap: Record<typeof accent, { color: string; border: string }> = {
    teal: { color: "#17FFDC", border: "hover:border-[#17FFDC]" },
    green: { color: "#00A651", border: "hover:border-[#00A651]" },
    gold: { color: "#FFBD17", border: "hover:border-[#FFBD17]" },
    purple: { color: "#A78BFA", border: "hover:border-[#A78BFA]" },
  };
  const accentColor = accentMap[accent].color;
  const accentBorder = accentMap[accent].border;
  return (
    <Link
      href={href}
      className={`group relative text-left rounded-2xl border border-[#153A5C] bg-[#0E2B4F]/80 p-8 transition-all hover:bg-[#153A5C] hover:-translate-y-1 ${accentBorder}`}
    >
      <p
        className="font-heading text-xs tracking-widest uppercase mb-3"
        style={{ color: accentColor }}
      >
        {eyebrow}
      </p>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">{description}</p>
      <span
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
        style={{ color: accentColor }}
      >
        Open
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.25 4.25a.75.75 0 0 1 0 1.08l-4.25 4.25a.75.75 0 0 1-1.06-.02Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </Link>
  );
}
