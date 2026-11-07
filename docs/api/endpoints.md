# 🔌 API Endpoints

Detailed endpoint reference for the PopcornPicks backend API.

## Base Configuration

- **Base URL (local):** `http://localhost:4000`
- **Base URL (Docker Compose):** `http://localhost:2789`
- **Content-Type:** `application/json`
- **Auth:** Bearer JWT in `Authorization` header (`Authorization: Bearer <token>`)


---



## 1. System Endpoints

### GET /health

Returns service health status including database connectivity.

**Response:**


```json
{ "status": "ok", "db": "ok" }
```

### GET /

Returns API index with available routes.

**Response:**


```json
{
  "name": "PopcornPicks API",
  "health": "/health",
  "api": ["/api/auth", "/api/movies", "/api/shows", "/api/search", "/api/watchlists"]
}
```


---



## 2. Authentication Endpoints

### POST /api/auth/register

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{ "id": "uuid", "email": "user@example.com", "createdAt": "2024-01-01T00:00:00Z" }
```

### POST /api/auth/login

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**


```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "expiresIn": "7d" }
```

### GET /api/auth/me

Get current authenticated user profile. Requires `Authorization: Bearer <token>`.

**Response (200):**


```json
{ "id": "uuid", "email": "user@example.com", "createdAt": "2024-01-01T00:00:00Z" }
```


---



## 3. Movie Endpoints

### GET /api/movies/trending

Get trending movies.

**Query Parameters:**
| Param | Type | Default | Description |
| -------| ------| ---------| -------------|
| `window` | `day`\| `week` | `week` | Trending time window |

**Response (200):**


```json
{
  "page": 1,
  "totalPages": 500,
  "totalResults": 10000,
  "results": [ { "id": 550, "title": "Fight Club", ... } ]
}
```

### GET /api/movies/popular

Get popular movies.

**Query Parameters:** `page` (number, default: 1)

### GET /api/movies/top_rated

Get top-rated movies.

**Query Parameters:** `page` (number, default: 1)

### GET /api/movies/upcoming

Get upcoming movies.

**Query Parameters:** `page` (number, default: 1)

### GET /api/movies/search

Search movies by query.

**Query Parameters:**
| Param | Type | Description |
| -------| ------| -------------|
| `query` | string | Search query string |
| `page` | number | Page number (default: 1) |

### GET /api/movies/:id

Get a movie by TMDB ID.

**Response:**

 Normalized `Movie` DTO.

### GET /api/movies/:id/details

Get full movie details including runtime, budget, revenue, status.

**Response:**

 Normalized `MovieDetails` DTO.

### GET /api/movies/:id/credits

Get cast and crew for a movie.

**Response:**

 Array of `Credit` objects.

### GET /api/movies/:id/videos

Get trailers and videos for a movie.

**Response:**

 Array of `Video` objects.

### GET /api/movies/:id/similar

Get similar movies.

**Query Parameters:** `page` (number, default: 1)

### GET /api/movies/:id/recommendations

Get recommended movies.

**Query Parameters:** `page` (number, default: 1)

### GET /api/movies/genres

Get the list of movie genres.

**Response:**

 Array of `Genre` objects.


---



## 4. TV Show Endpoints

### GET /api/shows/trending

Get trending TV series.

**Query Parameters:** `window` (`day`\| `week`, default: `week`)

### GET /api/shows/popular

Get popular TV series.

### GET /api/shows/top_rated

Get top-rated TV series.

### GET /api/shows/airing_today

Get TV series airing today.

### GET /api/shows/on_the_air

Get TV series currently on the air.

### GET /api/shows/search

Search TV series by query.

**Query Parameters:** `query` (string), `page` (number, default: 1)

### GET /api/shows/:id

Get a TV show by TMDB ID.

**Response:**

 Normalized `Show` DTO.


---



## 5. Search Endpoints

### GET /api/search

Combined movie + series search.

**Query Parameters:**
| Param | Type | Description |
| -------| ------| -------------|
| `query` | string | Search query string |
| `page` | number | Page number (default: 1) |

**Response:**


```json
{
  "page": 1,
  "totalPages": 10,
  "totalResults": 200,
  "results": [ { "kind": "movie", ... }, { "kind": "series", ... } ]
}
```

Results are sorted by popularity (descending), combining movies and shows.


---



## 6. Watchlist Endpoints

All watchlist endpoints require authentication (`Authorization: Bearer <token>`).

### GET /api/watchlists

List the current user's watchlist items.

**Response:**

 Array of watchlist items with movie/show details.

### POST /api/watchlists

Add an item to the user's watchlist.

**Request Body:**
```json
{
  "tmdbId": 550,
  "kind": "movie",
  "title": "Fight Club",
  "posterPath": "/path/to/poster.jpg",
  "voteAverage": 8.4,
  "releaseDate": "1999-10-15"
}
```

**Response (201):** The created watchlist item.

### DELETE /api/watchlists/:id

Remove an item from the user's watchlist.

**Response (204):** No content.


---



## 7. Error Responses

All errors follow a consistent shape:

```json
{ "error": "Human-readable error message" }
```

| Status | Meaning |
| --------| ---------|
| 400 | Validation error — invalid request body or parameters |
| 401 | Unauthorized — missing or invalid authentication |
| 404 | Not found — resource does not exist |
| 409 | Conflict — resource already exists (e.g., duplicate watchlist item) |
| 502 | Upstream error — TMDB API failure |
| 500 | Internal server error — unexpected failure |
