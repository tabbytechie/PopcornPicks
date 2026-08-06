import { Star, Film, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/shared/components/ui/card";
import { getImageUrl, formatCurrency } from "@/core/api/tmdb";
import MovieCard from "@/features/movies/components/MovieCard";
import type { TMDBMovieDetails, TMDBCredits, TMDBMovie } from "@/features/movies/services/movie.service";

interface MovieDetailsGridProps {
  movie: TMDBMovieDetails;
  credits: TMDBCredits | null;
  userRating: number;
  onRate: (rating: number) => void;
  similarMovies: TMDBMovie[];
  recommendations: TMDBMovie[];
  showTrailer: boolean;
  trailerKey: string | null;
  onCloseTrailer: () => void;
}

const DetailsColumn = ({ movie, credits }: { movie: TMDBMovieDetails; credits: TMDBCredits | null }) => (
  <div className="lg:col-span-2">
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
        {credits?.cast && credits.cast.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {credits.cast.slice(0, 12).map((actor) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <img
                    src={getImageUrl(actor.profile_path, "w185")}
                    alt={actor.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mx-auto mb-2 flex items-center justify-center hidden">
                  <span className="text-white font-semibold text-sm">
                    {actor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <p className="text-sm text-white font-medium">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Cast information not available.</p>
        )}
      </CardContent>
    </Card>

    {movie.production_companies && movie.production_companies.length > 0 && (
      <Card className="bg-slate-800/50 border-slate-700 mt-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Production Companies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movie.production_companies.map((company) => (
              <div key={company.id} className="text-center">
                {company.logo_path ? (
                  <div className="h-16 flex items-center justify-center mb-2 bg-white/10 rounded-lg p-2">
                    <img
                      src={getImageUrl(company.logo_path, "w185")}
                      alt={company.name}
                      className="max-h-12 max-w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center mb-2 bg-white/10 rounded-lg p-2">
                    <Film className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <p className="text-sm text-white font-medium">{company.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )}

    <Card className="bg-slate-800/50 border-slate-700 mt-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Movie Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-white">{movie?.status || "Unknown"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Original Language</p>
            <p className="text-white">{movie?.original_language?.toUpperCase() || "Unknown"}</p>
          </div>
          {movie?.budget && movie.budget > 0 && (
            <div>
              <p className="text-gray-400 text-sm">Budget</p>
              <p className="text-white">{formatCurrency(movie.budget)}</p>
            </div>
          )}
          {movie?.revenue && movie.revenue > 0 && (
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-white">{formatCurrency(movie.revenue)}</p>
            </div>
          )}
          {movie?.homepage && (
            <div>
              <p className="text-gray-400 text-sm">Website</p>
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                <Globe className="h-4 w-4" /> Visit Website
              </a>
            </div>
          )}
          {movie?.imdb_id && (
            <div>
              <p className="text-gray-400 text-sm">IMDB</p>
              <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                <Film className="h-4 w-4" /> View on IMDB
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);

const SidebarColumn = ({
  movie,
  userRating,
  onRate,
}: {
  movie: TMDBMovieDetails;
  userRating: number;
  onRate: (rating: number) => void;
}) => (
  <div>
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Rate This Movie</h3>
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => onRate(star)} className="p-1 hover:scale-110 transition-transform">
              <Star className={`h-8 w-8 ${star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`} />
            </button>
          ))}
        </div>
        {userRating > 0 && (
          <p className="text-center text-gray-300">You rated this movie {userRating} star{userRating !== 1 ? "s" : ""}</p>
        )}
      </CardContent>
    </Card>

    {movie.belongs_to_collection && (
      <Card className="bg-slate-800/50 border-slate-700 mt-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Part of a Collection</h3>
          <div className="relative rounded-lg overflow-hidden">
            {movie.belongs_to_collection.backdrop_path ? (
              <img src={getImageUrl(movie.belongs_to_collection.backdrop_path, "w500")} alt={movie.belongs_to_collection.name} className="w-full h-32 object-cover" />
            ) : (
              <div className="w-full h-32 bg-gradient-to-r from-purple-800 to-pink-700 flex items-center justify-center">
                <Film className="h-10 w-10 text-white/70" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
              <h4 className="text-white font-semibold">{movie.belongs_to_collection.name}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    )}
  </div>
);

const RelatedSection = ({ title, movies, viewMoreLink = "/" }: { title: string; movies: TMDBMovie[]; viewMoreLink?: string }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link to={viewMoreLink} className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
          <ChevronRight className="h-4 w-4" /> View More
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} showAddToWatchlist />
        ))}
      </div>
    </div>
  );
};

const TrailerModal = ({ showTrailer, trailerKey, onClose }: { showTrailer: boolean; trailerKey: string | null; onClose: () => void }) => {
  if (!showTrailer || !trailerKey) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-video">
        <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-gray-300">✕ Close</button>
        <iframe src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} className="w-full h-full rounded-lg" allowFullScreen title="Movie Trailer" />
      </div>
    </div>
  );
};

export const MovieDetailsGrid = ({
  movie,
  credits,
  userRating,
  onRate,
  similarMovies,
  recommendations,
  showTrailer,
  trailerKey,
  onCloseTrailer,
}: MovieDetailsGridProps) => (
  <>
    <div className="px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DetailsColumn movie={movie} credits={credits} />
          <SidebarColumn movie={movie} userRating={userRating} onRate={onRate} />
        </div>
      </div>
    </div>

    <RelatedSection title="Similar Movies" movies={similarMovies} />
    <RelatedSection title="Recommendations" movies={recommendations} />

    <TrailerModal showTrailer={showTrailer} trailerKey={trailerKey} onClose={onCloseTrailer} />
  </>
);
