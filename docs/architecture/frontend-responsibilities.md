# Frontend responsibilities

The project remains one responsive Next.js web application.

Desktop web and mobile web are ownership areas inside the same frontend, not separate applications, routes or backends.

## Categories

### Global layout

Global layout components live in `src/components/layout`.

- `Header`: shared layout.
- `Footer`: shared layout.
- `Logo`: shared brand/layout component.
- `MobileMenu`: mobile-specific layout because overlay behavior, Escape handling, focus return and body scroll differ from desktop navigation.

### Shared UI

Domain-neutral primitives live in `src/components/shared`.

Examples:

- `Button`
- `SectionHeading`
- `IconCard`
- `Tag`

Feature-specific cards, forms and product demonstrations must not move into global shared UI.

### Feature-specific responsive components

Most feature components stay as one responsive component when the differences are spacing, columns, text size, button stacking or flex order.

Examples kept unsplit:

- homepage sections;
- enterprise page sections;
- contact form;
- generic product page;
- catalog cards.

### Responsive orchestrators

A responsive orchestrator owns shared state and delegates presentation when interaction or information structure differs.

Current examples:

- `ProductCatalogClient`: owns catalog filter state and renders responsive catalog content.
- `FieldOpsExperience`: owns FieldOps tab, sector and configuration state.

### Desktop-specific components

Desktop-specific components are justified when they represent a large-screen or productivity-oriented product interface.

Current example:

- `FieldOpsManagementDashboard`: demonstrates the manager dashboard view inside FieldOps.

### Mobile-specific components

Mobile-specific components are justified when their structure or interaction exists because of mobile behavior or because the product demonstration itself is a mobile interface.

Current examples:

- `MobileMenu`: mobile browser navigation overlay.
- `FieldOpsEmployeeMobileView`: product demonstration of the employee mobile experience, not viewport detection.

## Separation rules

Keep one component for:

- different spacing;
- different columns;
- different text size;
- different button stacking;
- different flex order.

Consider separation for:

- different interaction;
- different information hierarchy;
- different component structure;
- mobile overlay/focus behavior;
- product demonstrations that intentionally represent different devices or users.

## Prohibited direction

Do not create:

- duplicated desktop/mobile pages;
- duplicated desktop/mobile routes;
- user-agent device detection;
- separate desktop/mobile APIs;
- native mobile code inside this repository.
