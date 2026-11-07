# 📐 Coding Standards

PopcornPicks coding standards ensure consistency, maintainability, and type safety across the monorepo.

## TypeScript

### Strict Mode

All TypeScript projects use **strict mode** (`strict: true` in `tsconfig.json`). This enables:

- `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`
- `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `noImplicitReturns`, `esModuleInterop`

See [`docs/development/typescript-strict-mode.md`](../../development/typescript-strict-mode.md) for details.

### Type Safety Rules

- **No `any`** — Use proper types or `unknown` + type guards
- **No `// @ts-ignore`** without documented justification
- **No `!` (non-null assertion)** unless absolutely necessary, with a comment
- **Explicit return types** on all exported functions
- **Interfaces for data shapes**, `type` for unions/aliases
- **Export types with `export type`** when only types are exported

## Backend (Express + TypeScript)

### Error Handling

- Services **throw `AppError` subclasses**, never status strings
- Central error handler maps `AppError` → HTTP status, returns `{ error: message }`
- Non-`AppError` failures → log + generic 500

### Async Route Handler

Use `asyncRoute` wrapper from `common/` to catch async errors:

```ts
import { asyncRoute } from '../../common/index.js';
router.get('/movies', asyncRoute(async (req, res) => {
  const movies = await movieService.getTrendingMovies();
  res.json(movies);
}));
```

### Configuration

Use the typed `config` object from `config/`. Never read `process.env` directly outside `config/`.

### Database

- Parameterized queries only — never string interpolation in SQL
- UUID primary keys via `gen_random_uuid()`
- `snake_case` column names in SQL, `camelCase` in TypeScript

## Frontend (React + TypeScript)

### Component Standards

- Function components with TypeScript interfaces for props
- Default exports for pages, named exports for reusable components
- Feature-scoped components in `features/<feature>/components/`
- Shared primitives in `shared/components/`
- shadcn/ui + Radix UI for accessible primitives
- Tailwind CSS classes; `class-variance-authority` + `tailwind-merge` for variants

### Hooks & Services

- Custom hooks start with `use`; feature-scoped in `features/<feature>/hooks/`
- API calls in `features/<feature>/services/` using `@popcornpicks/api-client`
- Return normalized DTOs from `@popcornpicks/types`

### Path Aliases

| Alias | Resolves To |
|-------|-------------|
| `@/` | `src/` |
| `@/core` | `src/core/` |
| `@/shared` | `src/shared/` |
| `@/features` | `src/features/` |

## Database (SQL)

- Tables: `snake_case`, plural (e.g., `watchlist_items`)
- Columns: `snake_case`; primary key: `id` (UUID via `gen_random_uuid()`)
- Foreign keys: `<table>_id`; indexes: `idx_<table>_<column>`
- `timestamptz` for timestamps, default `now()`; `NOT NULL` by default
- Row Level Security (RLS) on every table
- Explicit column lists in `SELECT` (no `SELECT *`)

## Git & Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`.

Example: `feat(movies): add trending movies endpoint`

See [`docs/contributing/git-workflow.md`](../../contributing/git-workflow.md) for the full workflow.

