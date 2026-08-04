# Architecture overview

Status: Current
Audience: Frontend, Backend, QA and Technical Lead

The project is one responsive Next.js application.

Desktop web and mobile web are not separate applications. Route files stay in `src/app`, while business-facing UI is grouped under `src/features`.

## Main boundaries

```text
src/app
```

Next.js route files, route handlers, metadata, layouts and global styles.

```text
src/features
```

Feature-level page views, components, data and client-side controllers.

```text
src/domain
```

Pure contracts and types. Domain files must not import React, browser APIs or Next.js components.

```text
src/server
```

Server-side orchestration used by route handlers.

```text
src/services
```

External provider integrations such as email delivery.

```text
src/config
```

Runtime configuration helpers. Configuration files must not expose secrets.

```text
src/components
```

Shared UI primitives and global layout components only.

```text
tests
```

Playwright and shared QA infrastructure grouped by responsibility.

```text
docs
```

Architecture, QA, development and decision records.

## Current feature areas

- `home`: homepage composition and homepage-only interactions.
- `catalog`: `/produtos` discovery experience.
- `products`: product data, generic product page and FieldOps-specific presentation.
- `enterprise`: `/empresas` page and enterprise preview content.
- `contact`: contact form UI and query-parameter intent resolution.
- `legacy`: retained components from earlier homepage versions, not part of current route composition.

## Route principle

Route files should remain thin. They may define metadata, static params and Next.js-specific behavior, then render a feature-level page view.

## Dependency direction

```text
src/app
-> src/features
-> src/domain
-> src/server
-> src/services
```

This is not a strict import chain for every file, but it describes ownership:

- route wrappers import feature entry points;
- features import domain contracts and shared UI;
- domain contracts do not import React, Next.js, server code or provider integrations;
- server modules may import domain contracts and provider interfaces;
- provider implementations stay at the outer boundary.

Future repository extraction is not active. The current goal is clear ownership inside one repository.

See [../README.md](../README.md).
