/**
 * /builder/result/[sessionId]
 *
 * Reads the persisted BuilderResult JSON from
 * `public/builder/{sessionId}/site.json` and renders three sections:
 *   1. Inputs summary (audience + concept echo)
 *   2. Three ad creatives at correct aspect ratios + adHeadline/adTagline
 *   3. Generated copy brief (headline, subhead, features, testimonials, FAQs)
 *   + a button to open the full microsite render at /builder/site/{sessionId}.
 *
 * Designed to render even if image generation partially failed: ads with an
 * empty `src` show a CSS gradient with the headline overlaid as text.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

import { notFound } from "next/navigation";
import Link from "next/link";

import type { BuilderResult } from "@/builder/types";

async function loadResult(sessionId: string): Promise<BuilderResult | null> {
  const file = path.join(process.cwd(), "public", "builder", sessionId, "site.json");
  try {
    const txt = await readFile(file, "utf8");
    return JSON.parse(txt) as BuilderResult;
  } catch {
    return null;
  }
}

export default async function BuilderResultPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  if (!/^[a-z0-9-]+$/.test(sessionId)) notFound();

  const result = await loadResult(sessionId);
  if (!result) notFound();

  const { input, copy, ads, microsite, elapsedSeconds, imageFallback } = result;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <header className="mb-8">
        <p className="font-heading text-sm tracking-[0.2em] uppercase text-[#00A651]">
          AI-Generated Result
        </p>
        <div className="flex items-end justify-between mt-2 gap-4 flex-wrap">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0B2341]">
            Your campaign kit is ready.
          </h1>
          <Link
            href="/campaigns"
            className="text-sm font-semibold text-[#0B2341] hover:text-[#00A651]"
          >
            &larr; Generate another
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Session <span className="font-mono">{sessionId}</span> &middot; assembled in{" "}
          {elapsedSeconds.toFixed(1)}s
          {imageFallback && (
            <span className="ml-2 text-amber-700">
              &middot; some images used a fallback
            </span>
          )}
        </p>
      </header>

      {/* Input echo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <InputCard label="Audience" body={input.audience} />
        <InputCard label="Concept" body={input.concept} />
      </div>

      {/* Section 1 — Ad creatives */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-[#0B2341] mb-1">
          Ad creatives
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Three formats. Same scene, audience-tuned framing. Click download to save.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdCard
            label="1:1 — Feed ad"
            aspect="aspect-square"
            src={ads.square}
            adHeadline={copy.adHeadline}
            adTagline={copy.adTagline}
            downloadName={`celpip-ad-1x1-${sessionId}.png`}
          />
          <AdCard
            label="9:16 — Story / Reels"
            aspect="aspect-[9/16]"
            src={ads.story}
            adHeadline={copy.adHeadline}
            adTagline={copy.adTagline}
            downloadName={`celpip-ad-9x16-${sessionId}.png`}
          />
          <AdCard
            label="4:5 — Portrait feed ad"
            aspect="aspect-[4/5]"
            src={ads.portrait}
            adHeadline={copy.adHeadline}
            adTagline={copy.adTagline}
            downloadName={`celpip-ad-4x5-${sessionId}.png`}
          />
        </div>
      </section>

      {/* Section 2 — Generated copy brief */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-[#0B2341] mb-1">
          Copy brief
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Structured copy ready for review. Same content powers the microsite below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero copy */}
          <div className="lg:col-span-2 rounded-xl bg-white border border-gray-200 p-6">
            <p className="text-xs uppercase tracking-wider text-[#00A651] font-semibold">
              {copy.eyebrow}
            </p>
            <h3 className="font-heading text-2xl font-bold text-[#0B2341] mt-2">
              {copy.headline}
            </h3>
            <p className="text-gray-600 mt-3">{copy.subhead}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CTAPill label={copy.primaryCta} variant="primary" />
              <CTAPill label={copy.secondaryCta} variant="secondary" />
            </div>
          </div>

          {/* Metrics */}
          <div className="rounded-xl bg-[#0B2341] text-white p-6">
            <p className="text-xs uppercase tracking-wider text-[#17FFDC] font-semibold mb-3">
              Vanity metrics
            </p>
            <ul className="space-y-3">
              {copy.metrics.map((m, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3">
                  <span className="font-heading text-2xl font-bold text-[#17FFDC]">
                    {m.value}
                  </span>
                  <span className="text-xs text-gray-300 text-right">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="lg:col-span-3 rounded-xl bg-white border border-gray-200 p-6">
            <p className="text-xs uppercase tracking-wider text-[#00A651] font-semibold mb-4">
              Features
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {copy.features.map((f, i) => (
                <div key={i}>
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <h4 className="font-semibold text-[#0B2341] mb-1">{f.title}</h4>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-2 rounded-xl bg-white border border-gray-200 p-6">
            <p className="text-xs uppercase tracking-wider text-[#00A651] font-semibold mb-4">
              Testimonials
            </p>
            <div className="space-y-5">
              {copy.testimonials.map((t, i) => (
                <figure key={i} className="border-l-2 border-[#00A651] pl-4">
                  <blockquote className="text-sm text-gray-700">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold text-[#0B2341]">{t.name}</span>
                    {" · "}
                    {t.location}
                    <span className="ml-2 inline-block text-[#00A651] font-semibold">
                      {t.score}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-xl bg-white border border-gray-200 p-6">
            <p className="text-xs uppercase tracking-wider text-[#00A651] font-semibold mb-4">
              FAQs
            </p>
            <dl className="space-y-4">
              {copy.faqs.map((f, i) => (
                <div key={i}>
                  <dt className="font-semibold text-sm text-[#0B2341]">{f.q}</dt>
                  <dd className="text-xs text-gray-600 mt-1">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Section 3 — Microsite preview link */}
      <section className="rounded-xl bg-[#0B2341] text-white p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#17FFDC] font-semibold mb-1">
            Microsite preview
          </p>
          <h3 className="font-heading text-2xl font-bold">
            {microsite.title}
          </h3>
          <p className="text-gray-300 text-sm mt-1 max-w-xl">
            {microsite.blocks.length} widgets composed from the live CELPIP library &mdash;
            same components as the 10 sample microsites.
          </p>
        </div>
        <Link
          href={`/campaigns/site/${sessionId}`}
          className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
        >
          Open microsite &rarr;
        </Link>
      </section>
    </div>
  );
}

function InputCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <p className="text-xs uppercase tracking-wider text-[#00A651] font-semibold mb-2">
        {label}
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
}

function CTAPill({ label, variant }: { label: string; variant: "primary" | "secondary" }) {
  if (variant === "primary") {
    return (
      <span className="inline-flex items-center px-4 py-2 rounded-lg bg-[#00A651] text-white text-sm font-semibold">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-lg border border-[#0B2341] text-[#0B2341] text-sm font-semibold">
      {label}
    </span>
  );
}

function AdCard({
  label,
  aspect,
  src,
  adHeadline,
  adTagline,
  downloadName,
}: {
  label: string;
  aspect: string;
  src: string;
  adHeadline: string;
  adTagline: string;
  downloadName: string;
}) {
  return (
    <div>
      <div
        className={`relative ${aspect} rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-[#0B2341] to-[#00A651]`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`Generated ${label}`} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-center p-6">
            <p className="text-white font-heading text-lg font-bold drop-shadow">
              {adHeadline}
            </p>
          </div>
        )}
        <div className="absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-md bg-black/60 text-white text-[11px] font-semibold tracking-wide">
          {label}
        </div>
      </div>
      <div className="mt-3">
        <p className="font-heading text-base font-bold text-[#0B2341] leading-tight">
          {adHeadline}
        </p>
        <p className="text-sm text-gray-600 mt-1">{adTagline}</p>
        {src && (
          <a
            href={src}
            download={downloadName}
            className="inline-block mt-2 text-xs font-semibold text-[#00A651] hover:text-[#0B2341]"
          >
            Download PNG &darr;
          </a>
        )}
      </div>
    </div>
  );
}
