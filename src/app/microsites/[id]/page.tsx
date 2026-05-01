import { notFound } from "next/navigation";
import { getMicrosite, microsites } from "@/microsites/registry";

// Pre-render all 10 microsite shells at build time.
export function generateStaticParams() {
  return microsites.map((m) => ({ id: String(m.id) }));
}

export default async function MicrositePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum)) notFound();

  const entry = getMicrosite(idNum);
  if (!entry) notFound();

  return (
    <article className="relative">
      {/* Hero placeholder — to be replaced in Wave 2 */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #0B2341 0%, #153A5C 60%, #0B2341 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(50% 60% at 80% 0%, rgba(23,255,220,0.10) 0%, transparent 60%), radial-gradient(40% 50% at 10% 100%, rgba(0,166,81,0.16) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="font-heading text-xs sm:text-sm tracking-[0.25em] uppercase text-[#17FFDC]">
            Microsite {entry.id} of {microsites.length} &middot; {entry.tag}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
            {entry.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            {entry.description}
          </p>
          <p className="mt-10 inline-block text-sm text-[#17FFDC] border border-[#17FFDC]/40 rounded-full px-4 py-1.5">
            Microsite content composing soon
          </p>
        </div>
      </section>

      {/* Body placeholder */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="font-heading text-lg font-semibold text-[#0B2341]">
            Wave 2 placeholder
          </p>
          <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
            This microsite&rsquo;s body will be composed from the widget library
            once Engineer A finishes the variant refactor and Engineer D
            authors the per-microsite content data.
          </p>
        </div>
      </section>
    </article>
  );
}
