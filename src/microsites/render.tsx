/**
 * Shared microsite block renderer.
 *
 * Extracted from src/app/microsites/[id]/page.tsx so the AI Builder
 * (`/builder/site/[sessionId]`) can render an AI-assembled Microsite using
 * the exact same block dispatcher and rich-text behaviour as the canonical
 * 10 sample microsites.
 */

import { Fragment, type ReactNode } from "react";

import type { WidgetBlock, RichTextBlock } from "@/microsites/data";

import {
  HeroGradient,
  HeroSplit,
  HeroFormInHeader,
  HeroFullBleedImage,
  HeroSplitForm,
  HeroFloatingPanel,
  HeroBigStat,
  HeroCentered,
} from "@/components/widgets/Hero";
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
import { TrustStrip } from "@/components/widgets/TrustStrip";
import { MomentSpotlightLargePhoto, MomentSpotlightInline } from "@/components/widgets/MomentSpotlight";
import { BookingPanelInline, BookingPanelStacked } from "@/components/widgets/BookingPanel";
import { NextStepsHorizontal, NextStepsVertical } from "@/components/widgets/NextStepsRoadmap";
import { UrgencyBar } from "@/components/widgets/UrgencyBar";
import { PrepStarterPackHero, PrepStarterPackInline } from "@/components/widgets/PrepStarterPack";
import { ObjectionHandlerFAQ } from "@/components/widgets/ObjectionHandlerFAQ";
import { ReadinessQuiz } from "@/components/widgets/ReadinessQuiz";
import {
  WhyCelpipPillars,
  WhyCelpipTestCards,
  WhyCelpipMomentum,
} from "@/components/widgets/WhyCelpip";

export function renderRichTextBlock(block: RichTextBlock, key: number): ReactNode {
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

export function renderBlock(
  block: WidgetBlock,
  key: number,
  heroImageSrc?: string,
): ReactNode {
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
    case "HeroFullBleedImage":
      return (
        <HeroFullBleedImage
          key={key}
          {...block.props}
          imageSrc={block.props.imageSrc ?? heroImageSrc}
        />
      );
    case "HeroSplitForm":
      return (
        <HeroSplitForm
          key={key}
          {...block.props}
          imageSrc={block.props.imageSrc ?? heroImageSrc}
        />
      );
    case "HeroFloatingPanel":
      return (
        <HeroFloatingPanel
          key={key}
          {...block.props}
          imageSrc={block.props.imageSrc ?? heroImageSrc}
        />
      );
    case "HeroBigStat":
      return (
        <HeroBigStat
          key={key}
          {...block.props}
          imageSrc={block.props.imageSrc ?? heroImageSrc}
        />
      );
    case "HeroCentered":
      return (
        <HeroCentered
          key={key}
          {...block.props}
          imageSrc={block.props.imageSrc ?? heroImageSrc}
        />
      );

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

    // Conversion-stage widgets (microsites #11–#20)
    case "TrustStrip":
      return <TrustStrip key={key} {...block.props} />;
    case "MomentSpotlightLargePhoto":
      return <MomentSpotlightLargePhoto key={key} {...block.props} />;
    case "MomentSpotlightInline":
      return <MomentSpotlightInline key={key} {...block.props} />;
    case "BookingPanelInline":
      return <BookingPanelInline key={key} {...block.props} />;
    case "BookingPanelStacked":
      return <BookingPanelStacked key={key} {...block.props} />;
    case "NextStepsHorizontal":
      return <NextStepsHorizontal key={key} {...block.props} />;
    case "NextStepsVertical":
      return <NextStepsVertical key={key} {...block.props} />;
    case "UrgencyBar":
      return <UrgencyBar key={key} {...block.props} />;
    case "PrepStarterPackHero":
      return <PrepStarterPackHero key={key} {...block.props} />;
    case "PrepStarterPackInline":
      return <PrepStarterPackInline key={key} {...block.props} />;
    case "ObjectionHandlerFAQ":
      return <ObjectionHandlerFAQ key={key} {...block.props} />;
    case "ReadinessQuiz":
      return <ReadinessQuiz key={key} {...block.props} />;

    case "WhyCelpipPillars":
      return <WhyCelpipPillars key={key} {...block.props} />;
    case "WhyCelpipTestCards":
      return <WhyCelpipTestCards key={key} {...block.props} />;
    case "WhyCelpipMomentum":
      return <WhyCelpipMomentum key={key} {...block.props} />;
  }
}
