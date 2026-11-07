# 🚀 Deployment

PopcornPicks can be deployed using Docker Compose (development and production) or manually without Docker.

## Deployment Options

| Option | Best For | Command |
| --------| ----------| ---------|
| **Docker Compose (root)** | Quick local dev with Postgres + Backend + Frontend | `docker compose up -d --build` |
| **Full Docker Platform** | Complete platform with admin, pgAdmin, monitoring | `docker/scripts/start.sh dev` |
| **Without Docker** | Manual local development | `npm install` + `npm run dev:backend` + `npm run dev` |

## Quick Start (Docker Compose)

```sh
# 1. Clone and install
git clone https://github.com/tabbytechie/PopcornPicks.git
cd PopcornPicks
npm install

# 2. Configure backend environment
cp apps/backend/.env.example apps/backend/.env
# Edit .env and set TMDB_API_KEY

# 3. Start all services
docker compose up -d --build

# 4. Access services
# Web:    http://localhost:4309
# API:    http://localhost:2789  (health: GET /health)
# Postgres: localhost:5433
```

## Production Checklist

- [ ] Configure production environment variables
- [ ] Set up SSL/TLS certificates (via Nginx reverse proxy)
- [ ] Configure external storage for backups
- [ ] Set up monitoring and alerting
- [ ] Configure email service integration
- [ ] Build production images with specific tags
- [ ] Run smoke tests after deployment
- [ ] Monitor for issues

## Related Documents

- [`docs/deployment/docker.md`](docker.md) — Docker platform guide
- [`docs/deployment/production.md`](production.md) — Production deployment procedure
- [`docker/README.md`](../../docker/README.md) — Docker service tables, networks, volumes, troubleshooting
