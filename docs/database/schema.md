# 📋 Database Schema

Reference for the PopcornPicks PostgreSQL schema. This documents the currently applied tables, constraints, and indexes.

## Applied Tables

### `users`

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

| Column | Type | Description |
| --------| ------| -------------|
| `id` | uuid | Primary key, auto-generated UUID |
| `email` | text | User email (unique, normalized to lowercase) |
| `password_hash` | text | `scrypt` hashed password |
| `created_at` | timestamptz | Account creation timestamp |

### `watchlist_items`

```sql
CREATE TABLE watchlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tmdb_id integer NOT NULL,
  kind text NOT NULL CHECK (kind IN ('movie', 'series')),
  title text NOT NULL,
  poster_path text,
  added_at timestamptz NOT NULL DEFAULT now(),
  vote_average double precision NOT NULL DEFAULT 0,
  release_date text NOT NULL DEFAULT '',
  CONSTRAINT uq_watchlist_items_user_tmdb_kind UNIQUE (user_id, tmdb_id, kind)
);

CREATE INDEX idx_watchlist_items_user_id ON watchlist_items(user_id);
```

| Column | Type | Description |
| --------| ------| -------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Owner of the watchlist item (FK to users) |
| `tmdb_id` | integer | TMDB identifier for the title |
| `kind` | text | `'movie'` or `'series'` |
| `title` | text | Display title |
| `poster_path` | text | TMDB poster path |
| `added_at` | timestamptz | When the item was added |
| `vote_average` | double precision | TMDB vote average |
| `release_date` | text | Release date string |

## Design Rules

- UUID primary keys via `gen_random_uuid()`
- `snake_case` column naming
- `timestamptz` for timestamps, default `now()`
- Explicit FK / CHECK / UNIQUE constraints
- `NOT NULL` by default
- Row Level Security (RLS) on every table
- Indexes on foreign keys and frequently queried columns

## Future Schema (Planned)

The following domains are planned under `database/src/domains/`:

| Domain | Tables |
| --------| --------|
| `movies` | Local movie cache, movie metadata |
| `reviews` | User movie reviews |
| `ratings` | User movie ratings |
| `recommendations` | Recommendation vectors, similarity scores |
| `notifications` | Notification preferences, delivery log |
| `analytics` | View events, click events, search analytics |
| `search` | Local search index (pg_trgm) |
| `favorites` | User favorite titles |
| `administration` | Admin audit log, system settings |
| `system` | System health, feature flags |

## Related Documents

- [`docs/database/migrations.md`](migrations.md) — Migration workflow and commands
- [`docs/database/extensions.md`](extensions.md) — PostgreSQL extensions
- [`database/README.md`](../../database/README.md) — Full database platform documentation
