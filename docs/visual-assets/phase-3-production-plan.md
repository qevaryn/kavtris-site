# Product Visual Assets Phase 3 Production Plan

Status: Proposed plan from Product Visual Assets Phase 2
Audience: Product, design, frontend, QA and technical lead

This plan defines how future image production should proceed. It does not produce or replace assets.

## Objective

Produce and replace the six product visuals using the Phase 2 visual system without changing routes, product behavior or product positioning.

## Recommended Pilot

Use a controlled two-product pilot:

```text
1. KAVTRIS Ops
2. KAVTRIS FieldOps
```

Reason:

- KAVTRIS Ops is the weakest current asset and tests whether the system can make a generic product specific.
- FieldOps has the highest commercial impact and tests catalog/hero asset strategy.

Alternative:

- Ops-only pilot if review capacity is limited.
- FieldOps-only pilot is not recommended because it would improve the strongest asset before proving the system can fix the weakest one.

## Production Order

1. KAVTRIS Ops
2. KAVTRIS FieldOps
3. KAVTRIS KitchenSync
4. KAVTRIS Customer Portal
5. KAVTRIS Hotel Operations
6. KAVTRIS Stock & Orders

## Variant Strategy

For the pilot:

| Product | Variants | Required exports |
| --- | --- | --- |
| KAVTRIS Ops | 2-3 composition variants | `KAVTRIS-ops-catalog-v1.webp` after approval |
| KAVTRIS FieldOps | 2 catalog variants and 2 hero variants | `fieldops-catalog-v1.webp`, `fieldops-hero-v1.webp` after approval |

For remaining products:

- Produce 1-2 variants each after the pilot rules are validated.
- Do not generate many variants without review criteria; that slows decisions and creates inconsistency.

## Production Workflow

```text
Brief confirmation
→ interface mockup planning
→ composition generation/design
→ product accuracy review
→ visual family review
→ responsive crop review
→ export optimization
→ implementation branch
→ QA validation
→ PR
```

## Replacement Strategy

Recommended branch:

```text
design/product-assets-phase-3
```

Implementation rules:

- Add new approved assets first.
- Update product image paths only after approval.
- Keep old assets during the first replacement PR for rollback.
- Do not move brand, email, founder or legacy assets in the product replacement PR.
- Do not rename existing assets unless the migration is explicit and tested.

## Required Export Names

Pilot:

```text
public/images/products/KAVTRIS-ops/KAVTRIS-ops-catalog-v1.webp
public/images/products/fieldops/fieldops-catalog-v1.webp
public/images/products/fieldops/fieldops-hero-v1.webp
```

If directory migration is deferred, temporary compatibility paths may be used, but the final naming pattern should still be preserved.

## Generated Source Retention

Retain source references outside runtime assets when useful:

- design source file;
- generation prompt;
- negative prompt/constraints;
- approved export metadata;
- review notes.

Do not place raw experiments or rejected variants in `public/`.

## Rollback Strategy

Before replacing:

- Record current file paths and hashes.
- Keep old product asset files available until the PR is accepted.
- Ensure product data can revert to old paths in one commit.
- Do not delete old assets in the same PR as the first replacement unless explicitly approved.

## QA Validation

Minimum commands:

```text
npm run lint
npm run check:architecture
npm run typecheck
npm run test:unit
npm run build
CI=1 npm run test:e2e
git diff --check
```

Visual checks:

- Homepage featured products at desktop and 390 px.
- Catalog at desktop and 390 px.
- FieldOps page at desktop and 390 px if FieldOps changes.
- Natural dimensions for all visible product images.
- No horizontal overflow at 320 px.
- Card alignment at desktop.
- Alt text accuracy.
- Product honesty review.

## Acceptance Gates

Gate 1: Product brief compliance

- Does the image show the correct workflow?
- Does it avoid invented product claims?

Gate 2: Visual family compliance

- Does it match the KAVTRIS system?
- Is it distinct from other products?

Gate 3: Responsive crop

- Does it survive 320-430 px?
- Are key cues inside safe areas?

Gate 4: Technical integration

- Does it use accepted paths, formats and dimensions?
- Does it avoid layout changes?

Gate 5: Regression

- Do test suites pass?
- Did no unrelated file change?

## Phase 3 Deliverables

Recommended first PR deliverable:

- Replace KAVTRIS Ops catalog image.
- Add FieldOps catalog and hero images only if both pass review.
- Update image references and alt text only as needed to match the approved image.
- Document asset hashes and decisions.

If the FieldOps hero requires page code to use a separate hero image, keep that code change scoped and tested.

## Pilot Decision Log

### KAVTRIS Ops catalog visual

Status: Approved for pilot integration.

Approved asset:

```text
public/images/products/KAVTRIS-ops/KAVTRIS-ops-catalog-v1.webp
```

Metadata:

```text
Format: WebP
Dimensions: 1920x1200
Aspect ratio: 16:10
Size: 101868 bytes
Color: sRGB
SHA256: BA7A50306D038B4A776594384EDCFEF3A5D4DA70FB5D7D32FA406A626863A7EA
```

Decision:

- Use the approved KAVTRIS Ops visual for catalog and generic product-page contexts.
- Keep the previous `public/images/products/KAVTRIS-ops.webp` asset available for rollback during the pilot.
- Update the alt text to reflect approvals, responsible people, deadlines, recent documents and approval flow.
- Do not integrate rejected previews, comparison images or temporary review artifacts.

Reason:

- The approved visual communicates internal processes, approvals, documents, responsible people and deadlines more clearly than the previous generic dashboard image.
- The composition remains software-first and follows the Phase 2 navy, gold and white product visual system.
- The 16:10 export aligns with the existing product-card rendering without requiring layout changes.

Next gate:

- Produce and review the KAVTRIS FieldOps catalog proposals before replacing additional product visuals.

### KAVTRIS FieldOps catalog visual

Status: Approved for controlled pilot integration.

Approved catalog asset:

```text
public/images/products/fieldops/fieldops-catalog-v1.webp
```

Metadata:

```text
Format: WebP
Dimensions: 1920x1200
Aspect ratio: 16:10
Size: 106650 bytes
Color: sRGB
SHA256: 159ADEA316CAA44E573CDA6871D1268A74AF69DC738D66C95FE576022FFBFDD2
```

Catalog versus hero ownership:

- Product cards use the approved catalog asset.
- The existing `public/images/products/KAVTRIS-fieldops.webp` asset remains active for the `/produtos/fieldops` hero.
- The existing asset is also retained for rollback during the pilot.
- A dedicated FieldOps hero asset is still pending and must not be marked complete in this phase.

Decision:

- Use the approved FieldOps catalog visual for homepage and catalog card contexts.
- Keep the current FieldOps hero stable until the separate hero asset is produced and reviewed.
- Do not integrate rejected previews, comparison images or temporary review artifacts.

Reason:

- The approved visual communicates external services, visits, locations, assigned professionals, check-in, checklist progress, evidence and service completion.
- It remains visually consistent with the approved KAVTRIS Ops catalog asset while staying clearly distinct from Ops, which communicates internal approvals, documents and business processes.
- The removed QR/NFC floating card keeps the catalog composition cleaner and avoids overemphasizing optional equipment.

Next gate:

- Produce the dedicated FieldOps hero using the environmental/commercial direction only after this catalog integration is validated.

## Explicit Non-Goals

Phase 3 should not:

- create new product pages;
- add Care/Fleet/Printing/Cleaning concepts;
- change product copy;
- redesign catalog or FieldOps layouts;
- alter contact flows;
- replace brand or email assets;
- remove legacy assets;
- add new dependencies.
