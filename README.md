# KAVTRIS website

Public website for KAVTRIS.

The repository contains one responsive Next.js web application. Desktop web and mobile web are not separate applications, and both use the same shared contact API boundary.

## Current Scope

Implemented:

- public marketing website;
- product catalog;
- adaptable product concepts;
- detailed KAVTRIS FieldOps concept page;
- enterprise capability page;
- contact form and `POST /api/contact`;
- email notification through Resend;
- unit, desktop web, mobile web, API, accessibility and visual audit tests.

Not implemented:

- authentication;
- payments or checkout;
- database;
- real SaaS accounts;
- production FieldOps platform;
- native mobile application;
- external backend repository;
- separate desktop or mobile backend.

Product pages describe adaptable solution concepts. They must not be treated as completed SaaS products or fixed-price commercial packages.

## Architecture Summary

```text
src/app       -> Next.js routes, metadata, route handlers and global styles
src/features  -> business-facing UI grouped by feature
src/components -> global layout and domain-neutral shared UI
src/domain    -> pure contracts and types
src/server    -> server orchestration for route handlers
src/services  -> external provider integrations
src/config    -> runtime configuration helpers
tests         -> E2E, API, accessibility and visual audit tests
docs          -> architecture, QA, development and decision records
```

Route files should remain thin. Feature implementation belongs under `src/features`, pure contracts under `src/domain`, server orchestration under `src/server`, and provider integrations under `src/services`.

Start with [docs/README.md](docs/README.md) for the full documentation map.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Resend
- Vitest
- Playwright
- ESLint
- GitHub Actions

The repository does not currently pin a Node.js version in a `.nvmrc` or `engines` field. CI uses Node.js 20. Pinning local runtime versions should be a later explicit decision.

## Local Setup

```bash
git clone <repository-url>
cd kavtris-site
npm install
```

Create a local environment file from `.env.example`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Unix shell:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

The current variables are:

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_TO_EMAIL
NEXT_PUBLIC_SITE_URL
CONTACT_FORM_MOCK
```

For local development without real email delivery, use:

```text
CONTACT_FORM_MOCK=true
```

Production email delivery requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` and `NEXT_PUBLIC_SITE_URL`.

Canonical metadata and sitemap URLs resolve in this order:

```text
NEXT_PUBLIC_SITE_URL
VERCEL_PROJECT_PRODUCTION_URL
VERCEL_URL
http://localhost:3000
```

Production should resolve to the canonical public project URL rather than a generated deployment URL.

`.env.local` is never versioned. Do not commit real secrets. See [docs/development/setup.md](docs/development/setup.md) and [docs/architecture/contact-flow.md](docs/architecture/contact-flow.md).

## Development Commands

```bash
npm run dev
npm run lint
npm run check:architecture
npm run typecheck
npm run test:unit
npm run build
```

## Testing Commands

```bash
npm run test:e2e
npm run test:e2e:desktop
npm run test:e2e:mobile
npm run test:e2e:api
```

For common validation:

```bash
npm run verify
npm run verify:full
```

What they cover:

- `test:unit`: unit tests close to implementation under `src/**/*.test.ts`;
- `test:e2e`: complete supported Playwright suite;
- `test:e2e:desktop`: desktop Chromium project;
- `test:e2e:mobile`: responsive mobile Chromium project;
- `test:e2e:api`: direct API tests.

To run Playwright against a deployed URL:

```bash
BASE_URL=https://example.com npm run test:e2e
```

API tests must not send real email. The local negative configuration tests are skipped when `BASE_URL` is set.

## Main Routes

```text
/                         homepage
/produtos                 product catalog
/produtos/[slug]          product detail pages
/produtos/fieldops        detailed FieldOps concept
/empresas                 enterprise capability page
/rede-qualidade-e-vida    institutional network page
/privacy                  privacy policy
/cookies                  cookie policy
/api/contact              contact API route
```

## Contact Flow

```text
ContactForm
-> submitContact
-> POST /api/contact
-> route adapter
-> controller
-> validation, honeypot and rate limiter
-> contact service
-> email provider interface
-> Resend
```

Supported URL intent parameters:

```text
?produto=fieldops
?tipo=empresa
?tipo=personalizada
```

See [docs/architecture/contact-flow.md](docs/architecture/contact-flow.md).

## Responsive Strategy

The project keeps one responsive frontend.

Spacing, columns and wrapping should stay CSS-driven. Separate mobile or desktop components only when interaction, structure or information hierarchy differs.

Current examples:

- `MobileMenu`: mobile-specific layout behavior;
- `ProductCatalogClient`: responsive orchestrator;
- `FieldOpsSectorAdaptation` and `FieldOpsDemonstration`: FieldOps-specific responsive sections coordinated by the page-level product state.

See [docs/architecture/responsive-web.md](docs/architecture/responsive-web.md) and [docs/architecture/frontend-responsibilities.md](docs/architecture/frontend-responsibilities.md).

## Contribution Workflow

Use focused branches and small commits.

Typical commit prefixes:

```text
feat:
fix:
refactor:
test:
docs:
chore:
```

Before opening a PR, run the commands relevant to the change. For broad changes, run:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

See:

- [docs/development/coding-standards.md](docs/development/coding-standards.md)
- [docs/development/commits.md](docs/development/commits.md)
- [docs/development/pull-requests.md](docs/development/pull-requests.md)

## Known Limitations

Important current limitations are tracked in [docs/known-limitations.md](docs/known-limitations.md).

Confirmed examples:

- no database;
- no authentication;
- no native app;
- process-local contact rate limiter;
- no certified WCAG audit;
- no Firefox/WebKit coverage yet;
- legacy components are preserved for later review;
- an intermittent `caret-color: transparent` hydration warning remains under investigation.

## Documentation Map

Start here:

- [docs/README.md](docs/README.md)

Documentação transversal de produto e governança: [qevaryn/kavtris-docs](https://github.com/qevaryn/kavtris-docs).

Key guides:

- [docs/architecture/overview.md](docs/architecture/overview.md)
- [docs/architecture/frontend.md](docs/architecture/frontend.md)
- [docs/architecture/shared-backend.md](docs/architecture/shared-backend.md)
- [docs/qa/strategy.md](docs/qa/strategy.md)
- [docs/development/setup.md](docs/development/setup.md)
- [docs/products/fieldops.md](docs/products/fieldops.md)
- [docs/repositories/future-repositories.md](docs/repositories/future-repositories.md)
- [docs/ownership/team-responsibilities.md](docs/ownership/team-responsibilities.md)
- [docs/operations/deployment.md](docs/operations/deployment.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
