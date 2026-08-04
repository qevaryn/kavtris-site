# Product Visual Review And Acceptance

Status: Product Visual Assets Phase 2 specification
Audience: Product, design, frontend, QA, accessibility and technical lead

This document defines how future product assets should be reviewed before they are committed.

## Review Sequence

Use this order:

```text
Product accuracy
→ visual-system compliance
→ honesty review
→ responsive crop review
→ accessibility review
→ performance review
→ final approval
```

Do not skip product accuracy because an image looks polished.

## Role Responsibilities

| Role | Responsibility |
| --- | --- |
| Product | Confirms the visual matches current product descriptions and does not invent unsupported functions. |
| Design | Confirms composition, family consistency, visual quality, device hierarchy and brand treatment. |
| Frontend | Confirms dimensions, file format, paths, `next/image` behavior and rollback strategy. |
| QA | Confirms route impact, responsive behavior, image loading and regression coverage. |
| Accessibility | Confirms alt-text implications and that important information is not only embedded in the image. |
| Technical Lead | Confirms scope, honesty, architecture impact and merge readiness. |

## Acceptance Criteria

Each future asset must satisfy these criteria before replacement.

### Product Meaning

- The product purpose is understandable at catalog-card size.
- The image communicates at least one product-specific workflow cue.
- The image does not look interchangeable with another Qevaryn product.
- The visual matches the current `products.ts` description, features and optional equipment.

### Visual System

- The asset belongs to the same Qevaryn product family.
- Navy, gold and white are used consistently and with restraint.
- Software interface is the main subject.
- Optional context supports the product without becoming the subject.
- Product names and marketing messages do not need to be embedded in the image.

### Honesty

- No fake customer logos, testimonials, certifications or app-store badges.
- No fixed prices, fixed implementation times or guaranteed outcomes.
- No proprietary hardware manufacturing implication.
- No clinical, emergency, industrial or real-time claim outside current copy.
- No real customer or personal data.

### Responsive Crop

- At 320 px, the primary interface remains identifiable.
- At 390 px, product purpose remains understandable without tiny text.
- At 768 px, cards remain balanced and aligned.
- At 1440 px, the asset does not look under-detailed or over-cropped.
- No key cue is placed in the outer crop-risk area.

### Accessibility

- Alt text can describe the new image accurately without becoming long or promotional.
- Any important information in the image is also present in surrounding copy or product data.
- Decorative background elements do not need alt text.
- Images do not use colour as the only way to distinguish critical states.

### Performance

- Product catalog asset target: 140-220 KB.
- Product hero asset target: 220-360 KB.
- File size may exceed target only when interface clarity would otherwise degrade.
- Image has stable dimensions and no layout-shift risk in current containers.
- Asset loads successfully in visual QA.

## Rejection Criteria

Reject an asset when:

- It looks like a generic dashboard with no product-specific cue.
- Hardware is larger or more important than the software.
- The image contains unsupported claims or real customer-looking data.
- The image breaks the navy/gold family.
- Important UI is cut off at mobile card sizes.
- The image requires code/layout changes to become acceptable.
- The asset is much heavier than necessary without visual benefit.

## QA Checklist For Future Replacement

Use the current QA architecture.

Suggested checks:

```text
npm run lint
npm run check:architecture
npm run typecheck
npm run test:unit
npm run build
CI=1 npm run test:e2e
git diff --check
```

Visual-specific checks:

- Compare before/after screenshots for homepage featured products.
- Compare before/after screenshots for `/produtos`.
- Compare before/after screenshots for `/produtos/fieldops` if FieldOps changes.
- Verify all product images have non-zero natural dimensions.
- Verify no horizontal overflow at 320 px.
- Verify catalog cards remain aligned on desktop.
- Verify mobile cards do not become excessively tall.
- Verify alt text still matches the image.

## Review Artifacts

Allowed future artifacts:

- source design file reference;
- final exported image;
- before/after screenshots;
- responsive crop screenshots;
- asset hash list;
- review notes.

Artifacts should not be committed unless they are part of the agreed source or documentation plan.

## Generation Versus Design Decision

Acceptable future production methods:

| Method | Strengths | Risks | Controls |
| --- | --- | --- | --- |
| Manually designed UI mockup | Best control over product accuracy and text clarity | Slower; may need design skill | Use briefs and acceptance criteria |
| AI-generated composition | Fast exploration, strong environmental polish | Text errors, unsupported details, inconsistent UI | Use only after mockup brief; review strictly |
| 3D device rendering | Consistent device frames and perspective | Can become generic or time-consuming | Keep software screens product-specific |
| Hybrid workflow | Best balance: controlled UI plus polished scene | Requires disciplined review | Recommended approach |

Recommended approach:

```text
designed interface mockup
+ controlled device composition
+ AI or manual environmental enhancement
```

AI generation should not be mandatory or trusted as the source of product truth. Product truth comes from `products.ts`, FieldOps documentation and approved briefs.

## Approval Record

For each replacement in Visual Phase 3, record:

- product;
- asset path;
- source method;
- reviewer roles;
- accepted crop contexts;
- known limitations;
- rollback file/path;
- validation commands.
