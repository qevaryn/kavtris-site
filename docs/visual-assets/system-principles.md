# Product Visual System Principles

Status: Product Visual Assets Phase 2 specification
Audience: Product, design, frontend, QA and technical lead

These principles define how KAVTRIS product visuals should be planned before production. They apply to the six current product concepts only:

- KAVTRIS FieldOps
- KAVTRIS Stock & Orders
- KAVTRIS Hotel Operations
- KAVTRIS KitchenSync
- KAVTRIS Ops
- KAVTRIS Customer Portal

No image is generated or replaced by this document.

## Phase 1 Findings Accepted

Confirmed findings from Phase 1:

- KAVTRIS FieldOps is the strongest current asset and the highest-impact asset because it appears in homepage, catalog and the main detailed product page.
- KAVTRIS Ops is the weakest current asset because it is polished but too generic.
- Stock & Orders is comparatively strong but has a slightly different source aspect ratio.
- KitchenSync is clear by sector but risks becoming too hardware/context-heavy.
- Customer Portal communicates useful functions but must be differentiated from KAVTRIS Ops.
- Product visuals must not rely on tiny interface text, especially in mobile cards.
- Product images should preserve the current honest positioning: concepts are adaptable and scoped after discovery.

## Principles

### 1. Software First

Rule:

The main subject of every product visual must be the software interface.

Reason:

KAVTRIS sells adaptable software solutions, not hardware, machinery or fixed physical products.

Practical consequence:

The largest, brightest and clearest element should be a dashboard, portal, tablet app or phone interface.

Prohibited example:

A barcode scanner, hotel terminal, kitchen printer, GPS device or QR/NFC tag appearing larger or more important than the software.

### 2. Product Purpose Before Decoration

Rule:

A visitor should understand the product category from the image before reading the full card text.

Reason:

The catalog is a discovery surface. Product images must help visitors compare quickly.

Practical consequence:

Each image must include product-specific workflow cues: approvals for Ops, room status for Hotel, order queue for KitchenSync, stock alert for Stock & Orders.

Prohibited example:

A generic laptop dashboard with charts that could represent any business software.

### 3. One Family, Six Clear Products

Rule:

All products must share the same visual family while preserving unique operational cues.

Reason:

The site should feel like one KAVTRIS ecosystem, not six unrelated stock-style images.

Practical consequence:

Use consistent device realism, navy/gold accents, lighting, perspective, surface treatment and interface shell. Differentiate through workflow content and context.

Prohibited example:

FieldOps as a premium dark SaaS mockup, KitchenSync as a bright stock kitchen photo, and Customer Portal as a flat illustration.

### 4. Interface Structure Must Survive Small Sizes

Rule:

The image must communicate through layout, icons, status blocks and visible hierarchy, not through tiny text.

Reason:

Catalog and homepage cards render the image in small 16:10 containers on mobile.

Practical consequence:

Use fewer interface panels, larger status chips, recognizable icons and clear visual grouping.

Prohibited example:

A dense spreadsheet-like screen where understanding depends on reading small rows.

### 5. Privacy-Safe Fictional Data

Rule:

All interface data must be fictional, generic and non-sensitive.

Reason:

Product concepts must not imply real customers, real production usage or exposed private data.

Practical consequence:

Use synthetic references such as `Pedido #1482`, `Cliente A`, `Loja Norte`, `Quarto 204`, or simple fictional service labels.

Prohibited example:

Real names, real addresses, real emails, real phone numbers, credentials, client logos or identifiable customer records.

### 6. Optional Hardware Is Compatible Equipment

Rule:

Hardware may appear only when it clarifies a practical workflow and must remain secondary.

Reason:

The site must not imply KAVTRIS manufactures devices or funds physical infrastructure.

Practical consequence:

QR/NFC tags, smartphones, tablets, barcode scanners or simple printers can appear as ordinary compatible equipment.

Prohibited example:

Robots, industrial production lines, proprietary kiosks, complex medical devices or branded third-party terminals.

### 7. Honest Concept Positioning

Rule:

Visuals must support the current product descriptions without claiming completed SaaS availability or guaranteed capabilities.

Reason:

The products are presented as adaptable concepts, not fixed-price packaged software already running for named clients.

Practical consequence:

Show plausible interface states, not app-store badges, certification seals, customer logos, guaranteed metrics or "live production" claims.

Prohibited example:

Badges such as "ISO certified", "99.99% uptime", "used by 500 clients", "download on App Store", or "guaranteed real-time".

### 8. Mobile-Safe Focal Composition

Rule:

Key visual meaning must remain inside the central safe area.

Reason:

Current rendering uses 16:10 containers with `object-cover`; future crops can lose edge content.

Practical consequence:

Place the primary interface center-left or centered, keep the secondary phone/tablet inside the right safe region, and avoid critical details at edges.

Prohibited example:

Putting the only QR code, phone screen or product-specific cue at the extreme edge of the frame.

### 9. Restrained Brand Treatment

Rule:

The product family should feel branded through design language, not large repeated logos.

Reason:

Cards and pages already show KAVTRIS names in HTML. Over-branding inside images can crowd the visual and reduce reuse.

Practical consequence:

Use subtle KAVTRIS cues inside interface chrome when useful, such as a small wordmark or symbol in the sidebar/header.

Prohibited example:

Large logo overlays, repeated product names, or marketing headlines embedded inside the image.

### 10. Specification Before Production

Rule:

No replacement asset should be produced until its brief, crop use, hardware allowance and acceptance criteria are defined.

Reason:

Replacing images one by one without a system would recreate the inconsistency Phase 1 was designed to avoid.

Practical consequence:

Visual Phase 3 should start with a controlled pilot, review results, then continue to the remaining assets.

Prohibited example:

Generating six unrelated images from separate prompts and adjusting them afterward through heavy cropping.

## Master Visual Family

Shared family:

- Modern premium SaaS product showcase.
- Dark navy environment with warm gold accents and white software surfaces.
- Realistic laptop/desktop plus optional phone/tablet.
- Subtle real-world business context when it improves recognition.
- Soft depth-of-field background, not stock-photo foreground.
- Interface panels with large blocks, status chips, simple icons and readable hierarchy.
- Moderate shadows and realistic device reflections.
- No heavy neon, hologram, crypto, gaming or science-fiction styling.

Common visual tone:

```text
calm
credible
premium
software-first
business-focused
specific enough to understand
```

## Master Composition

Default composition:

```text
Desktop interface primary
+ optional mobile/tablet companion
+ subtle context or simple compatible equipment only when useful
```

Allowed alternatives:

| Option | Use when | Products |
| --- | --- | --- |
| Desktop primary | Management, approvals, stock, hotel operations, portals | Ops, Stock & Orders, Hotel Operations, Customer Portal |
| Desktop plus mobile companion | Management and field/customer use coexist | FieldOps, Hotel Operations, Customer Portal, Stock & Orders |
| Mobile/tablet primary | Product is touch-first or operational screen-first | KitchenSync only when representing kitchen display/tablet use |
| Interface plus context | Sector context materially improves recognition | Hotel Operations, KitchenSync, Stock & Orders |

Limits:

- Maximum three visible devices.
- One primary interface must dominate.
- Secondary devices must support, not compete.
- Hardware should occupy less visual weight than software.
- Background context should not exceed software importance.

## Brand Treatment

Default:

- Product names remain in HTML, not inside the asset.
- Complete KAVTRIS wordmark is optional and should be subtle if used in interface chrome.
- A small symbol or abbreviated brand cue may appear in a dashboard sidebar or header.
- Use navy for interface shell and background.
- Use gold for selected states, important metrics and workflow highlights.
- Use white/off-white for main dashboard content.

Avoid:

- Large external logo overlays.
- Repeated branding in every screen.
- Embedded marketing claims.
- Product names as large image text.

## Consistency And Differentiation Matrix

| Visual element | Shared across all products | Product-specific | Optional | Prohibited |
| --- | --- | --- | --- | --- |
| Background | Dark premium business setting | Sector hint | Context blur | Busy stock-photo scene |
| Lighting | Warm gold accent, navy shadows | Sector mood | Mild reflections | Neon/hologram fantasy |
| Device frame | Realistic laptop/phone/tablet | Device hierarchy | Extra tablet/display | Proprietary device design |
| Interface shell | Navy chrome, white panels | Workflow modules | Subtle logo | Competitor UI screenshot |
| Accent colour | Gold primary accent | One secondary status colour | Green/red status markers | Dominant unrelated palette |
| Charts | Simple, readable | Product metrics | Small sparkline | Dense analytics wall |
| Tables | Short lists/status rows | Product records | 4-6 rows | Spreadsheet density |
| Photography | Background context only | Sector cues | Desk/environment | Smiling stock-photo focus |
| People | Usually absent | Hands/partial operator only if useful | Blurred background | Identifiable real people |
| Hardware | Secondary, ordinary | QR/NFC/scanner/printer/tablet | Small device | Machines, robots, custom kiosks |
| Product icon | Consistent small UI icon style | Workflow icons | Product-specific status icon | New logo system |
| Logo | Subtle UI-level cue | None required | Small symbol | Large overlay |
| Product name | HTML/page copy | Rare small UI label | None | Large embedded title |
| Data language | Portuguese default | Product terms | Language-neutral labels | Mixed random language |
| Perspective | Consistent 3/4 product showcase | Slight sector angle | Top-down detail crop | Six unrelated camera styles |
