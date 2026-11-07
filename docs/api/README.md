# 📚 API Reference

PopcornPicks exposes a normalized REST API under `/api/*`. The `tmdb` module is the **only** place that knows TMDB's snake_case contract; all responses are mapped to camelCase TypeScript DTOs from `@popcornpicks/types`.

## Design Principles

| Principle | Description |
| -----------| -------------|
| **Backend hides external APIs** (ADR-0003) | TMDB key stays server-side; frontend calls only our `/api/*` |
| **Normalized responses** | All TMDB snake_case mapped to camelCase DTOs |
| **Consistent error shape** | `{ error: "message" }` with proper HTTP status codes |
| **Typed contracts** | All request/response shapes defined in `@popcornpicks/types` |
| **Same-origin proxying** | Vite proxies `/api` to backend, no CORS needed in dev |

## Base URL

- Local: `http://localhost:4000` (or `http://localhost:2789` via Docker Compose)
- Health: `GET /health`
- API index: `GET /` returns `{ name, health, api: [...] }`

## Endpoints

### System

| Method | Path | Description | Auth |
| --------| ------| -------------| ------|
| `GET` | `/health` | Service health + DB connectivity | No |
| `GET` | `/` | API index (name, health link, route list) | No |

### Authentication (`/api/auth`)

| Method | Path | Description | Auth |
| --------| ------| -------------| ------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login & receive JWT | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes |

### Movies (`/api/movies`)

| Method | Path | Description | Auth |
| --------| ------| -------------| ------|
| `GET` | `/api/movies/trending` | Trending movies (window: day\| week) | No |
| `GET` | `/api/movies/popular` | Popular movies | No |
| `GET` | `/api/movies/top_rated` | Top-rated movies | No |
| `GET` | `/api/movies/upcoming` | Upcoming movies | No |
| `GET` | `/api/movies/search` | Search movies by query | No |
| `GET` | `/api/movies/:id` | Movie by ID | No |
| `GET` | `/api/movies/:id/details` | Full movie details | No |
| `GET` | `/api/movies/:id/credits` | Cast & crew | No |
| `GET` | `/api/movies/:id/videos` | Trailers & videos | No |
| `GET` | `/api/movies/:id/similar` | Similar movies | No |
| `GET` | `/api/movies/:id/recommendations` | Recommended movies | No |
| `GET` | `/api/movies/genres` | Genre list | No |

### TV Shows (`/api/shows`)

| Method | Path | Description | Auth |
| --------| ------| -------------| ------|
| `GET` | `/api/shows/trending` | Trending TV series | No |
| `GET` | `/api/shows/popular` | Popular TV series | No |
| `GET` | `/api/shows/top_rated` | Top-rated TV series | No |
| `GET` | `/api/shows/airing_today` | Airing today | No |
| `GET` | `/api/shows/on_the_air` | Currently on the air | No |
| `GET` | `/api/shows/search` | Search TV series | No |
| `GET` | `/api/shows/:id` | Show by ID | No |

### Search (`/api/search`)

| Method | Path | Description | Auth |
| --------| ------| -------------| ------|
| `GET` | `/api/search?query=...` | Combined movie + series search | No |

### Watchlists (`/api/watchlists`)

| Method | Path | Description | Auth |
| --------| ------| -------------| ------|
| `GET` | `/api/watchlists` | List user's watchlist items | Yes |
| `POST` | `/api/watchlists` | Add item to watchlist | Yes |
| `DELETE` | `/api/watchlists/:id` | Remove from watchlist | Yes |

## Response Shape

### Success

All successful responses return normalized camelCase DTOs:

```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "...",
  "posterUrl": "https://image.tmdb.org/t/p/w500/...",
  "backdropUrl": "https://image.tmdb.org/t/p/original/...",
  "releaseDate": "1999-10-15",
  "voteAverage": 8.4,
  "voteCount": 25000,
  "popularity": 55.2,
  "language": "en",
  "genreIds": [18, 53],
  "genres": [{ "id": 18, "name": "Drama" }],
  "hasTrailer": true,
  "runtimeMinutes": 139,
  "status": "Released"
}
```

### Error

```json
{ "error": "Human-readable message" }
```

HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 409 (Conflict), 502 (Upstream Error), 500 (Internal Server Error).

## Related Documents

- [`docs/api/endpoints.md`](endpoints.md) — Detailed endpoint reference with examples
- [`docs/api/tmdb-proxy.md`](tmdb-proxy.md) — TMDB integration architecture
- [`docs/architecture/backend.md`](../architecture/backend.md) — Backend architecture deep dive

