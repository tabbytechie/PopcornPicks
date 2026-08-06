import { useState, useEffect } from "react";
import { TrendingUp, Heart, Trophy, Sparkles } from "lucide-react";
import {
  fetchTrendingMovies,
  fetchMovieGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  TMDBMovie,
  TMDBGenre,
  getGenreName,
} from "@/features/recommendations/services/recommendation.service";
import { Movie } from "@/features/movies/components/MovieCard";
import { RecommendationSection } from "@/features/recommendations/types";

/**
 * Loads the recommendation sections (trending, popular, top rated, upcoming)
 * plus genres, and exposes a refresh action.
 */
export function useRecommendations() {
  const [recommendationSections, setRecommendationSections] = useState<
    RecommendationSection[]
  >([]);
  const [genres, setGenres] = useState<TMDBGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const convertTMDBMovie = (movie: TMDBMovie): Movie => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    genreName: getGenreName(movie.genre_ids, genres),
  });

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      const [trending, popular, topRated, upcoming] = await Promise.all([
        fetchTrendingMovies(),
        fetchPopularMovies(),
        fetchTopRatedMovies(),
        fetchUpcomingMovies(),
      ]);

      const sections: RecommendationSection[] = [
        {
          title: "Trending This Week",
          reason: "What everyone's watching",
          icon: TrendingUp,
          gradient: "from-orange-500 to-red-500",
          movies: trending.slice(0, 8).map(convertTMDBMovie),
        },
        {
          title: "Popular Right Now",
          reason: "Crowd favorites",
          icon: Heart,
          gradient: "from-pink-500 to-rose-500",
          movies: popular.slice(0, 8).map(convertTMDBMovie),
        },
        {
          title: "Critics' Choice",
          reason: "Highest rated movies",
          icon: Trophy,
          gradient: "from-yellow-500 to-amber-500",
          movies: topRated.slice(0, 8).map(convertTMDBMovie),
        },
        {
          title: "Coming Soon",
          reason: "Upcoming releases",
          icon: Sparkles,
          gradient: "from-purple-500 to-indigo-500",
          movies: upcoming.slice(0, 8).map(convertTMDBMovie),
        },
      ];

      const validSections = sections.filter((section) => section.movies.length > 0);
      setRecommendationSections(validSections);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to load recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch genres
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const tmdbGenres = await fetchMovieGenres();
        setGenres(tmdbGenres);
      } catch (err) {
        console.error("Error loading genres:", err);
      }
    };
    loadGenres();
  }, []);

  // Fetch recommendations once genres are available
  useEffect(() => {
    if (genres.length > 0) {
      fetchRecommendations();
    }
  }, [genres]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRecommendations();
    setRefreshing(false);
  };

  return {
    recommendationSections,
    genres,
    loading,
    error,
    refreshing,
    handleRefresh,
  };
}
