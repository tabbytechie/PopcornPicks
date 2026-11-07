# 🏭 Production Deployment

Production deployment checklist and procedure for PopcornPicks.

## Prerequisites

1. Configure production environment variables
2. Set up SSL/TLS certificates (via Nginx reverse proxy)
3. Configure external storage for backups
4. Set up monitoring and alerting
5. Configure email service integration

## Deployment Steps

### 1. Build Production Images

```sh
docker/scripts/build.sh prod
```

### 2. Push to Container Registry

```sh
# Tag and push images to your registry
docker tag popcornpicks-backend:latest registry.example.com/popcornpicks-backend:prod
docker push registry.example.com/popcornpicks-backend:prod
```

### 3. Deploy to Production Servers

```sh
# Use your preferred orchestration (Docker Compose, Kubernetes, etc.)
docker compose -f docker/compose/compose.prod.yml up -d
```

### 4. Run Smoke Tests

```sh
curl https://api.example.com/health
curl https://api.example.com/
```

### 5. Monitor

- Watch application logs
- Monitor database connectivity
- Track error rates and response times

## Production Checklist

- [ ] Environment variables configured (TMDB_API_KEY, JWT_SECRET, DATABASE_URL, etc.)
- [ ] SSL/TLS certificates installed
- [ ] Database backups scheduled and tested
- [ ] Monitoring and alerting configured
- [ ] Health checks passing
- [ ] Rate limiting configured
- [ ] CORS whitelist updated for production domain
- [ ] Log rotation configured

## Scaling

| Type | Approach |
| ------| ----------|
| Horizontal | Scale frontend, backend, worker services |
| Vertical | Adjust resource limits in compose files |
| Database | Use managed PostgreSQL service for production |

## Related Documents

- [`docs/deployment/README.md`](README.md) — Deployment overview
- [`docs/deployment/docker.md`](docker.md) — Docker platform guide
- [`docker/README.md`](../../docker/README.md) — Docker platform documentation
