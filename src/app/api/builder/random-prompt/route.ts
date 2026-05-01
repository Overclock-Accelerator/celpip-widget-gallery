/**
 * POST /api/builder/random-prompt
 *
 * Generates a single fresh, plausible CELPIP-relevant starter prompt
 * for one of the two builder textareas (audience or concept). Each call
 * uses high temperature so repeat clicks yield variety.
 *
 * Request body:  { kind: "audience" | "concept" }
 * Response body: { prompt: string }
 *
 * Calls OpenAI Chat Completions (`gpt-4o-mini`) directly via fetch —
 * mirrors the wiring used by /api/builder/generate so we don't introduce
 * a new dependency.
 */

import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_BASE = "https://api.openai.com/v1";
const TEXT_MODEL = "gpt-4o-mini";

type Kind = "audience" | "concept";

const AUDIENCE_SYSTEM = `Generate a single plausible audience description for a CELPIP marketing microsite. Subject: a real prospective test taker — a specific profession (nurse, software engineer, accountant, civil engineer, etc.), a specific origin region (India / Philippines / Nigeria / etc.), and a specific intent (Canadian PR via Express Entry / citizenship / Australian skilled migration via DHA). 2-3 sentences, concrete details, written as marketing input. Just the description text — no quotes, no preamble, no list.`;

// Concept prompts steer the model to a SINGLE, concrete, shootable visual —
// not a flowery vignette with a tagline. The previous version drifted into
// "warm, sunlit moment captures…" cliches every call. Hard rules + a rotating
// concept TYPE seed kill the cliche. The TYPE forces the model into a fresh
// narrative shape every time.
const CONCEPT_TYPES = [
  "documentary moment — a real, candid scene from the candidate's day, no posing",
  "macro detail — a single tight close-up object or hand gesture (a laptop, a notebook, a passport, a mug, a door handle)",
  "environmental wide — a place in the candidate's world, person small in frame (a hospital corridor, a Lagos rooftop at dusk, a Mumbai commuter platform, a Manila kitchen at dawn)",
  "split-frame before/after — same person, two states, side by side",
  "reaction beat — face the second their CELPIP score loads on screen",
  "routine intercut — flash-cuts of their job + their study at home, no people pictured directly",
  "object still life — flat-lay of items that tell the story (notebook, headphones, registration confirmation, packed bag)",
  "second-person POV — first-person view of the test workstation, hands typing on keyboard",
  "metaphor frame — a literal visual metaphor (an unlocked door, a stamped form, a runway lit at dawn, a calendar with a circled date)",
  "cityscape — a destination city skyline implied, no person in shot",
  "voiceover-only audio scene — describe what's heard, not seen (a phone call home, an interviewer's question, a payroll-system password being typed)",
];

const CONCEPT_SYSTEM_BASE = `You are a creative director briefing a CELPIP ad shoot.
Output ONE concept idea. Hard rules:
  - Exactly ONE sentence. 12-22 words. No tagline. No quotation marks. No headline copy.
  - Concrete and shootable: name the framing, the subject, the location, and the action.
  - DO NOT use any of these words: "warm", "sunlit", "vibrant", "diverse", "beaming", "confidence", "journey", "celebrate", "joy", "pride", "world".
  - DO NOT include the word "CELPIP" — the concept is implied; we're describing the shot.
  - DO NOT add an em dash + tagline at the end. No taglines. No copy. Just the visual.
  - Sound like a one-line shot list, not marketing copy.
`;

const SYSTEM_PROMPTS: Record<Kind, string> = {
  audience: AUDIENCE_SYSTEM,
  // Concept system is built per-request to inject a rotating TYPE seed.
  concept: CONCEPT_SYSTEM_BASE,
};

function buildConceptSystem(): string {
  const type = CONCEPT_TYPES[Math.floor(Math.random() * CONCEPT_TYPES.length)];
  return `${CONCEPT_SYSTEM_BASE}\nThis call's required concept type: ${type}.`;
}

// Tiny nudge-prompt to push the model away from repeating itself across
// rapid sequential calls. Rotated into the user turn alongside high temperature.
function audienceNudge(): string {
  const seeds = [
    "Surprise me with someone unexpected.",
    "Pick a profession I haven't heard yet.",
    "Try a region I might not have thought of.",
    "Lean into a specific city or stage of life.",
    "Make this one feel different from anything generic.",
    "Choose a fresh angle.",
  ];
  return seeds[Math.floor(Math.random() * seeds.length)];
}

function conceptNudge(): string {
  const seeds = [
    "Pick a moment that wouldn't show up in a stock photo search.",
    "Lean into specifics — a real city, a real piece of equipment.",
    "Cut all sentiment. Just the shot.",
    "Make this one feel like a Wim Wenders frame.",
    "Bias toward the unglamorous and concrete.",
    "Reject anything that sounds like an ad. This is a documentary frame.",
  ];
  return seeds[Math.floor(Math.random() * seeds.length)];
}

function isKind(v: unknown): v is Kind {
  return v === "audience" || v === "concept";
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const kind = (body as { kind?: unknown } | null)?.kind;
  if (!isKind(kind)) {
    return Response.json(
      { error: "kind must be 'audience' or 'concept'" },
      { status: 400 },
    );
  }

  const system = kind === "concept" ? buildConceptSystem() : SYSTEM_PROMPTS[kind];
  const userMsg = kind === "concept" ? conceptNudge() : audienceNudge();

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
      temperature: 1.1,
      top_p: 0.95,
      // Concept hard cap is tight to enforce the one-sentence constraint;
      // audience prompts can be longer.
      max_tokens: kind === "concept" ? 80 : 220,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return Response.json(
      { error: `OpenAI request failed: ${res.status} ${text.slice(0, 240)}` },
      { status: 502 },
    );
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = json.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    return Response.json(
      { error: "OpenAI returned no content" },
      { status: 502 },
    );
  }

  // Light cleanup: strip surrounding quotes if the model added them despite
  // the system instruction.
  const prompt = raw.replace(/^["'“”]+|["'“”]+$/g, "").trim();

  return Response.json({ prompt });
}
