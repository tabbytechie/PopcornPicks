# 📚 PopcornPicks Documentation

Welcome to the PopcornPicks documentation. This folder contains everything you need to understand, build, extend, and deploy the PopcornPicks modular monolith.

## 📖 Documentation Index

| Section | Path | Description |
|---------|------|-------------|
| **Architecture** | [`docs/architecture/README.md`](architecture/README.md) | High-level architecture, design rationale, and system overview |
| **Backend** | [`docs/architecture/backend.md`](architecture/backend.md) | Express modular monolith deep dive — modules, data flow, error handling, auth |
| **Frontend** | [`docs/architecture/frontend.md`](architecture/frontend.md) | Feature-based React architecture — features, core, shared, routing |
| **Monorepo** | [`docs/architecture/monorepo.md`](architecture/monorepo.md) | npm workspace layout, apps vs packages vs database |
| **Coding Standards** | [`docs/architecture/coding-standards.md`](architecture/coding-standards.md) | Code style, TypeScript patterns, naming, formatting |
| **Folder Conventions** | [`docs/architecture/folder-conventions.md`](architecture/folder-conventions.md) | Directory layout rules for apps, packages, and modules |
| **Naming Conventions** | [`docs/architecture/naming-conventions.md`](architecture/naming-conventions.md) | Naming rules for files, variables, database objects |
| **Module Conventions** | [`docs/architecture/module-conventions.md`](architecture/module-conventions.md) | Internal structure of backend modules and frontend features |
| **Package Conventions** | [`docs/architecture/package-conventions.md`](architecture/package-conventions.md) | Guidelines for shared packages under `packages/` |
| **API** | [`docs/api/README.md`](api/README.md) | API overview, contract, and design principles |
| **API Endpoints** | [`docs/api/endpoints.md`](api/endpoints.md) | Detailed endpoint reference with request/response examples |
| **TMDB Proxy** | [`docs/api/tmdb-proxy.md`](api/tmdb-proxy.md) | TMDB integration architecture, normalization, rate limits |
| **Database** | [`docs/database/README.md`](database/README.md) | PostgreSQL-first database platform overview |
| **Database Schema** | [`docs/database/schema.md`](database/schema.md) | Schema reference, tables, constraints, indexes |
| **Migrations** | [`docs/database/migrations.md`](database/migrations.md) | Migration workflow, node-pg-migrate, seeding |
| **Extensions** | [`docs/database/extensions.md`](database/extensions.md) | PostgreSQL extensions (pgvector, postgis, pgmq, etc.) |
| **Deployment** | [`docs/deployment/README.md`](deployment/README.md) | Deployment overview and options |
| **Docker Deployment** | [`docs/deployment/docker.md`](deployment/docker.md) | Docker platform, compose files, images, scripts |
| **Production Deployment** | [`docs/deployment/production.md`](deployment/production.md) | Production deployment checklist and procedure |
| **ADR Index** | [`docs/decisions/README.md`](decisions/README.md) | Architecture Decision Records index |
| **Contributing** | [`docs/contributing/README.md`](contributing/README.md) | How to contribute, coding standards, git workflow |
| **Git Workflow** | [`docs/contributing/git-workflow.md`](contributing/git-workflow.md) | Branching strategy, PR process, commit conventions |
| **Development** | [`docs/development/README.md`](development/README.md) | Local development setup and daily workflow |
| **Dependency Management** | [`docs/development/dependency-management.md`](development/dependency-management.md) | Managing npm dependencies across workspaces |
| **TypeScript Strict Mode** | [`docs/development/typescript-strict-mode.md`](development/typescript-strict-mode.md) | TS config rationale and strict mode rules |
| **Security** | [`docs/security/README.md`](security/README.md) | Security policy, vulnerability disclosure |
| **Environment Variables** | [`docs/security/environment-variables.md`](security/environment-variables.md) | Secret management and env var reference |
| **TMDB Setup** | [`docs/tmdb-setup.md`](tmdb-setup.md) | Getting and configuring a TMDB API key |

## 🏁 Quick Start

New to the project? Start here:

1. Read the [root README](../README.md) for installation and getting started
2. Review [ADR-0001](decisions/0001-modular-monolith.md) to understand why we chose a modular monolith
3. Browse the [architecture overview](architecture/README.md) for system design
4. Check [API endpoints](api/endpoints.md) for the backend contract
5. Read [contributing guidelines](contributing/README.md) before submitting changes

## 🗂️ How This Docs Folder Relates to the README

The root [`README.md`](../README.md) provides a high-level summary of every topic covered here. Each section in the README links to its corresponding detailed document in this folder. Use the README for quick orientation, and dive into these docs when you need depth on a specific topic.

