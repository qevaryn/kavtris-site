# Visual Asset Inventory

Status: Snapshot from Product Visual Assets Phase 1
Audience: Product, design, frontend, QA and technical lead

## Asset Metadata

| Asset | Extension | Dimensions | Ratio | Size | Alpha | Category | SHA-256 |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| `public/images/email-logo.png` | PNG | 520x163 | 3.190 | 103.0 KB | Yes | email, brand | `42b837ae34db8c80cefbd8721df8b44bbe34803c55a611b3564bd96c14747a51` |
| `public/images/gabriel.webp` | WebP | 640x767 | 0.834 | 24.1 KB | No | founder | `2b80fec51c01c706c79c917f8aebf013a4e690aaf57e328e5d3c11ee14a59ef4` |
| `public/images/insurance-project.jpg` | JPG | 1586x992 | 1.599 | 449.3 KB | No | project-history, legacy | `a7c77d9858621d965a29a99a324ef43865a6e8cf29c1988b50e1242e706a67c9` |
| `public/images/logo-qualidade-e-vida-tech-transparent.png` | PNG | 650x162 | 4.012 | 24.2 KB | Yes | brand, unknown | `3b2acf639b3d6a8165d5864f7e4b3d81ed64e2b810df60f8908a88fbe10a34d0` |
| `public/images/products/qevaryn-customer-portal.webp` | WebP | 1586x992 | 1.599 | 88.0 KB | No | product | `3b8cd607a4255b0701b43fce8d5eb271839050719739ab1259d3d816ec551623` |
| `public/images/products/qevaryn-fieldops.webp` | WebP | 1586x992 | 1.599 | 114.0 KB | No | product | `876e6fd255ecccb9af34a2d13ca395586d52f516c72af4e08aca0298bbea6b1e` |
| `public/images/products/qevaryn-hotel-operations.webp` | WebP | 1586x992 | 1.599 | 105.2 KB | No | product | `00eedbf1b9d769505ee811ab32ee8438456c675360827e96e2e4b4fcbdd7112b` |
| `public/images/products/qevaryn-kitchen-sync.webp` | WebP | 1586x992 | 1.599 | 104.5 KB | No | product | `48546083b2f9d852eca18ddb5813ffb83279f867e57122d6c5232ab704235958` |
| `public/images/products/qevaryn-ops.webp` | WebP | 1586x992 | 1.599 | 84.5 KB | No | product | `2129008b3446516ec33986ff1eb34bb2eb16ec6923dbdb221bbc549b8295eb7b` |
| `public/images/products/qevaryn-stock-orders.webp` | WebP | 1568x1003 | 1.563 | 98.2 KB | No | product | `b50467d954d310a581bfb44a3bbcb5d82a5512f60c751f9c4d6e25fa667abdd0` |
| `public/images/qevaryn-symbol.png` | PNG | 760x760 | 1.000 | 513.2 KB | Yes | brand | `f0c2a97e836709edc3849c4c1b981c1da595bb96d6f30b6a53f0b9f35a2c7dad` |
| `public/images/qevaryn-systems-logo.png` | PNG | 900x282 | 3.191 | 64.4 KB | Yes | brand | `2ed95b31794ac7c2fac042bef71c86c97e7fc25aaa2d4d2ad0e7bdfe75942e5f` |
| `public/images/qevaryn-systems-white.png` | PNG | 760x245 | 3.102 | 49.5 KB | Yes | brand | `c624b0928625ab5ca0a9af65daa8596fe1e57aface47a0e106d06bcecc55d0fe` |
| `public/images/qualidade-e-vida-logo.png` | PNG | 680x155 | 4.387 | 66.4 KB | Yes | brand, institutional | `5bea369a2bce82d9da07594d20f4fe8762bcc5bbcc078bcf24e06dbaffff7d11` |
| `public/images/qualidade-e-vida-seal.png` | PNG | 420x96 | 4.375 | 37.8 KB | Yes | brand, institutional | `4b209be71f1a553e8385d8846a9c5f9d8a0bed729ebfaf3b85eb4e2428e4a140` |
| `public/images/qualidade-e-vida-systems-logo.png` | PNG | 680x155 | 4.387 | 24.2 KB | Yes | brand, unknown | `58c5c4570c79f1838aee6ca30f758edbd490e1ff6a4b81abab6f89371f83b8e7` |
| `public/images/tax-services-project.jpg` | JPG | 1570x1001 | 1.568 | 245.6 KB | No | project-history, legacy | `51e14944171a520fe706c53241481141bbb14401290fea3eccd922e12956c8ee` |
| `public/images/travel-project.jpg` | JPG | 1586x992 | 1.599 | 154.4 KB | No | project-history, legacy | `05fb38858770b50487927fd5a4216c754453f007d2e0c7a9522fba5b1970cc83` |

All images are static. Color profile data was available as sRGB for the inspected raster assets.

## Usage Map

| Asset | Referenced by | Component or service | Route or output | Status |
| --- | --- | --- | --- | --- |
| `public/images/email-logo.png` | `src/services/email/resend.ts`, email tests | Resend email integration | `/api/contact` email output | email-critical |
| `public/images/gabriel.webp` | `src/features/home/components/TrustAndCompany.tsx`, `src/features/legacy/components/Founder.tsx` | Founder card, legacy founder section | `/` and legacy only | active |
| `public/images/insurance-project.jpg` | `src/data/projects.ts` | Legacy project data | legacy retained only | legacy-retained |
| `public/images/logo-qualidade-e-vida-tech-transparent.png` | No current reference found by repository search | None confirmed | None confirmed | suspected-unused |
| `public/images/products/qevaryn-customer-portal.webp` | `src/features/products/data/products.ts` | Product data rendered by catalog/detail components | `/produtos`, `/produtos/customer-portal` | active-indirect |
| `public/images/products/qevaryn-fieldops.webp` | `src/features/products/data/products.ts` | Product data, FieldOps hero | `/`, `/produtos`, `/produtos/fieldops` | active |
| `public/images/products/qevaryn-hotel-operations.webp` | `src/features/products/data/products.ts` | Product data rendered by featured/catalog/detail components | `/`, `/produtos`, `/produtos/hotel-operations` | active |
| `public/images/products/qevaryn-kitchen-sync.webp` | `src/features/products/data/products.ts` | Product data rendered by catalog/detail components | `/produtos`, `/produtos/kitchen-sync` | active-indirect |
| `public/images/products/qevaryn-ops.webp` | `src/features/products/data/products.ts` | Product data rendered by catalog/detail components | `/produtos`, `/produtos/qevaryn-ops` | active-indirect |
| `public/images/products/qevaryn-stock-orders.webp` | `src/features/products/data/products.ts` | Product data rendered by featured/catalog/detail components | `/`, `/produtos`, `/produtos/stock-orders` | active |
| `public/images/qevaryn-symbol.png` | `src/features/home/components/Hero.tsx`, visual tests | Homepage hero brand visual | `/` | active |
| `public/images/qevaryn-systems-logo.png` | `src/components/layout/Logo.tsx` | Layout logo variant | Shared layout | active |
| `public/images/qevaryn-systems-white.png` | `src/components/layout/Logo.tsx`, visual tests | Header/footer logo variant | Shared layout | active |
| `public/images/qualidade-e-vida-logo.png` | `src/components/layout/Logo.tsx`, `src/app/rede-qualidade-e-vida/page.tsx` | Network logo | Layout and `/rede-qualidade-e-vida` | active |
| `public/images/qualidade-e-vida-seal.png` | `src/components/layout/Logo.tsx` | Network seal | Shared layout | active |
| `public/images/qualidade-e-vida-systems-logo.png` | No current reference found by repository search | None confirmed | None confirmed | suspected-unused |
| `public/images/tax-services-project.jpg` | `src/data/projects.ts` | Legacy project data | legacy retained only | legacy-retained |
| `public/images/travel-project.jpg` | `src/data/projects.ts` | Legacy project data | legacy retained only | legacy-retained |

## Rendering Map For Active Product Assets

| Context | Component | Mechanism | Ratio | Sizing | Loading |
| --- | --- | --- | --- | --- | --- |
| Homepage featured products | `src/features/home/components/FeaturedProducts.tsx` | `next/image` with `fill` | 16:10 | `(min-width: 1280px) 270px, (min-width: 768px) 50vw, 100vw` | Lazy default |
| Catalog cards | `src/features/catalog/components/shared/ProductCard.tsx` | `next/image` with `fill` | 16:10 | `(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw` | Lazy default |
| FieldOps hero | `src/features/products/fieldops/FieldOpsPage.tsx` | `next/image` with `fill` | 16:10 | `(min-width: 1024px) 46vw, 92vw` | Priority |

## Brand Asset Review

| Asset | Purpose | Background compatibility | Resolution | Preserve? | Notes |
| --- | --- | --- | --- | --- | --- |
| `qevaryn-systems-white.png` | Header/footer dark-background Qevaryn logo | Dark | Good | Yes | Current canonical dark-background logo. |
| `qevaryn-systems-logo.png` | Light-background Qevaryn logo variant | Light | Good | Yes | Keep as variant. |
| `qevaryn-symbol.png` | Homepage hero symbol | Dark/transparent | Good but large | Yes | Strong brand signal; future optimization possible. |
| `qualidade-e-vida-logo.png` | Rede Qualidade e Vida logo | Light/transparent | Good | Yes | Active network page/layout use. |
| `qualidade-e-vida-seal.png` | Network seal/signature | Transparent | Usable | Yes | Active compact seal. |
| `email-logo.png` | Email inline logo | Email clients | Good | Yes | Email-critical. |
| `logo-qualidade-e-vida-tech-transparent.png` | Historical/unknown | Transparent | Good | Review later | No active reference found. |
| `qualidade-e-vida-systems-logo.png` | Historical/unknown | Transparent | Good | Review later | No active reference found. |

## Legacy Asset Review

| Legacy asset | Legacy code reference | Current active route? | Potential future reuse | Deletion risk | Recommendation |
| --- | --- | --- | --- | --- | --- |
| `travel-project.jpg` | `src/data/projects.ts` and legacy `Experience` | No confirmed active route | Project-history reference | Medium | retain |
| `insurance-project.jpg` | `src/data/projects.ts` and legacy `Experience` | No confirmed active route | Project-history reference | Medium | retain |
| `tax-services-project.jpg` | `src/data/projects.ts` and legacy `Experience` | No confirmed active route | Project-history reference | Medium | retain |

## Suspected Unused Assets

| Asset | Search result | Risk | Recommendation |
| --- | --- | --- | --- |
| `logo-qualidade-e-vida-tech-transparent.png` | No current direct or indirect reference found | Could be historical or reserved | Keep until a legacy/brand cleanup approval |
| `qualidade-e-vida-systems-logo.png` | No current direct or indirect reference found | Could be historical or reserved | Keep until a legacy/brand cleanup approval |

No asset should be deleted in the visual initiative without separate approval.
