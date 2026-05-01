/**
 * /builder/sample/[id] — preview a saved Builder sample.
 *
 * Renders the AI-cohesive microsite using the same renderBlock dispatcher as
 * /microsites/[id] and /builder/site/[sessionId]. Adds a small utility bar at
 * the top with: copy-link, "Use in Campaign" deep-link, delete.
 */

import { notFound } from "next/navigation";
import Link from "next/link";

import { loadSample } from "@/composer/storage";
import { renderBlock } from "@/microsites/render";
import { MicrositeNavbar } from "@/components/MicrositeNavbar";
import { MicrositeFooter } from "@/components/MicrositeFooter";

export const dynamic = "force-dynamic";

export default async function BuilderSamplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sample = await loadSample(id);
  if (!sample) notFound();

  const { microsite, name, audienceLabel, selectedKinds } = sample;

  return (
    <>
      {/* Sample utility bar — sits above MicrositeNavbar */}
      <div className="sticky top-0 z-30 bg-[#0B2341] text-white border-b border-[#153A5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#17FFDC] text-[#0B2341] text-[11px] font-bold tracking-wide">
            BUILDER · SAMPLE
          </span>
          <p className="text-xs text-gray-300 truncate flex-1">
            <span className="font-semibold text-white">{name}</span>
            <span className="mx-2 text-gray-500">·</span>
            <span>{audienceLabel}</span>
            <span className="mx-2 text-gray-500">·</span>
            <span>{selectedKinds.length} blocks</span>
          </p>
          <Link
            href="/builder/samples"
            className="text-xs font-semibold text-gray-300 hover:text-white whitespace-nowrap"
          >
            All samples
          </Link>
          <Link
            href={`/campaigns?sample=${encodeURIComponent(sample.id)}`}
            className="hidden sm:inline-flex items-center text-xs font-semibold text-[#17FFDC] hover:text-white whitespace-nowrap"
          >
            Use in Campaign →
          </Link>
        </div>
      </div>

      <MicrositeNavbar />
      <article className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {microsite.blocks.map((block, i) =>
            renderBlock(block, i, microsite.heroImageSrc),
          )}
        </div>
      </article>
      <MicrositeFooter />
    </>
  );
}
