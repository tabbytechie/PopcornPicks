# 🔐 Environment Variables

## Secret Management Rules

1. **Never commit `.env` files** — They are gitignored
2. **Secrets injected at runtime** — Via `env_file` in Docker Compose or local `.env`
3. **Use `.env.example` as template** — Copy it, never commit the real `.env`
4. **Different values per environment** — Development, staging, production each have their own

## Backend Environment Variables (`apps/backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TMDB_API_KEY` | **Yes** | — | TMDB API key (from themoviedb.org) |
| `PORT` | No | `4000` | Backend listen port |
| `TMDB_BASE_URL` | No | `https://api.themoviedb.org/3` | TMDB API base URL |
| `TMDB_IMAGE_BASE_URL` | No | `https://image.tmdb.org/t/p` | TMDB image base URL |
| `DATABASE_URL` | For DB | — | PostgreSQL connection string |
| `JWT_SECRET` | For auth | — | JWT signing secret |
| `JWT_EXPIRES_IN` | No | `7d` | JWT token expiry |
| `ALLOWED_ORIGINS` | No | `http://localhost:8080` | CORS whitelist (comma-separated) |

### Setup

```sh
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env and set TMDB_API_KEY and JWT_SECRET
```

## Frontend Environment Variables

The frontend uses same-origin proxying via Vite (`/api` → backend), so **no frontend-side TMDB key is needed**. Configuration is in `vite.config.ts`.

## Docker Environment

```sh
cp docker/configs/.env.example .env
# Edit .env for your environment
docker/scripts/start.sh dev
```

## Security Best Practices

| Practice | Implementation |
|----------|---------------|
| No secrets in code | All secrets via environment variables |
| `.env` in `.gitignore` | Prevents accidental commits |
| `.env.example` committed | Template for other developers |
| Runtime injection | Docker `env_file` or local `.env` |
| No hardcoded keys | TMDB_API_KEY never in source code |

## Related Documents

- [`docs/security/README.md`](README.md) — Security policy
- [`docs/architecture/backend.md`](../../architecture/backend.md) — Backend configuration reference
