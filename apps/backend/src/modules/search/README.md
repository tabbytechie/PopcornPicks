# search Module

Placeholder for the **search** domain within the Modular Monolith backend.

## Ownership
- controllers/ - HTTP layer (route handlers)
- services/   - business logic
- repositories/ - data access
- entities/   - ORM / domain entities
- dto/        - request/response transfer objects
- validators/ - input validation
- events/     - domain events & handlers
- jobs/       - scheduled / background jobs
- tests/      - module tests

This module is designed to be extracted into a standalone microservice later without
rewriting the rest of the codebase.
