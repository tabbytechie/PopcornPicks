import {
  fetchTrendingMovies,
  fetchMovieGenres,
  getGenreName,
} from "@/core/api/tmdb";
import type { TMDBMovie, TMDBGenre } from "@/core/api/tmdb";

/**
 * Home domain service. The only seam between the home feature and TMDB.
 */
export { fetchTrendingMovies, fetchMovieGenres, getGenreName };
export type { TMDBMovie, TMDBGenre };
