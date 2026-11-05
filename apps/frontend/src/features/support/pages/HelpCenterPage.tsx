import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Compass,
  Database,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

type CategoryId =
  | "getting-started"
  | "account"
  | "browse"
  | "recommendations"
  | "watchlist"
  | "playback"
  | "privacy"
  | "technical";

interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  blurb: string;
}

const CATEGORIES: Category[] = [
  { id: "getting-started", label: "Getting started", icon: Compass, blurb: "Sign up & first steps" },
  { id: "account", label: "Account", icon: User, blurb: "Profile, sign-in & settings" },
  { id: "browse", label: "Browse & Search", icon: Search, blurb: "Find titles fast" },
  { id: "recommendations", label: "For You", icon: Sparkles, blurb: "How picks are made" },
  { id: "watchlist", label: "Watchlist", icon: Bookmark, blurb: "Save & track" },
  { id: "playback", label: "Trailers & playback", icon: Play, blurb: "Watching trailers" },
  { id: "privacy", label: "Privacy & security", icon: ShieldCheck, blurb: "Your data & safety" },
  { id: "technical", label: "Troubleshooting", icon: Wrench, blurb: "Fix common issues" },
];

interface Faq {
  id: string;
  category: CategoryId;
  question: string;
  answer: string;
  tags?: string[];
}

const FAQS: Faq[] = [
  {
    id: "signup",
    category: "getting-started",
    question: "How do I create a PopcornPicks account?",
    answer:
      "Select Sign In in the top navigation, then choose Sign Up. Enter a valid email address and a strong password (at least 8 characters). You'll land on your personalized homepage right away — no verification step required to start discovering titles.",
    tags: ["signup", "registration", "account"],
  },
  {
    id: "free",
    category: "getting-started",
    question: "Is PopcornPicks free to use?",
    answer:
      "Yes. Discovering titles, browsing trending lists, reading details, watching trailers, and saving to your watchlist are all free. PopcornPicks is a discovery and recommendation platform supported by our content partners, not by selling your data.",
    tags: ["free", "pricing"],
  },
  {
    id: "what-is",
    category: "getting-started",
    question: "What exactly does PopcornPicks do?",
    answer:
      "PopcornPicks helps you find what to watch. We aggregate movie and show metadata (posters, ratings, cast, trailers) from TMDB, let you browse and search it, and use your preferences to generate personalized recommendations and a watchlist you can track.",
    tags: ["overview", "discovery"],
  },
  {
    id: "password",
    category: "account",
    question: "How do I reset my password?",
    answer:
      "On the sign-in screen choose 'Forgot password?' and enter your account email. We'll send a secure, single-use reset link. For your security, links expire after a short time and can only be used once. Passwords are stored as salted hashes, never in plain text.",
    tags: ["password", "security"],
  },
  {
    id: "profile",
    category: "account",
    question: "Can I edit my profile or change my email?",
    answer:
      "Yes. Open your account menu to manage display details and preferences. Changing your email sends a confirmation to the new address before it takes effect, so we can verify you own it.",
    tags: ["profile", "email"],
  },
  {
    id: "delete-account",
    category: "account",
    question: "How do I delete my account and data?",
    answer:
      "You can request account deletion from your account settings or by contacting support. We'll delete your account and associated personal data shortly after, except where we're legally required to retain certain records. See the Privacy Policy for details.",
    tags: ["delete", "gdpr", "data"],
  },
  {
    id: "search",
    category: "browse",
    question: "How do I search for movies?",
    answer:
      "Use the Search page or the search field to look up titles by name. If you leave the search box empty, we show popular titles so you always land on something to browse. You can then narrow results by genre, release year, and minimum rating.",
    tags: ["search", "filters"],
  },
  {
    id: "browse-categories",
    category: "browse",
    question: "How is Browse organized?",
    answer:
      "Browse groups the catalogue into categories and lets you switch between a grid and a compact list view. Use the category tabs and filters to narrow things down, and the pagination controls at the bottom to move through large result sets page by page.",
    tags: ["browse", "grid", "list"],
  },
  {
    id: "no-results",
    category: "browse",
    question: "Why do my filters return no results?",
    answer:
      "Very narrow rating or year ranges can exclude every title. Try widening the year range or lowering the minimum rating, and make sure you're in the right category. Resetting the filters will bring back the full result set.",
    tags: ["filters", "empty"],
  },
  {
    id: "how-recs",
    category: "recommendations",
    question: "How do PopcornPicks recommendations work?",
    answer:
      "The engine weighs signals like the titles you rate, your watchlist, and the genres you browse. As you interact more, suggestions get sharper. 'For You' groups picks by trending, popularity, and rating so you can see the reasoning behind each set.",
    tags: ["AI", "personalization"],
  },
  {
    id: "improve-recs",
    category: "recommendations",
    question: "How can I get better suggestions?",
    answer:
      "Rate titles you've actually watched, add favorites to your watchlist, and browse the genres you enjoy. If something is off, you can always skip it — negative signals help too. Refreshing the 'For You' page recomputes the current picks.",
    tags: ["recommendations", "tips"],
  },
  {
    id: "add-watchlist",
    category: "watchlist",
    question: "How do I add something to my watchlist?",
    answer:
      "Click the bookmark on any movie card or the Details button on a title page. Signed-in items are saved to your account. Open the Watchlist page to see everything you've stored, mark items as watched, or add your own star rating.",
    tags: ["watchlist", "save"],
  },
  {
    id: "watchlist-manage",
    category: "watchlist",
    question: "Can I sort, filter, or remove watchlist items?",
    answer:
      "Yes. The Watchlist page lets you search within your list, filter by watched/unwatched/rated, sort by title, year, or rating, and switch between grid and list views. Remove any item with the remove action on its card.",
    tags: ["watchlist", "sort", "filter"],
  },
  {
    id: "mark-watched",
    category: "watchlist",
    question: "How do I track what I've already seen?",
    answer:
      "Use the watched toggle on a watchlist card to mark a title as seen. Watched items feed your stats (total, watch time, average rating) and help the recommendation engine avoid suggesting titles you've already finished.",
    tags: ["watched", "status"],
  },
  {
    id: "trailer",
    category: "playback",
    question: "How do I watch a trailer?",
    answer:
      "Press the red Play button in the hero carousel or the trailer button on a title page. We fetch the official trailer when available and open it in a player. The player stays available while you browse and can be minimized.",
    tags: ["trailer", "playback"],
  },
  {
    id: "no-trailer",
    category: "playback",
    question: "Why is there no trailer for a title?",
    answer:
      "Trailer availability depends on what's published for that title in your region. Some lesser-known or very recent titles may not have a trailer indexed yet. The button simply won't open a player when nothing is available.",
    tags: ["trailer", "availability"],
  },
  {
    id: "does-popcorn-stream",
    category: "playback",
    question: "Can I actually stream movies on PopcornPicks?",
    answer:
      "PopcornPicks is a discovery and recommendation service, not a video streaming provider. We show official trailers and help you decide what to watch; you then watch the full title from your preferred streaming service or store.",
    tags: ["streaming", "scope"],
  },
  {
    id: "privacy-data",
    category: "privacy",
    question: "How is my personal data handled?",
    answer:
      "Data is encrypted in transit and at rest, never sold, and used only to operate and improve your experience. You can access, correct, export, or delete it. Full details are in our Privacy Policy and Cookie Policy.",
    tags: ["privacy", "security"],
  },
  {
    id: "cookies",
    category: "privacy",
    question: "How do I control cookies?",
    answer:
      "The Cookie Policy page includes a preference manager where you can accept or reject each category of cookie (except strictly necessary ones). You can also block or delete cookies through your browser settings.",
    tags: ["cookies", "consent"],
  },
  {
    id: "tmdb",
    category: "privacy",
    question: "Where does the movie data come from?",
    answer:
      "Titles, posters, backdrops, ratings, and cast information are provided by The Movie Database (TMDB). This product uses the TMDB API but is not endorsed or certified by TMDB.",
    tags: ["tmdb", "data", "attribution"],
  },
  {
    id: "blank-page",
    category: "technical",
    question: "The page is blank or content won't load — what do I do?",
    answer:
      "First refresh the page and check your internet connection. If it persists, make sure JavaScript is enabled, clear your browser cache for this site, or try a different browser. Outdated browsers can lack features the app relies on.",
    tags: ["troubleshooting", "loading"],
  },
  {
    id: "images",
    category: "technical",
    question: "Posters or backdrops aren't showing.",
    answer:
      "Images load from TMDB's CDN, so a blocked request or offline connection can hide them. Try refreshing, checking any ad/content blockers, and confirming your network can reach the image host. Titles without artwork fall back to a placeholder.",
    tags: ["images", "cdn"],
  },
  {
    id: "login-issues",
    category: "technical",
    question: "I'm stuck signed out or my session keeps expiring.",
    answer:
      "Sessions rely on cookies being enabled for this site. Make sure you haven't blocked essential cookies, and avoid private/incognito modes that discard them immediately. Signing out and back in usually restores a clean session.",
    tags: ["login", "session"],
  },
];

const POPULAR_IDS = ["how-recs", "add-watchlist", "trailer", "free", "password", "delete-account"];

const HelpCenterPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleFaqs = useMemo(
    () =>
      FAQS.filter((faq) => {
        const matchesCategory = category === "all" || faq.category === category;
        const haystack = `${faq.question} ${faq.answer} ${(faq.tags ?? []).join(" ")}`.toLowerCase();
        const matchesQuery = normalizedQuery === "" || haystack.includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }),
    [category, normalizedQuery],
  );

  const popularFaqs = useMemo(
    () => POPULAR_IDS.map((id) => FAQS.find((f) => f.id === id)).filter(Boolean) as Faq[],
    [],
  );

  const countFor = (id: CategoryId) => FAQS.filter((f) => f.category === id).length;

  const categoryLabel = (id: CategoryId) =>
    CATEGORIES.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="text-center">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-netflix-red">
          <LifeBuoy className="h-4 w-4" />
          Help Center
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          How can we help?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Search the knowledge base, browse topics, or expand the questions below. Can't find an
          answer? Our support team is a message away.
        </p>
      </header>

      {/* Search */}
      <div className="relative mx-auto mt-8 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles, e.g. watchlist, trailer, password…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search help articles"
          className="h-14 border-border bg-background pl-12 text-base"
        />
        {normalizedQuery && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category tiles */}
      <section className="mt-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map(({ id, label, icon: Icon, blurb }) => {
            const selected = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(selected ? "all" : id)}
                aria-pressed={selected}
                className={`group flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  selected
                    ? "border-netflix-red bg-netflix-red/5 shadow-md"
                    : "border-border bg-card hover:border-netflix-red/40"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                    selected ? "bg-netflix-red text-white" : "bg-secondary text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-1 font-semibold leading-tight text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">
                  {blurb} · {countFor(id)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular questions (only when not filtering) */}
      {category === "all" && normalizedQuery === "" && (
        <section className="mt-12">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <HelpCircle className="h-5 w-5 text-netflix-red" />
            Popular questions
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {popularFaqs.map((faq) => (
              <Link
                key={faq.id}
                to="#faq-list"
                onClick={() => setCategory(faq.category)}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-netflix-red/40 hover:bg-secondary/40"
              >
                <span className="min-w-0 truncate">{faq.question}</span>
                <Badge variant="secondary" className="flex-shrink-0 bg-secondary text-secondary-foreground">
                  {categoryLabel(faq.category)}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ accordion */}
      <section id="faq-list" className="mt-12 scroll-mt-24">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            {category === "all" ? "All topics" : categoryLabel(category)}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {visibleFaqs.length} article{visibleFaqs.length === 1 ? "" : "s"}
            </span>
          </h2>
          {(category !== "all" || normalizedQuery !== "") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
            >
              Reset
            </Button>
          )}
        </div>

        {visibleFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-5">
            {visibleFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                  {faq.tags && faq.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Card className="border border-border bg-card">
            <CardContent className="py-12 text-center">
              <Database className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                No articles match "<span className="font-medium text-foreground">{query}</span>". Try
                a different term or{" "}
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                  className="text-primary hover:underline"
                >
                  reset the filters
                </button>
                .
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Contact */}
      <Card className="mt-12 border border-border bg-card">
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">Still need help?</h3>
            <p className="text-sm text-muted-foreground">
              Reach our support team any time and we'll get back to you, usually within one business
              day.
            </p>
            <a href="mailto:support@popcornpicks.com" className="mt-4 inline-block">
              <Button variant="primary-red" className="gap-2">
                <Mail className="h-4 w-4" />
                support@popcornpicks.com
              </Button>
            </a>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:items-end">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="glass" className="w-full gap-2 sm:w-auto">
                <MessageSquare className="h-4 w-4" />
                Contact form
              </Button>
            </Link>
            <Link to="/cookie-policy" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full gap-2 text-foreground sm:w-auto">
                <ShieldCheck className="h-4 w-4" />
                Privacy &amp; cookies
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenterPage;
