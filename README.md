# PopcornPicks

A movie recommendation platform, structured as an enterprise-grade **Modular Monolith**:
one repository, one frontend, one backend, one PostgreSQL database - organised into
many independent modules that can each be extracted into a microservice later
**without rewriting the project**.

## Architecture at a glance

```
.
|-- apps/
|   |-- frontend/   React + TypeScript SPA (feature-based)    <- active
|   |-- backend/    Modular Monolith API (placeholder)        <- hides all external APIs
|   `-- admin/      Admin console (placeholder)
|-- packages/       shared ui / config / constants / utils / hooks / types / shared
|-- database/       PostgreSQL-first: schema, migrations, seeds,
|                   functions, triggers, views, materialized views, policies,
|                   extensions (pgvector, postgis, pg_trgm, pg_cron, pgmq, uuid)
|-- docker/         containerization (prepared, not implemented)
|-- docs/           architecture, api, database, deployment, decisions (ADRs), contributing
|-- scripts/        repo automation (placeholder)
`-- tools/          developer tooling (placeholder)
```

### Design decisions (see `docs/decisions/`)
- **Modular Monolith over microservices** (ADR-0001)
- **PostgreSQL-first** single data store - no Redis / MongoDB / Elasticsearch / Kafka (ADR-0002)
- **All external APIs (TMDB, AI) are hidden behind the backend** (ADR-0003)
- **Feature-based frontend modules** with `@/` path aliases (ADR-0004)

## Prerequisites

- Node.js >= 18 & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- A TMDB API key (see `docs/tmdb-setup.md`)

## Getting started

```sh
# 1. Install dependencies (installs all apps/* and packages/* workspaces)
npm install

# 2. Start the frontend dev server (http://localhost:8080)
npm run dev

# 3. Build the frontend
npm run build

# 4. Lint
npm run lint
```

> The frontend currently calls TMDB directly. Later the backend will hide every
> external API - the architecture is already prepared for that (no backend logic
> is implemented yet).

## Tech stack (frontend)

Vite - React - TypeScript - react-router - TanStack Query - Tailwind CSS - shadcn/ui

## Documentation

- [Architecture](docs/architecture/README.md)
- [Database](docs/database/README.md)
- [API](docs/api/README.md)
- [Deployment](docs/deployment/README.md)
- [Architecture Decision Records](docs/decisions/README.md)
- [Contributing / conventions](docs/contributing/README.md)
