# Repository Maintenance

Status: Current guidance
Audience: Technical lead, DevOps, QA and maintainers

This guide defines lightweight recurring repository maintenance. It is not an automated schedule.

## Common local gate and accountability

Accountable owner: Gabriel Dias de Souza. Frontend/Backend execute maintenance;
QA reviews test quality; DevOps owns deployment/backup readiness. These are roles,
not an assertion of current staffing. Until explicit delegation, the owner is
responsible for each role.

```console
npm run validate:maintenance
```

Runs lint, architecture, production-smoke **governance** checks and unit tests.
It does not run published smoke, E2E, Next type generation or a build. The build
uses external fonts and can load local environment configuration; keep it out of
the cross-repository offline gate. This bounded PASS does not replace the existing
`verify` / `verify:full` release gates below. Unit tests use `envDir: false`.

The canonical [maintenance, backup and retention policy](https://github.com/qevaryn/kavtris-docs/blob/main/docs/governance/maintenance-and-validation.md)
defines the opt-in local orchestrator, monthly backup review and quarterly isolated
restore checks. Same-disk archives/GitHub sync are not complete backups. Preserve
unique work and verify hashes before destructive operations; never copy credentials
or profiles in generic maintenance. Local synthetic logs become review candidates
after 30 days, not automatic deletions; historical/incident evidence has no automatic
expiry. New CI diagnostic uploads expire after 7 days; preserve required sanitized
release/failure evidence before expiry. No paid service or new CI job is enabled.

Work only on `main`; review the diff, record exact validation commands/results,
run `git diff --check` and a redacted staged secret scan before commit/push.
No automatic update branches or deployment is authorized by maintenance.

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
