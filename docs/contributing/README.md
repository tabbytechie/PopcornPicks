# 🤝 Contributing

Welcome to PopcornPicks! We welcome contributions from the community. This guide explains how to get started.

## Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork: `git clone https://github.com/your-username/PopcornPicks.git`
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Install dependencies**: `npm install`
5. **Make your changes** following the coding standards below
6. **Run quality gates**: `npm run typecheck && npm run lint && npm test`
7. **Commit** using conventional commits: `git commit -m "feat: your description"`
8. **Push** to your fork: `git push origin feature/your-feature-name`
9. **Open a Pull Request** against the `develop` branch

## Coding Standards

Follow the standards in [`docs/architecture/coding-standards.md`](../../architecture/coding-standards.md):

- TypeScript strict mode — no `any`, no `// @ts-ignore` without justification
- Backend modules: import only through barrel `index.ts`
- Frontend features: import only through barrel `index.ts`
- SQL: parameterized queries, `snake_case`, UUID PKs, RLS on every table
- Git: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)

## Git Workflow

See [`docs/contributing/git-workflow.md`](git-workflow.md) for the full branching and PR process.

### Branch Naming

| Prefix | Use |
| --------| -----|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `refactor/` | Code refactoring |
| `chore/` | Maintenance tasks |

### Commit Format

```
type(scope): description

Example: feat(movies): add trending movies endpoint
Example: fix(auth): resolve JWT expiry edge case
Example: docs(readme): update installation instructions
```

## Pull Request Process

1. Ensure your branch is up to date with `develop`
2. Run all quality gates: `npm run typecheck && npm run lint && npm test`
3. Ensure backend module boundaries pass: `npm run lint:boundaries -w @popcornpicks/backend`
4. Open a PR against `develop`
5. Describe your changes and reference any related issues
6. Address review comments
7. Maintainer merges after approval

## Reporting Issues

When opening an issue, please include:

- Description of the problem or feature request
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots (for UI issues)
- Environment (Node version, OS, Docker vs. local)

## Security

See [`docs/security/README.md`](../../security/README.md) for the security policy and vulnerability disclosure process.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
