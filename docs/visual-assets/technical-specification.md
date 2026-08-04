# Product Visual Technical Specification

Status: Product Visual Assets Phase 2 specification
Audience: Design, frontend, QA and technical lead

This specification defines how future product assets should be produced and validated. It does not change current files.

## Current Rendering Baseline

Confirmed from the application:

| Context | Ratio | Mechanism | Sizes | Loading |
| --- | --- | --- | --- | --- |
| Homepage featured products | 16:10 | `next/image` with `fill` and `object-cover` | `(min-width: 1280px) 270px, (min-width: 768px) 50vw, 100vw` | Lazy |
| Catalog product cards | 16:10 | `next/image` with `fill` and `object-cover` | `(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw` | Lazy |
| FieldOps hero | 16:10 | `next/image` with `fill`, `object-cover`, `priority` | `(min-width: 1024px) 46vw, 92vw` | Priority |

## Product-Card Specification

Applies to:

- Homepage featured product cards.
- Catalog product cards.

Master ratio:

```text
16:10
```

Recommended source size:

```text
1920x1200
```

Minimum acceptable source size:

```text
1600x1000
```

Safe composition:

- Primary interface should sit within the central 70% width and 76% height.
- Secondary phone/tablet should remain within the central 85% width.
- Do not place the only product-specific cue in the outer 8% of any edge.
- Leave bottom area resilient to the catalog overlay currently used by the card.
- Preserve enough background margin to survive minor crop/scale changes.

Text inside image:

- Product names should not be required inside the asset.
- Interface headings may appear but must not carry the whole meaning.
- Marketing claims should not appear inside the image.
- Tiny rows can exist as visual texture only.

Logo inside image:

- Default: no external logo overlay.
- Allowed: small Qevaryn wordmark or symbol inside interface chrome.
- Avoid repeating branding already present in card/page HTML.

## Product-Page Hero Specification

Asset strategy:

| Asset type | Default decision | Reason |
| --- | --- | --- |
| Catalog asset | Required for each product | Current catalog depends on all six product visuals. |
| Hero asset | Required for FieldOps and future deep product pages when the catalog crop is not strong enough | Hero has larger commercial impact and above-fold use. |
| Detail asset | Optional only when it explains a specific workflow not covered by in-page UI | Avoid unnecessary image sprawl. |

FieldOps decision:

```text
FieldOps should receive both a catalog asset and a hero asset in production.
```

Reason:

FieldOps appears in homepage, catalog and the product-page hero. A single image can work technically, but a hero-grade composition can better support the product page without forcing catalog compromises.

Generic products:

- For products without deep pages, one catalog-ready asset is enough initially.
- If a product later receives a detailed page, decide whether a hero export is needed at that time.

## Responsive Safe Areas

| Viewport | Rule |
| --- | --- |
| 320px | Primary interface must remain recognizable; no critical cue at edges; phone/tablet must not be the only visible product clue. |
| 375px | Card image should show device hierarchy and one product-specific workflow cue. |
| 390px | This is the main mobile review width; product purpose must be identifiable without reading tiny text. |
| 430px | Secondary hardware/phone may appear, but software remains dominant. |
| 768px | Two-column/tablet contexts should keep cards aligned and crop stable. |
| 1024px | Hero/detail layouts should preserve visual balance with text. |
| 1440px | Desktop catalog cards should look consistent and not under-detailed. |

Dedicated mobile crop:

- Not required by default.
- Justified only if a single 16:10 asset cannot preserve product meaning at 320-430 px.
- Must not introduce a separate product concept, route, or UI truth.

## Interface Detail Standard

Each product visual should communicate:

- navigation structure;
- primary workflow;
- one to three key status/metric areas;
- relationship between manager, worker, customer or team where relevant;
- desktop/mobile relationship when relevant.

Recommended limits:

| Element | Standard |
| --- | --- |
| Primary dashboard panels | 3-5 visible panels |
| Primary metrics | 2-4 metrics |
| Table/list rows | 4-6 visible rows |
| Chart complexity | Simple bar, status board, donut or sparkline only |
| Workflow markers | 3-6 clear states |
| Status colours | Gold plus green/red/blue only when meaningful |
| Icon style | Simple line icons consistent with SaaS UI |
| Text dependency | Low; purpose must survive if text is unreadable |

Avoid:

- Full spreadsheets.
- Dense analytics dashboards.
- Technical architecture diagrams.
- Large code blocks or developer dashboards.
- Claims such as "real-time", "certified", "guaranteed" unless page copy supports them.

## Data And Privacy Standard

Default language:

```text
Portuguese
```

Allowed data:

- fictional customers such as `Cliente A`, `Cliente B`;
- fictional locations such as `Loja Norte`, `Armazem 2`, `Quarto 204`;
- synthetic IDs such as `Pedido #1482`, `OS-2047`, `PO-0031`;
- non-sensitive metrics such as counts, statuses and generic deadlines;
- generic employee roles such as `Supervisor`, `Tecnico`, `Equipa`.

Avoid:

- real personal names;
- real companies;
- real phone numbers;
- real emails;
- real addresses;
- credentials;
- recognizable customer logos;
- health/clinical data;
- payment-card data.

Language exceptions:

- The Qevaryn wordmark remains as brand text.
- Very small neutral UI chrome can use language-neutral placeholders if text rendering is unreliable.

## Hardware Representation

Principle:

```text
The product is Qevaryn software operating with compatible equipment.
```

Allowed hardware by product:

| Product | Allowed hardware/context |
| --- | --- |
| FieldOps | smartphone, tablet, QR Code, NFC tag |
| Stock & Orders | barcode scanner, barcode label, standard printer, tablet |
| Hotel Operations | tablet, phone, room/status device only as generic existing equipment |
| KitchenSync | tablet, kitchen display, standard printer, phone |
| Qevaryn Ops | laptop, desktop, phone/tablet for alerts only |
| Customer Portal | laptop, phone/tablet |

Rules:

- Hardware must be ordinary and unbranded.
- Hardware should be physically smaller or visually less important than the software.
- Do not show manufacturing, leasing, financing or ownership implications.
- Do not show third-party logos or proprietary branded devices.

## Format And Export Specification

Recommended future export defaults:

| Asset type | Format | Dimensions | Target weight | Notes |
| --- | --- | ---: | ---: | --- |
| Product catalog | WebP | 1920x1200 | 140-220 KB | Balance detail and performance. |
| Product hero | WebP | 2400x1500 | 220-360 KB | Only for above-fold/deep product use. |
| Optional high-density source | PNG or lossless design source | Larger source-controlled design file | Not web-delivered | Store outside `public/` if needed. |
| Brand transparent | PNG | Existing or revised per brand need | Case-by-case | Preserve alpha. |
| Email logo | PNG | Email-safe dimensions | Case-by-case | Validate email clients/provider. |

AVIF:

- May be evaluated later for product assets.
- Do not require AVIF until browser/Next delivery and visual quality are validated.

SVG:

- Suitable for vector logos/icons only when the source is reliable.
- Not suitable for generated product mockup scenes.

Colour and metadata:

- Use sRGB.
- Remove nonessential metadata from web exports.
- Preserve enough quality for interface edges and device clarity.

## Naming Convention

Final pattern:

```text
product-slug-context-v{number}.ext
```

Valid product slugs:

- `fieldops`
- `stock-orders`
- `hotel-operations`
- `kitchen-sync`
- `qevaryn-ops`
- `customer-portal`

Valid contexts:

- `catalog`
- `hero`
- `detail`
- `source`

Examples:

```text
fieldops-catalog-v1.webp
fieldops-hero-v1.webp
qevaryn-ops-catalog-v1.webp
customer-portal-catalog-v1.webp
```

Rules:

- Use lowercase kebab-case.
- Do not include spaces, dates, "final", "new", or generator names.
- Do not include dimensions unless multiple same-context size exports are intentionally used.
- Retired assets should move only in a later cleanup or migration phase.
- Temporary files should not be committed to `public/`.

## Future Directory Structure

Target structure, not implemented in this phase:

```text
public/images/
├── brand/
├── products/
│   ├── fieldops/
│   │   ├── fieldops-catalog-v1.webp
│   │   └── fieldops-hero-v1.webp
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

Migration rules:

- Move assets only in a dedicated implementation phase.
- Update product data and tests in the same commit as path changes.
- Keep email assets separate and validate email output.
- Keep legacy assets retained until the legacy policy approves deletion or archival.
- Preserve rollback by keeping old assets until replacements are approved.

## Asset Integrity Requirements

For any future replacement phase:

- Record pre-change asset hashes.
- Add new assets before removing old references.
- Validate `next/image` natural dimensions.
- Validate no horizontal overflow at 320 px.
- Confirm product alt text still matches the replacement image.
- Run visual QA screenshots for manual review.
- Do not remove original assets until the replacement is approved and rollback strategy is defined.
