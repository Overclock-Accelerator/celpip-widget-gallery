/**
 * /builder/samples — grid of saved Builder samples.
 *
 * Each sample is a marketer-curated, AI-cohesive microsite saved at
 * public/builds/{id}/sample.json. From here you can preview a sample,
 * delete it, or deep-link it into /campaigns as a starting structure.
 */

import Link from "next/link";

import { listSamples } from "@/composer/storage";
import { SiteNav } from "@/components/SiteNav";

export const dynamic = "force-dynamic";

export default async function SamplesIndexPage() {
  const samples = await listSamples();

  return (
    <>
      <SiteNav />
      <main className="min-h-[calc(100vh-3rem)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="font-heading text-xs tracking-[0.2em] uppercase text-[#00A651] mb-2">
                Builder · Samples
              </p>
              <h1 className="font-heading text-3xl font-bold text-[#0B2341]">
                Saved samples
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Cohesive microsites you&apos;ve built. Open one to preview, share its URL,
                or use it as the starting structure for a Campaign.
              </p>
            </div>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              + Build a new sample
            </Link>
          </div>

          {samples.length === 0 ? (
            <div className="rounded-xl bg-white border-2 border-dashed border-gray-200 p-16 text-center">
              <h2 className="font-heading text-xl font-bold text-[#0B2341] mb-2">
                No samples yet
              </h2>
              <p className="text-gray-500 mb-6">
                Pick an audience, select the widget variants you like, and we&apos;ll
                generate a cohesive microsite ready to share.
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Build your first sample →
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {samples.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/builder/sample/${s.id}`}
                    className="group block bg-white rounded-xl border border-gray-200 hover:border-[#00A651] hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-[#0B2341] to-[#153A5C] aspect-[16/9] flex items-center justify-center text-[#17FFDC]">
                      <span className="font-heading text-sm uppercase tracking-wider opacity-80">
                        {s.firstBlockKind ?? "Sample"}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <p className="text-xs font-medium text-[#00A651] tracking-wide uppercase">
                        {s.audienceLabel}
                      </p>
                      <h3 className="font-heading font-bold text-[#0B2341] leading-snug">
                        {s.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {s.selectedKinds.length} blocks &middot;{" "}
                        {new Date(s.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
