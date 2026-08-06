import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieGenres,
  getGenreName,
} from "@/core/api/tmdb";
import type { TMDBMovie, TMDBGenre } from "@/core/api/tmdb";

/**
 * Browse domain service. The only seam between the browse feature and TMDB.
 */
export {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieGenres,
  getGenreName,
};
export type { TMDBMovie, TMDBGenre };
