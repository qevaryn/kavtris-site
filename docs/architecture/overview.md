# Architecture overview

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
src/components
```

Shared UI primitives and global layout components only.

## Current feature areas

- `home`: homepage composition and homepage-only interactions.
- `catalog`: `/produtos` discovery experience.
- `products`: product data, generic product page and FieldOps-specific presentation.
- `enterprise`: `/empresas` page and enterprise preview content.
- `contact`: contact form UI and query-parameter intent resolution.
- `legacy`: retained components from earlier homepage versions, not part of current route composition.

## Route principle

Route files should remain thin. They may define metadata, static params and Next.js-specific behavior, then render a feature-level page view.

Future repository extraction is not active. The current goal is clear ownership inside one repository.
