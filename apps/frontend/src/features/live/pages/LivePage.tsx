import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Calendar, Radio, Star, Tv2 } from "lucide-react";

import { catalogApi } from "@popcornpicks/api-client";
import type { Show } from "@popcornpicks/types";
import { Reveal } from "@/shared/components/Reveal";

/**
 * Live page - a browse surface for episodic TV that is airing today or is
 * currently on the air. All data flows through our backend TMDB proxy
 * (ADR-0003), so the client never touches TMDB directly.
 */

const PLACEHOLDER_POSTER =
  "https://via.placeholder.com/500x750/1f2937/9ca3af?text=No+Poster";

interface ShowCardProps {
  show: Show;
}

const ShowCard = ({ show }: ShowCardProps) => (
  <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-card transition-colors hover:border-white/20">
    <div className="relative aspect-[2/3] overflow-hidden">
      <img
        src={show.posterUrl ?? PLACEHOLDER_POSTER}
        alt={show.title}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== PLACEHOLDER_POSTER) target.src = PLACEHOLDER_POSTER;
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />
      {show.voteAverage > 0 && (
        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-netflix-red text-netflix-red" />
          {show.voteAverage.toFixed(1)}
        </div>
      )}
      <div className="absolute inset-x-3 bottom-3">
        <h3 className="truncate text-sm font-semibold text-white">{show.title}</h3>
        <p className="mt-0.5 truncate text-xs text-white/70">
          {show.numberOfSeasons ? `${show.numberOfSeasons} season${show.numberOfSeasons > 1 ? "s" : ""}` : "—"}
          {show.status ? ` · ${show.status}` : ""}
        </p>
      </div>
    </div>
  </article>
);

interface RailProps {
  title: string;
  description: string;
  icon: typeof Calendar;
  shows: Show[];
  loading: boolean;
  error: unknown;
}

const Rail = ({ title, description, icon: Icon, shows, loading, error }: RailProps) => (
  <section className="mb-14">
    <Reveal>
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-netflix-red/15 text-netflix-red ring-1 ring-netflix-red/30">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          <p className="text-sm text-foreground/60">{description}</p>
        </div>
      </div>
    </Reveal>

    {loading && (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] w-full rounded-lg bg-muted" />
        ))}
      </div>
    )}

    {!loading && !!error && (
      <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
        <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
        Failed to load {title.toLowerCase()}. Check that the backend is running.
      </div>
    )}

    {!loading && !error && shows.length === 0 && (
      <p className="text-sm text-foreground/60">Nothing scheduled right now.</p>
    )}

    {!loading && !error && shows.length > 0 && (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {shows.map((show, i) => (
          <Reveal key={show.id} delay={(i % 6) * 60}>
            <ShowCard show={show} />
          </Reveal>
        ))}
      </div>
    )}
  </section>
);

const LivePage = () => {
  const airingToday = useQuery({
    queryKey: ["live", "airing-today"],
    queryFn: () => catalogApi.shows.airingToday(),
  });

  const onTheAir = useQuery({
    queryKey: ["live", "on-the-air"],
    queryFn: () => catalogApi.shows.onTheAir(),
  });

  return (
    <div className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-netflix-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-netflix-red ring-1 ring-netflix-red/30">
            <Radio className="h-3 w-3" />
            Live guide
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            What's on TV
          </h1>
          <p className="mt-2 max-w-2xl text-foreground/60">
            Episodic series airing today and shows currently in an active broadcast
            window. Data sourced from TMDB.
          </p>
        </header>

        <Rail
          title="Airing today"
          description="Episodes scheduled to broadcast in the last 12 and next 12 hours."
          icon={Calendar}
          shows={airingToday.data?.results ?? []}
          loading={airingToday.isLoading}
          error={airingToday.error}
        />

        <Rail
          title="Currently on the air"
          description="Series running new seasons on their network right now."
          icon={Tv2}
          shows={onTheAir.data?.results ?? []}
          loading={onTheAir.isLoading}
          error={onTheAir.error}
        />
      </section>
    </div>
  );
};

export default LivePage;
