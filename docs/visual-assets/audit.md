# Product Visual Assets Audit

Status: Snapshot from Product Visual Assets Phase 1
Audience: Product, design, frontend, QA and technical lead

This audit records the current visual-asset baseline before any product image replacement. It is intentionally documentation-only.

## Scope

Confirmed constraints for this phase:

- No image was created, generated, replaced, renamed, moved, optimized or converted.
- No code, CSS, routes, product data, alt text, package metadata or dependency lock file was changed.
- Only documentation under `docs/visual-assets/` and the documentation index was added or updated.

## Baseline

Initial branch:

```text
audit/product-visual-assets-phase-1
```

Initial base evidence:

```text
main contains e2bd2fb
working tree clean
```

Initial validation:

| Command | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run check:architecture` | Passed |
| `npm run typecheck` | Passed |
| `npm run test:unit` | Passed, 15 tests |
| `npm run build` | Passed |
| `CI=1 npm run test:e2e` | Passed, 63 tests |
| `git diff --check` | Passed |

## Repository Asset Summary

Confirmed image files under `public/`:

```text
public/
└── images/
    ├── email-logo.png
    ├── gabriel.webp
    ├── insurance-project.jpg
    ├── logo-qualidade-e-vida-tech-transparent.png
    ├── products/
    │   ├── qevaryn-customer-portal.webp
    │   ├── qevaryn-fieldops.webp
    │   ├── qevaryn-hotel-operations.webp
    │   ├── qevaryn-kitchen-sync.webp
    │   ├── qevaryn-ops.webp
    │   └── qevaryn-stock-orders.webp
    ├── qevaryn-symbol.png
    ├── qevaryn-systems-logo.png
    ├── qevaryn-systems-white.png
    ├── qualidade-e-vida-logo.png
    ├── qualidade-e-vida-seal.png
    ├── qualidade-e-vida-systems-logo.png
    ├── tax-services-project.jpg
    └── travel-project.jpg
```

Asset counts:

| Category | Count | Notes |
| --- | ---: | --- |
| Product | 6 | Active product-family images. |
| Brand | 7 | Qevaryn, Rede Qualidade e Vida and email variants. |
| Founder | 1 | Active founder image. |
| Project history | 3 | Legacy project-history images. |
| Email-critical | 1 | `email-logo.png`, used by the contact email integration. |
| Suspected unused | 2 | Historical logo variants with no confirmed current reference. |

The detailed file metadata and usage map are in [inventory.md](inventory.md).

## Route Impact Map

| Route or output | Visible assets | Above fold | Desktop presentation | Mobile presentation | Replacement impact | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Qevaryn symbol, featured product images, founder photo, layout logos | Symbol above fold; featured and founder below | Strong brand hero plus three product cards | Hero symbol remains prominent; product cards stack | High for product images because homepage is the first product preview | Medium |
| `/produtos` | Six product images, layout logos | Product grid starts near top after short hero/filter | Product grid cards use 16:10 visual areas | One card per row; image text becomes smaller | High because this route compares every product | High |
| `/produtos/[slug]` | Generic product visual from product data | Product hero visual | Image and product copy share product-detail responsibility | Image remains a short visual proof but detail text carries meaning | Medium for generic products | Medium |
| `/produtos/fieldops` | FieldOps product image, layout logos | FieldOps hero image above fold | Large hero visual, 16:10, priority-loaded | Same image becomes smaller but still visible | Critical because FieldOps is the product-page model | High |
| `/empresas` | Layout logos only | Header logo | No product asset dependency | No product asset dependency | Low | Low |
| `/rede-qualidade-e-vida` | Rede Qualidade e Vida logo, seal/layout logos | Brand dependent | Institutional brand context | Logo sizing is more important than product visuals | Medium for brand clarity | Medium |
| `/privacy` | Layout behavior depends on page implementation; no product asset dependency confirmed | Not product-image dependent | Legal content | Legal content | Low | Low |
| `/cookies` | Layout behavior depends on page implementation; no product asset dependency confirmed | Not product-image dependent | Legal content | Legal content | Low | Low |
| `/api/contact` email output | `email-logo.png` | Email header | Inline CID email asset | Email-client dependent, not responsive web | High for email reliability | High |

## Homepage Findings

Confirmed assets:

- `public/images/qevaryn-symbol.png` in `src/features/home/components/Hero.tsx`
- `public/images/products/qevaryn-fieldops.webp`
- `public/images/products/qevaryn-hotel-operations.webp`
- `public/images/products/qevaryn-stock-orders.webp`
- `public/images/gabriel.webp`
- Layout logos from `src/components/layout/Logo.tsx`

Findings:

- The hero symbol is a strong first-viewport brand signal and should not be mixed with product-dashboard imagery on the homepage.
- Featured product images are useful, but only three products are visible on the homepage; their visual consistency influences the visitor's first product expectation.
- The founder image is compact and active in the trust section; it should be preserved separately from the product visual system.
- Product cards depend heavily on whether the image communicates the use case before the visitor reads the card description.

Limitations:

- Interface text inside product visuals is often too small to read on mobile cards.
- The product family is visually coherent, but several images reuse a similar laptop-and-phone composition, which can make different product concepts feel less distinct.

## Catalog Findings

The catalog uses all six product images through `src/features/products/data/products.ts` and `src/features/catalog/components/shared/ProductCard.tsx`.

Current rendering:

```text
Image mechanism: next/image
Container ratio: 16:10
Image behavior: fill + object-cover
Sizes: (min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw
Loading: lazy by default
```

Findings:

- The catalog structure is ready for replacement assets without layout changes.
- Current assets are close to the 16:10 container, except `qevaryn-stock-orders.webp`, which is slightly narrower in ratio.
- The product-card visual system should standardize safe focal areas so the laptop, phone and any simple hardware survive `object-cover` cropping.
- The current "Demonstracao visual" overlay reduces ambiguity but cannot compensate for a generic image.

## Product Page Findings

FieldOps is the only deep product page and uses `qevaryn-fieldops.webp` in:

- Homepage featured card.
- Catalog card.
- FieldOps hero visual.

The FieldOps hero uses:

```text
Image mechanism: next/image
Container ratio: 16:10
Image behavior: fill + object-cover
Sizes: (min-width: 1024px) 46vw, 92vw
Priority: true
```

Findings:

- FieldOps is not the weakest image, but it has the highest replacement impact because it appears in the main product-page model.
- A future FieldOps hero asset may need more deliberate composition than the catalog card asset.
- If one image continues to serve both catalog and hero contexts, the focal area must be safe for both small cards and large hero presentation.

## Responsive Findings

Confirmed behavior from code and current image containers:

- Product visuals are presented in stable 16:10 containers.
- Product cards stack on mobile.
- `object-cover` can crop edge content if a future image places important UI or hardware too close to the margins.
- The phone interface in current product images remains identifiable on mobile, but detailed mockup text is not readable enough to carry primary meaning.
- FieldOps page relies on the image for first impression and on separate in-page mockups for functional detail.

Recommended future constraints:

- Keep critical content inside a center-safe region.
- Use large UI blocks, labels and icons inside mockups rather than tiny tables.
- Avoid placing QR, NFC, barcode scanners or phones near the extreme left/right edges.
- Validate at 320, 390, 768 and 1440 px before replacing assets.

## Accessibility Findings

Confirmed implementation:

- Product images have meaningful alt text in `src/features/products/data/products.ts`.
- Founder image has meaningful alt text in `src/features/home/components/TrustAndCompany.tsx`.
- Logo variants have consistent alt text in `src/components/layout/Logo.tsx`.
- Hero symbol has meaningful alt text in `src/features/home/components/Hero.tsx`.

Risks:

- Product images include meaningful interface concepts. If future images contain important text not represented in adjacent copy or alt text, accessibility quality will regress.
- Repeated product images across routes should keep context-specific alt text under review if separate catalog and hero assets are introduced.

No alt text was changed in this phase.

## Performance Findings

Confirmed:

- Product images are WebP and modest in file size for their dimensions.
- Brand PNG assets with transparency are appropriate where transparent logos are required.
- The largest active brand asset is `qevaryn-symbol.png` at 513.2 KB.
- FieldOps hero image is priority-loaded, which is justified because it is above the fold on `/produtos/fieldops`.

Potential concerns:

- `qevaryn-symbol.png` is large relative to its rendered size, but it is a transparent brand symbol and already covered by visual QA. Optimize only in a later asset phase with visual comparison.
- Product images are not oversized in file size, but future replacements must avoid much larger exports.
- Email asset suitability should be judged separately from website image suitability.

## Format Findings

| Format | Current use | Suitability | Future preference |
| --- | --- | --- | --- |
| WebP | Product visuals and founder photo | Suitable for web product imagery and compact photos | Keep for broad support; consider AVIF only after testing compatibility/performance |
| PNG | Logos, transparent brand assets, email logo | Suitable for transparency and email compatibility | Preserve PNG for email and transparent brand variants |
| JPG | Legacy project-history images | Suitable for photographic legacy assets | Future active photographic assets may use WebP, with JPG only when needed |

## Brand Findings

Canonical active Qevaryn brand assets:

- `public/images/qevaryn-systems-white.png`
- `public/images/qevaryn-systems-logo.png`
- `public/images/qevaryn-symbol.png`

Active Rede Qualidade e Vida assets:

- `public/images/qualidade-e-vida-logo.png`
- `public/images/qualidade-e-vida-seal.png`

Email-critical:

- `public/images/email-logo.png`

Historical or suspected unused:

- `public/images/logo-qualidade-e-vida-tech-transparent.png`
- `public/images/qualidade-e-vida-systems-logo.png`

Do not remove historical variants without a separate cleanup decision.

## Email Findings

`public/images/email-logo.png` is email-critical.

Current flow:

```text
src/services/email/resend.ts
→ reads public/images/email-logo.png
→ attaches it as inline CID
→ src/emails/contact-notification.ts references cid:qualidade-e-vida-logo
```

Risks:

- Moving or replacing this asset can break email rendering even if the website remains fine.
- A website logo is not automatically safe for email clients.
- Email replacement must be validated with the email template and provider behavior, not only with browser rendering.

## Legacy Findings

Legacy project images are referenced through `src/data/projects.ts`, which is imported by retained legacy components:

- `public/images/travel-project.jpg`
- `public/images/insurance-project.jpg`
- `public/images/tax-services-project.jpg`

They are not confirmed active in current routes after legacy isolation. They should remain retained until a separate legacy cleanup review.

## Honesty And Product Positioning

No current product image clearly claims:

- fixed pricing;
- app-store availability;
- manufactured proprietary hardware;
- active customers;
- certifications;
- clinical monitoring;
- large industrial machinery ownership.

Potential risks for future visuals:

- KitchenSync should not make kitchen machinery look like a Qevaryn product.
- FieldOps should show QR/NFC/smartphone as optional simple equipment, not manufactured hardware.
- Customer Portal should avoid sensitive or realistic personal customer data.
- Future care or fleet concepts must avoid clinical/emergency monitoring or full fleet tracking claims unless supported by product copy.

## Preliminary Replacement Priority

| Priority | Product | Reason |
| --- | --- | --- |
| 1 | Qevaryn Ops | Most generic visual; weakest product-specific communication without text. |
| 2 | Qevaryn KitchenSync | Clear sector, but visually denser and more hardware/context-heavy than the others. |
| 3 | Qevaryn Customer Portal | Good interface clues, but similar generic laptop+phone composition. |
| 4 | Qevaryn Hotel Operations | Clear hotel context; interface could become more explicit. |
| 5 | Qevaryn FieldOps | Strong current asset but highest route impact and deserves a dedicated hero-grade version. |
| 6 | Qevaryn Stock & Orders | Strong current communication; main issue is ratio consistency. |

This is a preliminary order only. Visual Phase 2 should confirm the visual system before any replacement.

## Asset Integrity Baseline

The SHA-256 hashes recorded in [inventory.md](inventory.md) are the pre-replacement baseline for future comparison.

Final checks for this phase must confirm:

- `public/` has no diff.
- Product image hashes are unchanged.
- No image file was added or removed.
