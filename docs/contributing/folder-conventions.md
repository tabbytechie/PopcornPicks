# Folder Conventions

See `docs/contributing/README.md` summary. Key rules:
- Feature code lives in its feature module, not in shared/common.
- Only genuinely reusable primitives go in `shared/`.
- `kebab-case` for folders, `PascalCase` for component files.

### Detailed Rules

- Feature code lives in its feature module, not in shared/common
- Only genuinely reusable primitives go in `shared/`
- `kebab-case` for folders, `PascalCase` for component files
- Every module/feature exposes a public `index.ts` barrel
- No deep imports into another module's internals (enforced by dependency-cruiser)

## Backend Module Layout

```
modules/<name>/
├── index.ts           # Public barrel
├── controllers/       # Express route handlers
├── services/          # Business logic
├── repositories/      # Data access
├── validators/        # Input validation
├── dto/               # Data transfer objects
├── entities/          # Domain entities
├── events/            # Domain events
├── jobs/              # Background jobs
└── tests/             # Unit tests
```

## Frontend Feature Layout

```
features/<name>/
├── index.ts           # Public barrel
├── components/        # Feature-scoped components
├── hooks/             # Feature-scoped hooks
├── services/          # API service calls
├── types/             # Feature-scoped types
├── pages/             # Route pages
├── constants/         # Feature constants
├── styles/            # Feature styles
└── tests/             # Unit tests
