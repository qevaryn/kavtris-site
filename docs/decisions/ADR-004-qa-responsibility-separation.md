# ADR-004: QA responsibility separation

Status: Accepted

See [../README.md](../README.md).

## Context

The test suite covers shared web behavior, desktop-specific behavior, mobile-specific behavior, API behavior, accessibility and visual audit artifacts.

## Decision

Separate tests by responsibility:

- web shared;
- web desktop;
- web mobile;
- API;
- accessibility;
- visual;
- shared infrastructure.

Keep Chromium desktop and Chromium mobile as the supported browser experiences for now.

## Consequences

- Shared tests do not run twice unless viewport behavior matters.
- Desktop and mobile QA ownership is clearer.
- API tests can validate request/response behavior without UI.

## Alternatives Considered

- Run every test in every project: rejected because it duplicates execution without improving coverage.
- Add Firefox/WebKit immediately: deferred to a later QA phase.
