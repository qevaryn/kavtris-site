# ADR-002: Shared backend/API boundary

Status: Accepted

See [../README.md](../README.md).

## Context

The contact API is currently implemented inside the Next.js application. Future clients may include responsive web, native mobile or internal tools.

## Decision

Use one shared backend/API boundary.

Do not create separate desktop, mobile or product-specific backends.

## Consequences

- Frontend clients should use the same public API contract.
- Provider details such as Resend stay behind server/service boundaries.
- Future backend extraction remains possible without redesigning frontend routes.

## Alternatives Considered

- Separate mobile backend: rejected because no native client or operational need justifies it.
- Immediate external API repository: rejected because the current backend scope is small.
