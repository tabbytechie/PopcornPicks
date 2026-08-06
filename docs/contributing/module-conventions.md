# Module Conventions

Each feature/module exposes a public surface via `index.ts` (barrel) and owns
everything it needs. Modules must not depend on other modules' internals -
only on their public surface or shared packages.
