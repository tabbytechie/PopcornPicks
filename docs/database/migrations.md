# 🔄 Migrations

PopcornPicks uses `node-pg-migrate` for versioned database migrations. Migrations live in `database/migrations/` and are executed from the `@popcornpicks/backend` workspace.

## Commands

```sh
# Apply all pending migrations
npm run db:migrate   -w @popcornpicks/backend

# Rollback the last migration
npm run db:rollback  -w @popcornpicks/backend

# Seed reference data
npm run db:seed      -w @popcornpicks/backend
```

## Migration Format

Each migration is a numbered SQL file:

```
database/migrations/
├── 0001_init-users-watchlist.sql
├── 0002_watchlist-display-fields.sql
└── README.md
```

### Migration Rules

1. **Numbered prefix** — `NNNN_descriptive-name` (e.g., `0001_init-users-watchlist`)
2. **Forward-only** — Each migration applies schema changes
3. **Idempotent where possible** — Use `IF NOT EXISTS`, `ON CONFLICT` for safe re-application
4. **Paired rollback** — Every migration has a corresponding rollback in `database/rollback/`
5. **Comments** — Every table, column, and constraint has a SQL comment

### Example Migration

```sql
-- 0001_init-users-watchlist.sql
-- Creates users and watchlist_items tables

-- Users table: authentication accounts
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),          -- Unique user identifier
  email text UNIQUE NOT NULL,                              -- User email (lowercase-normalized)
  password_hash text NOT NULL,                             -- scrypt hash
  created_at timestamptz NOT NULL DEFAULT now()            -- Account creation time
);

-- Watchlist items: user's saved movies/series
CREATE TABLE watchlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tmdb_id integer NOT NULL,                                -- TMDB identifier
  kind text NOT NULL CHECK (kind IN ('movie', 'series')),  -- Type of title
  title text NOT NULL,                                     -- Display title
  poster_path text,                                        -- TMDB poster path
  added_at timestamptz NOT NULL DEFAULT now(),             -- When added
  vote_average double precision NOT NULL DEFAULT 0,        -- TMDB rating
  release_date text NOT NULL DEFAULT '',                   -- Release date string
  CONSTRAINT uq_watchlist_items_user_tmdb_kind UNIQUE (user_id, tmdb_id, kind)
);

CREATE INDEX idx_watchlist_items_user_id ON watchlist_items(user_id);
```

## Migration Safety

- Always test migrations on a copy of production data before applying to production
- Run `npm run db:rollback` to reverse the last migration if needed
- Backup the database before running migrations in production
- Never modify an already-applied migration file; create a new migration instead

## Related Documents

- [`docs/database/schema.md`](schema.md) — Schema reference
- [`docs/database/extensions.md`](extensions.md) — PostgreSQL extensions
- [`database/README.md`](../../database/README.md) — Full database platform documentation
