# 🔒 TypeScript Strict Mode

All TypeScript projects in PopcornPicks use **strict mode** (`strict: true` in `tsconfig.json`).

## What Strict Mode Enables

| Flag | Description |
| ------| -------------|
| `noImplicitAny` | Variables and parameters must have explicit types |
| `strictNullChecks` | `null` and `undefined` are not assignable to other types |
| `strictFunctionTypes` | Contravariant function parameters |
| `strictBindCallApply` | Strict checking of `bind`, `call`, `apply` |
| `strictPropertyInitialization` | Class properties must be initialized |
| `noImplicitThis` | `this` must have an explicit type |
| `alwaysStrict` | Emit `"use strict"` in all files |
| `noUnusedLocals` | Error on unused local variables |
| `noUnusedParameters` | Error on unused function parameters |
| `noFallthroughCasesInSwitch` | Error on missing `break` in switch cases |
| `noImplicitReturns` | All code paths in a function must return |
| `esModuleInterop` | Interoperability between CommonJS and ES modules |

## Strict Mode Rules

### 1. No `any`

```ts
// ❌ Bad
const data: any = response.json();

// ✅ Good
const data: Movie = await response.json();
// or
const data: unknown = await response.json();
if (isMovie(data)) { ... }
```

### 2. No `// @ts-ignore` Without Justification

```ts
// ❌ Bad
// @ts-ignore
const x = foo.bar;

// ✅ Good (with comment)
// @ts-ignore — TMDB API sometimes omits this field
const backdrop = movie.backdrop_path ?? null;
```

### 3. No Unnecessary Non-Null Assertions

```ts
// ❌ Bad
const title = movie.title!;

// ✅ Good
const title = movie.title ?? 'Unknown Title';
```

### 4. Explicit Return Types

```ts
// ❌ Bad
const getMovies = () => { ... };

// ✅ Good
const getMovies = (): Promise<Movie[]> => { ... };
```

## Backend tsconfig

The backend uses NodeNext module resolution with ESM:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Frontend tsconfig

The frontend uses Vite with standard TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## Type Checking

```sh
# Check all workspaces
npm run typecheck

# Check backend only
npm run typecheck -w @popcornpicks/backend

# Check frontend only
npm run typecheck -w @popcornpicks/frontend
```

## Related Documents

- [`docs/architecture/coding-standards.md`](../../architecture/coding-standards.md) — Coding standards
