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

const SYSTEM_PROMPTS: Record<Kind, string> = {
  audience:
    "Generate a single plausible audience description for a CELPIP marketing microsite. Subject: a real prospective test taker — a specific profession (nurse, software engineer, accountant, civil engineer, etc.), a specific origin region (India / Philippines / Nigeria / etc.), and a specific intent (Canadian PR via Express Entry / citizenship / Australian skilled migration via DHA). 2-3 sentences, concrete details, written as marketing input. Just the description text — no quotes, no preamble, no list.",
  concept:
    "Generate a single plausible ad concept for a CELPIP marketing microsite. Describe a visual or emotional moment that would feature in an ad — something about confidence, opportunity, the act of preparation, or arrival in a new country. 1-2 sentences. Just the concept — no preamble.",
};

// Tiny nudge-prompt to push the model away from repeating itself across
// rapid sequential calls. We rotate a random seed phrase into the user
// turn alongside high temperature.
function userNudge(): string {
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

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[kind] },
        { role: "user", content: userNudge() },
      ],
      temperature: 1.05,
      top_p: 0.95,
      // Modest cap — these are short prompts.
      max_tokens: 220,
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
