import { useState, useEffect } from "react";
import {
  fetchTrendingMovies,
  fetchMovieGenres,
  TMDBMovie,
  TMDBGenre,
  getGenreName,
} from "@/features/home/services/home.service";
import { Movie } from "@/features/movies/components/MovieCard";

/**
 * Loads the trending movies shown on the home page together with the
 * available genres used to resolve genre display names.
 */
export function useTrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<TMDBGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch genres and movies concurrently
        const [moviesData, genresData] = await Promise.all([
          fetchTrendingMovies(),
          fetchMovieGenres(),
        ]);

        setGenres(genresData);

        // Map TMDB movie data to our Movie interface with genre names
        const mappedMovies: Movie[] = moviesData.map((movie: TMDBMovie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          genre_ids: movie.genre_ids,
          genreName: getGenreName(movie.genre_ids, genresData),
        }));

        setTrendingMovies(mappedMovies);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load movies. Please check your API configuration.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { trendingMovies, genres, loading, error };
}
