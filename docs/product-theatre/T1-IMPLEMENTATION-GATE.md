# T1 Implementation Gate — Product Theatre Foundation and Homepage Product Proof

Status: `AUTHORIZED_CODE_MUTATION_ALLOWED_WITHIN_FROZEN_SCOPE`

This file records the execution envelope for the owner-authorized Tranche 1 only. It does not authorize Tranche 2+, production release, PLATFORM.1, KAVTRIS-AI.1, CONTROL, billing, checkout, portal, authenticated Product functions, or broader Product-template migration.

## 1. Owner authorization

- `T1_OWNER_AUTHORIZED = YES`
- Authorization date: `2026-09-17`
- Scope: `TRANCHE_1_PRODUCT_THEATRE_FOUNDATION_AND_HOMEPAGE_PRODUCT_PROOF`
- This owner authorization supersedes only the earlier pre-authorization status for T1.
- Completion of T1 does not authorize any subsequent tranche.

## 2. PRE_TRANCHE_BASELINE

Repository: `qevaryn/kavtris-site`

Branch: `feature/product-theatre-t1`

Baseline commit:

`3c31a7d19f948a32e1ff4ce51284c19e830063c7`

Baseline evidence captured before application/source mutation:

- `npm run lint` — PASS
- `npm run check:architecture` — PASS
- `npm run check:production-smoke-governance` — PASS
- `npm run typecheck` — PASS
- unit tests — `18 files / 92 tests PASS`
- `npm run build` — PASS
- worktree clean before and after verification — PASS
- local `HEAD == origin/develop == T1 branch baseline` at gate creation time

The baseline above is the rollback anchor for T1.

## 3. BOUNDED_CHANGE_SCOPE

### 3.1 Allowed product/code scope

T1 is limited to the public homepage Product Theatre foundation and evidence needed to validate it.

Existing files allowed to change when directly required:

- `src/features/home/HomePageView.tsx`
- `src/features/home/components/Hero.tsx`
- `src/features/home/components/HeroVisual.tsx`
- `src/features/home/components/CustomerPathSelector.tsx`
- `src/features/home/components/CredibilityBar.tsx`
- `src/features/home/components/NetworkPreview.tsx`
- `src/features/home/components/MeaningBehindKavtris.tsx`
- `src/features/home/data/**`
- `src/app/globals.css`

New implementation files may be added only under:

- `src/features/home/components/product-theatre/**`
- `src/features/home/data/**`

The homepage composition may establish the contracted nine-part shell:

1. Product Hero
2. Guided Discovery
3. Product Showcase
4. Business Outcomes
5. How It Works
6. Plan Evolution
7. Trust / Engineering
8. Consultant
9. True Footer

T1 may implement only the minimum Guided Discovery foundation needed by the homepage shell. The full four-path guided-discovery behavior remains a later tranche.

### 3.2 Governed Product scenario

The first homepage Product proof must use one governed first-party Product scenario.

Preferred source: existing FieldOps Product truth because the contract identifies it as the strongest existing operational-coordination source.

Rules:

- consume existing authoritative Product truth;
- synthetic/public-safe demo data only;
- no capability claim beyond existing authoritative Product data;
- no Product entitlement semantics may be invented;
- no edits to Product page behavior or persistence are authorized by this gate.

If the scenario cannot be implemented without modifying files outside the allowlist, STOP and request an explicit bounded scope amendment before editing them.

### 3.3 Test/evidence files allowed

Existing directly affected homepage/navigation/accessibility tests may be updated only when behavior intentionally changes within T1.

New T1-specific evidence tests may be added under:

- `tests/web-desktop/**`
- `tests/web-mobile/**`
- `tests/accessibility/shared/**`
- `tests/accessibility/mobile/**`
- `tests/visual/**` only if the existing visual-test infrastructure is reused without introducing a new dependency

No unrelated test modernization is authorized.

### 3.4 Explicitly outside T1

No T1 edits are authorized in:

- `src/features/products/**` except a separately approved scope amendment;
- Product templates/routes outside homepage composition;
- `src/features/contact/**`;
- server/API/auth/database/identity code;
- migrations or schemas;
- account/customer portal code;
- billing, checkout, commerce persistence, entitlement/runtime authorization;
- full Storefront implementation;
- full Configurator implementation;
- compatibility engine;
- full sector catalog;
- deployment/production configuration;
- production release;
- PLATFORM.1;
- KAVTRIS-AI.1;
- CONTROL;
- KAVTRIS Client.

Header, Footer, navigation-history foundations and existing reduced-motion utilities are to be preserved unless a narrowly demonstrated T1 blocker requires an explicit scope amendment.

## 4. Performance precondition

The current homepage performance baseline was captured before application/source mutation and is now frozen for T1.

Canonical evidence package:

- file: `KAVTRIS-T1-PERFORMANCE-BASELINE-R1-20260918T114558662Z.zip`
- package SHA-256: `7A772FE4C82E61765726F4A40BFDF15A69D6B1FAE37C9B4754DAAC027F1510C8`
- schema: `KAVTRIS_T1_PERFORMANCE_BASELINE_EVIDENCE_V1`
- collector revision: `R1`
- source baseline: `3c31a7d19f948a32e1ff4ce51284c19e830063c7`
- measurement head: `a578cf756fcfef90d61b5b4f25cebf3de92bcd8c`
- branch: `feature/product-theatre-t1`
- production build: PASS
- temporary `next start` server: READY then cleanly STOPPED before evidence hashing
- measured worktree: clean before and after
- measured application/performance-sensitive source was unchanged from the source baseline

Evidence integrity:

- all eight payload hashes recorded in `MANIFEST.txt` matched the uploaded evidence files;
- JSON SHA-256: `AD600A646BF50D947BA8D9AAE012D8EA768423D729C3BA8E3DBD41A0783D70E4`
- Markdown SHA-256: `68D2641DEF56156182D5EBBA03E6394FEE654D19AF57450E2D929D2CA44338A1`
- build/server/measure stderr logs were empty;
- raw run statistics and derived p75/budget calculations were independently rechecked and matched the evidence JSON.

Measurement method:

- production build served through `next start` on localhost;
- Playwright bundled Chromium;
- mobile viewport `390x844`, touch/mobile emulation;
- mobile network profile: 150 ms latency, 1600 Kbps down, 750 Kbps up;
- mobile CPU slowdown: 4x;
- browser cache disabled for measured runs;
- 7 measured mobile runs;
- 3 measured desktop runs;
- 1 discarded warm-up run;
- evidence is laboratory data, not field/RUM data;
- INP is not claimed;
- the long-task blocking proxy is informational only and is not treated as field INP or Lighthouse TBT.

Frozen mobile p75 baseline:

- LCP: `1838 ms`
- CLS: `0`
- homepage initial encoded body: `424198 bytes`
- first-load JavaScript encoded body: `261310 bytes`
- long-task blocking proxy: `1146.5 ms` — informational only

Frozen T1 performance budget:

- LCP absolute target: `<= 2500 ms`
- LCP regression ceiling against this lab baseline: `<= 2022 ms`
- CLS absolute ceiling: `<= 0.10`
- homepage initial encoded body ceiling: `<= 466618 bytes` — maximum +10%
- first-load JavaScript encoded body ceiling: `<= 281790 bytes` — maximum +20 KiB
- no field INP claim may be derived from this baseline;
- post-T1 performance evidence must use the same method/environment for direct comparison.

Frozen contract guardrails remain in force:

- affected-route compressed first-load JavaScript increase: maximum `20 KB` without separate owner-approved evidence; preferred change is neutral or lower;
- homepage initial transfer/encoded-body comparison: no T1 increase above `10%` without explicit approval;
- one primary responsive hero asset request at initial load by default;
- no autoplay video hero;
- no canvas hero;
- no WebGL hero;
- no particle system;
- no perpetual decorative animation;
- reserve intrinsic geometry for major media;
- below-the-fold heavy Product media lazy-loads;
- avoid duplicated desktop/mobile media when one responsive source suffices;
- no new major visualization dependency without separate approval.

`BUILD_PASS != PERFORMANCE_PASS`

`BUILD_PASS != PRODUCTION_READY`

## 5. ACCEPTANCE_EVIDENCE

T1 cannot be marked complete unless evidence shows all of the following for the affected scope:

- complete static homepage foundation;
- complete reduced-motion homepage foundation;
- complete mobile homepage foundation;
- Product proof appears in the initial experience;
- one credible governed first-party Product scenario is present;
- nine homepage hierarchy sections exist in contracted order, except a specifically evidenced responsive adjacency refinement;
- consultant/human-assistance path remains visible;
- no unsupported Product or business claims;
- no body overflow at 320 CSS px;
- Product proof remains readable on mobile rather than a miniature desktop UI;
- keyboard/touch/pointer behavior remains usable where applicable;
- visible focus remains available;
- status/meaning is not conveyed by color alone;
- reduced motion provides immediate equivalent meaning;
- existing unaffected routes remain functional;
- routing/navigation/history behavior remains intact;
- targeted accessibility evidence passes;
- measured performance remains inside the recorded T1 delta budget;
- `npm run verify` passes after implementation;
- affected E2E evidence passes.

Manual evidence is required where automation cannot prove visual legibility, claim honesty, responsive hierarchy, or motion equivalence.

## 6. STOP_GATE

Immediately stop T1 expansion and report the blocker if any of the following occurs:

- required edit falls outside `BOUNDED_CHANGE_SCOPE`;
- an acceptance criterion cannot be met without broadening the tranche;
- regression appears outside authorized homepage scope;
- accessibility regression;
- material performance regression beyond the recorded T1 budget;
- broken routing/history/navigation;
- unsupported Product claim would be required;
- security/privacy regression;
- Product truth is insufficient for the selected scenario;
- a new major runtime/visualization dependency appears necessary;
- Product/Storefront/Configurator work starts becoming the dominant implementation scope.

Do not silently repair unrelated files.

## 7. ROLLBACK_BOUNDARY

Rollback anchor:

`3c31a7d19f948a32e1ff4ce51284c19e830063c7`

Rollback rules:

- rollback is limited to T1 branch changes;
- preserve evidence before rollback;
- do not use destructive broad cleanup;
- no recursive deletion;
- no indiscriminate `git clean`;
- no indiscriminate `git reset --hard`;
- do not alter `develop` or `main` while rolling back T1;
- re-run the preserved baseline verification after rollback;
- no production rollback mechanism is implied because production release is not authorized.

## 8. Current gate state

- `PRE_TRANCHE_BASELINE = PASS`
- `BOUNDED_CHANGE_SCOPE = FROZEN`
- `ACCEPTANCE_EVIDENCE = DEFINED`
- `STOP_GATE = DEFINED`
- `ROLLBACK_BOUNDARY = DEFINED`
- `PERFORMANCE_BASELINE = PASS_FROZEN`
- `PERFORMANCE_DELTA_BUDGET = FROZEN`
- `T1_CODE_MUTATION = AUTHORIZED_WITHIN_BOUNDED_CHANGE_SCOPE`
- `PRODUCTION_RELEASE_AUTHORIZED = NO`
- `NEXT_TRANCHE_AUTHORIZED = NO`

The first implementation mutation after this gate update must remain inside the frozen T1 allowlist and must preserve the rollback anchor and performance comparison method.
