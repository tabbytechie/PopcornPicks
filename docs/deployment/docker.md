# 🐳 Docker Deployment

PopcornPicks includes an enterprise-grade Docker platform under `docker/` with compose files, images, scripts, monitoring, and CI/CD configuration.

## Services

| Service | Purpose | Ports |
|---------|---------|-------|
| Frontend | React SPA (Vite dev) | 5173 (dev), 80 (prod) |
| Backend | Express API + TMDB proxy | 3001 |
| Admin | Admin console | 5174 (dev), 80 (prod) |
| PostgreSQL | Application platform | 5432 |
| Nginx | Reverse proxy / load balancer | 80, 443 |
| Worker | Background job processor | — |
| Scheduler | Scheduled job processor | — |
| Mail | Mailhog (dev email) | 1025, 8025 |

## Networks

- **frontend** — Public-facing services
- **backend** — Internal application services
- **database** — Database communication
- **monitoring** — Monitoring and observability

## Volumes

- **postgres_data** — PostgreSQL data directory
- **postgres_backups** — Backup storage
- **uploads** — User-uploaded files
- **logs** — Application logs

## Directory Structure

```
docker/
├── compose/          # Docker Compose files (dev, test, prod, monitoring, local)
├── images/           # Docker images (frontend, backend, admin, postgres, worker)
├── services/         # Service documentation
├── networks/         # Network configuration
├── volumes/          # Volume configuration
├── configs/          # .env.example, nginx config, monitoring config
├── scripts/          # build.sh, start.sh, stop.sh, restart.sh, logs.sh, health.sh
├── security/         # Security configurations
└── templates/        # Service templates
```

## Quick Start

```sh
# 1. Copy environment file
cp docker/configs/.env.example .env

# 2. Start all services
docker/scripts/start.sh dev

# 3. Access services
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
# Admin:    http://localhost:5174
# pgAdmin:  http://localhost:5050 (optional)
```

## Scripts

| Script | Description |
|--------|-------------|
| `docker/scripts/start.sh` | Start services (dev/test/prod) |
| `docker/scripts/stop.sh` | Stop services |
| `docker/scripts/restart.sh` | Restart services |
| `docker/scripts/build.sh` | Build Docker images |
| `docker/scripts/logs.sh` | View service logs |
| `docker/scripts/health.sh` | Check service health |

## Backup Strategy

- **Daily:** Full backups, retained 7 days
- **Weekly:** Weekly backups, retained 4 weeks
- **Monthly:** Monthly backups, retained 12 months
- **Validation:** Automatic backup integrity checks

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Container won't start | `docker/scripts/logs.sh [service]` |
| Database connection issues | `docker/scripts/health.sh` |
| Build failures | `docker compose build --no-cache` |

## Production Deployment

1. Build production images: `docker/scripts/build.sh prod`
2. Push to container registry
3. Deploy to production servers
4. Run smoke tests
5. Monitor for issues

## Related Documents

- [`docs/deployment/README.md`](README.md) — Deployment overview
- [`docs/deployment/production.md`](production.md) — Production deployment procedure
- [`docker/README.md`](../../docker/README.md) — Full Docker platform documentation
