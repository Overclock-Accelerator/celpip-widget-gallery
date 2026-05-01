/**
 * /builder/site/[sessionId]
 *
 * Renders the AI-assembled Microsite from disk using the same renderBlock
 * dispatcher as /microsites/[id]. The data lives at
 * `public/builder/{sessionId}/site.json`.
 *
 * A sticky notice bar at the top labels this as an AI preview and links
 * back to the result page.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";
import Link from "next/link";

import type { BuilderResult } from "@/builder/types";
import { renderBlock } from "@/microsites/render";
import { MicrositeNavbar } from "@/components/MicrositeNavbar";
import { MicrositeFooter } from "@/components/MicrositeFooter";

async function loadResult(sessionId: string): Promise<BuilderResult | null> {
  const file = path.join(process.cwd(), "public", "builder", sessionId, "site.json");
  try {
    const txt = await readFile(file, "utf8");
    return JSON.parse(txt) as BuilderResult;
  } catch {
    return null;
  }
}

export default async function BuilderSitePage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  if (!/^[a-z0-9-]+$/.test(sessionId)) notFound();

  const result = await loadResult(sessionId);
  if (!result) notFound();

  const { microsite, input } = result;
  const audienceExcerpt =
    input.audience.length > 100 ? `${input.audience.slice(0, 97)}…` : input.audience;

  return (
    <>
      {/* AI preview notice bar */}
      <div className="sticky top-0 z-30 bg-[#0B2341] text-white border-b border-[#153A5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#17FFDC] text-[#0B2341] text-[11px] font-bold tracking-wide">
            AI PREVIEW
          </span>
          <p className="text-xs text-gray-300 truncate flex-1">
            Created for: {audienceExcerpt}
          </p>
          <Link
            href={`/builder/result/${sessionId}`}
            className="text-xs font-semibold text-[#17FFDC] hover:text-white whitespace-nowrap"
          >
            &larr; Back to result
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
