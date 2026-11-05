import { Link } from "react-router-dom";

import { HeroCarousel } from "@/features/home/components/HeroCarousel";
import { Reveal } from "@/shared/components/Reveal";
import MovieCard from "@/features/movies/components/MovieCard";
import { useTrendingMovies } from "@/features/home/hooks/useTrendingMovies";

const HomePage = () => {
  const { trendingMovies, loading, error } = useTrendingMovies();

  return (
    <div className="bg-background">
      {/* Auto-rotating hero carousel (trailer + more-info per slide) */}
      <HeroCarousel movies={trendingMovies} />

      {/* Trending row */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Trending now</h2>
            <Link
              to="/browse"
              className="text-sm font-medium text-foreground/70 hover:text-netflix-red transition-colors"
            >
              See all
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] w-full rounded bg-muted" />
            ))}
          </div>
        ) : error ? (
          <p className="rounded border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            Failed to load trending movies. Check your connection and try again.
          </p>
        ) : trendingMovies.length === 0 ? (
          <p className="text-foreground/60">No movies available right now.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {trendingMovies.slice(0, 12).map((movie, i) => (
              <Reveal key={movie.id} delay={(i % 6) * 70}>
                <MovieCard movie={movie} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
