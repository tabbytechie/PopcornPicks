# 🗄️ Database

PopcornPicks treats **PostgreSQL as an application platform**, not merely a database. Following [ADR-0002 (PostgreSQL-first)](../decisions/0002-postgresql-first.md), the database owns persistence, business rules, security, search, scheduling, messaging, analytics, vector search, geospatial queries, auditing, reporting, and background jobs. The application layer is a thin orchestration layer over this platform.

## Philosophy

| Principle | Description |
|-----------|-------------|
| **PostgreSQL First** | Whenever PostgreSQL (or an official extension) can solve a problem, we use it. No Redis, MongoDB, Elasticsearch, Kafka, etc. |
| **Domain-Driven Design** | Database organized by business capability (bounded contexts), not by object type |
| **Modular Monolith** | One database, many bounded contexts. Each domain can be extracted later without rewriting the schema |
| **Security at the data layer** | Row Level Security (RLS) on every table — the database is the enforcement point |

## Running PostgreSQL Locally

### Via Docker Compose (Recommended)

```sh
docker compose up -d          # postgres:16-alpine, container "popcornpicks-db"
```

The container maps **host 5433 → container 5432** so it coexists with a local Postgres already on 5432. Point the backend at:

```
DATABASE_URL=postgres://popcornpicks:popcornpicks@localhost:5433/popcornpicks
```

Credentials (`popcornpicks` / `popcornpicks`, db `popcornpicks`) come from `docker-compose.yml`. A named volume `popcornpicks-pgdata` persists data.

### Health Check

```sh
docker compose exec postgres pg_isready -U popcornpicks -d popcornpicks
```

## Applied Migrations

Migrations live in `database/migrations` and are driven from the `@popcornpicks/backend` workspace:

```sh
npm run db:migrate   -w @popcornpicks/backend   # node-pg-migrate up
npm run db:rollback  -w @popcornpicks/backend   # node-pg-migrate down
npm run db:seed      -w @popcornpicks/backend   # Seed reference data
```

### Migration History

| Migration | Description |
|-----------|-------------|
| `0001_init-users-watchlist` | Creates `users` + `watchlist_items` tables with FK, UNIQUE, CHECK constraints, and indexes |
| `0002_watchlist-display-fields` | Adds `vote_average` and `release_date` to `watchlist_items` |

### Applied Schema

#### `users` (auth)

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PRIMARY KEY, `gen_random_uuid()` |
| `email` | text | UNIQUE NOT NULL |
| `password_hash` | text | NOT NULL |
| `created_at` | timestamptz | NOT NULL DEFAULT `now()` |

#### `watchlist_items`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PRIMARY KEY, `gen_random_uuid()` |
| `user_id` | uuid | NOT NULL, REFERENCES `users(id)` ON DELETE CASCADE |
| `tmdb_id` | integer | NOT NULL |
| `kind` | text | NOT NULL, CHECK (`kind IN ('movie','series')`) |
| `title` | text | NOT NULL |
| `poster_path` | text | |
| `added_at` | timestamptz | NOT NULL DEFAULT `now()` |
| `vote_average` | double precision | NOT NULL DEFAULT 0 |
| `release_date` | text | NOT NULL DEFAULT '' |

**Constraints:** `UNIQUE (user_id, tmdb_id, kind)` (idempotent add), index on `user_id`.

## Design Rules

- UUID primary keys via `gen_random_uuid()`
- `snake_case` column naming
- `timestamptz` defaults to `now()`
- Explicit FK / CHECK / UNIQUE constraints
- `NOT NULL` by default; explicit `NULL` when nullable
- Row Level Security (RLS) on every table
- Parameterized queries only — never string interpolation in SQL

## PostgreSQL Extensions

Supported extensions include `pgvector`, `postgis`, `pg_trgm`, `pg_cron`, `pgmq`, `uuid-ossp`, `pgcrypto`, `citext`, `hstore`, `btree_gin`, `btree_gist`, `tablefunc`, `ltree`, `intarray`, `pg_stat_statements`. Each extension lives in `extensions/<name>/` with `README.md`, `install.sql`, `configuration.sql`, `uninstall.sql`.

See [`docs/database/extensions.md`](extensions.md) for details.

## Directory Structure

```
database/
├── README.md
├── docs/                    # architecture, conventions, naming, security, testing
├── bootstrap/               # 000_bootstrap.sql, 001_extensions.sql, 002_roles.sql, 003_schemas.sql
├── migrations/              # Versioned forward migrations
├── rollback/                # Paired rollback migrations
├── seeds/                   # Idempotent reference data
├── fixtures/                # Test fixtures
├── tests/                   # SQL test suites
├── scripts/                 # apply, rollback, seed, test, backup
├── extensions/              # Per-extension setup
└── src/
    ├── platform/            # Cross-cutting infrastructure
    ├── shared/              # Shared types, helpers, common functions
    └── domains/             # Business capabilities (DDD)
```

## Related Documents

- [`docs/database/schema.md`](schema.md) — Schema reference
- [`docs/database/migrations.md`](migrations.md) — Migration workflow
- [`docs/database/extensions.md`](extensions.md) — PostgreSQL extensions
- [`database/README.md`](../../database/README.md) — Full database platform documentation
