# 🏷️ Naming Conventions

## TypeScript / JavaScript

### Files & Folders

| Item | Convention | Example |
|------|-----------|---------|
| Component files | `PascalCase.tsx` | `MovieCard.tsx`, `HeroCarousel.tsx` |
| Hook files | `kebab-case.ts` | `use-trending-movies.ts` |
| Service files | `kebab-case.ts` | `home.service.ts`, `tmdb.service.ts` |
| Page files | `PascalCase.tsx` | `HomePage.tsx`, `MovieDetailsPage.tsx` |
| Barrel files | `index.ts` | `index.ts` |
| Test files | `*.test.ts` | `home.service.test.ts` |
| Folders | `kebab-case` | `features/home/`, `modules/watchlists/` |

### Variables & Functions

| Item | Convention | Example |
|------|-----------|---------|
| Variables | `camelCase` | `trendingMovies`, `tmdbApiKey`, `isLoading` |
| Functions | `camelCase` | `fetchTrendingMovies()`, `getGenreName()` |
| React components | `PascalCase` | `MovieCard`, `HomePage` |
| Custom hooks | `camelCase` with `use` prefix | `useTrendingMovies`, `useAuth` |
| Type aliases / interfaces | `PascalCase` | `Movie`, `Show`, `Genre`, `TitlePage` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRIES`, `DEFAULT_PAGE_SIZE` |
| Booleans | `is/has/can/should` prefix | `isLoading`, `hasTrailer`, `canEdit` |

Treat acronyms as words: `getTmdbMovie` (not `getTMDBMovie`).

## SQL

| Item | Convention | Example |
|------|-----------|---------|
| Tables | `snake_case` plural | `watchlist_items`, `movie_genres` |
| Columns | `snake_case` | `poster_path`, `vote_average`, `release_date` |
| Primary keys | `id` (UUID) | `id uuid PRIMARY KEY DEFAULT gen_random_uuid()` |
| Foreign keys | `<table>_id` | `user_id`, `tmdb_id` |
| Indexes | `idx_<table>_<column>` | `idx_watchlist_items_user_id` |
| Unique constraints | `uq_<table>_<columns>` | `uq_watchlist_items_user_id_tmdb_id_kind` |
| Check constraints | `chk_<table>_<condition>` | `chk_watchlist_items_kind_in_movie_series` |
| Functions | `fn_<domain>_<action>` | `fn_movies_normalize_tmdb` |
| Views | `v_<domain>_<name>` | `v_movies_popular` |

## Environment Variables

`UPPER_SNAKE_CASE` with domain prefix: `TMDB_API_KEY`, `DATABASE_URL`, `JWT_SECRET`, `VITE_API_URL`.

## Git

Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`. Example: `feat(movies): add trending endpoint`.

Branches: `feature/`, `fix/`, `docs/`, `refactor/`, `chore/`.

