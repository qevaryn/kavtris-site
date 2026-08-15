# Local setup

Status: Current
Audience: New contributors

See [../README.md](../README.md).

## Requirements

CI uses Node.js 20.

The repository does not currently define `.nvmrc` or `package.json#engines`. Use Node.js 20 unless the team decides to pin another runtime.

## Install

```bash
git clone <repository-url>
cd qevaryn-site
npm install
```

## Environment

Create `.env.local` from `.env.example`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Unix shell:

```bash
cp .env.example .env.local
```

Variables:

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_TO_EMAIL
NEXT_PUBLIC_SITE_URL
CONTACT_FORM_MOCK
```

Canonical URL resolution for metadata and sitemap follows this order:

```text
NEXT_PUBLIC_SITE_URL
VERCEL_PROJECT_PRODUCTION_URL
VERCEL_URL
http://localhost:3000
```

For local development without real email delivery:

```text
CONTACT_FORM_MOCK=true
```

`.env.local` is never versioned (see `.gitignore`). Real secrets must not be committed.

Mock mode only applies when `NODE_ENV` is not `production`; it is not a substitute for real Resend configuration in production.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production-like Build

```bash
npm run build
npm run start
```

## Test Commands

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

Scoped E2E commands:

```bash
npm run test:e2e:desktop
npm run test:e2e:mobile
npm run test:e2e:api
```

## Common Setup Failures

- Missing `.env.local`: local contact submission may fail unless mock mode or Resend variables are configured.
- Port 3000 already occupied: stop the existing process or set another port for local investigation.
- Stale `.next`: remove `.next` only when type generation or build artifacts appear stale.
- Playwright browser missing: run `npx playwright install chromium`.
