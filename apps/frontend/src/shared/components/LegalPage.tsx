import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";

export interface LegalSection {
  /** URL-safe id used for the anchor + scroll-spy. */
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  version?: string;
  /** Optional lead-in paragraphs rendered above the numbered sections. */
  intro?: ReactNode;
  sections: LegalSection[];
  /** Closing block (contact details, legal entity info, etc.). */
  footer?: ReactNode;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Shared layout for long-form legal documents (Privacy, Terms, Cookies).
 * A sticky "On this page" index tracks the section you're reading, with
 * anchor links and numbered headings. Theme-aware: uses design tokens so it
 * reads correctly in both light and dark mode.
 */
export const LegalPage = ({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  version,
  intro,
  sections,
  footer,
}: LegalPageProps) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const articleRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: highlight the TOC entry closest to the top of the viewport.
  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  const goToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    setActiveId(id);
  };

  const metaBadges = useMemo(
    () =>
      [
        lastUpdated && `Last updated: ${lastUpdated}`,
        effectiveDate && `Effective: ${effectiveDate}`,
        version && `Version ${version}`,
      ].filter(Boolean) as string[],
    [lastUpdated, effectiveDate, version],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-10 max-w-3xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-netflix-red">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
        {metaBadges.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {metaBadges.map((label) => (
              <Badge key={label} variant="secondary" className="bg-secondary text-secondary-foreground">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sticky on-this-page index */}
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <ul className="space-y-1 border-l border-border">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={activeId === section.id}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(section.id);
                    }}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                      activeId === section.id
                        ? "border-netflix-red font-semibold text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    <span className="mr-1.5 tabular-nums text-muted-foreground">{i + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Article body */}
        <div ref={articleRef} className="min-w-0">
          {intro && <div className="mb-8 space-y-3 text-foreground/80">{intro}</div>}

          <div className="space-y-10">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-4 flex items-baseline gap-3 border-b border-border pb-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  <span className="text-base font-semibold tabular-nums text-netflix-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                  <a
                    href={`#${section.id}`}
                    aria-label={`Link to ${section.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(section.id);
                    }}
                    className="ml-auto text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus:opacity-100 group-hover:opacity-100 lg:opacity-0"
                  >
                    <Link2 className="h-4 w-4" />
                  </a>
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {footer && (
            <div className="mt-12 rounded-xl border border-border bg-card p-6 sm:p-8">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** Reusable list of bullet points inside a legal section. */
export const LegalBullets = ({ items }: { items: ReactNode[] }) => (
  <ul className="ml-5 list-disc space-y-2 marker:text-muted-foreground">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

/** Reusable subsection heading inside a legal section. */
export const LegalSubheading = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-2 mb-1 text-base font-semibold text-foreground">{children}</h3>
);

export default LegalPage;
