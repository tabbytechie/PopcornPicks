# 💻 Development Guide

Local development setup and daily workflow for PopcornPicks.

## Prerequisites

| Requirement | Version | Notes |
| -------------| ---------| -------|
| Node.js | ≥ 18 | Install via [nvm](https://github.com/nvm-sh/nvm) |
| npm | Bundled | Comes with Node.js |
| Docker | Latest | Optional but recommended |
| TMDB API Key | Free | Get at [themoviedb.org](https://www.themoviedb.org/) |

## Setup

```sh
# 1. Clone the repository
git clone https://github.com/tabbytechie/PopcornPicks.git
cd PopcornPicks

# 2. Install dependencies (all workspaces)
npm install

# 3. Configure backend
cp apps/backend/.env.example apps/backend/.env
# Edit .env and set TMDB_API_KEY

# 4. Start development servers
# Option A: Docker Compose (recommended)
docker compose up -d --build

# Option B: Without Docker
npm run dev:backend    # Terminal 1: http://localhost:4000
npm run dev            # Terminal 2: http://localhost:8080
```

## Daily Workflow

```sh
# Start backend
npm run dev:backend

# Start frontend
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Run tests
npm test

# Build for production
npm run build

# Database migrations
npm run db:migrate -w @popcornpicks/backend
npm run db:seed -w @popcornpicks/backend
```

## Available Scripts (Root)

| Script | Description |
| --------| -------------|
| `npm run dev` | Start frontend dev server |
| `npm run dev:backend` | Start backend dev server |
| `npm run dev:all` | Start both backend and frontend |
| `npm run build` | Build backend + frontend |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint across all workspaces |
| `npm test` | Run all tests |
| `npm run lint:boundaries` | Backend module boundary check |

## Environment Variables

### Backend (`apps/backend/.env`)

| Variable | Required | Default |
| ----------| ----------| ---------|
| `TMDB_API_KEY` | Yes | — |
| `PORT` | No | `4000` |
| `DATABASE_URL` | For DB features | — |
| `JWT_SECRET` | For auth | — |
| `ALLOWED_ORIGINS` | No | `http://localhost:8080` |

### Frontend

No frontend-side TMDB key needed — Vite proxies `/api` to backend.

## Related Documents

- [`docs/development/dependency-management.md`](dependency-management.md) — Managing dependencies
- [`docs/development/typescript-strict-mode.md`](typescript-strict-mode.md) — TypeScript configuration
- [`docs/architecture/coding-standards.md`](../../architecture/coding-standards.md) — Coding standards
