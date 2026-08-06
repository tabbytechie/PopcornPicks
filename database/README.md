# Database

PostgreSQL-first schema for the PopcornPicks Modular Monolith.

## Principles
- PostgreSQL is the single source of truth. No Redis, MongoDB, Elasticsearch or Kafka.
- Row Level Security (RLS) for authorization at the database layer.
- Extensions drive advanced features (pgvector, PostGIS, pg_trgm, pg_cron, pgmq).
- Every application module maps to a bounded set of tables; modules interact via pgmq when async.

## Folders
| Folder | Purpose |
| --- | --- |
| migrations/ | versioned forward migrations |
| seeds/ | idempotent reference data |
| functions/ | SQL/PLpgSQL functions |
| triggers/ | invariants & audit triggers |
| views/ | read-model views |
| materialized_views/ | cached aggregations |
| policies/ | RLS policies |
| extensions/ | per-extension setup & READMEs |
| schema/ | canonical DDL source of truth |

## Usage
Migrations and seeds are applied by the backend on startup / via a dedicated tool.
Implementation planned for the backend milestone.
