# ADR-0003: Backend hides all external APIs

## Status: Accepted
## Context
The frontend currently talks to TMDB directly. Exposing third-party keys and
coupling the UI to a vendor API is not sustainable.

## Decision
Add a backend that proxies and hides every external API (TMDB, AI, etc.) behind
our own endpoints. The frontend will call only our API.

## Consequences
- External keys stay server-side.
- Vendor contract changes live in one place (the api/tmdb module).
