# Environments

Status: Current guidance
Audience: DevOps, Backend, Frontend and QA

See [../README.md](../README.md).

## Local

Purpose: development on a contributor machine.

Configuration source: `.env.local`, usually copied from `.env.example`.

Email behavior: use `CONTACT_FORM_MOCK=true` unless testing real Resend configuration intentionally.

URL source: `http://localhost:3000` or `http://127.0.0.1:3000`.

Future owner: developer with DevOps support.

## Test

Purpose: automated validation.

Configuration source: CI environment or local shell.

Email behavior: tests must not call the real provider. API tests validate safe negative paths or mocked behavior.

URL source: Playwright `baseURL`, defaulting to `http://127.0.0.1:3000`.

Future owner: QA + DevOps.

## Preview

Purpose: review deployed changes before production.

Configuration source: external deployment platform.

Email behavior: must be configured deliberately. Avoid real email sends from automated tests.

URL source: deployment preview URL.

Future owner: DevOps + feature owner.

Preview behavior is not fully confirmed by repository configuration.

## Production

Purpose: public website.

Configuration source: external deployment platform.

Email behavior: Resend configured with production variables and `CONTACT_FORM_MOCK=false`.

URL source: `NEXT_PUBLIC_SITE_URL` and deployment domain.

Future owner: DevOps + Technical Lead.

Do not expose production secrets in source control.
