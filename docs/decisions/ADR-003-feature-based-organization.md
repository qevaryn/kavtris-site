# ADR-003: Feature-based organization

Status: Accepted

See [../README.md](../README.md).

## Context

The site contains homepage, catalog, product, enterprise, contact, network and legal responsibilities.

## Decision

Organize business-facing UI by feature, pure types by domain, server orchestration by server boundary and external integrations by service boundary.

## Consequences

- `src/app` remains thin.
- Feature teams can locate relevant UI quickly.
- Domain contracts remain independent from React and providers.
- Provider integrations can be extracted or replaced later.

## Alternatives Considered

- Large component folders by visual type only: rejected because it hides business ownership.
- Full domain-driven architecture: rejected as too heavy for the current scope.
