"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { SiteNav } from "@/components/SiteNav";
import { getMicrosite, TOTAL_MICROSITES } from "@/microsites/registry";

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
      <SiteNav />
      {/* Sticky shell bar */}
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

      {/* Children below the bar */}
      <div className="min-h-[calc(100vh-6.5rem)] bg-gray-50">{children}</div>
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
