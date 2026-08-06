import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchMovieRecommendations,
  TMDBMovieDetails,
  TMDBCredits,
  TMDBVideos,
  TMDBMovie,
} from "@/features/movies/services/movie.service";

/**
 * Loads all data for a single movie detail view (details, credits, videos,
 * similar movies and recommendations) and derives the trailer key + director.
 */
export function useMovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);
  const [credits, setCredits] = useState<TMDBCredits | null>(null);
  const [videos, setVideos] = useState<TMDBVideos | null>(null);
  const [similarMovies, setSimilarMovies] = useState<TMDBMovie[]>([]);
  const [recommendations, setRecommendations] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const movieId = parseInt(id);
        if (isNaN(movieId)) {
          throw new Error("Invalid movie ID");
        }

        const [movieData, creditsData, videosData, similarMoviesData, recommendationsData] =
          await Promise.all([
            fetchMovieDetails(movieId),
            fetchMovieCredits(movieId),
            fetchMovieVideos(movieId),
            fetchSimilarMovies(movieId),
            fetchMovieRecommendations(movieId),
          ]);

        if (!movieData) {
          throw new Error("Movie not found");
        }

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
        setSimilarMovies(similarMoviesData);
        setRecommendations(recommendationsData);
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError(err instanceof Error ? err.message : "Failed to load movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Get the main trailer video
  const getTrailerKey = () => {
    if (!videos?.results) return null;
    const trailer = videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer?.key || videos.results[0]?.key || null;
  };

  // Get director from crew
  const getDirector = () => {
    if (!credits?.crew) return "Unknown";
    const director = credits.crew.find((person) => person.job === "Director");
    return director?.name || "Unknown";
  };

  return {
    id,
    movie,
    credits,
    videos,
    similarMovies,
    recommendations,
    loading,
    error,
    getTrailerKey,
    getDirector,
  };
}
