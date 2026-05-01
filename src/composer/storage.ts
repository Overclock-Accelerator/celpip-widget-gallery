/**
 * Filesystem storage for composer Samples.
 *
 * Mirrors the existing /campaigns session pattern (public/builder/{sessionId}/site.json)
 * but at public/builds/{slug}/sample.json. Slug = url-safe sample id we
 * generate at build time, also used as the sharable URL fragment.
 *
 * All exports are server-only (use node:fs).
 */

import { mkdir, readFile, readdir, rm, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

import type { Sample, SampleSummary } from "./types";

const PUBLIC_BUILDS_DIR = path.join(process.cwd(), "public", "builds");

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{2,80}$/;

function isValidSlug(s: string): boolean {
  return SLUG_REGEX.test(s);
}

/**
 * Generate a slug from an audience preset key + a date stamp + 4 random
 * hex chars. Stable, readable, unlikely to collide.
 */
export function newSampleId(audienceKey: string): string {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const tail = randomBytes(2).toString("hex");
  // Basic sanitisation of audience key (it's already kebab-cased, but be safe).
  const cleanAudience = audienceKey.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 40);
  return `${cleanAudience}-${date}-${tail}`;
}

async function ensureBuildsDir(): Promise<void> {
  await mkdir(PUBLIC_BUILDS_DIR, { recursive: true });
}

async function ensureSampleDir(id: string): Promise<string> {
  if (!isValidSlug(id)) throw new Error(`Invalid sample id: ${id}`);
  const dir = path.join(PUBLIC_BUILDS_DIR, id);
  await mkdir(dir, { recursive: true });
  return dir;
}

export async function saveSample(sample: Sample): Promise<void> {
  const dir = await ensureSampleDir(sample.id);
  const file = path.join(dir, "sample.json");
  await writeFile(file, JSON.stringify(sample, null, 2), "utf8");
}

export async function loadSample(id: string): Promise<Sample | null> {
  if (!isValidSlug(id)) return null;
  const file = path.join(PUBLIC_BUILDS_DIR, id, "sample.json");
  try {
    const txt = await readFile(file, "utf8");
    return JSON.parse(txt) as Sample;
  } catch {
    return null;
  }
}

export async function deleteSample(id: string): Promise<boolean> {
  if (!isValidSlug(id)) return false;
  const dir = path.join(PUBLIC_BUILDS_DIR, id);
  try {
    await rm(dir, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

export async function listSamples(): Promise<SampleSummary[]> {
  await ensureBuildsDir();
  let entries: string[] = [];
  try {
    entries = await readdir(PUBLIC_BUILDS_DIR);
  } catch {
    return [];
  }
  const summaries: Array<SampleSummary & { _mtime: number }> = [];
  for (const name of entries) {
    if (!isValidSlug(name)) continue;
    const file = path.join(PUBLIC_BUILDS_DIR, name, "sample.json");
    try {
      const [txt, st] = await Promise.all([readFile(file, "utf8"), stat(file)]);
      const sample = JSON.parse(txt) as Sample;
      summaries.push({
        id: sample.id,
        name: sample.name,
        audienceLabel: sample.audienceLabel,
        selectedKinds: sample.selectedKinds,
        firstBlockKind: sample.microsite.blocks[0]?.kind ?? null,
        createdAt: sample.createdAt,
        _mtime: st.mtimeMs,
      });
    } catch {
      // Skip malformed sample directories silently.
      continue;
    }
  }
  // Sort newest first by mtime.
  summaries.sort((a, b) => b._mtime - a._mtime);
  return summaries.map(({ _mtime: _ignore, ...rest }) => {
    void _ignore;
    return rest;
  });
}
