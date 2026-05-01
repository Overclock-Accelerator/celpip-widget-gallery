import Link from "next/link";
import { microsites } from "@/microsites/registry";
import { SiteNav } from "@/components/SiteNav";

export const metadata = {
  title: "Microsite Concepts | CELPIP",
  description: "Walk through 10 sample microsites built from the CELPIP widget library.",
};

export default function MicrositesIndexPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-[calc(100vh-3rem)] bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <p className="font-heading text-sm tracking-[0.2em] uppercase text-[#00A651]">
              Microsite Concepts
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0B2341] mt-2">
              10 sample microsites
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl text-base sm:text-lg">
              Each microsite is composed from the CELPIP widget library. Click a card
              to walk through. Use Prev / Next or arrow keys to step between them.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {microsites.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/microsites/${m.id}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 hover:border-[#0B2341] hover:shadow-md transition-all h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0B2341] text-[#17FFDC] font-heading font-bold text-sm">
                      {m.id}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-[#00A651] bg-[#00A651]/10 px-2 py-0.5 rounded">
                      {m.tag}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-bold text-[#0B2341] group-hover:text-[#153A5C]">
                    {m.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {m.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0B2341] group-hover:gap-2 transition-all">
                    Open microsite
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.25 4.25a.75.75 0 0 1 0 1.08l-4.25 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
