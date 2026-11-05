import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Movie } from "@popcornpicks/types";
import { posterPathFromUrl } from "@/utils/normalized-poster";
import {
  fetchMovieGenres,
  fetchPopularMovies,
  searchMovies,
} from "@/features/search/services/search.service";

/**
 * Inclusive bounds for the year slider. Deriving the ceiling from the clock
 * (and flooring at 1900) keeps both brand-new releases and older classics
 * reachable - a hardcoded range silently filtered whole result sets away.
 */
export const YEAR_BOUNDS: readonly [number, number] = [1900, new Date().getFullYear()];

type SearchMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  video?: boolean;
  rating: number;
  year: number;
  genre: string;
};

/**
 * Owns the entire search-page state: URL query params, search query, filters
 * (genre / rating / year), genres metadata and the filtered result set.
 */
export function useMovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [yearRange, setYearRange] = useState<number[]>([...YEAR_BOUNDS]);
  const [sourceMovies, setSourceMovies] = useState<Movie[]>([]);
  // Starts true because the first browse set is already in flight on mount, so
  // the page shows skeletons instead of a "No movies found" flash.
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const getGenres = async () => {
      const tmdbGenres = await fetchMovieGenres();
      setGenres(tmdbGenres);
      const map = new Map<number, string>();
      tmdbGenres.forEach((genre: { id: number; name: string }) => {
        map.set(genre.id, genre.name);
      });
      setGenreMap(map);
    };
    getGenres();
  }, []);

  // Seed the query from the URL. The fetch effect reacts to searchQuery, so no
  // extra handleSearch() round-trip is needed here.
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // One request per query: search results for a title, popular titles when the
  // box is empty. Filters run locally, so moving a slider never refetches.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const page = searchQuery.trim()
          ? await searchMovies(searchQuery)
          : await fetchPopularMovies();
        if (!cancelled) setSourceMovies(page.results);
      } catch (error) {
        console.error("Error loading movies:", error);
        if (!cancelled) setSourceMovies([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const filteredMovies = useMemo<SearchMovie[]>(() => {
    let filtered = sourceMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      // Recover the CDN path so MovieCard can pick its own image size.
      poster_path: posterPathFromUrl(movie.posterUrl),
      vote_average: movie.voteAverage,
      release_date: movie.releaseDate,
      genre_ids: movie.genreIds,
      video: movie.hasTrailer,
      rating: movie.voteAverage ? parseFloat(movie.voteAverage.toFixed(1)) : 0,
      year: movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 0,
      genre:
        movie.genreIds && movie.genreIds.length > 0
          ? movie.genreIds
              .map((id: number) => genreMap.get(id))
              .filter(Boolean)
              .join(", ")
          : "N/A",
    }));

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter((movie) => movie.genre.includes(selectedGenre));
    }

    // Filter by rating
    filtered = filtered.filter(
      (movie) => movie.rating >= ratingRange[0] && movie.rating <= ratingRange[1]
    );

    // Filter by year
    filtered = filtered.filter((movie) => {
      const movieYear = movie.year;
      return movieYear >= yearRange[0] && movieYear <= yearRange[1];
    });

    return filtered;
  }, [sourceMovies, selectedGenre, ratingRange, yearRange, genreMap]);

  const handleSearch = () => {
    setSearchParams(searchQuery ? { q: searchQuery } : {});
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    ratingRange,
    setRatingRange,
    yearRange,
    setYearRange,
    yearBounds: YEAR_BOUNDS,
    filteredMovies,
    loading,
    genres,
    handleSearch,
  };
}
