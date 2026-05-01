import { notFound } from "next/navigation";

import { microsites, getMicrosite } from "@/microsites/data";
import { renderBlock } from "@/microsites/render";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {entry.blocks.map((block, i) => renderBlock(block, i, entry.heroImageSrc))}
      </div>
    </article>
  );
}
