import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchMovieRecommendations,
} from "@/core/api/tmdb";
import type {
  TMDBMovieDetails,
  TMDBCredits,
  TMDBVideos,
  TMDBMovie,
} from "@/core/api/tmdb";

/**
 * Movie domain service. The only seam between the movies feature and the
 * TMDB API. Re-exports the low-level client calls for the movies feature.
 */
export {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchMovieRecommendations,
};
export type { TMDBMovieDetails, TMDBCredits, TMDBVideos, TMDBMovie };
