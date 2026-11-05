import {
  ArrowRight,
  Briefcase,
  Code,
  Database,
  Film,
  Heart,
  MapPin,
  MessageCircle,
  Palette,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

import {
  MarketingHero,
  SectionHeading,
} from "@/features/marketing/components/MarketingHero";
import { Reveal } from "@/shared/components/Reveal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Build polished interfaces for movie lovers using React, TypeScript, and modern tooling.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    icon: Code,
  },
  {
    id: 2,
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "4+ years",
    description: "Design and run the services behind our recommendation engine and content APIs.",
    skills: ["Node.js", "Python", "AWS", "PostgreSQL"],
    icon: Database,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Craft the visual and interaction language of PopcornPicks across surfaces.",
    skills: ["Figma", "Design systems", "Prototyping", "User research"],
    icon: Palette,
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "AI/ML",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description: "Ship ML models that improve movie recommendations and personalization.",
    skills: ["Python", "TensorFlow", "Recsys", "Analytics"],
    icon: Star,
  },
  {
    id: 5,
    title: "Content Manager",
    department: "Content",
    location: "Los Angeles, CA",
    type: "Full-time",
    experience: "2+ years",
    description: "Curate editorial content, work with studios, and keep our catalogue sharp.",
    skills: ["Content writing", "Film knowledge", "SEO"],
    icon: Film,
  },
  {
    id: 6,
    title: "Community Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description: "Grow and steward our community of movie lovers across every channel.",
    skills: ["Social media", "Community", "Analytics"],
    icon: MessageCircle,
  },
];

const BENEFITS = [
  {
    icon: Heart,
    title: "Health & wellness",
    description: "Comprehensive medical, mental health support, and wellness stipend.",
  },
  {
    icon: Zap,
    title: "Flexible work",
    description: "Remote-first, flexible hours, and unlimited PTO.",
  },
  {
    icon: Trophy,
    title: "Growth & learning",
    description: "Annual learning budget, conference tickets, mentorship.",
  },
  {
    icon: Film,
    title: "Movie perks",
    description: "Free tickets, streaming subscriptions, premiere invitations.",
  },
];

const CareersPage = () => (
  <div className="bg-background">
    <MarketingHero
      eyebrow="Careers"
      title="Join our team"
      description="Build the product millions of movie lovers use to find their next watch."
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="primary-red" size="lg">
          <a href="#openings">
            View open roles
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <Button asChild variant="glass" size="lg">
          <a href="mailto:careers@popcornpicks.com">Send your resume</a>
        </Button>
      </div>
    </MarketingHero>

    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Benefits */}
      <section className="mb-20">
        <SectionHeading
          eyebrow="Why PopcornPicks"
          title="Benefits worth logging in for"
          description="We take care of the people who take care of the product."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={(i % 4) * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/40">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-netflix-red/30 bg-netflix-red/10 text-netflix-red">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Job openings */}
      <section id="openings" className="mb-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Open roles"
          title="Current openings"
          description="Six ways to help movie lovers find their next watch."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {JOBS.map((job, i) => {
            const Icon = job.icon;
            return (
              <Reveal key={job.id} delay={(i % 2) * 90}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/40">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0 bg-secondary text-secondary-foreground">
                      {job.type}
                    </Badge>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{job.description}</p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <Badge key={s} variant="outline" className="border-border text-muted-foreground">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span>{job.experience}</span>
                  </div>

                  <Button variant="primary-red" className="mt-5 w-full">
                    Apply now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40rem 20rem at 50% -20%, rgba(229,9,20,0.14), transparent 60%)",
            }}
          />
          <div className="relative px-6 py-12 text-center sm:px-12">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-netflix-red/30 bg-netflix-red/10 text-netflix-red">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-foreground">Ready to apply?</h2>
            <p className="mx-auto mb-7 max-w-xl text-muted-foreground">
              If you're passionate about movies and product, send your resume and a note about why
              PopcornPicks — we read every message.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="primary-red">
                <a href="mailto:careers@popcornpicks.com">Email your resume</a>
              </Button>
              <Button variant="glass">
                <MessageCircle className="h-4 w-4" />
                Join talent community
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
);

export default CareersPage;
