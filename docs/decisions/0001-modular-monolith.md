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
