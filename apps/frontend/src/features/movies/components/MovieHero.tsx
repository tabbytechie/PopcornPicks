import { Link } from "react-router-dom";
import { ArrowLeft, Star, Plus, Play, Check, Clock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { getImageUrl, formatRuntime } from "@/core/api/tmdb";
import type { TMDBMovieDetails } from "@/features/movies/services/movie.service";

interface MovieHeroProps {
  movie: TMDBMovieDetails;
  director: string;
  isInWatchlist: boolean;
  canPlayTrailer: boolean;
  onToggleWatchlist: () => void;
  onPlayTrailer: () => void;
}

/** Full-height backdrop hero: poster, title, metadata, genres, actions. */
export const MovieHero = ({
  movie,
  director,
  isInWatchlist,
  canPlayTrailer,
  onToggleWatchlist,
  onPlayTrailer,
}: MovieHeroProps) => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />
      </div>

      <div className="relative z-10 flex h-full items-end pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/500x750/1f2937/9ca3af?text=No+Image";
                }}
              />
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <span className="text-gray-300">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                </span>
                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                <span className="text-gray-300">{director}</span>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary" className="bg-white/20 text-white">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto lg:mx-0">
                {movie.overview || "No description available."}
              </p>

              {movie.tagline && (
                <p className="text-xl text-purple-300 italic mb-6 max-w-3xl mx-auto lg:mx-0">
                  "{movie.tagline}"
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  onClick={onPlayTrailer}
                  disabled={!canPlayTrailer}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {canPlayTrailer ? "Watch Trailer" : "No Trailer Available"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={onToggleWatchlist}
                  className={`border-white/20 ${
                    isInWatchlist
                      ? "bg-green-600 text-white border-green-600"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {isInWatchlist ? <Check className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
