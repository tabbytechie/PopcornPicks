# Folder Conventions

- apps/<name> - runnable applications (frontend, backend, admin).
- packages/<name> - shared libraries consumed by apps.
- database - PostgreSQL schema, migrations, functions, policies, extensions.
- Each bounded context is a module that owns its own components/hooks/services/types.
