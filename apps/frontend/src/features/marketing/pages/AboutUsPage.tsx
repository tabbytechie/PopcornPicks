import { Award, Heart, Sparkles, Target, Users, Zap } from "lucide-react";

import { MarketingHero, SectionHeading } from "@/features/marketing/components/MarketingHero";
import { Reveal } from "@/shared/components/Reveal";

const TEAM = [
  { name: "Alex Rodriguez", role: "CEO & Founder", bio: "Movie enthusiast with 15+ years in tech" },
  { name: "Sarah Chen", role: "Lead Developer", bio: "Full-stack engineer passionate about cinema" },
  { name: "Michael Thompson", role: "Content Director", bio: "Film critic and content strategist" },
  { name: "Emma Wilson", role: "UX Designer", bio: "Designing delightful user experiences" },
  { name: "David Park", role: "Data Scientist", bio: "ML expert crafting recommendation algorithms" },
  { name: "Lisa Kumar", role: "Community Manager", bio: "Building our movie-loving community" },
];

const VALUES = [
  { icon: Heart, title: "Passion for cinema", description: "We live and breathe movies, from indie gems to blockbusters." },
  { icon: Users, title: "Community first", description: "Building connections between movie lovers worldwide." },
  { icon: Zap, title: "Innovation", description: "Pioneering the future of movie discovery technology." },
  { icon: Award, title: "Quality", description: "Curating the best content and experiences for our users." },
];

const STATS = [
  { value: "1M+", label: "Movies in database" },
  { value: "500K+", label: "Active users" },
  { value: "50M+", label: "Recommendations made" },
  { value: "98%", label: "User satisfaction" },
];

const MILESTONES = [
  { year: "2021", title: "The first cut", text: "PopcornPicks starts as a weekend project to fix endless scroll-through." },
  { year: "2022", title: "Community grows", text: "Recommendations go social — lists, reviews, and watch parties land." },
  { year: "2023", title: "ML rewrites the engine", text: "A new hybrid model doubles how often members find something to watch." },
  { year: "2024", title: "Half a million members", text: "Now serving movie lovers across 120+ countries and counting." },
];

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2);

const AboutUsPage = () => (
  <div className="bg-background">
    <MarketingHero
      eyebrow="About"
      title="PopcornPicks"
      description="Revolutionizing movie discovery through passion, technology, and community."
    >
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-netflix-bg/80 px-4 py-5 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/50">{s.label}</div>
          </div>
        ))}
      </div>
    </MarketingHero>

    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Mission & Vision */}
      <section className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[
          { icon: Target, title: "Our mission", text: "To revolutionize how people discover and enjoy movies by creating the most intelligent, personalized, and community-driven platform in the world." },
          { icon: Sparkles, title: "Our vision", text: "A world where every film finds its audience and every viewer discovers stories that move them — across cultures, languages, and generations." },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/40">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-netflix-red/30 bg-netflix-red/10 text-netflix-red transition-colors group-hover:bg-netflix-red group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-3 text-xl font-bold text-foreground">{item.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* Values */}
      <section className="mb-20">
        <SectionHeading
          eyebrow="What drives us"
          title="Our values"
          description="The principles that guide everything we do."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={(i % 4) * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/40">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Story / timeline */}
      <section className="mb-20">
        <SectionHeading
          eyebrow="Our story"
          title="How we got here"
          description="A few beats from a weekend hack to a platform movie lovers rely on."
        />
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={(i % 4) * 90}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-6">
                <div className="mb-3 text-2xl font-bold text-netflix-red">{m.year}</div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <SectionHeading
          eyebrow="The people"
          title="Meet the team"
          description="The people behind PopcornPicks."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/40">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary text-2xl font-bold text-foreground ring-2 ring-transparent transition-all group-hover:ring-netflix-red/40">
                  {initials(m.name)}
                </div>
                <h3 className="text-base font-semibold text-foreground">{m.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-netflix-red">
                  {m.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default AboutUsPage;
