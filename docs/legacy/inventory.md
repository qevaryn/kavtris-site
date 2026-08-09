# Legacy Inventory

Status: Snapshot from Organization Phase 8
Audience: Technical lead, frontend and QA

This inventory records retained legacy files. It is evidence for future cleanup, not approval to delete them now.

## Summary

Confirmed:

- Legacy components are isolated under `src/features/legacy`.
- Search found no active imports from current routes, tests or docs into these components.
- Several legacy components still import old data from `src/data/*`.

Decision:

- Retain all current legacy files for future review.
- Do not delete legacy data or assets in this phase.

## 5I.1A update

Six previously retained components were verified as unused (no static,
dynamic, barrel, route, test or runtime references) and removed in phase
5I.1A:

- `Experience.tsx`
- `Founder.tsx`
- `InteractiveProductDemo.tsx`
- `Network.tsx`
- `Problems.tsx`
- `Services.tsx`

Their rows below are retained as historical inventory with the Decision
updated to `delete-confirmed-dead`.

## Inventory

| File | Original purpose | Current imports | Current route usage | Current test coverage | Current data dependencies | Potential reuse | Risk of deletion | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `src/features/legacy/README.md` | Explains why legacy is retained. | None. | None. | None. | None. | Cleanup guidance. | Low. | retain-active-reference |
| `src/features/legacy/components/BusinessSolutionWizard.tsx` | Homepage solution wizard. | Shared UI. | None confirmed. | None direct. | Internal option data. | Future discovery flow ideas. | Medium. | retain-future-review |
| `src/features/legacy/components/ConceptProducts.tsx` | Earlier concept-product showcase. | Shared UI. | None confirmed. | None direct. | `src/data/concept-products`. | Future product ideation. | Medium. | retain-future-review |
| `src/features/legacy/components/Differentials.tsx` | Earlier differentiator section. | Shared UI. | None confirmed. | None direct. | `src/data/differentiators`. | Copy/positioning reference. | Low. | retain-future-review |
| `src/features/legacy/components/EngagementModels.tsx` | Earlier engagement-model section. | Shared UI. | None confirmed. | None direct. | `src/data/engagement-models`. | Commercial messaging reference. | Low. | retain-future-review |
| `src/features/legacy/components/Experience.tsx` | Earlier experience/project section. | Shared project card. | None confirmed. | None direct. | `src/data/projects`. | Founder/company proof reference. | Medium. | delete-confirmed-dead |
| `src/features/legacy/components/Founder.tsx` | Earlier founder section. | Shared UI, image. | None confirmed. | None direct. | `socialLinks`. | Personal credibility content. | Medium. | delete-confirmed-dead |
| `src/features/legacy/components/Industries.tsx` | Earlier industries grid. | Shared UI. | None confirmed. | None direct. | `src/data/industries`. | Sector taxonomy reference. | Medium. | retain-future-review |
| `src/features/legacy/components/InteractiveProductDemo.tsx` | Earlier interactive demo. | Shared UI. | None confirmed. | None direct. | `src/data/product-demos`. | Product demo patterns. | Medium. | delete-confirmed-dead |
| `src/features/legacy/components/Network.tsx` | Earlier network section. | Layout logo, shared UI. | None confirmed. | None direct. | `src/data/network`. | Rede Qualidade e Vida messaging. | Medium. | delete-confirmed-dead |
| `src/features/legacy/components/Problems.tsx` | Earlier problem cards. | Shared UI. | None confirmed. | None direct. | `src/data/problems`. | Problem taxonomy reference. | Low. | delete-confirmed-dead |
| `src/features/legacy/components/ProblemSelector.tsx` | Earlier problem selector. | Shared UI. | None confirmed. | None direct. | `src/data/business-problems`. | SolutionFinder comparison. | Medium. | retain-future-review |
| `src/features/legacy/components/Process.tsx` | Earlier process section. | Shared UI. | None confirmed. | None direct. | `src/data/process`. | Process copy reference. | Low. | retain-future-review |
| `src/features/legacy/components/Services.tsx` | Earlier services accordion/cards. | Shared UI. | None confirmed. | None direct. | `src/data/services`. | Services taxonomy reference. | Medium. | delete-confirmed-dead |
| `src/features/legacy/components/SolutionExamples.tsx` | Earlier solution examples. | Shared UI. | None confirmed. | None direct. | `src/data/solution-examples`. | Future examples copy. | Medium. | retain-future-review |

## Next Cleanup Step

Before deletion, review each legacy concept with product/design. If the idea should be preserved, move it into documentation or active feature data before removing executable code.
