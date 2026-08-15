# Product Visual Comparison

Status: Snapshot from Product Visual Assets Phase 1
Audience: Product, design, frontend and QA

This document compares the six current product visuals. It does not define final replacement prompts or create new visual concepts.

Note: this is a historical comparison. Product names, filenames and findings reflect the pre-migration visual audit; current runtime products and assets may now use KAVTRIS naming.

## Product Asset Table

| Product | Asset | Dimensions | Ratio | Devices shown | Optional hardware shown | Replacement priority |
| --- | --- | ---: | ---: | --- | --- | --- |
| Qevaryn FieldOps | `public/images/products/qevaryn-fieldops.webp` | 1586x992 | 1.599 | Laptop and phone | QR/NFC-style label | Medium-high |
| Qevaryn Stock & Orders | `public/images/products/qevaryn-stock-orders.webp` | 1568x1003 | 1.563 | Laptop and phone | Barcode scanner/label | Medium |
| Qevaryn Hotel Operations | `public/images/products/qevaryn-hotel-operations.webp` | 1586x992 | 1.599 | Laptop and phone | None prominent | Medium |
| Qevaryn KitchenSync | `public/images/products/qevaryn-kitchen-sync.webp` | 1586x992 | 1.599 | Laptop, tablet/display and phone | Receipt/printer-like element | High |
| Qevaryn Ops | `public/images/products/qevaryn-ops.webp` | 1586x992 | 1.599 | Laptop and tablet/mobile | None prominent | High |
| Qevaryn Customer Portal | `public/images/products/qevaryn-customer-portal.webp` | 1586x992 | 1.599 | Laptop and phone | None prominent | Medium-high |

## Product Communication Audit

| Product | Understandable without text? | Software-first? | Desktop/mobile clarity | Product-specific? | Misleading risk | Mobile card effectiveness |
| --- | --- | --- | --- | --- | --- | --- |
| FieldOps | Mostly yes | Yes | Strong desktop and mobile pairing | Strong | Low; QR/NFC remains simple hardware | Good, but small interface text |
| Stock & Orders | Mostly yes | Yes | Strong dashboard and phone pairing | Strong | Low; scanner/label are simple equipment | Good, slight ratio mismatch |
| Hotel Operations | Partly | Yes | Clear room/status board and phone | Medium-high | Low | Good context, some interface detail is small |
| KitchenSync | Partly | Yes | Multiple screens visible | Medium-high | Medium; avoid implying kitchen hardware ownership | More crowded on mobile |
| Qevaryn Ops | Partly no | Yes | Laptop and mobile/tablet visible | Medium-low | Low | Looks polished but generic |
| Customer Portal | Partly yes | Yes | Clear laptop and phone pairing | Medium | Low; avoid sensitive customer data in future | Good, but composition overlaps with Ops |

## Individual Findings

### Qevaryn FieldOps

Strengths:

- Strongest current product-specific visual.
- Shows laptop manager dashboard, employee phone and QR/NFC-like check-in element.
- Matches software-first positioning and does not imply manufactured hardware.

Limitations:

- It is reused in homepage, catalog and FieldOps hero.
- The current image is good for a card, but a future hero-grade version could better support the product page.
- Interface text is not readable enough on small cards, so the visual must rely on clear shapes and workflow cues.

Replacement priority:

```text
Medium-high
```

Reason: not weak, but strategically important.

### Qevaryn Stock & Orders

Strengths:

- Clearly communicates stock, supplier orders and low-stock operations.
- Barcode scanner/label supports the optional-hardware idea without making hardware primary.
- Strong product specificity.

Limitations:

- Aspect ratio differs from the other product images and from the 16:10 card container.
- Future visual system should standardize crop and safe areas.

Replacement priority:

```text
Medium
```

Reason: good current communication; ratio consistency is the main issue.

### Qevaryn Hotel Operations

Strengths:

- Hotel context is visible without turning into stock photography.
- Room-status board, cleaning and maintenance cues match the product copy.
- Bell and accommodation background help sector recognition.

Limitations:

- The interface is less explicit than FieldOps or Stock & Orders.
- On mobile cards, detailed room-state cues may become hard to interpret.

Replacement priority:

```text
Medium
```

Reason: coherent but could communicate the operational workflow more directly.

### Qevaryn KitchenSync

Strengths:

- Restaurant/cafe/takeaway context is immediately suggested.
- Multiple screens communicate order flow and preparation status.
- Device choices are plausible and accessible.

Limitations:

- Denser visual than the rest of the set.
- Hardware/context elements compete more with the software.
- Future image must avoid implying Qevaryn provides kitchen machines or custom physical equipment.

Replacement priority:

```text
High
```

Reason: clear sector, but current density and hardware/context balance need tighter rules.

### Qevaryn Ops

Strengths:

- Polished, professional, consistent navy/gold style.
- Shows tasks, indicators and mobile work view.
- Does not imply unsupported hardware or false maturity.

Limitations:

- Most generic of the six visuals.
- A visitor may understand "business dashboard" but not the specific value proposition around tasks, approvals, documents and internal processes.
- Very similar composition to Customer Portal without enough distinctive cues.

Replacement priority:

```text
High
```

Reason: weakest product-specific communication.

### Qevaryn Customer Portal

Strengths:

- Shows requests, messages, documents, notifications and history.
- Clearly software-first and privacy-safe at the current detail level.
- Good desktop/mobile pairing.

Limitations:

- Composition is visually close to Qevaryn Ops.
- Future replacement should make the customer-facing nature clearer without showing sensitive real data.

Replacement priority:

```text
Medium-high
```

Reason: understandable, but needs stronger distinction from internal operations.

## Consistency Matrix

| Criterion | Current consistency | Finding |
| --- | --- | --- |
| Aspect ratio | Mostly consistent | Five assets are 1.599; Stock & Orders is 1.563. |
| Device composition | High | Most use laptop plus mobile/phone. |
| Camera angle | High | Similar angled product-showcase perspective. |
| Background | Medium-high | Mostly dark premium business settings; KitchenSync has stronger sector context. |
| Lighting | High | Dark, warm, navy/gold lighting is consistent. |
| Depth | High | All use depth-of-field product staging. |
| Interface style | Medium | Similar dashboards, but product-specific UI strength varies. |
| Color balance | High | Navy, gold and white are consistent. |
| Typography inside mockups | Low-medium | Text is often too small to read and should not carry primary meaning. |
| Gold accent usage | High | Consistent and restrained. |
| Navy usage | High | Strong brand continuity. |
| White-space balance | Medium | KitchenSync and some dashboards are denser. |
| Product-name treatment | Low | Product names are not embedded in the images, which is acceptable if cards provide names. |
| Hardware treatment | Medium-high | Hardware is secondary; KitchenSync needs care. |
| Visual density | Medium | Ops/Portal are clean but generic; KitchenSync is denser. |
| Commercial maturity | High | All feel professional and website-ready. |

## Strongest And Weakest Current Assets

Strongest:

```text
Qevaryn FieldOps
```

Reason: it best communicates the software workflow, manager/mobile split and optional QR/NFC check-in.

Close second:

```text
Qevaryn Stock & Orders
```

Reason: it communicates stock, supplier and barcode workflows clearly.

Weakest:

```text
Qevaryn Ops
```

Reason: it is polished but too generic for a visitor to identify the product purpose without reading the card.

## Preliminary Replacement Order

1. Qevaryn Ops
2. Qevaryn KitchenSync
3. Qevaryn Customer Portal
4. Qevaryn Hotel Operations
5. Qevaryn FieldOps
6. Qevaryn Stock & Orders

This order should be confirmed only after Visual Phase 2 defines the visual system.

## Product-Specific Visual Requirements For Phase 2

| Product | Required future emphasis |
| --- | --- |
| FieldOps | Service schedule, check-in, checklist, photo evidence, report and subtle QR/NFC support. |
| Stock & Orders | Low stock, supplier order, quantities, movement and optional barcode workflow. |
| Hotel Operations | Room status, cleaning, maintenance, guest request and team assignment. |
| KitchenSync | Order queue, preparation stages, table/takeaway/delivery status and touch-friendly kitchen display. |
| Qevaryn Ops | Tasks, approvals, documents, deadlines, responsible people and internal process status. |
| Customer Portal | Customer request status, documents, messages, notifications and privacy-safe portal view. |
