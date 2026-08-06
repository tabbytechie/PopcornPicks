# Extensions

PostgreSQL extensions we prepare for. Each subfolder documents how to enable
and use the extension for PopcornPicks.

- `pgvector/` - vector similarity for AI-powered recommendations
- `postgis/` - geospatial (e.g. nearby cinemas / events)
- `pg_trgm/` - fuzzy text search
- `pg_cron/` - scheduled jobs to refresh materialized views / sync TMDB
- `pgmq/` - lightweight Postgres-backed message queue (job/event processing)
- `uuid/` - UUIDv7 / gen_random_uuid identifiers

> Extensions are opt-in per environment. Enable only what a given env needs.
