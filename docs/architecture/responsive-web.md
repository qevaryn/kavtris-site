# Responsive web strategy

Qevaryn Systems uses one responsive web frontend for desktop and mobile.

The project should not duplicate pages into separate desktop-web and mobile-web applications. Differences in spacing, grid columns and text wrapping should remain CSS-responsive inside shared components.

## Component classification

- Shared components are used across viewports with responsive classes.
- Mobile-specific components are justified only when the structure or interaction is specifically mobile, such as the mobile menu.
- Desktop-specific components are justified only when the desktop interaction is structurally different.
- Responsive orchestrators may select or arrange view-specific subcomponents when a single component would become unreadable or hard to maintain.

## Current approach

- Header and mobile menu are global layout components.
- Product catalog cards are shared responsive components.
- FieldOps keeps shared state in `FieldOpsExperience` and delegates product-specific presentation to desktop, mobile and responsive child components.
- Tabs, accordions and filters remain keyboard accessible and touch friendly.

## Current responsive ownership map

```text
src/components/layout
  Header, Footer, Logo, MobileMenu

src/components/shared
  reusable UI primitives

src/features/catalog/components
  shared/ProductCard
  responsive/ProductCatalogClient

src/features/products/fieldops/components
  desktop/FieldOpsManagementDashboard
  mobile/FieldOpsEmployeeMobileView
  responsive/FieldOpsExperience
  responsive/FieldOpsProcessWorkflow
```

## Backend principle

Desktop web, mobile web and any future native applications should use one shared backend/API boundary. Do not create separate APIs for desktop and mobile.
