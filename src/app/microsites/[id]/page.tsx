import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { microsites, getMicrosite } from "@/microsites/data";
import { renderBlock } from "@/microsites/render";
import { MicrositeNavbar } from "@/components/MicrositeNavbar";
import { MicrositeFooter } from "@/components/MicrositeFooter";

import BookThisWeekend from "@/components/custom-microsites/BookThisWeekend";
import ThreeMinuteDecision from "@/components/custom-microsites/ThreeMinuteDecision";
import AmIReady from "@/components/custom-microsites/AmIReady";
import YourScoreYourFuture from "@/components/custom-microsites/YourScoreYourFuture";
import TestimonialWall from "@/components/custom-microsites/TestimonialWall";

/** Static mapping of customPage key -> React component. */
const CUSTOM_PAGES: Record<string, ComponentType> = {
  BookThisWeekend,
  ThreeMinuteDecision,
  AmIReady,
  YourScoreYourFuture,
  TestimonialWall,
};

// Pre-render all microsite shells at build time.
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

  // Custom microsites render a bespoke component instead of widget blocks.
  if (entry.customPage && CUSTOM_PAGES[entry.customPage]) {
    const CustomPage = CUSTOM_PAGES[entry.customPage];
    return (
      <>
        <MicrositeNavbar />
        <CustomPage />
        <MicrositeFooter />
      </>
    );
  }

  return (
    <>
      <MicrositeNavbar />
      <article className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {entry.blocks.map((block, i) => renderBlock(block, i, entry.heroImageSrc))}
        </div>
      </article>
      <MicrositeFooter />
    </>
  );
}
