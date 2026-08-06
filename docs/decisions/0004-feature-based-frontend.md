# ADR-0004: Feature-based frontend modules

## Status: Accepted
## Context
The frontend needs to stay maintainable as features grow and be aligned with
backend module boundaries.

## Decision
Organize the frontend by feature. Each feature owns its components, hooks,
services, types, utils, pages, constants and styles, and exposes a single
public index.ts. Cross-cutting infra lives in core/ and reusable primitives in
shared/. Path aliases (@/core, @/shared, @/features, @/hooks, @/utils, ...)
adhere to the folder layout.

## Consequences
- Feature code is cohesive and local.
- Shared folders stay small; duplicated code is eliminated.
