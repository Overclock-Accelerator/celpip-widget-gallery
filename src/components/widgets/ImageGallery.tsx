"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  heading?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ImageGalleryGrid — 3-col grid, captions on hover overlay
// ─────────────────────────────────────────────────────────────────────────────

export function ImageGalleryGrid({ images, heading }: ImageGalleryProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-8">
      {heading ? (
        <h3 className="font-heading text-2xl font-bold text-[#0B2341] mb-6">{heading}</h3>
      ) : null}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <figure
            key={i}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {img.caption ? (
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0B2341]/90 via-[#0B2341]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium p-4 leading-snug">
                  {img.caption}
                </span>
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ImageGalleryLightbox — grid with click-to-expand modal overlay
// ─────────────────────────────────────────────────────────────────────────────

export function ImageGalleryLightbox({ images, heading }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const open = useCallback((i: number) => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(i);
  }, []);

  // Handle Escape + arrow navigation, lock body scroll, manage focus
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button when opening for accessibility
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [activeIndex, close, images.length]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-8">
      {heading ? (
        <h3 className="font-heading text-2xl font-bold text-[#0B2341] mb-6">{heading}</h3>
      ) : null}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-[#00A651]/40"
            aria-label={`Open image: ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-2 right-2 bg-white/90 text-[#0B2341] rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {active !== null && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${activeIndex + 1} of ${images.length}: ${active.alt}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B2341]/95 p-4 md:p-8"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-[#17FFDC]/40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-[#17FFDC]/40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-[#17FFDC]/40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <figure
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl"
            />
            <figcaption className="text-white/90 text-sm mt-4 text-center max-w-2xl">
              <span className="text-[#17FFDC] font-semibold mr-2">
                {activeIndex + 1} / {images.length}
              </span>
              {active.caption ?? active.alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ImageGalleryCarousel — horizontal scroll-snap with prev/next + caption bar
// ─────────────────────────────────────────────────────────────────────────────

export function ImageGalleryCarousel({ images, heading }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => {
    scrollToIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, scrollToIndex]);

  const prev = useCallback(() => {
    scrollToIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, scrollToIndex]);

  // Keep activeIndex in sync when the user scrolls manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const trackLeft = track.scrollLeft;
        let bestIndex = 0;
        let bestDistance = Infinity;
        children.forEach((child, i) => {
          const distance = Math.abs(child.offsetLeft - track.offsetLeft - trackLeft);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = i;
          }
        });
        setActiveIndex(bestIndex);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const active = images[activeIndex];

  return (
    <div className="rounded-xl bg-[#0B2341] p-6 md:p-8">
      {heading ? (
        <h3 className="font-heading text-2xl font-bold text-white mb-6">{heading}</h3>
      ) : null}

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85%] md:w-[70%] aspect-[16/9] rounded-lg overflow-hidden bg-[#153A5C] relative"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B2341] flex items-center justify-center shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#17FFDC]/40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0B2341] flex items-center justify-center shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#17FFDC]/40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 bg-[#153A5C] rounded-lg px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-[#17FFDC] text-xs font-bold uppercase tracking-wider mb-0.5">
            {activeIndex + 1} / {images.length}
          </p>
          <p className="text-white text-sm truncate">
            {active?.caption ?? active?.alt}
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0" role="tablist" aria-label="Choose slide">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === activeIndex}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-[#00A651]" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock images for the gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

const mockImages: GalleryImage[] = [
  {
    src: "https://picsum.photos/seed/celpip-1/800/800",
    alt: "Test centre interior with rows of computer workstations",
    caption: "Modern test centre — Toronto downtown",
  },
  {
    src: "https://picsum.photos/seed/celpip-2/800/800",
    alt: "Candidate wearing headphones during the listening section",
    caption: "Listening section in progress",
  },
  {
    src: "https://picsum.photos/seed/celpip-3/800/800",
    alt: "Group prep workshop with instructor at whiteboard",
    caption: "Saturday prep workshop — group coaching",
  },
  {
    src: "https://picsum.photos/seed/celpip-4/800/800",
    alt: "Aerial view of Vancouver waterfront and skyline",
    caption: "Vancouver test centre — waterfront location",
  },
  {
    src: "https://picsum.photos/seed/celpip-5/800/800",
    alt: "Successful candidate holding score report",
    caption: "Results delivered in 4–5 business days",
  },
  {
    src: "https://picsum.photos/seed/celpip-6/800/800",
    alt: "Study desk with notebooks, headphones, and laptop",
    caption: "At-home study setup that works",
  },
  {
    src: "https://picsum.photos/seed/celpip-7/800/800",
    alt: "Manila skyline at golden hour",
    caption: "New test centres now open in Manila",
  },
  {
    src: "https://picsum.photos/seed/celpip-8/800/800",
    alt: "Diverse cohort of test candidates posing together",
    caption: "Spring 2026 cohort — congratulations!",
  },
  {
    src: "https://picsum.photos/seed/celpip-9/800/800",
    alt: "Coach giving one-on-one speaking practice feedback",
    caption: "1:1 speaking practice with a certified coach",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ImageGalleryVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

export function ImageGalleryVariants() {
  return (
    <>
      {/* Variant A: Grid Gallery */}
      <VariantLabel label="A — Grid Gallery (hover captions)" />
      <ImageGalleryGrid heading="From the CELPIP Community" images={mockImages.slice(0, 6)} />

      {/* Variant B: Lightbox Trigger Gallery */}
      <VariantLabel label="B — Lightbox Trigger Gallery" />
      <ImageGalleryLightbox heading="Test Centre Tour — Click to Expand" images={mockImages.slice(0, 9)} />

      {/* Variant C: Carousel */}
      <VariantLabel label="C — Carousel with Caption Bar" />
      <ImageGalleryCarousel heading="Stories from Recent Test-Takers" images={mockImages.slice(0, 6)} />
    </>
  );
}
