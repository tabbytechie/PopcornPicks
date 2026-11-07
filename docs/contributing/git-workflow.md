# 🔀 Git Workflow

PopcornPicks follows a GitHub Flow-inspired branching model.

## Branches

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready code | Protected — requires PR review |
| `develop` | Integration branch | Protected — requires PR review |
| `feature/*` | New features | Created from `develop` |
| `fix/*` | Bug fixes | Created from `develop` |
| `docs/*` | Documentation | Created from `develop` |
| `refactor/*` | Code refactoring | Created from `develop` |
| `chore/*` | Maintenance | Created from `develop` |
| `hotfix/*` | Urgent production fixes | Created from `main` |

## Workflow

### Starting Work

```sh
# 1. Sync with upstream
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes and commit
git add .
git commit -m "feat: add my feature"

# 4. Push and open PR
git push origin feature/my-feature
```

### Opening a Pull Request

1. Push your branch to your fork
2. Open a PR against `develop` (or `main` for hotfixes)
3. Fill in the PR template
4. Request reviews from maintainers
5. Address review feedback
6. Maintainer squashes and merges

### Merging

- `feature/*` → `develop` (via PR with review)
- `hotfix/*` → `main` and `develop` (via PR with review)
- `develop` → `main` (release, via PR with review)

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Use |
|------|-----|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons |
| `refactor` | Code change without bug fix or feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `chore` | Build process, auxiliary tools |

### Examples

```
feat(movies): add trending movies endpoint
fix(auth): resolve JWT token expiry issue
docs(readme): update installation instructions
style(backend): fix indentation in controllers
refactor(shared): extract poster URL utility
```

## Release Process

1. Create a release branch from `develop`
2. Bump version in `package.json`
3. Update changelog
4. Open PR to `main`
5. Tag the release: `git tag v0.1.0`
6. Deploy to production
