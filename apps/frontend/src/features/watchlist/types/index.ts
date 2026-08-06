/** A watchlist entry enriched with live TMDB detail data for display. */
export interface WatchlistMovie {
  id: number;
  title: string;
  poster: string;
  backdrop?: string;
  rating: number;
  year: number;
  genre: string;
  userRating: number;
  dateAdded: string;
  watched: boolean;
  runtime?: number;
  overview?: string;
}
