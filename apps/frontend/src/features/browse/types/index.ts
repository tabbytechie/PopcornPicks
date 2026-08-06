import { Movie } from "@/features/movies/components/MovieCard";

/** A named horizontal movie section shown on the browse page. */
export interface MovieSection {
  title: string;
  movies: Movie[];
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  description: string;
}
