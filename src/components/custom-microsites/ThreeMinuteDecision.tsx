/**
 * #32 - "3-Minute Decision" (Speed/Simplicity)
 *
 * Ultra-minimal single-scroll page. Three sections only:
 * "What you need" -> "What you get" -> "Book now".
 * Feels like a premium SaaS landing page.
 */

export default function ThreeMinuteDecision() {
  return (
    <div className="min-h-screen bg-white">
      {/* ---- hero ---- */}
      <section className="px-4 pt-24 pb-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-celpip-green font-heading font-semibold text-sm uppercase tracking-widest mb-6">
            3-minute decision
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
            You already know
            <br />
            you need CELPIP.
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed max-w-lg mx-auto">
            This page takes three minutes to read. By the end, you&apos;ll be
            booked.
          </p>
        </div>
      </section>

      {/* ---- section 1: what you need ---- */}
      <section className="px-4 py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block text-celpip-green font-heading font-bold text-7xl opacity-20 mb-4 select-none">
            01
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-8">
            What you need
          </h2>
          <ul className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <li className="flex gap-4">
              <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-celpip-green/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-celpip-green" />
              </span>
              <span>
                A valid English language test score for your immigration,
                citizenship, or professional designation application.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-celpip-green/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-celpip-green" />
              </span>
              <span>
                Results fast enough to meet your deadline &mdash; not weeks from
                now, but days.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-celpip-green/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-celpip-green" />
              </span>
              <span>
                A test experience that&apos;s comfortable, modern, and
                predictable &mdash; no surprises on test day.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---- section 2: what you get ---- */}
      <section className="px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block text-celpip-green font-heading font-bold text-7xl opacity-20 mb-4 select-none">
            02
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-8">
            What you get with CELPIP
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "One sitting, all four skills",
                body: "Listening, Reading, Writing, and Speaking &mdash; done in about 3 hours on a single computer. No face-to-face examiner.",
              },
              {
                title: "Results in 2 to 4 calendar days",
                body: "Your official score report lands in your CELPIP account online. Download it. Send it. Done.",
              },
              {
                title: "Accepted across Canada and beyond",
                body: "Designated by IRCC for permanent residency, citizenship, and professional applications. Also recognised by DHA Australia.",
              },
              {
                title: "100+ hours of free prep",
                body: "Free practice tests, webinars, study plans, and sample questions &mdash; all from the official test maker.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-celpip-green pl-6">
                <h3 className="font-heading text-xl font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            ))}
          </div>

          {/* testimonial */}
          <blockquote className="mt-16 border-t border-gray-200 pt-10">
            <p className="text-xl text-navy italic leading-relaxed">
              &ldquo;I registered on Monday, tested on Saturday, and had my
              score by Tuesday. The whole process was seamless.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-gray-500">
              &mdash; Priya M., Nurse, Express Entry applicant
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ---- section 3: book now ---- */}
      <section className="px-4 py-24 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block text-teal font-heading font-bold text-7xl opacity-20 mb-4 select-none">
            03
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Book now
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto mb-10">
            Pick a date. Pick a city. You&apos;ll be done in under two minutes.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center px-12 py-4 text-lg font-heading font-semibold rounded-lg bg-celpip-green hover:bg-green-light text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Find a Test Date
          </a>
          <p className="text-gray-500 text-sm mt-6">
            Free cancellation up to 3 business days before your test
          </p>
        </div>
      </section>
    </div>
  );
}
