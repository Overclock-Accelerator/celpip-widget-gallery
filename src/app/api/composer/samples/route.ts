/**
 * /api/composer/samples
 *
 * GET    → list saved samples (summaries)
 * DELETE → ?id=foo → remove one sample directory
 *
 * (Sample creation happens server-side inside /api/composer/build; we don't
 * expose a separate POST for it.)
 */

import { deleteSample, listSamples } from "@/composer/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const samples = await listSamples();
  return Response.json({ samples });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return Response.json({ error: "id query param required" }, { status: 400 });
  }
  const ok = await deleteSample(id);
  if (!ok) {
    return Response.json({ error: "Sample not found or could not be deleted" }, { status: 404 });
  }
  return Response.json({ ok: true });
}
