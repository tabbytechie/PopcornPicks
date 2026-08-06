# Apps

This monorepo contains multiple deployable applications.

- **`frontend/`** — React + TypeScript SPA (`@popcornpicks/frontend`). Feature-based architecture. Currently active.
- **`backend/`** — Modular Monolith backend (`@popcornpicks/backend`). **Placeholder only** — will hide all external APIs (TMDB, AI) behind our own controllers. No logic implemented yet.
- **`admin/`** — Admin console (`@popcornpicks/admin`). **Placeholder only.**

All apps share `packages/*` and the `database/` PostgreSQL layer.
