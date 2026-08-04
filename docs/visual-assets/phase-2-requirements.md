# Product Visual System Requirements For Phase 2

Status: Draft requirements from Product Visual Assets Phase 1
Audience: Product, design, frontend, QA and technical lead

This document defines the questions and constraints Visual Phase 2 must resolve before any new product image is generated or substituted.

## Decisions Required In Visual Phase 2

| Requirement | Decision needed | Audit finding that makes it necessary |
| --- | --- | --- |
| Master aspect ratio | Confirm one master ratio, likely 16:10 for catalog and product hero compatibility. | Current rendering containers use 16:10; one product asset has a slightly different ratio. |
| Product-card crop | Define safe focal zones for card cropping. | `object-cover` is used in cards; edge content can be cropped. |
| Hero crop | Decide whether FieldOps and future deep products need separate hero-grade assets. | FieldOps image is reused in homepage, catalog and hero. |
| Device composition | Decide default laptop/desktop + phone/tablet balance. | Most current images use laptop plus mobile; this is coherent but can become repetitive. |
| Desktop/mobile balance | Define when mobile view is essential in the image. | The site sells web/mobile software; small mockup text is not readable on mobile cards. |
| Background system | Define sector context rules without stock-photo feeling. | KitchenSync and Hotel benefit from context, but context can compete with software. |
| Lighting system | Preserve premium navy/gold lighting with enough interface contrast. | Current set is visually coherent and should not become a one-off collection. |
| Perspective | Choose a consistent camera angle and device depth. | Current set is mostly consistent; future replacements should preserve family identity. |
| Interface detail level | Use large, readable UI blocks instead of tiny text. | Current mockup text is too small to carry meaning in mobile cards. |
| Typography inside mockups | Treat mockup text as illustrative, not critical information. | Accessibility and mobile readability depend on page copy and alt text, not tiny embedded text. |
| Navy/gold usage | Keep navy, gold and white as system anchors. | Current brand consistency is one of the strongest qualities. |
| Logo presence | Decide whether Qevaryn branding appears inside product UI, subtly and consistently. | Current images feel like a product ecosystem but product names are mostly handled outside the image. |
| Product-name presence | Decide if product names appear in images or remain card/page text only. | Product-card labels already name products; embedded text could become unreadable. |
| Hardware representation | Define simple-equipment-only rule by product. | FieldOps/Stock/Kitchen use optional devices; future visuals must not imply proprietary hardware. |
| Data realism | Use privacy-safe fictional interface data. | Customer Portal and FieldOps could otherwise imply real customer/service data. |
| Consistency across products | Create one image system before replacing files. | Several current assets are coherent; replacing one by one could reduce consistency. |
| Export sizes | Define source and web delivery dimensions. | Current product images are around 1586x992 and 84-116 KB. |
| WebP/AVIF/PNG rules | Confirm preferred formats per asset type. | Product assets use WebP; brand/email assets require PNG/transparency/email compatibility. |
| Mobile-safe focal areas | Define central-safe composition for 320-430 px. | Cards stack on mobile and preserve 16:10, but interface details shrink. |

## Software-First Visual Rules

Future product images must show Qevaryn as a software provider first.

Allowed supporting equipment:

- smartphone;
- tablet;
- QR Code;
- NFC tag;
- barcode scanner;
- standard printer;
- small GPS tracker;
- smartwatch;
- camera;
- simple sensor.

Rules:

- Hardware must be secondary to the software interface.
- Hardware must look easy to source and replace.
- Hardware must not look manufactured by Qevaryn.
- Do not show large machines, industrial lines, custom kiosks, robots, complex clinical devices or expensive proprietary hardware as Qevaryn products.

## Product-Specific Honesty Rules

| Product | Avoid implying |
| --- | --- |
| FieldOps | Permanent surveillance, proprietary tracking hardware, guaranteed real-time monitoring. |
| Stock & Orders | Full ERP replacement, guaranteed inventory accuracy, proprietary stock terminals. |
| Hotel Operations | Integration with every PMS by default, guaranteed room-status automation. |
| KitchenSync | Qevaryn-made kitchen machines, restaurant hardware manufacturing, guaranteed real-time kitchen system. |
| Qevaryn Ops | Enterprise platform availability as a finished SaaS, guaranteed scalability or certifications. |
| Customer Portal | Real customer data, app-store availability, fixed payment capability unless scoped. |

## Preliminary Naming Convention

Future convention:

```text
product-slug-context-v1.ext
```

Examples:

```text
fieldops-catalog-v1.webp
fieldops-hero-v1.webp
stock-orders-catalog-v1.webp
customer-portal-catalog-v1.webp
```

Rules:

- Use product slugs already used by routes/data.
- Use lowercase kebab-case.
- Include context only when different assets are genuinely needed.
- Include a simple version suffix for controlled replacement.
- Do not use spaces, dates, mixed language or vague names such as `new-image-final.webp`.

Separate catalog and hero assets are likely justified first for FieldOps because it is both a catalog product and the model product page. They are not automatically justified for every product.

## Future Directory Proposal

Do not create this structure until a later implementation phase.

```text
public/images/
├── brand/
├── products/
│   ├── fieldops/
│   ├── stock-orders/
│   ├── hotel-operations/
│   ├── kitchen-sync/
│   ├── qevaryn-ops/
│   └── customer-portal/
├── people/
├── email/
├── institutional/
└── legacy/
```

Migration notes:

- Moving assets changes paths and therefore must be coordinated with product data, email integration and visual tests.
- Email assets should move only if the email code and tests are updated in the same controlled phase.
- Legacy assets should not move during product visual replacement unless the legacy cleanup plan is active.
- A future migration should preserve redirects or compatibility only if public asset URLs are considered stable.

## Visual QA Requirements

Use the existing QA architecture.

Recommended checks for future replacement:

- Product image loads successfully.
- Natural dimensions are greater than zero.
- Aspect ratio remains stable in catalog cards.
- No page-level horizontal overflow at 320 px.
- Key focal areas survive 320, 390, 768 and 1440 px.
- Product cards remain aligned on desktop.
- Product cards do not become excessively tall on mobile.
- FieldOps hero image remains readable and does not cause layout shift.
- Product alt text remains meaningful after replacement.
- Hardware remains simple and secondary.
- Screenshots are generated as manual review artifacts where useful, not treated as certified visual regression unless baselines are introduced.

Suggested future coverage locations:

```text
tests/visual/shared/
tests/web-desktop/
tests/web-mobile/
tests/accessibility/
```

Do not add heavy screenshot baselines for every viewport unless the team is ready to maintain them.

## Recommended Visual Phase 2 Scope

Visual Phase 2 should define the visual system only. It should not replace assets yet.

Deliverables:

- One master product image specification.
- Rules for catalog and hero crops.
- Device and optional hardware rules.
- Interface mockup density rules.
- Privacy-safe data rules.
- Product-by-product composition brief.
- Export and format requirements.
- QA checklist for Visual Phase 3 replacement.
