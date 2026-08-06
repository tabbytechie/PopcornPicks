import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useWatchlist } from "@/features/watchlist/context/WatchlistContext";
import { useToast } from "@/shared/components/ui/use-toast";
import Navigation from "@/shared/components/Navigation";
import { MovieHero } from "@/features/movies/components/MovieHero";
import { MovieDetailsGrid } from "@/features/movies/components/MovieDetailsGrid";
import { useMovieDetails } from "@/features/movies/hooks/useMovieDetails";

const MovieDetailPage = () => {
  const {
    movie,
    credits,
    similarMovies,
    recommendations,
    loading,
    error,
    getTrailerKey,
    getDirector,
  } = useMovieDetails();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState<number>(0);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const toggleWatchlist = () => {
    if (!movie) return;
    const movieForWatchlist = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      genre_ids: movie.genres.map((genre) => genre.id),
    };
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast({
        title: "Removed from watchlist",
        description: `${movie.title} has been removed from your watchlist`,
        variant: "default",
      });
    } else {
      addToWatchlist(movieForWatchlist);
      toast({
        title: "Added to watchlist",
        description: `${movie.title} has been added to your watchlist`,
        variant: "default",
      });
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
            <p className="text-gray-300 mb-8">{error || 'The requested movie could not be found.'}</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <MovieHero
        movie={movie}
        director={getDirector()}
        isInWatchlist={movie && isInWatchlist(movie.id)}
        canPlayTrailer={!!getTrailerKey()}
        onToggleWatchlist={toggleWatchlist}
        onPlayTrailer={() => setShowTrailer(true)}
      />
      <MovieDetailsGrid
        movie={movie}
        credits={credits}
        userRating={userRating}
        onRate={handleRating}
        similarMovies={similarMovies || []}
        recommendations={recommendations || []}
        showTrailer={showTrailer}
        trailerKey={getTrailerKey()}
        onCloseTrailer={() => setShowTrailer(false)}
      />
    </div>
  );
};

export default MovieDetailPage;
