# ADR-005: Future repository extraction

Status: Accepted

See [../README.md](../README.md).

## Context

The repository may eventually need separate web, API, QA, UI or contract ownership. That operational need does not exist yet.

## Decision

Keep one repository for now.

Future extraction is conceptual and should happen only after justified triggers such as multiple clients, independent deployment needs, separate teams or backend operational complexity.

## Consequences

- Current work focuses on clean internal boundaries.
- No external repositories are created prematurely.
- Contracts and provider boundaries are prepared for future extraction.

## Alternatives Considered

- Split repositories now: rejected because it would add process overhead before ownership and deployment needs justify it.
