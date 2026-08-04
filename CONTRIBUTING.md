# Contributing

This repository contains one responsive Next.js web application and one shared contact API boundary.

Use this file as the entry point. Detailed rules live in `docs/`.

## Start Here

- Setup: [docs/development/setup.md](docs/development/setup.md)
- Architecture overview: [docs/architecture/overview.md](docs/architecture/overview.md)
- Coding standards: [docs/development/coding-standards.md](docs/development/coding-standards.md)
- Branching: [docs/development/branching.md](docs/development/branching.md)
- Commits: [docs/development/commits.md](docs/development/commits.md)
- Pull requests: [docs/development/pull-requests.md](docs/development/pull-requests.md)
- QA strategy: [docs/qa/strategy.md](docs/qa/strategy.md)
- Known limitations: [docs/known-limitations.md](docs/known-limitations.md)

## Before Opening A PR

For most code changes:

```bash
npm run verify
```

For changes affecting journeys, responsiveness, routing, forms or API behavior:

```bash
npm run verify:full
```

The complete supported E2E command remains:

```bash
npm run test:e2e
```

## Scope Discipline

- Keep route files thin.
- Keep domain contracts free of React, browser APIs and server/provider code.
- Keep desktop web and mobile web in the same responsive frontend.
- Keep one shared backend/API boundary.
- Do not introduce real product functionality, pricing, authentication or persistence without explicit product scope.
- Do not create external repositories from this codebase until extraction triggers are met and documented.
