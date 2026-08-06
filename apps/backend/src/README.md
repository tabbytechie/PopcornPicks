# Backend (Modular Monolith)

Future backend that hides every external API (TMDB, AI, …) behind our own
controllers. **No logic is implemented yet** — this is a structural placeholder.

- `bootstrap/` - application bootstrapping (server, DI, middleware)
- `config/` - environment / configuration
- `common/` - shared cross-module infrastructure
- `modules/` - independent feature modules

Each module owns its controllers, services, repositories, entities, DTOs,
validators, events, jobs and tests, so any module can become a microservice
later without rewriting the project.
