import type { ReactNode } from "react";
import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface RichTextProps {
  children: ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// RichTextEditorial — long-form article style, centered, generous spacing
// ─────────────────────────────────────────────────────────────────────────────

export function RichTextEditorial({ children }: RichTextProps) {
  return (
    <article
      className={[
        "rounded-xl bg-white border border-gray-200 px-8 md:px-14 py-12 md:py-16",
        // Editorial typography — centered, max-w-2xl, generous leading
        "[&_h1]:font-heading [&_h1]:text-4xl md:[&_h1]:text-5xl [&_h1]:font-bold [&_h1]:text-[#0B2341] [&_h1]:leading-tight [&_h1]:mb-6",
        "[&_h2]:font-heading [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#0B2341] [&_h2]:mt-12 [&_h2]:mb-5",
        "[&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#0B2341] [&_h3]:mt-8 [&_h3]:mb-3",
        "[&_p]:text-gray-700 [&_p]:text-base md:[&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6",
        "[&_p.lead]:text-xl md:[&_p.lead]:text-2xl [&_p.lead]:text-gray-600 [&_p.lead]:leading-relaxed [&_p.lead]:font-light [&_p.lead]:mb-10",
        "[&_a]:text-[#00A651] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#00C764]",
        "[&_strong]:text-[#0B2341] [&_strong]:font-semibold",
        "[&_em]:italic",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-[#00A651] [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:text-[#0B2341] [&_blockquote]:font-light [&_blockquote]:leading-relaxed",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:text-gray-700",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:text-gray-700",
        "[&_li]:leading-relaxed",
        "[&_hr]:my-12 [&_hr]:border-gray-200",
        "[&_figure]:my-10",
        "[&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:text-center [&_figcaption]:mt-3 [&_figcaption]:italic",
      ].join(" ")}
    >
      <div className="max-w-2xl mx-auto">{children}</div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RichTextCompact — documentation/help style, left-aligned, tighter spacing
// ─────────────────────────────────────────────────────────────────────────────

export function RichTextCompact({ children }: RichTextProps) {
  return (
    <article
      className={[
        "rounded-xl bg-gray-50 border border-gray-200 p-8 md:p-10",
        // Compact typography — left-aligned, max-w-3xl, tight leading
        "[&_h1]:font-heading [&_h1]:text-2xl md:[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#0B2341] [&_h1]:mb-4",
        "[&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0B2341] [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-200",
        "[&_h3]:font-heading [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#0B2341] [&_h3]:mt-5 [&_h3]:mb-2",
        "[&_p]:text-gray-700 [&_p]:text-sm md:[&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4",
        "[&_a]:text-[#00A651] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#00C764]",
        "[&_strong]:text-[#0B2341] [&_strong]:font-semibold",
        "[&_code]:bg-[#0B2341]/5 [&_code]:text-[#0B2341] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.9em] [&_code]:font-mono",
        "[&_pre]:bg-[#0B2341] [&_pre]:text-[#17FFDC] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-5 [&_pre]:text-sm [&_pre]:leading-relaxed",
        "[&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-gray-700 [&_ul]:text-sm md:[&_ul]:text-base",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-gray-700 [&_ol]:text-sm md:[&_ol]:text-base",
        "[&_li]:leading-relaxed",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-[#FFBD17] [&_blockquote]:bg-[#FFBD17]/5 [&_blockquote]:pl-4 [&_blockquote]:py-3 [&_blockquote]:my-4 [&_blockquote]:text-sm [&_blockquote]:text-gray-700",
        "[&_hr]:my-6 [&_hr]:border-gray-200",
      ].join(" ")}
    >
      <div className="max-w-3xl">{children}</div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock content blocks
// ─────────────────────────────────────────────────────────────────────────────

function EditorialMockContent() {
  return (
    <>
      <p className="text-[#00A651] font-semibold text-sm uppercase tracking-wider mb-4 text-center">
        Test Prep Insights
      </p>
      <h1>How to Approach the CELPIP Speaking Test with Confidence</h1>
      <p className="lead">
        The Speaking section trips up more candidates than any other component — not because it&apos;s
        hard, but because it&apos;s unfamiliar. Here&apos;s what experienced test-takers wish they had
        known on day one.
      </p>
      <p>
        CELPIP is a fully computer-delivered test, which means the Speaking component is recorded — there&apos;s
        no live examiner staring back at you. For some, this is liberating. For others, it&apos;s disorienting.
        The single biggest predictor of a strong score isn&apos;t vocabulary or grammar. It&apos;s{" "}
        <strong>pacing</strong> and <strong>structure</strong>.
      </p>
      <p>
        Most candidates spend their preparation time memorizing &ldquo;advanced&rdquo; words. That&apos;s a
        mistake. The rubric rewards <em>natural communication</em> — clear ideas, organized delivery, and
        appropriate vocabulary for the context. Showing off rarely helps; it usually hurts.
      </p>

      <h2>The Three Habits of High-Scoring Candidates</h2>
      <p>
        Across hundreds of practice sessions, the same patterns emerge in candidates who score CLB 9 or above.
        They aren&apos;t rare gifts — they&apos;re trainable habits.
      </p>
      <ul>
        <li>They <strong>plan in the prep window</strong>, even if it&apos;s just 30 seconds.</li>
        <li>They <strong>structure their answer</strong> with a clear opening, middle, and close.</li>
        <li>They <strong>self-correct calmly</strong> — small slips don&apos;t derail them.</li>
      </ul>

      <blockquote>
        &ldquo;The test isn&apos;t looking for perfection. It&apos;s looking for someone who can communicate
        clearly under mild pressure. That&apos;s a much lower bar than people think.&rdquo;
      </blockquote>

      <h2>What to Practice This Week</h2>
      <p>
        If you have one week before your test, focus your time here. Don&apos;t add new material — refine what
        you already have.
      </p>
      <ol>
        <li>Record yourself answering Task 1 prompts and listen back without judgment.</li>
        <li>Time yourself strictly — the clock matters more than you think.</li>
        <li>Practice transitions: &ldquo;In my view&hellip;&rdquo;, &ldquo;On the other hand&hellip;&rdquo;, &ldquo;To sum up&hellip;&rdquo;</li>
      </ol>

      <hr />

      <h3>About the Author</h3>
      <p>
        This guide draws on coaching notes from over 200 CELPIP prep sessions. Found something unclear? <a href="#feedback">Send feedback</a> — we read every note.
      </p>
    </>
  );
}

function CompactMockContent() {
  return (
    <>
      <h1>CELPIP Score Reporting API — Quick Reference</h1>
      <p>
        This page documents the endpoint partner institutions use to verify candidate CELPIP scores. All
        requests must be authenticated and rate limits apply.
      </p>

      <h2>Authentication</h2>
      <p>
        Include your API key in the <code>Authorization</code> header on every request. Keys are issued per
        organization and rotate every 90 days.
      </p>
      <pre><code>{`GET /api/v1/scores/:test-id
Authorization: Bearer sk_live_••••••
Accept: application/json`}</code></pre>

      <h2>Response Fields</h2>
      <p>
        A successful request returns a JSON object with the candidate&apos;s overall and component-level
        scores. Component scores map to CLB levels per the official conversion chart.
      </p>
      <ul>
        <li><code>overall</code> — overall CLB level (1–12)</li>
        <li><code>listening</code>, <code>reading</code>, <code>writing</code>, <code>speaking</code> — component CLB</li>
        <li><code>issued_at</code> — ISO 8601 timestamp</li>
        <li><code>verified</code> — boolean, always <code>true</code> for issued scores</li>
      </ul>

      <h2>Rate Limits & Errors</h2>
      <p>
        Each API key is limited to 60 requests per minute. Exceeding this returns a <code>429 Too Many Requests</code>
        with a <code>Retry-After</code> header.
      </p>
      <ol>
        <li>Backoff using the <code>Retry-After</code> value, not a fixed delay.</li>
        <li>Cache verified scores for at least 24 hours when possible.</li>
        <li>Contact <a href="#support">partner support</a> if you consistently hit the ceiling.</li>
      </ol>

      <blockquote>
        Note: scores older than two years return <code>verified: false</code>. CELPIP results are valid for
        immigration purposes for two years from the test date.
      </blockquote>

      <p>
        For SDK examples in TypeScript, Python, and Go, see the <a href="#sdks">official SDK reference</a>.
      </p>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RichTextVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

export function RichTextVariants() {
  return (
    <>
      {/* Variant A: Editorial article */}
      <VariantLabel label="A — Editorial Article" />
      <RichTextEditorial>
        <EditorialMockContent />
      </RichTextEditorial>

      {/* Variant B: Compact documentation */}
      <VariantLabel label="B — Compact Documentation" />
      <RichTextCompact>
        <CompactMockContent />
      </RichTextCompact>
    </>
  );
}
