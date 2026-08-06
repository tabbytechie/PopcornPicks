# ADR-0002: PostgreSQL-first single datastore

## Status: Accepted
## Context
We need search, geospatial, vector similarity, scheduling and queues without
operating many services at day one.

## Decision
Use PostgreSQL as the single source of truth, extended with:
pgvector, PostGIS, pg_trgm, pg_cron, pgmq, and uuid.
We explicitly do NOT use Redis, MongoDB, Elasticsearch or Kafka.

## Consequences
- One database to operate, backup and secure.
- Advanced features via extensions rather than separate services.
