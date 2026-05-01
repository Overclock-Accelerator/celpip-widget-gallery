import type { ReactNode } from "react";
import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  label: string;
  size?: ButtonSize;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onDark?: boolean;
  pill?: boolean;
  href?: string;
  ariaLabel?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3 gap-2.5",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

function Spinner({ size = "md" }: { size?: ButtonSize }) {
  return (
    <svg
      className={`animate-spin ${iconSizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function ArrowIcon({ size = "md" }: { size?: ButtonSize }) {
  return (
    <svg
      className={iconSizeClasses[size]}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function renderInner(label: string, icon: ReactNode | undefined, loading: boolean, size: ButtonSize) {
  if (loading) {
    return (
      <>
        <Spinner size={size} />
        <span>Loading…</span>
      </>
    );
  }
  return (
    <>
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
      <span>{label}</span>
    </>
  );
}

function buildClasses(base: string, size: ButtonSize, pill: boolean, disabled: boolean, loading: boolean) {
  const radius = pill ? "rounded-full" : "rounded-lg";
  const state = disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  return `inline-flex items-center justify-center font-semibold transition-colors ${sizeClasses[size]} ${radius} ${base} ${state}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PrimaryButton — navy on light, green on dark
// ─────────────────────────────────────────────────────────────────────────────

export function PrimaryButton({
  label,
  size = "md",
  icon,
  disabled = false,
  loading = false,
  onDark = false,
  pill = false,
  href,
  ariaLabel,
}: ButtonProps) {
  const palette = onDark
    ? "bg-[#00A651] hover:bg-[#00C764] text-white"
    : "bg-[#0B2341] hover:bg-[#153A5C] text-white";

  const className = buildClasses(palette, size, pill, disabled, loading);
  const inner = renderInner(label, icon, loading, size);

  if (href && !disabled && !loading) {
    return (
      <a href={href} className={className} aria-label={ariaLabel ?? label}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={disabled || loading}
      aria-label={ariaLabel ?? label}
      aria-busy={loading || undefined}
    >
      {inner}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SecondaryButton — outlined navy on light, outlined white on dark
// ─────────────────────────────────────────────────────────────────────────────

export function SecondaryButton({
  label,
  size = "md",
  icon,
  disabled = false,
  loading = false,
  onDark = false,
  pill = false,
  href,
  ariaLabel,
}: ButtonProps) {
  const palette = onDark
    ? "bg-transparent border-2 border-white text-white hover:bg-white/10"
    : "bg-white border-2 border-[#0B2341] text-[#0B2341] hover:bg-[#0B2341] hover:text-white";

  const className = buildClasses(palette, size, pill, disabled, loading);
  const inner = renderInner(label, icon, loading, size);

  if (href && !disabled && !loading) {
    return (
      <a href={href} className={className} aria-label={ariaLabel ?? label}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={disabled || loading}
      aria-label={ariaLabel ?? label}
      aria-busy={loading || undefined}
    >
      {inner}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GhostButton — text-only, underline on hover
// ─────────────────────────────────────────────────────────────────────────────

export function GhostButton({
  label,
  size = "md",
  icon,
  disabled = false,
  loading = false,
  onDark = false,
  pill = false,
  href,
  ariaLabel,
}: ButtonProps) {
  const palette = onDark
    ? "bg-transparent text-white hover:underline underline-offset-4"
    : "bg-transparent text-[#0B2341] hover:underline underline-offset-4";

  const className = buildClasses(palette, size, pill, disabled, loading);
  const inner = renderInner(label, icon, loading, size);

  if (href && !disabled && !loading) {
    return (
      <a href={href} className={className} aria-label={ariaLabel ?? label}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={disabled || loading}
      aria-label={ariaLabel ?? label}
      aria-busy={loading || undefined}
    >
      {inner}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Disabled showcase — gray button
// ─────────────────────────────────────────────────────────────────────────────

function DisabledButton({ label, size = "md" }: { label: string; size?: ButtonSize }) {
  return (
    <button
      type="button"
      disabled
      className={`inline-flex items-center justify-center font-semibold rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed ${sizeClasses[size]}`}
      aria-label={label}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ButtonsVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

function Row({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={`rounded-xl border ${dark ? "bg-[#0B2341] border-[#153A5C]" : "bg-white border-gray-200"} p-6`}>
      <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${dark ? "text-[#17FFDC]" : "text-[#00A651]"}`}>
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ButtonsVariants() {
  return (
    <>
      {/* Variant A: Primary buttons on light */}
      <VariantLabel label="A — Primary on Light" />
      <Row title="Navy fill / white text — book a test, register, submit">
        <PrimaryButton label="Book Your Test" />
        <PrimaryButton label="Register Now" icon={<ArrowIcon />} />
        <PrimaryButton label="Pill Style" pill />
        <PrimaryButton label="Disabled" disabled />
      </Row>

      {/* Variant B: Primary on dark */}
      <VariantLabel label="B — Primary on Dark" />
      <Row title="Green fill / white text — high contrast on navy backgrounds" dark>
        <PrimaryButton label="Find Test Dates" onDark />
        <PrimaryButton label="Get Started" onDark icon={<ArrowIcon />} />
        <PrimaryButton label="Pill Style" onDark pill />
        <PrimaryButton label="Loading" onDark loading />
      </Row>

      {/* Variant C: Secondary on light */}
      <VariantLabel label="C — Secondary on Light" />
      <Row title="White fill / navy outline — flips to navy on hover">
        <SecondaryButton label="Free Prep Materials" />
        <SecondaryButton label="Learn More" icon={<ArrowIcon />} />
        <SecondaryButton label="Pill Style" pill />
        <SecondaryButton label="Disabled" disabled />
      </Row>

      {/* Variant D: Secondary on dark */}
      <VariantLabel label="D — Secondary on Dark" />
      <Row title="Transparent fill / white outline — subtle CTA on hero" dark>
        <SecondaryButton label="Explore Test Dates" onDark />
        <SecondaryButton label="See Pricing" onDark icon={<ArrowIcon />} />
        <SecondaryButton label="Pill Style" onDark pill />
        <SecondaryButton label="Disabled" onDark disabled />
      </Row>

      {/* Variant E: Ghost / text-only */}
      <VariantLabel label="E — Ghost / Text-Only" />
      <Row title="Navy text — underline on hover, low-emphasis links">
        <GhostButton label="Skip for now" />
        <GhostButton label="View Sample" icon={<ArrowIcon />} />
        <GhostButton label="Cancel" disabled />
        <GhostButton label="On Dark" onDark />
      </Row>

      {/* Variant F: Sizes */}
      <VariantLabel label="F — Sizes (sm / md / lg)" />
      <Row title="Three sizes for hierarchy — small inline, medium default, large hero">
        <PrimaryButton label="Small" size="sm" />
        <PrimaryButton label="Medium (default)" size="md" />
        <PrimaryButton label="Large" size="lg" />
        <SecondaryButton label="Small" size="sm" />
        <SecondaryButton label="Medium" size="md" />
        <SecondaryButton label="Large" size="lg" />
      </Row>

      {/* Variant G: With leading icon */}
      <VariantLabel label="G — With Leading Icon" />
      <Row title="Icons reinforce action — calendar, download, chevron">
        <PrimaryButton
          label="Schedule Test"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <SecondaryButton
          label="Download Guide"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
          }
        />
        <GhostButton label="Continue" icon={<ArrowIcon />} />
      </Row>

      {/* Variant H: Pill / rounded-full */}
      <VariantLabel label="H — Pill (rounded-full)" />
      <Row title="Softer, friendlier feel — good for tags, filters, marketing">
        <PrimaryButton label="Start Free Trial" pill />
        <SecondaryButton label="Browse Tests" pill />
        <GhostButton label="Maybe Later" pill />
        <PrimaryButton label="On Dark" onDark pill />
      </Row>

      {/* Variant I: Loading state */}
      <VariantLabel label="I — Loading State" />
      <Row title="Spinner + aria-busy — disable interaction during async work">
        <PrimaryButton label="Submitting" loading />
        <SecondaryButton label="Saving" loading />
        <PrimaryButton label="On Dark" onDark loading />
        <PrimaryButton label="Large" size="lg" loading />
      </Row>

      {/* Variant J: Disabled state */}
      <VariantLabel label="J — Disabled State" />
      <Row title="Gray fill — clearly non-interactive, cursor-not-allowed">
        <DisabledButton label="Unavailable" />
        <DisabledButton label="Coming Soon" size="sm" />
        <DisabledButton label="Locked" size="lg" />
        <PrimaryButton label="Disabled Primary" disabled />
        <SecondaryButton label="Disabled Secondary" disabled />
      </Row>
    </>
  );
}
