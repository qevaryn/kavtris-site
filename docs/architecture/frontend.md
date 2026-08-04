# Frontend architecture

Status: Current
Audience: Frontend and Technical Lead

The frontend is one responsive Next.js application. Routes are owned by `src/app`; business-facing implementation is owned by `src/features`.

See [../README.md](../README.md).

## Route wrappers

Route files stay thin.

Examples:

```text
src/app/page.tsx
src/app/produtos/page.tsx
src/app/produtos/[slug]/page.tsx
src/app/empresas/page.tsx
```

Route files may own Next.js behavior such as metadata, `generateStaticParams`, `notFound` and route handlers. Large JSX composition should live in feature page views.

## Feature page views

Feature page views compose the actual screen.

Examples:

```text
src/features/home/HomePageView.tsx
src/features/catalog/CatalogPageView.tsx
src/features/products/generic/GenericProductPage.tsx
src/features/products/fieldops/FieldOpsPage.tsx
src/features/enterprise/EnterprisePageView.tsx
```

## Components

Use this decision guide:

```text
Used only by one feature?
-> src/features/<feature>

Reusable and domain-neutral?
-> src/components/shared

Global navigation or layout?
-> src/components/layout

Pure business type or contract?
-> src/domain

Server orchestration?
-> src/server

External provider?
-> src/services
```

Do not move feature-specific cards, product demos or forms into `src/components/shared`.

## Client and Server Components

Use Client Components only for browser interaction:

- forms;
- tabs;
- accordions when interactive;
- mobile menu;
- filters and selectors.

Server-rendered components are preferred for static content.

Client Components must not import `src/server` or provider implementations.

## Public feature exports

Feature entry points may export a small public API through `index.ts` when useful. Avoid broad barrel exports that expose internals or create circular dependencies.

Routes should import feature page views or deliberate public exports, not internal desktop/mobile child components.

## Responsive ownership

Do not create separate desktop and mobile page trees. See:

- [responsive-web.md](responsive-web.md)
- [frontend-responsibilities.md](frontend-responsibilities.md)
