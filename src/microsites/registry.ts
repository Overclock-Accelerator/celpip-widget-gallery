/**
 * Microsite registry — Wave 2 surface.
 *
 * Wave 1 defined the placeholder shape:
 *   { id: number; title: string; tag: string; description: string }
 *
 * Wave 2 (Engineer D) replaces the array with full content data in
 * `./data.ts`. This file now re-exports the index-page-compatible
 * surface from data.ts so consumers (e.g. /microsites/page.tsx and
 * /microsites/[id]/layout.tsx) keep reading id/title/tag/description
 * without any change. The richer `Microsite` shape (with `blocks`)
 * is imported directly from `./data` by the [id] page.
 */

import { microsites as fullMicrosites, getMicrosite as getMicrositeFull } from "./data";
import type { Microsite } from "./data";

export type MicrositeEntry = {
  id: number;
  title: string;
  tag: string;
  description: string;
};

// View of `microsites` matching the original placeholder shape — every
// field of MicrositeEntry exists on Microsite, so this assignment is
// type-safe (Microsite is a structural superset).
export const microsites: MicrositeEntry[] = fullMicrosites;

export const TOTAL_MICROSITES = microsites.length;

export function getMicrosite(id: number): MicrositeEntry | undefined {
  return getMicrositeFull(id);
}

// Re-export the rich shape so importers can grab both from one place
// if they prefer (the [id] page imports from "./data" directly).
export type { Microsite } from "./data";
