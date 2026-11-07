# 🎨 Frontend Architecture

PopcornPicks frontend is a **feature-based React + TypeScript SPA** in `apps/frontend`, built with Vite 5, React Router DOM 6, TanStack Query v5, Tailwind CSS, and shadcn/ui primitives. It follows [ADR-0004 (feature-based frontend modules)](../decisions/0004-feature-based-frontend.md).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Routing | React Router DOM 6 |
| Data fetching | TanStack Query (React Query) v5 |
| Styling | Tailwind CSS + shadcn/ui |
| UI primitives | Radix UI + lucide-react icons |
| Forms | react-hook-form + zod |
| Carousel | Embla Carousel |
| Notifications | sonner |
| Date handling | date-fns + react-day-picker |
| Path aliases | `@/` → `src/` |

## Directory Layout

```
apps/frontend/src/
├── app/                 # App shell, router, layout providers
├── core/                # Cross-cutting infra
│   ├── api/             # API client configuration & request helpers
│   ├── auth/            # Auth state, token storage, session helpers
│   ├── theme/           # Tailwind theme, CSS variables, dark mode
│   ├── errors/          # Error boundary, error handling utilities
│   ├── logger/          # Logging abstraction
│   ├── storage/         # localStorage / sessionStorage wrappers
│   └── env/             # Environment variable validation
├── shared/              # Reusable UI primitives
│   ├── components/      # Reveal, MovieCard, etc.
│   ├── hooks/           # Shared React hooks
│   ├── services/        # Shared API services
│   ├── types/           # Shared TypeScript types
│   ├── utils/           # Pure utility functions
│   ├── constants/       # Shared constants
│   └── styles/          # Shared styles
├── features/            # One folder per feature (bounded context)
│   ├── home/            # Home page + trending carousel
│   ├── movies/          # Movie browse, details, credits, videos
│   ├── shows/           # TV series browse & details
│   ├── search/          # Cross-domain search (movies + series)
│   ├── watchlists/      # User watchlist management
│   ├── auth/            # Login, register, session
│   ├── settings/        # User preferences
│   └── not-found/       # 404 page
│       Each feature owns:
│       ├── components/  # Feature-scoped components
│       ├── hooks/       # Feature-scoped React hooks
│       ├── services/    # API service calls
│       ├── types/       # Feature-scoped TypeScript types
│       ├── utils/       # Pure utilities
│       ├── pages/       # Route page components
│       ├── constants/   # Feature constants
│       ├── styles/      # Feature styles
│       └── index.ts     # Public barrel (only way to import from outside)
└── index.html, vite.config.ts, tailwind.config.ts, postcss.config.js
```

