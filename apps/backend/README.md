# Backend (@popcornpicks/backend)

**Placeholder.** This directory prepares the Modular Monolith backend that will
later hide every external API (TMDB, etc.) behind our own services.

No application logic is implemented yet - only the module skeleton is scaffolded.

## Layout

```
src/
  bootstrap/    application startup / dependency wiring
  config/       environment & module configuration
  common/       cross-cutting utilities shared by modules
  modules/      one folder per bounded context (see below)
```

## Modules

movies, users, auth, reviews, ratings, watchlists, recommendations, notifications,
search, analytics, admin, tmdb, ai

Each module owns its controllers/services/repositories/entities/dto/validators/events/jobs/tests
so it can later be extracted into a standalone microservice without rewriting the project.

## Database

We are PostgreSQL-first. Schema lives under `/database` at the repo root.
See `database/README.md`.
