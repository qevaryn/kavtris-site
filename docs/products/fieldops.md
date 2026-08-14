# Qevaryn FieldOps implementation guide

Status: Current
Audience: Frontend, QA and Product

See [../README.md](../README.md).

This document explains the code feature. It is not product marketing copy.

## Route

```text
/produtos/fieldops
```

The route is served through:

```text
src/app/produtos/[slug]/page.tsx
```

The dynamic route keeps metadata, static params and the FieldOps special case. The FieldOps page implementation lives under:

```text
src/features/products/fieldops/
```

## Main Entry

```text
src/features/products/fieldops/FieldOpsPage.tsx
```

This component composes:

- hero;
- level configurator;
- evolution by phases;
- sector adaptation;
- visual demonstration;
- optional equipment;
- technical details;
- final CTA.

## Data Ownership

FieldOps-specific content lives in:

```text
src/features/products/fieldops/data/fieldops.ts
```

The product record itself is not duplicated. Product catalog and route data come from:

```text
src/features/products/data/products.ts
```

## Page-level State

```text
src/features/products/fieldops/FieldOpsPage.tsx
```

This component owns shared state:

- selected product level;
- selected sector;

State stays at the page-level common owner so adaptation, demonstration and CTAs do not duplicate business rules.

## Responsive Sections

```text
src/features/products/fieldops/components/responsive/FieldOpsSectorAdaptation.tsx
src/features/products/fieldops/components/responsive/FieldOpsDemonstration.tsx
```

`FieldOpsSectorAdaptation` owns the sector tabs and sector-specific adaptation presentation.

`FieldOpsDemonstration` owns the visual demonstration tabs for management, team and process views while reading the page-level product level and sector.

## Desktop-specific Product Demonstration

```text
src/features/products/fieldops/components/desktop/FieldOpsManagementDashboard.tsx
```

This is desktop-specific because it represents a manager dashboard/productivity view. It is not a separate desktop page.

## Employee Mobile Product View

```text
src/features/products/fieldops/components/mobile/FieldOpsEmployeeMobileView.tsx
```

The word `mobile` describes the product interface being demonstrated for the field employee. It does not detect whether the website visitor is on a mobile device.

## Process Workflow

```text
src/features/products/fieldops/components/responsive/FieldOpsProcessWorkflow.tsx
```

This is a responsive composition of the service process.

## Tests

Relevant tests:

```text
tests/web-shared/fieldops.spec.ts
tests/web-mobile/fieldops-mobile.spec.ts
```

These validate tabs, sector selection, level synchronization, accordions, CTAs and mobile overflow.

## Contact Integration

FieldOps CTAs should preserve:

```text
?produto=fieldops#contacto
```

The contact feature resolves this through:

```text
src/features/contact/utils/resolveContactIntent.ts
```

## Known Limitation

The current FieldOps visual asset is structurally supported but may be replaced by a stronger product image later.
