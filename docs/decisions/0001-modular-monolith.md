# ADR-0001: Modular Monolith over microservices

## Context
A 10+ year product needs modular isolation but early-stage simplicity.

## Decision
Build a Modular Monolith: one repo, one frontend, one backend, one
PostgreSQL database, organised into independent modules.

## Consequences
- Simpler initial ops + deployment.
- Modules remain isolated so any can be extracted to a microservice later
  without a rewrite.

## Related Documents

- [`docs/architecture/README.md`](../architecture/README.md) — Architecture overview
- [`docs/architecture/backend.md`](../architecture/backend.md) — Backend architecture
- [`docs/architecture/module-conventions.md`](../architecture/module-conventions.md) — Module conventions

## Implementation Status

✅ Implemented — Backend is a modular monolith with isolated module boundaries
📋 Future — Individual modules can be extracted to microservices when needed
