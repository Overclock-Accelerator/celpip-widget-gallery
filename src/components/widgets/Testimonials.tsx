"use client";
import { VariantLabel } from "./VariantLabel";

export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  score?: string;
  videoUrl?: string;
};

export type TestimonialQuoteCardsProps = {
  testimonials?: Testimonial[];
};

export type TestimonialSpotlightProps = {
  testimonial?: Testimonial;
};

export type TestimonialVideoProps = {
  testimonial?: Testimonial;
  eyebrow?: string;
  heading?: string;
  videoUrl?: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    location: "New Delhi, India",
    quote:
      "CELPIP was straightforward and stress-free. I completed everything in one sitting and got my results within a week. It helped me get my PR approved quickly.",
    score: "CLB 9",
  },
  {
    name: "Carlos Mendoza",
    location: "Manila, Philippines",
    quote:
      "The computer-based format felt natural. The practice tests were incredibly helpful, and the real test matched what I prepared for. Highly recommend CELPIP.",
    score: "CLB 10",
  },
  {
    name: "Fatima Al-Hassan",
    location: "Dubai, UAE",
    quote:
      "I chose CELPIP over other tests because of the convenience. One test, one sitting, and results in days. My immigration consultant recommended it and I'm glad they did.",
    score: "CLB 8",
  },
];

export function TestimonialQuoteCards({
  testimonials = defaultTestimonials,
}: TestimonialQuoteCardsProps = {}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <div className="text-[#00A651] text-4xl font-serif mb-3">&ldquo;</div>
          <p className="text-gray-600 text-sm flex-1 italic">{t.quote}</p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="font-heading font-semibold text-[#0B2341] text-sm">{t.name}</p>
              <p className="text-gray-400 text-xs">{t.location}</p>
            </div>
            {t.score && (
              <span className="bg-[#0B2341] text-white text-xs font-bold px-2 py-1 rounded">{t.score}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TestimonialSpotlight({
  testimonial = defaultTestimonials[0],
}: TestimonialSpotlightProps = {}) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#0B2341] to-[#153A5C] text-white p-10 md:p-14">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[#00A651] text-5xl font-serif mb-4">&ldquo;</div>
        <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6">
          {testimonial.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00A651] flex items-center justify-center text-white font-bold">
            {testimonial.name[0]}
          </div>
          <div className="text-left">
            <p className="font-heading font-semibold">{testimonial.name}</p>
            <p className="text-gray-400 text-sm">
              {testimonial.location}
              {testimonial.score && <> &middot; {testimonial.score}</>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialVideo({
  testimonial = defaultTestimonials[1],
  eyebrow = "Test Taker Story",
  heading = "“CELPIP Changed My Life”",
  videoUrl,
}: TestimonialVideoProps = {}) {
  const url = videoUrl ?? testimonial.videoUrl;
  return (
    <div className="rounded-xl bg-white border border-gray-200 overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gray-900 min-h-[250px] flex items-center justify-center">
        {url ? (
          <iframe
            src={url}
            className="w-full h-full min-h-[250px]"
            title={heading}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-white/40">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p className="text-sm">Video Testimonial</p>
            <p className="text-xs text-white/30 mt-1">YouTube Embed</p>
          </div>
        )}
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        {eyebrow && (
          <span className="text-[#00A651] text-xs font-bold uppercase tracking-wider mb-2">{eyebrow}</span>
        )}
        <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-2">{heading}</h3>
        <p className="text-gray-600 text-sm mb-4">{testimonial.quote}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0B2341] flex items-center justify-center text-white text-xs font-bold">
            {testimonial.name[0]}
          </div>
          <div>
            <p className="font-semibold text-sm text-[#0B2341]">{testimonial.name}</p>
            <p className="text-xs text-gray-400">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialVariants() {
  return (
    <>
      <VariantLabel label="A — Quote Cards" />
      <TestimonialQuoteCards />

      <VariantLabel label="B — Spotlight" />
      <TestimonialSpotlight />

      <VariantLabel label="C — Video Testimonial" />
      <TestimonialVideo />
    </>
  );
}
