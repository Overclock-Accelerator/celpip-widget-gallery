import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";

import { microsites, getMicrosite, type WidgetBlock, type RichTextBlock } from "@/microsites/data";

import { HeroGradient, HeroSplit, HeroFormInHeader } from "@/components/widgets/Hero";
import { CTABoldBanner, CTANavyAccent, CTACardWithIcon } from "@/components/widgets/CTA";
import { FeatureGrid, FeatureNavyCards } from "@/components/widgets/FeatureHighlights";
import {
  TestimonialQuoteCards,
  TestimonialSpotlight,
  TestimonialVideo,
} from "@/components/widgets/Testimonials";
import { FAQAccordion, FAQTabbedByCategory } from "@/components/widgets/FAQ";
import { MetricsRow, MetricsNavyDividers, MetricsCards } from "@/components/widgets/VanityMetrics";
import { FormSimpleLead, FormInline, FormB2BContact } from "@/components/widgets/Forms";
import { ResourceCardGrid, ResourceFilteredList } from "@/components/widgets/ResourceList";
import { ScoreEquivalencyTable } from "@/components/widgets/ScoreChart";
import { ImageGalleryGrid, ImageGalleryCarousel } from "@/components/widgets/ImageGallery";
import { RichTextEditorial, RichTextCompact } from "@/components/widgets/RichText";

// Pre-render all 10 microsite shells at build time.
export function generateStaticParams() {
  return microsites.map((m) => ({ id: String(m.id) }));
}

// ─────────────────────────────────────────────────────────────────────────────
// RichText content renderer
// ─────────────────────────────────────────────────────────────────────────────
//
// Authored content is a typed array of blocks (see data.ts RichTextBlock).
// We turn it into JSX and pass it as children to RichTextEditorial /
// RichTextCompact, which apply their own typography styles via class
// selectors on h1/h2/h3/p/ul/ol/blockquote.

function renderRichTextBlock(block: RichTextBlock, key: number): ReactNode {
  switch (block.type) {
    case "lead":
      return (
        <p key={key} className="lead">
          {block.text}
        </p>
      );
    case "p":
      return <p key={key}>{block.text}</p>;
    case "h2":
      return <h2 key={key}>{block.text}</h2>;
    case "h3":
      return <h3 key={key}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={key}>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key}>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "blockquote":
      return <blockquote key={key}>{block.text}</blockquote>;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Block dispatcher — single switch over the discriminated union
// ─────────────────────────────────────────────────────────────────────────────

function renderBlock(block: WidgetBlock, key: number, heroImageSrc?: string): ReactNode {
  switch (block.kind) {
    case "HeroGradient":
      return <HeroGradient key={key} {...block.props} />;
    case "HeroSplit":
      return (
        <HeroSplit
          key={key}
          {...block.props}
          imageSrc={block.props.imageSrc ?? heroImageSrc}
        />
      );
    case "HeroFormInHeader":
      return <HeroFormInHeader key={key} {...block.props} />;

    case "CTABoldBanner":
      return <CTABoldBanner key={key} {...block.props} />;
    case "CTANavyAccent":
      return <CTANavyAccent key={key} {...block.props} />;
    case "CTACardWithIcon":
      return <CTACardWithIcon key={key} {...block.props} />;

    case "FeatureGrid":
      return <FeatureGrid key={key} {...block.props} />;
    case "FeatureNavyCards":
      return <FeatureNavyCards key={key} {...block.props} />;

    case "TestimonialQuoteCards":
      return <TestimonialQuoteCards key={key} {...block.props} />;
    case "TestimonialSpotlight":
      return <TestimonialSpotlight key={key} {...block.props} />;
    case "TestimonialVideo":
      return <TestimonialVideo key={key} {...block.props} />;

    case "FAQAccordion":
      return <FAQAccordion key={key} {...block.props} />;
    case "FAQTabbedByCategory":
      return <FAQTabbedByCategory key={key} {...block.props} />;

    case "MetricsRow":
      return <MetricsRow key={key} {...block.props} />;
    case "MetricsNavyDividers":
      return <MetricsNavyDividers key={key} {...block.props} />;
    case "MetricsCards":
      return <MetricsCards key={key} {...block.props} />;

    case "FormSimpleLead":
      return <FormSimpleLead key={key} {...block.props} />;
    case "FormInline":
      return <FormInline key={key} {...block.props} />;
    case "FormB2BContact":
      return <FormB2BContact key={key} {...block.props} />;

    case "ResourceCardGrid":
      return <ResourceCardGrid key={key} {...block.props} />;
    case "ResourceFilteredList":
      return <ResourceFilteredList key={key} {...block.props} />;

    case "ScoreEquivalencyTable":
      return <ScoreEquivalencyTable key={key} {...block.props} />;

    case "ImageGalleryGrid":
      return <ImageGalleryGrid key={key} {...block.props} />;
    case "ImageGalleryCarousel":
      return <ImageGalleryCarousel key={key} {...block.props} />;

    case "RichTextEditorial":
      return (
        <RichTextEditorial key={key}>
          {block.props.content.blocks.map((b, i) => (
            <Fragment key={i}>{renderRichTextBlock(b, i)}</Fragment>
          ))}
        </RichTextEditorial>
      );
    case "RichTextCompact":
      return (
        <RichTextCompact key={key}>
          {block.props.content.blocks.map((b, i) => (
            <Fragment key={i}>{renderRichTextBlock(b, i)}</Fragment>
          ))}
        </RichTextCompact>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

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
