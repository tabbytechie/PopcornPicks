# Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utils: `camelCase.ts`
- Constants: `SCREAMING_SNAKE_CASE`

### Detailed Rules

| Item | Convention | Example |
| ------| -----------| ---------|
| Component files | `PascalCase.tsx` | `MovieCard.tsx` |
| Hook files | `kebab-case.ts` | `use-trending-movies.ts` |
| Service files | `kebab-case.ts` | `home.service.ts` |
| Page files | `PascalCase.tsx` | `HomePage.tsx` |
| Variables | `camelCase` | `trendingMovies` |
| Functions | `camelCase` | `fetchTrendingMovies()` |
| Types/Interfaces | `PascalCase` | `Movie`, `Genre` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_RETRIES` |
| Booleans | `is/has/can/should` | `isLoading`, `hasTrailer` |

### SQL Naming

| Item | Convention | Example |
| ------| -----------| ---------|
| Tables | `snake_case` plural | `watchlist_items` |
| Columns | `snake_case` | `poster_path` |
| Indexes | `idx_<table>_<column>` | `idx_watchlist_items_user_id` |
| Constraints | `uq_<table>_<cols>` / `chk_<table>_<cond>` | `uq_watchlist_items_user_tmdb_kind` |
