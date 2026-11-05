import type { ReactNode } from "react";

import { Reveal } from "@/shared/components/Reveal";

interface MarketingHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional CTA row or stat strip rendered under the headline. */
  children?: ReactNode;
}

/**
 * Full-bleed marketing hero used across the Company pages (About, Careers,
 * Contact, Blog). Pinned to the fixed dark `netflix-bg` so it looks identical
 * in light and dark themes — overlaid text is theme-independent (white/*).
 *
 * Depth comes from layered translucent panels + a single restrained red accent
 * (no pink/purple gradients, no drop shadows) to match the design system.
 */
export const MarketingHero = ({ eyebrow, title, description, children }: MarketingHeroProps) => (
  <section className="relative isolate overflow-hidden bg-netflix-bg">
    {/* Layered backdrop: soft red glow top-left + faint grid vignette, low alpha. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(60rem 32rem at 12% -10%, rgba(229,9,20,0.18), transparent 60%)," +
          "radial-gradient(48rem 28rem at 92% 120%, rgba(255,255,255,0.05), transparent 55%)",
      }}
    />
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-netflix-red" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {eyebrow}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </div>
    {/* Bottom hairline that blends the band into the page surface. */}
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
  </section>
);

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Consistent, left-aligned section header with a thin accent rule. */
export const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => (
  <div className="mb-8">
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-netflix-red">
        {eyebrow}
      </p>
    )}
    <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
      {title}
    </h2>
    {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
    <div className="mt-4 h-px w-16 bg-netflix-red/60" />
  </div>
);
