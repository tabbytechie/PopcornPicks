import { useState, useEffect } from "react";
import {
  TrendingUp as TrendingUpIcon,
  Flame as FlameIcon,
  Award as AwardIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieGenres,
  TMDBMovie,
  TMDBGenre,
  getGenreName,
} from "@/features/browse/services/browse.service";
import { Movie } from "@/features/movies/components/MovieCard";
import { MovieSection } from "@/features/browse/types";

/**
 * Owns all browse-page state: loads the movie sections (trending, popular,
 * top rated, upcoming) plus genres, then keeps `filteredMovies` in sync with
 * the active tab, search query and selected genre.
 */
export function useBrowseMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("trending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [movieSections, setMovieSections] = useState<MovieSection[]>([]);
  const [genres, setGenres] = useState<TMDBGenre[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // Fetch all data
  useEffect(() => {
    const convertTMDBMovie = (movie: TMDBMovie): Movie => ({
      id: movie.id || 0,
      title: movie.title || "Unknown Title",
      poster_path: movie.poster_path || null,
      vote_average: movie.vote_average || 0,
      release_date: movie.release_date || "",
      genre_ids: movie.genre_ids || [],
      genreName: getGenreName(movie.genre_ids, genres),
    });

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch genres first
        const genresData = await fetchMovieGenres();
        setGenres(genresData);

        // Fetch all movie categories
        const [trending, popular, topRated, upcoming] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
        ]);

        const sections: MovieSection[] = [
          {
            title: "Trending Now",
            movies: trending.slice(0, 20).map((movie: TMDBMovie) => convertTMDBMovie(movie)),
            icon: TrendingUpIcon,
            gradient: "from-orange-500 to-red-500",
            description: "What everyone's watching right now",
          },
          {
            title: "Popular Movies",
            movies: popular.slice(0, 20).map((movie: TMDBMovie) => convertTMDBMovie(movie)),
            icon: FlameIcon,
            gradient: "from-pink-500 to-rose-500",
            description: "Most loved by audiences worldwide",
          },
          {
            title: "Top Rated",
            movies: topRated.slice(0, 20).map((movie: TMDBMovie) => convertTMDBMovie(movie)),
            icon: AwardIcon,
            gradient: "from-yellow-500 to-amber-500",
            description: "Critics' choice and highest rated films",
          },
          {
            title: "Coming Soon",
            movies: upcoming.slice(0, 20).map((movie: TMDBMovie) => convertTMDBMovie(movie)),
            icon: CalendarIcon,
            gradient: "from-purple-500 to-indigo-500",
            description: "Upcoming releases to look forward to",
          },
        ];

        setMovieSections(sections);
        setFilteredMovies(sections[0].movies);
      } catch (err) {
        console.error("Error fetching browse data:", err);
        setError("Failed to load movies. Please check your API configuration.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update filtered movies when tab or genre changes
  useEffect(() => {
    const currentSection = movieSections.find((section) => {
      switch (activeTab) {
        case "trending":
          return section.title === "Trending Now";
        case "popular":
          return section.title === "Popular Movies";
        case "top-rated":
          return section.title === "Top Rated";
        case "upcoming":
          return section.title === "Coming Soon";
        default:
          return section.title === "Trending Now";
      }
    });

    if (currentSection) {
      let filtered = currentSection.movies;

      if (searchQuery) {
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedGenre !== "all") {
        filtered = filtered.filter((movie) =>
          movie.genreName.toLowerCase().includes(selectedGenre.toLowerCase())
        );
      }

      setFilteredMovies(filtered);
    }
  }, [activeTab, searchQuery, selectedGenre, movieSections]);

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    loading,
    error,
    movieSections,
    genres,
    filteredMovies,
  };
}
