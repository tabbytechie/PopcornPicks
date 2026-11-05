import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { TrailerPlayButton } from "@/shared/components/TrailerPlayButton";
import type { Movie } from "@/features/movies/components/MovieCard";

const SLIDE_INTERVAL_MS = 6000;
const MAX_SLIDES = 8;

/**
 * Entrance animations for the incoming slide — one is chosen at random on
 * every transition (never repeating the previous one back-to-back).
 * Keyframes live in styles/index.css.
 */
const HERO_ANIMATIONS = [
  "hero-anim-fade",
  "hero-anim-slide-left",
  "hero-anim-slide-right",
  "hero-anim-zoom-in",
  "hero-anim-zoom-out",
  "hero-anim-blur-in",
  "hero-anim-drift",
  "hero-anim-tilt",
] as const;

const pickAnimation = (current: string) => {
  const options = HERO_ANIMATIONS.filter((a) => a !== current);
  return options[Math.floor(Math.random() * options.length)];
};

const DEFAULT_BACKDROP =
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop";

/* Reference-screenshot action buttons: charcoal Details, bright-red Play.
   Same footprint as each other, reduced 30% from the original ~183x72
   desktop size (~128x50 now), scaled down further below sm. */
const DETAILS_BUTTON_CLASS =
  "h-7 w-[72px] gap-1 rounded-lg border border-[#555555] bg-[#242222] px-2 text-xs font-semibold text-white shadow-none hover:bg-[#343232] hover:text-white sm:h-10 sm:w-[105px] sm:gap-1.5 sm:px-3 sm:text-sm lg:h-[50px] lg:w-[128px]";
const PLAY_BUTTON_CLASS =
  "h-7 w-[72px] gap-1 rounded-lg border border-[#ED2D0B] bg-[#ED2D0B] px-2 text-xs font-semibold text-white shadow-none [&_svg]:h-3.5 [&_svg]:w-3.5 hover:border-[#ff3b1c] hover:bg-[#ff3b1c] hover:text-white sm:h-10 sm:w-[105px] sm:gap-1.5 sm:px-3 sm:text-sm sm:[&_svg]:h-4 sm:[&_svg]:w-4 lg:h-[50px] lg:w-[128px]";

const backdropSrcFor = (movie: Movie) =>
  movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : DEFAULT_BACKDROP;

interface HeroCarouselProps {
  movies: Movie[];
}

/**
 * Auto-rotating hero carousel. Crossfades through the first few trending
 * movies every few seconds; pauses while the pointer is over the hero.
 * Each slide shows the movie's backdrop, title and key facts only —
 * actions live on the cards and detail pages, keeping the hero minimal.
 */
export const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const slides = useMemo(() => movies.slice(0, MAX_SLIDES), [movies]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animation, setAnimation] = useState<string>(HERO_ANIMATIONS[0]);

  // Move to a slide with a freshly randomized entrance animation.
  const goTo = (next: number) => {
    if (next === active) return;
    setAnimation(pickAnimation(animation));
    setActive(next);
  };

  // Auto-advance: setTimeout (not setInterval) so every slide change is its
  // own transition; re-arms after each move, pause, or data change.
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setTimeout(() => {
      setAnimation((current) => pickAnimation(current));
      setActive((index) => (index + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [paused, slides.length, active]);

  // Reset when the active index falls out of range after a data change.
  useEffect(() => {
    if (active >= slides.length) setActive(0);
  }, [active, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="relative -mt-16 flex min-h-screen items-end overflow-hidden">
        <img
          src={DEFAULT_BACKDROP}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trending now
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative -mt-16 flex min-h-screen items-end overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((movie, index) => {
        const isActive = index === active;
        const year = movie.release_date?.slice(0, 4);
        const rating =
          typeof movie.vote_average === "number"
            ? movie.vote_average.toFixed(1)
            : null;

        return (
          <div
            key={movie.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive
                ? `z-10 opacity-100 ${animation}`
                : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <img
              src={backdropSrcFor(movie)}
              alt={movie.title}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== DEFAULT_BACKDROP) target.src = DEFAULT_BACKDROP;
              }}
            />
            {/* Netflix-style readability scrim: transparent top, near-black bottom. */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />

            <div className="relative mx-auto w-full max-w-7xl px-4 pb-32 pt-24 sm:px-6 sm:pb-24 lg:px-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white/85">
                  {year && <span>{year}</span>}
                  {movie.genreName && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{movie.genreName}</span>
                    </>
                  )}
                  {rating && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span className="text-white/90">★ {rating}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions — bottom-right of the screen, bound to this slide's movie */}
            <div className="absolute bottom-20 right-4 z-20 flex items-center gap-2 sm:bottom-12 sm:right-6 sm:gap-3 lg:bottom-10 lg:right-8">
              <Link to={`/movie/${movie.id}`} aria-label={`Details for ${movie.title}`}>
                <Button variant="ghost" className={DETAILS_BUTTON_CLASS}>
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Details
                </Button>
              </Link>
              <TrailerPlayButton
                movieId={movie.id}
                movieTitle={movie.title}
                label="Play"
                variant="ghost"
                className={PLAY_BUTTON_CLASS}
              />
            </div>
          </div>
        );
      })}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((movie, index) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${movie.title}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-netflix-red"
                  : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
