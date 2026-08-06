import {
  fetchTrendingMovies,
  fetchMovieGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  getGenreName,
} from "@/core/api/tmdb";
import type { TMDBMovie, TMDBGenre } from "@/core/api/tmdb";

/**
 * Recommendation domain service. The only seam between the recommendations
 * feature and TMDB.
 */
export {
  fetchTrendingMovies,
  fetchMovieGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  getGenreName,
};
export type { TMDBMovie, TMDBGenre };
