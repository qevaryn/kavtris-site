# Deployment

Status: Current evidence and guidance
Audience: DevOps, Technical Lead and Release Owners

See [../README.md](../README.md).

## Confirmed Repository Evidence

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

CI workflow:

```text
.github/workflows/ci.yml
```

Manual smoke job:

```text
.github/workflows/ci.yml -> job `smoke`
```

The `smoke` job lives in the same workflow as CI and runs only when the workflow is triggered manually via `workflow_dispatch` (requires the `base_url` input).

No `vercel.json` exists in the repository. Any Vercel project settings are external configuration and must be verified in Vercel.

## Required Production Variables

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_TO_EMAIL
NEXT_PUBLIC_SITE_URL
CONTACT_FORM_MOCK=false
```

Do not commit secret values.

`NEXT_PUBLIC_SITE_URL` is the explicit public canonical URL used for metadata and sitemap. If it is absent, the application falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then `http://localhost:3000`. Production should use the canonical public project URL, not a generated deployment URL.

## CI Before Deployment

The repository CI runs:

- install dependencies with `npm ci`;
- install Chromium for Playwright;
- lint;
- typecheck;
- build;
- unit tests;
- Playwright E2E.

## Smoke Validation

The `smoke` job in `.github/workflows/ci.yml` is manual (triggered via `workflow_dispatch`) and accepts:

```text
base_url
```

It runs `npm run test:smoke:production` against the provided deployed URL through `BASE_URL`.

## Rollback Guidance

Current rollback depends on the external deployment platform. From source control, the safest rollback is to redeploy a previously validated commit or revert the problematic commit and redeploy.

Exact Vercel rollback behavior is external and not confirmed in this repository.
