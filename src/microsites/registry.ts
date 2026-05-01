/**
 * Microsite registry.
 *
 * Wave 1 (this file): placeholder titles + tags + descriptions for the 10
 * planned microsites. Engineer D replaces the array with full content data
 * in Wave 2 — keep the shape compatible.
 *
 *   { id: number; title: string; tag: string; description: string }
 *
 * Add new fields as optional so the shell can keep reading title/tag without
 * breaking when content is layered in.
 */

export type MicrositeEntry = {
  id: number;
  title: string;
  tag: string;
  description: string;
};

export const microsites: MicrositeEntry[] = [
  {
    id: 1,
    title: "India",
    tag: "Regional",
    description: "Lead-gen landing for Indian test takers, IRCC-focused.",
  },
  {
    id: 2,
    title: "Philippines",
    tag: "Regional",
    description: "Healthcare-worker focused, Manila/Cebu/Davao.",
  },
  {
    id: 3,
    title: "Australia",
    tag: "Regional",
    description: "DHA-focused, skilled trades persona.",
  },
  {
    id: 4,
    title: "Campaign Landing",
    tag: "Layout",
    description: "Form-in-header optimized for paid campaigns.",
  },
  {
    id: 5,
    title: "Standard Home",
    tag: "Layout",
    description: "Balanced feature-rich landing page.",
  },
  {
    id: 6,
    title: "Resource Hub",
    tag: "Layout",
    description: "Content-led with prep materials and webinars.",
  },
  {
    id: 7,
    title: "Score Path",
    tag: "Layout",
    description: "Score equivalency-focused, CLB/CEFR/DHA emphasis.",
  },
  {
    id: 8,
    title: "B2B / Institutional",
    tag: "Layout",
    description: "For universities and immigration agents.",
  },
  {
    id: 9,
    title: "Prep-Focused",
    tag: "Layout",
    description: "Test preparation and study materials.",
  },
  {
    id: 10,
    title: "Testimonials-Led",
    tag: "Layout",
    description: "Social-proof-heavy storytelling layout.",
  },
];

export const TOTAL_MICROSITES = microsites.length;

export function getMicrosite(id: number): MicrositeEntry | undefined {
  return microsites.find((m) => m.id === id);
}
