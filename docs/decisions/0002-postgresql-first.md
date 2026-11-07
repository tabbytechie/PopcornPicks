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

## Related Documents

- [`docs/database/README.md`](../../database/README.md) — Database platform
- [`docs/database/schema.md`](../database/schema.md) — Schema reference
- [`docs/database/extensions.md`](../database/extensions.md) — PostgreSQL extensions

## Supported Extensions

`pgvector`, `postgis`, `pg_trgm`, `pg_cron`, `pgmq`, `uuid-ossp`, `pgcrypto`, `citext`, `hstore`, `btree_gin`, `btree_gist`, `tablefunc`, `ltree`, `intarray`, `pg_stat_statements`

## Implementation Status

✅ Accepted — PostgreSQL 16 is the single datastore
📋 Future — Advanced extensions (pgvector, pgmq, postgis) planned for roadmap features
