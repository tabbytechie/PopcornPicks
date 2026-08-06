# profile

Feature module for **profile** (frontend).

## Owns
- `pages/` - routed pages
- `components/` - feature components
- `hooks/` - feature hooks (data fetching lives here, not in pages)
- `services/` - business logic / the only API-communication seam
- `api/` - API client wrappers
- `types/` - feature domain types
- `utils/` - helpers
- `constants/` - feature constants
- `styles/` - feature-scoped styles
- `tests/` - feature tests

## What does NOT belong
Cross-feature/reusable UI - that lives in `shared/`. App-wide concerns - `core/`.
