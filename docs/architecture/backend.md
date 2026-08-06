# Backend Architecture

Modular Monolith in apps/backend. One process, one PostgreSQL DB, many modules (movies, users, auth, reviews, ratings, watchlists, recommendations, notifications, search, analytics, admin, tmdb, ai). Any module can be extracted to a microservice later.
