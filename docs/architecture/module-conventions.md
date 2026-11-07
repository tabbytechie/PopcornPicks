# 🧩 Module Conventions

PopcornPicks module conventions define how backend modules and frontend features are structured, how they communicate, and how they can be extracted into microservices.

## Backend Module Structure

```
modules/<name>/
├── index.ts           # Public barrel — ONLY way to import from outside
├── controllers/       # Express route handlers
├── services/          # Business logic
├── repositories/      # Data access (pg queries)
├── validators/        # Input validation
├── dto/               # Data transfer objects
├── entities/          # Domain entities
├── events/            # Domain events (pgmq / NOTIFY)
├── jobs/              # Background jobs (pg_cron)
└── tests/             # Module unit tests
```

### The Public-API Rule

Only `index.ts` is public. Cross-module imports must go through barrels:

```ts
// ✅ Allowed
import { authRouter } from '../modules/auth';

// ❌ Forbidden (caught by dependency-cruiser in CI)
import { loginService } from '../modules/auth/services/login';
```

Enforced by `npm run lint:boundaries -w @popcornpicks/backend`.

## Frontend Feature Structure

```
features/<name>/
├── index.ts           # Public barrel
├── components/        # Feature-scoped components
├── hooks/             # Feature-scoped React hooks
├── services/          # API service calls
├── types/             # Feature-scoped TypeScript types
├── pages/             # Route page components
└── tests/             # Feature unit tests
```

### Feature Rules

1. Barrel is public — other features import only through `index.ts`
2. Feature isolation — no reaching into another feature's internals
3. Pages are route components — default-exported, registered in `app/` router

## Extraction Path

Modules follow strict boundaries so any backend module or frontend feature can be extracted into a standalone microservice without rewriting.

