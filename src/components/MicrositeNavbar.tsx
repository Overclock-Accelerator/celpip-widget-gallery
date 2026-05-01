import Image from "next/image";

/**
 * Microsite-side navbar. This is the brand-facing chrome that lives ON the
 * microsite (CELPIP logo left, persistent CTA right) — distinct from the
 * gallery shell `MicrositeShellLayout` prev/next bar that lives ABOVE it.
 *
 * Used by:
 *   - /microsites/[id]/page.tsx (the 20 sample microsites)
 *   - /builder/site/[sessionId]/page.tsx (AI-generated microsite previews)
 *
 * Server component — no client interactivity needed.
 */
export function MicrositeNavbar() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href="#top"
          aria-label="CELPIP home"
          className="flex items-center"
        >
          <Image
            src="/logos/logo_black.webp"
            alt="CELPIP"
            width={120}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[#0B2341]">
          <a href="#hero" className="hover:text-[#00A651] transition-colors">
            Take CELPIP
          </a>
          <a href="#prep" className="hover:text-[#00A651] transition-colors">
            Prepare
          </a>
          <a href="#scores" className="hover:text-[#00A651] transition-colors">
            Scores
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#signin"
            className="hidden sm:inline-flex items-center text-sm font-medium text-[#0B2341] hover:text-[#00A651] px-3 py-2 transition-colors"
          >
            Sign In
          </a>
          <a
            href="#book"
            className="inline-flex items-center bg-[#00A651] hover:bg-[#00C764] text-white font-semibold text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Find a Test Date
          </a>
        </div>
      </div>
    </header>
  );
}
