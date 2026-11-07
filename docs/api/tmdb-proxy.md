# 🎬 TMDB Proxy Architecture

PopcornPicks integrates with [The Movie Database (TMDB)](https://www.themoviedb.org/) through a backend proxy. This follows [ADR-0003 (backend hides external APIs)](../decisions/0003-backend-hides-external-apis.md).

## Why a Backend Proxy?

| Problem | Solution |
|---------|----------|
| API key exposure | TMDB key stays server-side, never reaches the browser |
| Vendor lock-in | All TMDB calls centralized in one module (`tmdb/`) |
| Contract changes | TMDB API changes only require backend updates, no frontend changes |
| Data normalization | snake_case → camelCase DTOs at the boundary |
| Rate limiting | Centralized rate-limit tracking and retry logic |
| Caching | Future: local PostgreSQL cache for frequent queries |

## Data Flow

```
Browser (frontend)
    │
    ▼ GET /api/movies/trending
Backend (Express)
    │
    ▼ tmdbService.getTrendingMovies()
TMDB API (api.themoviedb.org/3/trending/movie/week)
    │  (TMDB_API_KEY in Authorization header)
    ▼
Raw TMDB JSON (snake_case)
    │
    ▼ tmdbService.mapMovie() — normalization
Normalized camelCase DTO (@popcornpicks/types)
    │
    ▼ Express JSON response
Browser receives: { title, posterUrl, voteAverage, ... }
```

## The `tmdb` Module

Located at `apps/backend/src/modules/tmdb/`. This is the **only** module that knows TMDB's contract.

### Responsibilities

1. **HTTP calls to TMDB** — Native `fetch` with `TMDB_API_KEY` in the `Authorization` header
2. **Response normalization** — Map snake_case TMDB fields to camelCase TypeScript DTOs
3. **Image URL construction** — Build poster/backdrop URLs from `TMDB_IMAGE_BASE_URL`
4. **Error handling** — Map TMDB errors to `UpstreamError` (502)
5. **Rate-limit awareness** — Respect TMDB rate limits (40 req/10s, 1000 req/day)

### Normalized DTOs

All TMDB responses are mapped to types from `@popcornpicks/types`:

| Type | Fields |
|------|--------|
| `Movie` | id, title, overview, posterUrl, backdropUrl, releaseDate, voteAverage, voteCount, popularity, language, genreIds, genres, hasTrailer, kind, runtimeMinutes, status |
| `Show` | id, title (name), overview, posterUrl, backdropUrl, releaseDate (first_air_date), voteAverage, voteCount, popularity, language, genreIds, genres, hasTrailer, kind |
| `TitlePage<T>` | page, totalPages, totalResults, results: T[] |
| `MovieDetails` | All Movie fields + runtime, budget, revenue, status, tagline, homepage |
| `Credit` | id, name, character, job, department, profilePath, popularity, order |
| `Video` | key, name, site, type, official, publishedAt |
| `Genre` | id, name |

### Example Normalization

**TMDB Raw (snake_case):**
```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac...",
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrUR3Pj.jpg",
  "backdrop_path": "/b4k6jra4ZRXQ3N5F2ZfU9J3WQcE.jpg",
  "release_date": "1999-10-15",
  "vote_average": 8.4,
  "vote_count": 25000,
  "genre_ids": [18, 53],
  "video": true
}
```

**Normalized Response (camelCase):**
```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac...",
  "posterUrl": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrUR3Pj.jpg",
  "backdropUrl": "https://image.tmdb.org/t/p/original/b4k6jra4ZRXQ3N5F2ZfU9J3WQcE.jpg",
  "releaseDate": "1999-10-15",
  "voteAverage": 8.4,
  "voteCount": 25000,
  "genreIds": [18, 53],
  "hasTrailer": true,
  "kind": "movie"
}
```

## Rate Limits

| Limit | Value |
|-------|-------|
| Requests per 10 seconds | 40 |
| Requests per day | 1,000 |

This is sufficient for normal development and testing. For production, consider implementing a local PostgreSQL cache with `pg_cron` sync jobs.

## TMDB Setup

See [`docs/tmdb-setup.md`](../../tmdb-setup.md) for instructions on obtaining a TMDB API key.
