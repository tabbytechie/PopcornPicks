import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovieGenres, searchMovies } from "@/features/search/services/search.service";

/**
 * Owns the entire search-page state: URL query params, search query, filters
 * (genre / rating / year), genres metadata and the filtered result set.
 */
export function useMovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [yearRange, setYearRange] = useState([2000, 2024]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Initialize search from URL params
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
      console.log("Initializing search from URL parameter:", queryParam);
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      setLoading(true);
      let movies = [];
      if (searchQuery) {
        console.log("Searching for:", searchQuery);
        movies = await searchMovies(searchQuery);
        console.log("Search results:", movies);
        console.log("Search results count:", movies.length);
        if (movies.length === 0) {
          console.log("No movies found in search results");
        }
      }

      let filtered = movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        genre_ids: movie.genre_ids,
        rating: movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : 0,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        genre:
          movie.genre_ids && movie.genre_ids.length > 0
            ? movie.genre_ids
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

      setFilteredMovies(filtered);
      setLoading(false);
    };

    fetchAndFilterMovies();
  }, [searchQuery, selectedGenre, ratingRange, yearRange, genreMap]);

  const handleSearch = () => {
    console.log("Handling search for:", searchQuery);
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
    filteredMovies,
    loading,
    genres,
    handleSearch,
  };
}
