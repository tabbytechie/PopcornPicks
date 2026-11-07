# 🧩 PostgreSQL Extensions

PopcornPicks leverages PostgreSQL extensions to provide advanced functionality without introducing separate services. Following [ADR-0002 (PostgreSQL-first)](../decisions/0002-postgresql-first.md), we use extensions instead of Redis, MongoDB, Elasticsearch, Kafka, etc.

## Supported Extensions

| Extension | Purpose | Status |
|-----------|---------|--------|
| `pgvector` | Vector search, embeddings, nearest-neighbour similarity | Planned |
| `postgis` | Geospatial queries, radius, bounding boxes, nearest neighbours | Planned |
| `pg_trgm` | Fuzzy text search, trigram indexes for typo-tolerant search | Planned |
| `pg_cron` | Scheduled jobs (MV refresh, cleanup, TMDB sync, analytics) | Planned |
| `pgmq` | Message queues (notifications, emails, recommendations, imports) | Planned |
| `uuid-ossp` | UUID generation | Available |
| `pgcrypto` | Hashing, encryption | Available |
| `citext` | Case-insensitive text | Available |
| `hstore` | Key-value storage where relational modeling is inappropriate | Available |
| `btree_gin` | Composite GIN indexes | Available |
| `btree_gist` | Composite GiST indexes | Available |
| `tablefunc` | Crosstab / pivot analytics | Available |
| `ltree` | Hierarchical data | Available |
| `intarray` | Integer array operations | Available |
| `pg_stat_statements` | Query performance monitoring | Available |

## Extension Structure

Each extension lives in `database/extensions/<name>/`:

```
extensions/<name>/
├── README.md           # Extension purpose and usage
├── install.sql         # CREATE EXTENSION + setup
├── configuration.sql   # Extension-specific configuration
└── uninstall.sql       # DROP EXTENSION + cleanup
```

## Why No External Services?

| Instead of | We use PostgreSQL |
|------------|------------------|
| Redis | `pg_cron` + tables for scheduling/caching |
| MongoDB | JSONB columns in PostgreSQL |
| Elasticsearch | `pg_trgm` trigram search |
| Kafka/ RabbitMQ | `pgmq` message queues |
| Pinecone/ Weaviate | `pgvector` vector search |
| Neo4j | Recursive CTEs + `ltree` for hierarchies |
| InfluxDB | TimescaleDB-style partitioning in PostgreSQL |

This gives us **one database to operate, backup, and secure**.

## Future Extensions Roadmap

1. `pg_trgm` + GIN index — fuzzy title search from local cache
2. `pgvector` — semantic movie recommendations via embeddings
3. `pgmq` — background job queue for notifications and emails
4. `pg_cron` — scheduled TMDB catalogue sync
5. `postgis` — geospatial "nearby screenings" feature

## Related Documents

- [`docs/database/schema.md`](schema.md) — Schema reference
- [`docs/database/migrations.md`](migrations.md) — Migration workflow
- [`database/README.md`](../../database/README.md) — Full database platform documentation
