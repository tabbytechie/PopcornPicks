# 🍿 PopcornPicks

> A movie discovery & recommendation platform built as an enterprise-grade **Modular Monolith** — one repository, one frontend, one backend, one PostgreSQL database, organised into independent bounded-context modules that can each be extracted into a microservice later **without rewriting the project**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-lightgrey)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

---
![PopcornPicks Banner](/apps/frontend/src/assets/images/1.png)


![PopcornPicks Banner](/apps/frontend/src/assets/images/2.png)


## 🎬 What is PopcornPicks?

PopcornPicks helps users discover, browse, and track movies and TV series. It pulls catalogue data from [The Movie Database (TMDB)](https://www.themoviedb.org/) through a **backend proxy** so that API keys never leave the server, and lets users build personal watchlists, rate titles, and search across movies and series.

The project is deliberately architected as a **Modular Monolith**: a single codebase with clear module boundaries, so you get the operational simplicity of one deployable unit today while keeping every domain isolated enough to be extracted into its own microservice tomorrow.

---

## 🏗️ Architecture at a Glance

```
.
├── apps/                          # Deployable applications
│   ├── frontend/                  # React 18 + TypeScript SPA (Vite, TanStack Query, Tailwind, shadcn/ui)
│   ├── backend/                   # Express 4 Modular Monolith API + TMDB proxy
│   └── admin/                     # Admin console (placeholder)
├── packages/                      # Shared libraries (npm workspaces)
│   ├── types/                     # Shared TypeScript types (Movie, Show, Genre, ...)
│   ├── api-client/                # Typed fetch wrapper for the backend API
│   ├── shared/                    # Shared UI / utilities / constants
│   ├── ui/                        # shadcn/ui component primitives
│   ├── hooks/                     # Shared React hooks
│   ├── utils/                     # Shared pure utilities
│   └── config/                    # Shared ESLint / TS configs
├── database/                      # PostgreSQL as an application platform
│   ├── bootstrap/                 # 000_bootstrap.sql … 003_schemas.sql
│   ├── migrations/                # Versioned node-pg-migrate migrations
│   ├── seeds/                     # Idempotent reference data
│   ├── fixtures/                  # Test fixtures
│   ├── extensions/                # Per-extension install / config / uninstall SQL
│   ├── src/
│   │   ├── platform/              # Cross-cutting infra (security, messaging, scheduler, audit, vector, geo, monitoring, perf, backup, restore)
│   │   ├── shared/                # Shared SQL types, helpers, functions
│   │   └── domains/               # Bounded contexts: movies, users, authentication, watchlists, favorites, reviews, ratings, recommendations, search, notifications, analytics, administration, system
│   └── tests/                     # SQL test suites
├── docker/                        # Complete Docker platform (compose, images, scripts, monitoring, CI/CD)
├── docs/                          # Architecture, API, database, deployment, ADRs, contributing
├── scripts/                       # Repo automation
└── tools/                         # Developer tooling
```

### Design Decisions (see `docs/decisions/`)

| ADR | Decision | Status |
|-----|----------|--------|
| ADR-0001 | **Modular Monolith** over microservices — one repo, one deployable unit, isolated module boundaries | ✅ Accepted |
| ADR-0002 | **PostgreSQL-first** — single datastore; pgvector, PostGIS, pg_trgm, pg_cron, pgmq, uuid; no Redis / Mongo / Elasticsearch / Kafka | ✅ Accepted |
| ADR-0003 | **Backend hides all external APIs** — TMDB key stays server-side; frontend calls only our `/api/*` | ✅ Accepted |
| ADR-0004 | **Feature-based frontend** — each feature owns components, hooks, services, types, pages; exposed via `index.ts` | ✅ Accepted |

---

## 🛠️ Tech Stack

### Frontend (`apps/frontend`)

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Routing | React Router DOM 6 |
| Data fetching | TanStack Query (React Query) v5 |
| Styling | Tailwind CSS + shadcn/ui primitives |
| Components | Radix UI primitives + lucide-react icons |
| Forms | react-hook-form + zod |
| Animations | Embla Carousel |
| Path aliases | `@/` → `src/` |

### Backend (`apps/backend`)

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js ≥ 18 (ESM) |
| Framework | Express 4 |
| Language | TypeScript 5 |
| Database client | `pg` (node-postgres) |
| Migrations | `node-pg-migrate` |
| Auth | `scrypt` password hashing + `jsonwebtoken` (JWT) |
| HTTP client | Native `fetch` (TMDB upstream) |
| Testing | Vitest + Supertest |
| Linting | ESLint + dependency-cruiser (module boundary enforcement) |
| Dev runner | `tsx` |

### Shared Packages (`packages/*`)

| Package | Purpose |
|---------|---------|
| `@popcornpicks/types` | Shared TypeScript DTOs: `Movie`, `Show`, `TitlePage`, `Genre`, `Credit`, `Video`, `MovieDetails` |
| `@popcornpicks/api-client` | Typed fetch wrapper consumed by the frontend |
| `@popcornpicks/shared` | Shared utilities, constants, helpers |
| `@popcornpicks/ui` | shadcn/ui component library |
| `@popcornpicks/hooks` | Shared React hooks |
| `@popcornpicks/utils` | Pure utility functions |
| `@popcornpicks/config` | Shared ESLint / TypeScript configs |

### Database (`database/`)

PostgreSQL 16 with extensions: `pgvector`, `postgis`, `pg_trgm`, `pg_cron`, `pgmq`, `uuid-ossp`, `pgcrypto`, `citext`, `hstore`, `btree_gin`, `btree_gist`, `tablefunc`, `ltree`, `intarray`, `pg_stat_statements`.


---

## 📦 Repository Structure (Detailed)

### `apps/frontend/` — Feature-Based React SPA

```
apps/frontend/src/
├── app/                  # App shell, router, layout providers
├── core/                 # Cross-cutting infra (api, auth, theme, errors, logger, storage, env)
├── shared/               # Reusable UI primitives (Reveal, MovieCard, etc.)
├── features/             # One folder per feature (bounded context)
│   ├── home/             # Home page + trending carousel
│   ├── movies/           # Movie browse, details, credits, videos
│   ├── shows/            # TV series browse & details
│   ├── search/           # Cross-domain search (movies + series)
│   ├── watchlists/       # User watchlist management
│   ├── auth/             # Login, register, session
│   ├── settings/         # User preferences
│   └── not-found/        # 404 page
│       Each feature owns:
│       ├── components/   # Feature-scoped components
│       ├── hooks/        # Feature-scoped React hooks
│       ├── services/     # API service calls
│       ├── types/        # Feature-scoped TypeScript types
│       ├── utils/        # Pure utilities
│       ├── pages/        # Route page components
│       ├── constants/    # Feature constants
│       ├── styles/       # Feature styles
│       └── index.ts      # Public barrel (only way to import from outside)
└── index.html, vite.config.ts, tailwind.config.ts, postcss.config.js
```

### `apps/backend/` — Modular Monolith Express API

```
apps/backend/src/
├── main.ts               # Process entrypoint (only place that opens a listening socket)
├── bootstrap/            # createApp(): Express wiring, CORS, routers, /health, error middleware
├── common/               # AppError subclasses, asyncRoute, parse* helpers
├── config/               # Env loading + typed config object, assertConfig()
├── db/                   # Singleton pg Pool + query()/pingDatabase()/closePool()
└── modules/              # One folder per bounded context
    ├── auth/             # Authentication (register, login, JWT, requireAuth guard)
    ├── movies/           # Movie endpoints (normalized from TMDB)
    ├── shows/            # TV series endpoints
    ├── search/           # Combined movie + series search
    ├── tmdb/             # TMDB proxy + normalization (ADR-0003)
    ├── watchlists/       # User watchlist CRUD
    ├── users/            # User profiles (scaffolded)
    ├── reviews/          # Movie reviews (scaffolded)
    ├── ratings/          # User ratings (scaffolded)
    ├── recommendations/  # Recommendation engine (scaffolded)
    ├── notifications/    # Notifications (scaffolded)
    ├── analytics/        # Analytics (scaffolded)
    ├── administration/   # Admin endpoints (scaffolded)
    └── ai/               # AI features (scaffolded)
        Each module owns:
        ├── controllers/  # Express route handlers (exported via index.ts barrel)
        ├── services/     # Business logic
        ├── repositories/ # Data access
        ├── validators/   # Input validation
        ├── dto/          # Data transfer objects
        ├── entities/     # Domain entities
        ├── events/       # Domain events
        ├── jobs/         # Background jobs
        └── tests/        # Module unit tests
```

---

## 🔧 Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | ≥ 18 | Install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) |
| npm | Bundled with Node | Comes with Node.js |
| Docker & Docker Compose | Latest | Optional but recommended for local development |
| TMDB API Key | Free | Get one at [themoviedb.org](https://www.themoviedb.org/) — used **only by the backend** |

---

![PopcornPicks Banner](/apps/frontend/src/assets/images/3.png)

![PopcornPicks Banner](/apps/frontend/src/assets/images/4.png)



## 🚀 Getting Started

### Option 1: Docker Compose (Recommended — Postgres + Backend + Frontend)

```sh
# 1. Clone the repo
git clone https://github.com/tabbytechie/PopcornPicks.git
cd PopcornPicks

# 2. Install dependencies (installs all apps/* and packages/* workspaces)
npm install

# 3. Build and start all services
docker compose up -d --build

# 4. Access the services
# Web (Vite dev server):   http://localhost:4309
# Backend (Express API):   http://localhost:2789  (health: GET /health)
# Postgres:                localhost:5433         (container 5432)
```

> `TMDB_API_KEY` / `JWT_SECRET` are read from `apps/backend/.env` at runtime. That file is **never copied into an image** — copy `apps/backend/.env.example` to `apps/backend/.env` and fill in your values before starting.

Host ports can be overridden with `WEB_PORT` and `BACKEND_PORT`. Source under `apps/*/src` and `packages/` is bind-mounted, so edits hot-reload. Rebuild with `docker compose up -d --build` after changing a `package.json`.

---

### Option 2: Full Docker Platform

The `docker/` directory contains an enterprise-grade platform with compose files, images, scripts, monitoring, and CI/CD configuration.

```sh
# 1. Copy environment file
cp docker/configs/.env.example .env

# 2. Start all services (PostgreSQL, backend, frontend, admin)
docker/scripts/start.sh dev

# 3. Access services
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
# Admin:    http://localhost:5174
# pgAdmin:  http://localhost:5050 (optional)
```

See [`docs/deployment/docker.md`](docs/deployment/docker.md) and [`docker/README.md`](docker/README.md) for full details.

---

### Option 3: Without Docker (Local Development)

```sh
# 1. Install dependencies (all workspaces)
npm install

# 2. Configure the backend
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env and set TMDB_API_KEY (and JWT_SECRET if using auth)

# 3. Start the backend (http://localhost:4000)
npm run dev:backend

# 4. In another terminal, start the frontend dev server (http://localhost:8080)
npm run dev

# 5. Build the frontend for production
npm run build

# 6. Lint the whole repo
npm run lint

# 7. Run type checking
npm run typecheck

# 8. Run tests
npm test
```

> The frontend never talks to TMDB directly — all catalog data is served by the backend proxy at `/api/*` so the TMDB key stays server-side (**ADR-0003**).


---

## ⚙️ Configuration

### Backend Environment Variables (`apps/backend/.env`)

| Variable | Required | Default | Used By |
|----------|----------|---------|---------|
| `PORT` | no | `4000` | Backend listen port |
| `TMDB_API_KEY` | **yes** | *(startup fails if missing)* | TMDB service upstream calls |
| `TMDB_BASE_URL` | no | `https://api.themoviedb.org/3` | TMDB service |
| `TMDB_IMAGE_BASE_URL` | no | `https://image.tmdb.org/t/p` | TMDB image URL builder |
| `DATABASE_URL` | for DB | *(none)* | `pg` pool — auth & watchlist modules |
| `JWT_SECRET` | for auth | *(none — signing throws)* | JWT sign/verify |
| `JWT_EXPIRES_IN` | no | `7d` | Auth token expiry |
| `ALLOWED_ORIGINS` | no | `http://localhost:8080` | CORS whitelist (comma-separated) |

Docker Compose maps host `5433 → container 5432` so it coexists with a local Postgres on 5432. Point local backend at:

```
DATABASE_URL=postgres://popcornpicks:popcornpicks@localhost:5433/popcornpicks
```

### Frontend Environment Variables

The frontend uses same-origin proxying via Vite (`/api` → backend), so no frontend-side TMDB key is needed. Configure `VITE_API_URL` and `VITE_PROXY_TARGET` in `vite.config.ts` if needed.

---

![PopcornPicks Banner](/apps/frontend/src/assets/images/5.png)

![PopcornPicks Banner](/apps/frontend/src/assets/images/6.png)



## 📚 API Reference

The backend exposes a normalized REST API under `/api/*`. The `tmdb` module is the **only** place that knows TMDB's snake_case contract; all responses are mapped to camelCase TypeScript DTOs from `@popcornpicks/types`.

### Base URL

- Local: `http://localhost:4000` (or `http://localhost:2789` via Docker Compose)
- Health: `GET /health`

### Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/health` | Service health + DB connectivity | No |
| `GET` | `/` | API index (name, health link, route list) | No |

#### Authentication (`/api/auth`)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET` | `/api/auth/me` | Get current user (protected) |

#### Movies (`/api/movies`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/movies/trending` | Trending movies (week/day) |
| `GET` | `/api/movies/popular` | Popular movies |
| `GET` | `/api/movies/top_rated` | Top-rated movies |
| `GET` | `/api/movies/upcoming` | Upcoming movies |
| `GET` | `/api/movies/search` | Search movies by query |
| `GET` | `/api/movies/:id` | Movie by ID |
| `GET` | `/api/movies/:id/details` | Full movie details |
| `GET` | `/api/movies/:id/credits` | Cast & crew |
| `GET` | `/api/movies/:id/videos` | Trailers & videos |
| `GET` | `/api/movies/:id/similar` | Similar movies |
| `GET` | `/api/movies/:id/recommendations` | Recommended movies |
| `GET` | `/api/movies/genres` | Genre list |

#### TV Shows (`/api/shows`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/shows/trending` | Trending TV series |
| `GET` | `/api/shows/popular` | Popular TV series |
| `GET` | `/api/shows/top_rated` | Top-rated TV series |
| `GET` | `/api/shows/airing_today` | Airing today |
| `GET` | `/api/shows/on_the_air` | Currently on the air |
| `GET` | `/api/shows/search` | Search TV series |
| `GET` | `/api/shows/:id` | Show by ID |

#### Search (`/api/search`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/search?query=...` | Combined movie + series search |

#### Watchlists (`/api/watchlists`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/watchlists` | List user's watchlist items |
| `POST` | `/api/watchlists` | Add item to watchlist |
| `DELETE` | `/api/watchlists/:id` | Remove from watchlist |

> Full OpenAPI-style endpoint documentation is in [`docs/api/endpoints.md`](docs/api/endpoints.md).

### Response Shape

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

Error responses follow a consistent shape:

```json
{ "error": "Human-readable message" }
```

---

## 🗄️ Database

PopcornPicks treats **PostgreSQL as an application platform**, not merely a database. The database owns persistence, business rules, security, search, scheduling, messaging, analytics, vector search, geospatial queries, auditing, reporting, and background jobs. The application layer is a thin orchestration layer over this platform.

### Applied Migrations

| Migration | Description |
|-----------|-------------|
| `0001_init-users-watchlist` | Creates `users` + `watchlist_items` tables with FK, UNIQUE, CHECK constraints, and indexes |
| `0002_watchlist-display-fields` | Adds `vote_average` and `release_date` to `watchlist_items` |

### Schema Highlights

- **UUID primary keys** via `gen_random_uuid()`
- **`snake_case`** column naming
- **`timestamptz`** defaults to `now()`
- Explicit **FK / CHECK / UNIQUE** constraints
- **Row Level Security (RLS)** on every table

### PostgreSQL Extensions

`pgvector`, `postgis`, `pg_trgm`, `pg_cron`, `pgmq`, `uuid-ossp`, `pgcrypto`, `citext`, `hstore`, `btree_gin`, `btree_gist`, `tablefunc`, `ltree`, `intarray`, `pg_stat_statements`.

See [`docs/database/README.md`](docs/database/README.md) and [`database/README.md`](database/README.md) for the full platform architecture.

### Migration Commands

```sh
npm run db:migrate   -w @popcornpicks/backend   # node-pg-migrate up
npm run db:rollback  -w @popcornpicks/backend   # node-pg-migrate down
npm run db:seed      -w @popcornpicks/backend   # Seed reference data
```


---

## 🧪 Testing

```sh
# Run all tests across workspaces
npm test

# Backend tests only (Vitest + Supertest)
npm test -w @popcornpicks/backend

# Backend tests in watch mode
npm run test:watch -w @popcornpicks/backend
```

Backend test coverage includes: TMDB normalization (mocked `fetch`), auth crypto (`scrypt`), watchlist validators, common parsers/errors, and Supertest HTTP tests against `createApp()`.

---

## 🧹 Quality Gates

```sh
# Type checking across all workspaces
npm run typecheck

# Lint across all workspaces
npm run lint

# Backend module boundary enforcement (dependency-cruiser)
npm run lint:boundaries

# Build all (backend + frontend)
npm run build

# Backend build only
npm run build:backend

# Frontend build only
npm run build:frontend
```

- `typecheck` — `tsc` over all workspaces
- `lint` — ESLint flat config built on `@popcornpicks/config/eslint`
- `lint:boundaries` — dependency-cruiser public-API discipline check (forbids cross-module deep imports)
- CI (`.github/workflows/ci.yml`) runs typecheck → lint → boundaries → build → test for the backend, and lint → build for the frontend.

---

![PopcornPicks Banner](/apps/frontend/src/assets/images/7.png)

![PopcornPicks Banner](/apps/frontend/src/assets/images/8.png)



## 📖 Documentation

| Document | Path | Description |
|----------|------|-------------|
| Architecture Overview | `docs/architecture/README.md` | High-level architecture & design rationale |
| Backend Architecture | `docs/architecture/backend.md` | Express modular monolith deep dive |
| Frontend Architecture | `docs/architecture/frontend.md` | Feature-based React architecture |
| Monorepo Structure | `docs/architecture/monorepo.md` | Workspace layout & conventions |
| Coding Standards | `docs/architecture/coding-standards.md` | Code style & patterns |
| Folder Conventions | `docs/architecture/folder-conventions.md` | Directory layout rules |
| Naming Conventions | `docs/architecture/naming-conventions.md` | Naming rules for files, vars, DB |
| Module Conventions | `docs/architecture/module-conventions.md` | Module internal structure |
| Package Conventions | `docs/architecture/package-conventions.md` | Shared package guidelines |
| API Reference | `docs/api/README.md` | API overview & contract |
| API Endpoints | `docs/api/endpoints.md` | Detailed endpoint reference |
| TMDB Proxy | `docs/api/tmdb-proxy.md` | TMDB integration architecture |
| Database | `docs/database/README.md` | PostgreSQL-first database platform |
| Database Schema | `docs/database/schema.md` | Schema reference |
| Migrations | `docs/database/migrations.md` | Migration workflow |
| Extensions | `docs/database/extensions.md` | PostgreSQL extensions |
| Deployment | `docs/deployment/README.md` | Deployment overview |
| Docker Deployment | `docs/deployment/docker.md` | Docker platform guide |
| Production Deployment | `docs/deployment/production.md` | Production deployment |
| ADR Index | `docs/decisions/README.md` | Architecture Decision Records |
| Contributing | `docs/contributing/README.md` | How to contribute |
| Git Workflow | `docs/contributing/git-workflow.md` | Branching & PR process |
| Development Guide | `docs/development/README.md` | Local development setup |
| Dependency Management | `docs/development/dependency-management.md` | Managing dependencies |
| TypeScript Strict Mode | `docs/development/typescript-strict-mode.md` | TS config rationale |
| Security Policy | `docs/security/README.md` | Security policy & disclosure |
| Environment Variables | `docs/security/environment-variables.md` | Secret management |
| TMDB Setup | `docs/tmdb-setup.md` | Getting a TMDB API key |

---

## 🤝 Contributing

We welcome contributions! Please read [`docs/contributing/README.md`](docs/contributing/README.md) for the full guide.

### Quick Start for Contributors

1. Fork the repo and create a feature branch: `git checkout -b feature/your-feature`
2. Install dependencies: `npm install`
3. Make your changes following the coding standards in `docs/architecture/coding-standards.md`
4. Run quality gates: `npm run typecheck && npm run lint && npm test`
5. Commit using conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
6. Open a Pull Request

### Git Workflow

- `main` — production-ready, protected
- `develop` — integration branch
- `feature/*` — feature branches from `develop`
- `hotfix/*` — urgent fixes from `main`

See [`docs/contributing/git-workflow.md`](docs/contributing/git-workflow.md) for details.

---

## 🔒 Security

- **Never commit secrets** — `.env` files are gitignored; secrets injected at runtime
- TMDB API key never reaches the browser (backend proxy, **ADR-0003**)
- Passwords hashed with `scrypt` (self-describing format)
- Sessions are stateless JWTs
- CORS whitelist via `ALLOWED_ORIGINS`
- Row Level Security (RLS) on every database table

See [`docs/security/README.md`](docs/security/README.md) for the full security policy and [`docs/security/environment-variables.md`](docs/security/environment-variables.md) for secret management.

To report a security vulnerability, please see the Security Policy.

---

## 🚀 Deployment

### Docker (Development & Production)

See [`docs/deployment/docker.md`](docs/deployment/docker.md) for the complete Docker platform guide, and [`docker/README.md`](docker/README.md) for service tables, networks, volumes, backup strategy, and troubleshooting.

### Production Checklist

- [ ] Configure production environment variables
- [ ] Set up SSL/TLS certificates (via Nginx reverse proxy)
- [ ] Configure external storage for backups
- [ ] Set up monitoring and alerting
- [ ] Configure email service integration
- [ ] Build production images with specific tags
- [ ] Run smoke tests after deployment
- [ ] Monitor for issues

See [`docs/deployment/production.md`](docs/deployment/production.md) for the full production deployment guide.

---
![PopcornPicks Banner](/apps/frontend/src/assets/images/9.png)

![PopcornPicks Banner](/apps/frontend/src/assets/images/10.png)



## 🗺️ Roadmap

- [ ] User authentication & registration (backend implemented)
- [ ] Personal watchlists with TMDB sync
- [ ] Movie ratings & reviews
- [ ] Personalized recommendations (pgvector similarity)
- [ ] Geospatial "nearby screenings" (PostGIS)
- [ ] Scheduled TMDB catalogue sync (pg_cron)
- [ ] Background job queue (pgmq)
- [ ] Admin console
- [ ] Kubernetes deployment manifests
- [ ] Multi-region deployment

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Support

For issues, feature requests, or questions:

- Check the [troubleshooting section](docs/deployment/docker.md#troubleshooting) in the Docker docs
- Review service-specific documentation in `docker/services/`
- Consult database documentation in `database/`
- Open an issue on [GitHub](https://github.com/tabbytechie/PopcornPicks/issues)

---

**Built with ❤️ and PostgreSQL.** PopcornPicks — discover your next favorite movie.

