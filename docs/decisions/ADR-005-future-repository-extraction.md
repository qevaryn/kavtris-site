# ADR-005: Future repository extraction

Status: Accepted

See [../README.md](../README.md).

## Context

The repository may eventually need separate web, API, QA, UI or contract ownership. That operational need does not exist yet.

## Decision

Keep one repository for now.

Future extraction is conceptual and should happen only after justified triggers such as multiple clients, independent deployment needs, separate teams or backend operational complexity.

The current repository remains the source of truth until an extraction decision is approved.

Desktop and mobile web must not be extracted into separate repositories. They remain one responsive web application.

Repository-to-repository integration should happen through versioned APIs, shared contracts, compatible packages and pipelines. It should not happen through periodic manual code copying.

## Consequences

- Current work focuses on clean internal boundaries.
- No external repositories are created prematurely.
- Contracts and provider boundaries are prepared for future extraction.
- Future repositories need explicit ownership, compatibility tests and release coordination.

## Alternatives Considered

- Split repositories now: rejected because it would add process overhead before ownership and deployment needs justify it.
