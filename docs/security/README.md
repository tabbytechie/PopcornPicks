# 🔒 Security Policy

## Supported Versions

| Version | Supported |
| ---------| -----------|
| Current (main) | ✅ Yes |
| Older releases | ❌ No |

## Reporting a Vulnerability

To report a security vulnerability, please:

1. **Do not** open a public GitHub issue
2. Email the maintainer with details of the vulnerability
3. Include steps to reproduce, impact assessment, and suggested fix
4. Allow reasonable time for investigation and remediation before public disclosure

## Security Practices

| Practice | Implementation |
| ----------| ---------------|
| **Secret management** | `.env` files gitignored; secrets injected at runtime |
| **API key protection** | TMDB key never reaches browser (backend proxy, ADR-0003) |
| **Password hashing** | `scrypt` (self-describing `scrypt$<salt>$<hash>` format) |
| **Authentication** | Stateless JWTs (`jsonwebtoken`, `JWT_SECRET`) |
| **CORS** | Whitelist via `ALLOWED_ORIGINS` environment variable |
| **Database security** | Row Level Security (RLS) on every table |
| **Input validation** | Validators on all API inputs |
| **Error handling** | Centralized error handler; no stack traces leaked to client |
| **Dependency scanning** | `depcheck` for unused dependencies (frontend) |

## Environment Variables Security

See [`docs/security/environment-variables.md`](environment-variables.md) for secret management best practices.

## Vulnerability Disclosure

We follow responsible disclosure practices. Security researchers who follow this policy will:

- Be acknowledged in our security advisories
- Receive advance notice before public disclosure
- Not face legal action for good-faith security research

## Related Documents

- [`docs/security/environment-variables.md`](environment-variables.md) — Secret management
- [`docs/architecture/backend.md`](../../architecture/backend.md) — Backend security (auth, errors, CORS)
