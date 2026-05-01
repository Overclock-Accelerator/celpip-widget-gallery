"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { getMicrosite, TOTAL_MICROSITES } from "@/microsites/registry";

const STORAGE_KEY = "celpip-microsite-shell-hidden";

export default function MicrositeShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const idNum = useMemo(() => {
    const raw = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const n = Number(raw);
    return Number.isInteger(n) && n >= 1 && n <= TOTAL_MICROSITES ? n : null;
  }, [params]);

  const entry = idNum != null ? getMicrosite(idNum) : undefined;

  const prevId = idNum != null && idNum > 1 ? idNum - 1 : null;
  const nextId = idNum != null && idNum < TOTAL_MICROSITES ? idNum + 1 : null;

  // Hide-shell toggle. Persists across microsites + reloads via localStorage.
  // Press "h" (or click the eye button) to toggle. When hidden, the SiteNav
  // and the prev/next shell bar both disappear so the microsite renders edge
  // to edge — useful for screen-share demos and screenshots.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Hydration-safe localStorage rehydrate. The lint rule warns on setState
    // inside an effect; this is the standard pattern for reading client-only
    // storage post-hydration without an SSR/CSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHidden(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, hidden ? "1" : "0");
  }, [hidden]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore if user is typing in a form field
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
          return;
        }
      }
      if (e.key === "ArrowLeft" && prevId != null) {
        router.push(`/microsites/${prevId}`);
      } else if (e.key === "ArrowRight" && nextId != null) {
        router.push(`/microsites/${nextId}`);
      } else if (e.key === "h" || e.key === "H") {
        setHidden((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevId, nextId, router]);

  // Scroll to top whenever the user navigates between microsites — keyboard
  // arrows, Prev/Next clicks, or direct URL change. Without this, Next 16
  // can land on a long microsite mid-page when the previous one was scrolled.
  useEffect(() => {
    if (typeof window === "undefined" || idNum == null) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [idNum]);

  return (
    <>
      {!hidden && <SiteNav />}
      {/* Sticky shell bar */}
      {!hidden && (
        <div className="sticky top-0 z-30 bg-[#0B2341] text-white border-b border-[#153A5C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
            {/* Left: Prev */}
            <NavBtn
              href={prevId != null ? `/microsites/${prevId}` : null}
              label="← Prev"
              ariaLabel="Previous microsite"
            />

            {/* Center: N / 10 — Title · Tag */}
            <div className="flex-1 text-center min-w-0">
              {idNum != null && entry ? (
                <p className="font-heading text-sm sm:text-base truncate">
                  <span className="text-gray-400">
                    {idNum} / {TOTAL_MICROSITES}
                  </span>
                  <span className="text-gray-500 mx-2">&mdash;</span>
                  <span className="font-bold text-white">{entry.title}</span>
                  <span className="text-[#17FFDC] ml-2 text-xs sm:text-sm font-normal">
                    &middot; {entry.tag}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-400">Microsite</p>
              )}
            </div>

            {/* Right: Next */}
            <NavBtn
              href={nextId != null ? `/microsites/${nextId}` : null}
              label="Next →"
              ariaLabel="Next microsite"
            />

            {/* Hide-bar toggle */}
            <button
              type="button"
              onClick={() => setHidden(true)}
              title="Hide bars (press H to toggle)"
              aria-label="Hide bars"
              className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-300 hover:text-white hover:bg-[#153A5C] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M10 4C5 4 1.73 7.11 1 10c.73 2.89 4 6 9 6s8.27-3.11 9-6c-.73-2.89-4-6-9-6Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M3 3l14 14" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>

            {/* Far right: Reaction stubs (intentionally non-functional) */}
            <div
              className="hidden sm:flex items-center gap-1 ml-2 pl-3 border-l border-[#153A5C]"
              aria-label="Reactions (coming soon)"
            >
              <ReactionStub emoji={"\u{1F44D}"} />
              <ReactionStub emoji={"\u{1F44E}"} />
              <ReactionStub emoji={"\u{1F4AC}"} />
            </div>
          </div>
        </div>
      )}

      {/* Floating "Show bar" pill when hidden */}
      {hidden && (
        <button
          type="button"
          onClick={() => setHidden(false)}
          title="Show bars (press H to toggle)"
          aria-label="Show bars"
          className="fixed top-3 right-3 z-50 inline-flex items-center gap-2 rounded-full bg-[#0B2341] text-white px-3 py-1.5 text-xs font-medium shadow-lg hover:bg-[#153A5C] transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M10 4C5 4 1.73 7.11 1 10c.73 2.89 4 6 9 6s8.27-3.11 9-6c-.73-2.89-4-6-9-6Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          </svg>
          Show bar
        </button>
      )}

      {/* Children */}
      <div className={`${hidden ? "min-h-screen" : "min-h-[calc(100vh-6.5rem)]"} bg-gray-50`}>
        {children}
      </div>
    </>
  );
}

function NavBtn({
  href,
  label,
  ariaLabel,
}: {
  href: string | null;
  label: string;
  ariaLabel: string;
}) {
  const base =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors";
  if (!href) {
    return (
      <span
        aria-disabled
        aria-label={ariaLabel}
        className={`${base} text-gray-500 bg-[#153A5C]/40 cursor-not-allowed select-none`}
      >
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} text-white bg-[#153A5C] hover:bg-[#1a4670]`}
    >
      {label}
    </Link>
  );
}

function ReactionStub({ emoji }: { emoji: string }) {
  return (
    <span
      title="Coming next week — async feedback layer"
      aria-label="Reaction (coming soon)"
      className="inline-flex items-center justify-center w-8 h-8 rounded-md text-base opacity-60 hover:opacity-80 cursor-default select-none"
    >
      {emoji}
    </span>
  );
}
