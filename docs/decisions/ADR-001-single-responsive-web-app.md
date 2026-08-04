# ADR-001: Single responsive web application

Status: Accepted

See [../README.md](../README.md).

## Context

The website must serve desktop and mobile web users with the same product journeys, routes and content.

## Decision

Keep one responsive Next.js web application.

Do not create separate desktop-web and mobile-web applications or routes.

## Consequences

- Shared routes and product data remain consistent.
- CSS handles ordinary layout differences.
- Mobile-specific components are used only when interaction or structure differs.
- QA separates desktop and mobile ownership without duplicating the application.

## Alternatives Considered

- Separate desktop and mobile web apps: rejected because it would duplicate pages, routing, QA and product rules.
