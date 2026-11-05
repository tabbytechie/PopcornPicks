import { useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { MarketingHero } from "@/features/marketing/components/MarketingHero";
import { Reveal } from "@/shared/components/Reveal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
};

const POSTS: Post[] = [
  {
    id: 1,
    title: "The Rise of Streaming Platforms: How They're Changing Cinema",
    slug: "rise-of-streaming-platforms",
    excerpt:
      "Netflix, Disney+, and the rest have reshaped how films get made, distributed, and discovered.",
    author: "Sarah Chen",
    authorRole: "Film Industry Analyst",
    publishedAt: "2024-08-25",
    readTime: 8,
    category: "Industry",
    tags: ["Streaming", "Netflix", "Technology"],
    coverImage: "https://images.unsplash.com/photo-1489599732026-0d5d56a00d3b?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Hidden Gems You Should Watch This Weekend",
    slug: "hidden-gems-weekend-watch",
    excerpt: "Incredible movies that flew under the radar and deserve a spot on your watchlist.",
    author: "Michael Rodriguez",
    authorRole: "Film Critic",
    publishedAt: "2024-08-24",
    readTime: 6,
    category: "Reviews",
    tags: ["Hidden Gems", "Recommendations"],
    coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Behind the Scenes: The Making of Modern Blockbusters",
    slug: "making-modern-blockbusters",
    excerpt:
      "The craft, technology, and coordination behind today's biggest theatrical releases.",
    author: "Emma Wilson",
    authorRole: "Entertainment Journalist",
    publishedAt: "2024-08-23",
    readTime: 12,
    category: "Behind the Scenes",
    tags: ["Filmmaking", "CGI", "Directors"],
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: 4,
    title: "The Psychology of Movie Recommendations",
    slug: "psychology-movie-recommendations",
    excerpt: "How collaborative filtering and modern ML actually predict what you'll enjoy.",
    author: "Dr. James Park",
    authorRole: "Data Scientist",
    publishedAt: "2024-08-22",
    readTime: 10,
    category: "Technology",
    tags: ["AI", "Recommendations", "ML"],
    coverImage: "https://images.unsplash.com/photo-1518709250212-898145525345?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "International Cinema: Breaking Down Cultural Barriers",
    slug: "international-cinema-cultural-barriers",
    excerpt: "Why subtitled films are finding larger audiences — and what that means for storytelling.",
    author: "Lisa Kumar",
    authorRole: "Culture Editor",
    publishedAt: "2024-08-21",
    readTime: 7,
    category: "Culture",
    tags: ["International", "World Cinema"],
    coverImage: "https://images.unsplash.com/photo-15176049314427e9cb4c98f4679ada2e?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "The Future of Cinema: Virtual Reality and Beyond",
    slug: "future-of-cinema-vr",
    excerpt: "Where immersive storytelling is heading, and whether it will replace the flat screen.",
    author: "Alex Rodriguez",
    authorRole: "Editor at Large",
    publishedAt: "2024-08-20",
    readTime: 9,
    category: "Technology",
    tags: ["VR", "Future", "Innovation"],
    coverImage: "https://images.unsplash.com/photo-1440404653325-ab127d31acc8?w=800&h=400&fit=crop",
    featured: false,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const visible =
    selectedCategory === "All"
      ? POSTS
      : POSTS.filter((post) => post.category === selectedCategory);

  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);

  return (
    <div className="bg-background">
      <MarketingHero
        eyebrow="Blog"
        title="Stories from the newsroom"
        description="Industry analysis, hidden gems, and the tech behind great recommendations."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <Button
                key={cat}
                variant={active ? "primary-red" : "glass"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            );
          })}
        </div>

        {/* Featured post */}
        {featured && (
          <Reveal>
            <article className="group mb-12 overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-netflix-red/40 lg:grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto">
                <img
                  src={featured.coverImage}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4">
                  <Badge className="bg-netflix-red text-white">Featured</Badge>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-netflix-red">
                  {featured.category}
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{featured.author}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {featured.readTime} min read
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(featured.publishedAt)}
                  </span>
                </div>
                <Button variant="primary-red" className="mt-7 w-fit">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </article>
          </Reveal>
        )}

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/40">
                <div className="aspect-video overflow-hidden bg-secondary">
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Badge variant="outline" className="mb-3 w-fit border-border text-muted-foreground">
                    {post.category}
                  </Badge>
                  <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground">
                    {post.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No articles in this category yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
