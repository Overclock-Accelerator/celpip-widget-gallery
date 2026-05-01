import Image from "next/image";

/**
 * Microsite-side footer mirroring the celpip.ca link architecture so every
 * sample microsite acts as a real backlink hub to the main site. Sections and
 * paths sourced from research/celpip-positioning.md (Wayback scrape, May 2026).
 *
 * Used by both the 20 sample microsites and AI-builder previews.
 *
 * Server component — no interactivity.
 */

const TAKE_CELPIP = [
  { label: "Test Overview", href: "https://www.celpip.ca/take-celpip/overview/" },
  { label: "Test Format", href: "https://www.celpip.ca/take-celpip/test-format/" },
  { label: "Test Results", href: "https://www.celpip.ca/take-celpip/test-results/" },
  { label: "Who Accepts CELPIP", href: "https://www.celpip.ca/take-celpip/who-accepts-celpip/" },
  { label: "FAQs", href: "https://www.celpip.ca/take-celpip/faqs/" },
];

const PREPARE = [
  { label: "Prep Overview", href: "https://www.celpip.ca/prepare-for-celpip/prep-overview/" },
  { label: "Free Practice Tests", href: "https://www.celpip.ca/prepare-for-celpip/free-practice-tests/" },
  { label: "Free Resources", href: "https://www.celpip.ca/prepare-for-celpip/free-resources/" },
  { label: "Webinars & Workshops", href: "https://www.celpip.ca/prepare-for-celpip/webinars-workshops/" },
  { label: "Score Comparison Chart", href: "https://www.celpip.ca/prepare-for-celpip/score-comparison-chart/" },
  { label: "Prep Programs", href: "https://www.celpip.ca/prepare-for-celpip/prep-programs/" },
];

const STAKEHOLDERS = [
  { label: "Score Users", href: "https://www.celpip.ca/celpip-for-stakeholders/score-users/" },
  { label: "Prep Providers", href: "https://www.celpip.ca/celpip-for-stakeholders/prep-providers/" },
  { label: "Agents", href: "https://www.celpip.ca/celpip-for-stakeholders/agents/" },
  { label: "Instructors", href: "https://www.celpip.ca/celpip-for-stakeholders/instructors/" },
  { label: "Institutional Acceptance", href: "https://www.celpip.ca/celpip-for-stakeholders/institutional-acceptance/" },
];

const COUNTRIES = [
  { label: "India", href: "https://www.celpip.ca/country/india/" },
  { label: "Philippines", href: "https://www.celpip.ca/country/philippines/" },
  { label: "Australia", href: "https://www.celpip.ca/country/australia/" },
  { label: "Australian Visas", href: "https://www.celpip.ca/au/visas/" },
];

const ABOUT = [
  { label: "About Us", href: "https://www.celpip.ca/about-us/" },
  { label: "CELPIP-General", href: "https://www.celpip.ca/celpip-general/" },
  { label: "CELPIP-General LS", href: "https://www.celpip.ca/celpip-general-ls/" },
  { label: "Contact", href: "https://www.celpip.ca/contact/" },
];

export function MicrositeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0B2341] text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row — logo + tagline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-[#153A5C]">
          <div className="flex items-center gap-4">
            <Image
              src="/logos/logo_white.webp"
              alt="CELPIP"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline text-sm text-gray-400 max-w-md">
              Accelerate your future. Approved for immigration to Canada and Australia.
            </span>
          </div>
          <a
            href="https://www.celpip.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#17FFDC] hover:text-white transition-colors"
          >
            Visit celpip.ca
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M11 3a1 1 0 1 0 0 2h2.59l-7.3 7.29a1 1 0 1 0 1.42 1.42L15 6.41V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
              <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
            </svg>
          </a>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10">
          <FooterColumn heading="Take CELPIP" links={TAKE_CELPIP} />
          <FooterColumn heading="Prepare" links={PREPARE} />
          <FooterColumn heading="Stakeholders" links={STAKEHOLDERS} />
          <FooterColumn heading="Countries" links={COUNTRIES} />
          <FooterColumn heading="About" links={ABOUT} />
        </div>

        {/* Bottom legal row */}
        <div className="pt-8 border-t border-[#153A5C] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {year} Paragon Testing Enterprises. CELPIP is a registered trademark of
            Paragon Testing Enterprises, a subsidiary of UBC.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.celpip.ca/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Privacy
            </a>
            <a
              href="https://www.celpip.ca/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Terms
            </a>
            <a
              href="https://www.celpip.ca/accessibility/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {heading}
      </h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-[#17FFDC] transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
