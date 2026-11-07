# 📦 Monorepo Structure

PopcornPicks uses **npm workspaces** — one `package.json` at the root manages all workspaces under `apps/*` and `packages/*`.

## Root `package.json`

```json
{
  "name": "popcornpicks",
  "private": true,
  "version": "0.1.0",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "npm run dev -w @popcornpicks/frontend",
    "dev:backend": "npm run dev -w @popcornpicks/backend",
    "dev:all": "npm run dev:backend & npm run dev:frontend",
    "build": "npm run build -w @popcornpicks/backend && npm run build -w @popcornpicks/frontend",
    "typecheck": "npm run typecheck --workspaces --if-present",
    "test": "npm test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "lint:boundaries": "npm run lint:boundaries -w @popcornpicks/backend"
  },
  "engines": { "node": ">=18" }
}
```

## Workspace Layout

```
.
├── apps/                          # Deployable applications (runnables)
│   ├── frontend/   @popcornpicks/frontend   — React SPA (Vite)
│   ├── backend/    @popcornpicks/backend    — Express Modular Monolith
│   └── admin/      @popcornpicks/admin      — Admin console (placeholder)
├── packages/                      # Shared libraries (consumed by apps)
│   ├── types/        @popcornpicks/types    — Shared TypeScript DTOs
│   ├── api-client/   @popcornpicks/api-client — Typed fetch wrapper
│   ├── shared/       @popcornpicks/shared   — Shared utilities/constants
│   ├── ui/           @popcornpicks/ui       — shadcn/ui component library
│   ├── hooks/        @popcornpicks/hooks    — Shared React hooks
│   ├── utils/        @popcornpicks/utils    — Pure utility functions
│   └── config/       @popcornpicks/config   — Shared ESLint/TS configs
├── database/                      # PostgreSQL schema, migrations, seeds, extensions
├── docker/                        # Docker platform (compose, images, scripts, monitoring)
├── docs/                          # Documentation
├── scripts/                       # Repo automation
└── tools/                         # Developer tooling
```

