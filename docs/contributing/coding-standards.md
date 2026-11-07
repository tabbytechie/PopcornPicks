# Coding Standards

- TypeScript everywhere; explicit types over inference at public boundaries.
- No `TODO`/`FIXME` left without an owning issue.
- Components: PascalCase; handlers: camelCase; hooks: `use*`.
- Follow existing shadcn/ui + Tailwind patterns.

## Detailed Standards

### TypeScript

- Use explicit types over inference at public boundaries
- No `any` — use `unknown` + type guards
- No `// @ts-ignore` without a linked issue
- Export types with `export type` for tree-shaking

### React Components

- Components: `PascalCase.tsx`
- Event handlers: `handleEventName` (camelCase)
- Custom hooks: `use*` prefix
- Follow shadcn/ui + Tailwind patterns
- Feature-scoped components in `features/<feature>/components/`
- Shared primitives in `shared/components/`

### Database (SQL)

- Tables: `snake_case`, plural
- Columns: `snake_case`
- Primary keys: UUID via `gen_random_uuid()`
- Row Level Security (RLS) on every table
- Parameterized queries only

### Testing

- Every feature unit has accompanying tests
- Backend: Vitest + Supertest
- Frontend: Vitest + React Testing Library (when added)
