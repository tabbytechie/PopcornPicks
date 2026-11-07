# 📦 Package Conventions

PopcornPicks shared packages under `packages/` provide reusable code consumed by apps. Each package is an npm workspace (`@popcornpicks/<name>`).

## Package Structure

```
packages/<name>/
├── package.json         # name: @popcornpicks/<name>, private: true
├── tsconfig.json
├── src/
│   └── index.ts         # Main entry point (barrel)
├── README.md            # Package purpose, usage examples
└── tests/               # Unit tests
```

## Existing Packages

| Package | Purpose | Dependencies |
| ---------| ---------| --------------|
| `types` | Shared TypeScript DTOs (Movie, Show, Genre, ...) | (none) |
| `api-client` | Typed fetch wrapper for frontend | `@popcornpicks/types` |
| `shared` | Shared utilities, constants, helpers | `@popcornpicks/types` |
| `ui` | shadcn/ui component primitives | `@popcornpicks/shared`, Radix UI |
| `hooks` | Shared React hooks | `@popcornpicks/shared`, `@popcornpicks/utils` |
| `utils` | Pure utility functions | (none) |
| `config` | Shared ESLint / TypeScript configs | (none) |

## Package Rules

1. Pure packages — no dependency on apps; apps depend on packages
2. Minimal dependencies — only genuinely shared code
3. Typed exports — export TypeScript types alongside runtime values
4. Barrel pattern — `src/index.ts` is the single entry point
5. Named exports only — no default exports for better tree-shaking

