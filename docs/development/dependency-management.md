# 📦 Dependency Management

PopcornPicks uses npm workspaces to manage dependencies across multiple packages and applications.

## Workspace Structure

```
package.json (root)
├── workspaces: ["apps/*", "packages/*"]
├── apps/
│   ├── frontend/   @popcornpicks/frontend
│   ├── backend/    @popcornpicks/backend
│   └── admin/      @popcornpicks/admin
└── packages/
    ├── types/      @popcornpicks/types
    ├── api-client/ @popcornpicks/api-client
    ├── shared/     @popcornpicks/shared
    ├── ui/         @popcornpicks/ui
    ├── hooks/      @popcornpicks/hooks
    ├── utils/      @popcornpicks/utils
    └── config/     @popcornpicks/config
```

## Installing Dependencies

### Install All Workspaces

```sh
# From root — installs all apps/* and packages/*
npm install
```

### Install in a Specific Workspace

```sh
npm install <package> -w @popcornpicks/frontend
npm install <package> -w @popcornpicks/backend
```

### Install as Dev Dependency

```sh
npm install <package> -D -w @popcornpicks/frontend
```

## Adding a New Workspace Package

1. Create directory under `apps/` or `packages/`
2. Add `package.json` with `@popcornpicks/<name>` name
3. Run `npm install` at root to register the workspace
4. Add cross-workspace dependencies as needed

## Dependency Rules

| Rule | Description |
| ------| -------------|
| No circular dependencies | Workspaces must not depend on each other circularly |
| Packages don't depend on apps | `packages/*` never depends on `apps/*` |
| Shared code in packages | Code used by multiple apps goes in `packages/` |
| App-specific code stays in apps | `apps/*` contains app-specific logic only |

## Removing Dependencies

```sh
npm uninstall <package> -w @popcornpicks/frontend
```

## Lock File

`package-lock.json` is committed to the repository. Always run `npm install` (not `npm ci` for local development) to keep the lock file in sync.

## Related Documents

- [`docs/architecture/monorepo.md`](../../architecture/monorepo.md) — Monorepo structure
- [`docs/architecture/package-conventions.md`](../../architecture/package-conventions.md) — Package conventions
