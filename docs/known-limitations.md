# Known limitations

Status: Current
Audience: All contributors

See [README.md](README.md).

This document lists confirmed limitations and investigation items. It does not describe unconfirmed issues as product defects.

## Product And Visuals

- The current KAVTRIS FieldOps visual asset can be improved later without changing page architecture.
- Product pages describe adaptable solution concepts, not completed production SaaS platforms.

## Backend

- The contact rate limiter is process-local and in-memory.
- There is no database.
- There is no authentication.
- There is no queue.
- There is no external backend repository.
- There is no separate desktop or mobile backend.

## QA

- Firefox and WebKit coverage are not currently part of CI.
- Native mobile application testing is not implemented.
- There is no certified WCAG audit.
- Visual tests generate audit artifacts and asset checks, but there is no full visual-regression baseline system.

## Repository

- Legacy components remain preserved for later review.
- Future repository extraction is conceptual and not active.

## Hydration Warning Investigation

An intermittent React hydration warning involving `caret-color: transparent` has been observed during desktop Playwright runs around the homepage contact form.

Current status:

- observed in desktop test output;
- non-deterministic;
- does not currently fail lint, typecheck, build or tests;
- no confirmed user-visible failure;
- no speculative CSS correction has been applied.

Phase 8 investigation result:

- the warning appeared during first-run desktop Playwright execution;
- no application source currently defines `caret-color: transparent`;
- mobile, API and complete E2E validation passed;
- no user-visible failure was confirmed;
- no speculative CSS correction was applied.

See [investigations/hydration-caret-color.md](investigations/hydration-caret-color.md).
