"use client";
import { useState } from "react";
import { HeroVariants } from "@/components/widgets/Hero";
import { CTAVariants } from "@/components/widgets/CTA";
import { FeatureHighlights } from "@/components/widgets/FeatureHighlights";
import { TestimonialVariants } from "@/components/widgets/Testimonials";
import { FAQVariants } from "@/components/widgets/FAQ";
import { VanityMetrics } from "@/components/widgets/VanityMetrics";
import { FormVariants } from "@/components/widgets/Forms";
import { ResourceList } from "@/components/widgets/ResourceList";
import { ScoreChart } from "@/components/widgets/ScoreChart";
import { SiteNav } from "@/components/SiteNav";

const sections = [
  { id: "hero", label: "Hero Sections" },
  { id: "cta", label: "CTAs" },
  { id: "features", label: "Feature Highlights" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ Accordion" },
  { id: "metrics", label: "Vanity Metrics" },
  { id: "forms", label: "Lead Forms" },
  { id: "resources", label: "Resource List" },
  { id: "score", label: "Score Chart" },
];

export default function WidgetsPage() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <>
      <SiteNav />
      <div className="flex min-h-screen">
        {/* Sidebar Nav — sits below the 48px SiteNav on desktop */}
        <nav className="w-64 bg-[#0B2341] text-white fixed top-12 bottom-0 overflow-y-auto z-40 hidden lg:block">
          <div className="p-6 border-b border-[#153A5C]">
            <h1 className="font-heading text-lg font-bold text-[#17FFDC]">CELPIP</h1>
            <p className="text-sm text-gray-300 mt-1">Widget Gallery</p>
            <p className="text-xs text-gray-400 mt-0.5">Overclock Accelerator</p>
          </div>
          <ul className="py-4">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`block px-6 py-3 text-sm transition-colors hover:bg-[#153A5C] ${
                    activeSection === s.id
                      ? "bg-[#153A5C] border-l-4 border-[#00A651] text-white font-medium"
                      : "text-gray-300"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#153A5C]">
            <p className="text-xs text-gray-500">Phase 1 Exploration</p>
            <p className="text-xs text-gray-500">April 2026</p>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-12 z-30 bg-[#0B2341] text-white p-4">
            <h1 className="font-heading text-lg font-bold text-[#17FFDC]">CELPIP Widget Gallery</h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-12">
              <h1 className="font-heading text-3xl font-bold text-[#0B2341]">CELPIP Component Library</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Exploration of widget designs for CELPIP marketing microsites.
                Each section shows multiple design variants for discussion and selection.
              </p>
            </div>

            <WidgetSection id="hero" title="Hero Sections" description="Primary landing section with headline, subtext, and CTA buttons.">
              <HeroVariants />
            </WidgetSection>

            <WidgetSection id="cta" title="Call-to-Action Blocks" description="Conversion-focused modules with heading, summary, and action buttons.">
              <CTAVariants />
            </WidgetSection>

            <WidgetSection id="features" title="Feature Highlights" description="Showcase key benefits and features with icons and descriptions.">
              <FeatureHighlights />
            </WidgetSection>

            <WidgetSection id="testimonials" title="Testimonials" description="Social proof through quotes and video testimonials.">
              <TestimonialVariants />
            </WidgetSection>

            <WidgetSection id="faq" title="FAQ Accordion" description="Expandable question-and-answer sections, filterable by category.">
              <FAQVariants />
            </WidgetSection>

            <WidgetSection id="metrics" title="Vanity Metrics" description="Key statistics and numbers that build credibility.">
              <VanityMetrics />
            </WidgetSection>

            <WidgetSection id="forms" title="Lead Capture Forms" description="Form modules for lead generation, integrated with Braze/Salesforce.">
              <FormVariants />
            </WidgetSection>

            <WidgetSection id="resources" title="Resource List" description="Blogs, podcasts, webinars, and YouTube Lives with category filtering.">
              <ResourceList />
            </WidgetSection>

            <WidgetSection id="score" title="Score Alignment Chart" description="Interactive CLB / DHA / CEFR equivalency display.">
              <ScoreChart />
            </WidgetSection>
          </div>
        </main>
      </div>
    </>
  );
}

function WidgetSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="border-b-2 border-[#0B2341] pb-3 mb-8">
        <h2 className="font-heading text-2xl font-bold text-[#0B2341]">{title}</h2>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}
