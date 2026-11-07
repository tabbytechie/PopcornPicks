# Module Conventions

Each feature/module exposes a public surface via `index.ts` (barrel) and owns
everything it needs. Modules must not depend on other modules' internals -
only on their public surface or shared packages.

### Detailed Rules

1. Every module/feature exposes a public surface via `index.ts` (barrel)
2. Modules own everything they need internally
3. Modules must not depend on other modules' internals — only on their public surface or shared packages
4. Enforced by dependency-cruiser: `npm run lint:boundaries -w @popcornpicks/backend`

### Backend Module Internal Structure

```
modules/<name>/
├── controllers/   # Express route handlers
├── services/      # Business logic
├── repositories/  # Data access
├── validators/    # Input validation
├── dto/           # Data transfer objects
├── entities/      # Domain entities
├── events/        # Domain events
├── jobs/          # Background jobs
└── tests/         # Unit tests
```

### Frontend Feature Internal Structure

```
features/<name>/
├── components/  # Feature-scoped components
├── hooks/       # Feature-scoped hooks
├── services/    # API service calls
├── types/       # Feature-scoped types
├── pages/       # Route pages
└── tests/       # Unit tests
