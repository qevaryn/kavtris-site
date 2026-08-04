# Repository Maintenance

Status: Current guidance
Audience: Technical lead, DevOps, QA and maintainers

This guide defines lightweight recurring repository maintenance. It is not an automated schedule.

## Before Major Release

- Run `npm run verify:full`.
- Review `docs/known-limitations.md`.
- Confirm route and metadata changes are intentional.
- Review contact API compatibility.
- Confirm preview or deployment evidence.
- Check whether rollback is clear.

## Quarterly

- Review dependencies without automatic upgrades.
- Review test health, flaky failures and skipped tests.
- Review documentation links and outdated setup steps.
- Review legacy inventory and asset usage.
- Review environment-variable documentation.
- Review access and secret ownership.

## After Architecture Changes

- Run `npm run check:architecture`.
- Update architecture documents and ADRs when ownership changes.
- Confirm route wrappers remain thin.
- Confirm domain contracts remain pure.
- Confirm frontend does not import server implementations.

## After Team Ownership Changes

- Review the CODEOWNERS plan.
- Review responsibility matrix and handoff expectations.
- Review secret access.
- Update onboarding links if responsibilities moved.
