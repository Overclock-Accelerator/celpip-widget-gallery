/**
 * One-off: generate hero images for microsites #39, #40, #41.
 *
 * Mirrors the prompt rules from src/builder/generate.ts → buildImagePrompt:
 * people-focused (career, friends at landmarks, or destination cityscape),
 * no text/logos/UI, photorealistic editorial. Writes to public/heroes/.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Minimal .env.local loader so we don't need a dotenv dep.
async function loadEnvLocal(): Promise<void> {
  try {
    const txt = await readFile(path.join(process.cwd(), ".env.local"), "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[m[1]]) process.env[m[1]] = val;
    }
  } catch {
    // ignore — env may already be in process
  }
}

const OPENAI_BASE = "https://api.openai.com/v1";
const MODEL = "gpt-image-1";
const SIZE = "1536x1024";

type Job = { id: number; out: string; prompt: string };

const COMMON_TAIL =
  "Mood: calm, focused, hopeful, supportive. " +
  "Lighting: soft natural daylight, warm midtones, no harsh shadows. " +
  "Cinematic wide editorial framing for a website hero, 16:9 composition. " +
  "Subjects must look candid and aspirational, mid-action, never posed like stock photography. " +
  "Absolutely no text, letters, words, signage, UI overlays, logos, watermarks, or superimposed graphics anywhere in the image.";

const jobs: Job[] = [
  {
    id: 39,
    out: "public/heroes/39.png",
    prompt:
      "Photorealistic editorial photograph featuring real people: a Mexican pharmacist in white coat reviewing a tablet with a colleague at a brightly lit modern hospital pharmacy counter in Mexico City, shelves of medication softly out of focus behind them. " +
      COMMON_TAIL,
  },
  {
    id: 40,
    out: "public/heroes/40.png",
    prompt:
      "Photorealistic editorial photograph featuring real people: a Brazilian accountant in business casual attire walking through a sunlit São Paulo office tower lobby, with the Avenida Paulista skyline visible through floor-to-ceiling windows behind. " +
      COMMON_TAIL,
  },
  {
    id: 41,
    out: "public/heroes/41.png",
    prompt:
      "Photorealistic editorial photograph featuring real people: a medical laboratory technologist in scrubs and safety glasses operating a modern analyser in a bright Dubai hospital lab, a colleague reviewing results on a screen in the background. " +
      COMMON_TAIL,
  },
];

async function generateOne(job: Job): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  console.log(`[${job.id}] generating ${job.out} ...`);
  const res = await fetch(`${OPENAI_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: job.prompt,
      size: SIZE,
      n: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI image failed (#${job.id}): ${res.status} ${body.slice(0, 400)}`);
  }

  const data = (await res.json()) as { data?: Array<{ b64_json?: string }> };
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error(`#${job.id}: no b64_json in response`);

  const buf = Buffer.from(b64, "base64");
  await writeFile(path.join(process.cwd(), job.out), buf);
  console.log(`[${job.id}] wrote ${buf.length.toLocaleString()} bytes → ${job.out}`);
}

async function main() {
  await loadEnvLocal();
  await Promise.all(jobs.map((j) => generateOne(j)));
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
