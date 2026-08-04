# Definition Of Done

Status: Current guidance
Audience: Product, frontend, backend, QA and reviewers

Apply this checklist according to the scope of the change. Documentation-only changes do not need every product, frontend, backend or visual item.

## Product

- Acceptance criteria are met.
- Explicit exclusions are respected.
- Visible copy is reviewed.
- Product concepts are not described as completed SaaS products unless they are actually completed.

## Frontend

- Desktop web and mobile web are considered.
- Keyboard and touch behavior are reviewed where relevant.
- No page-level horizontal overflow is introduced.
- Responsive ownership remains clear.
- Shared UI remains domain-neutral.

## Backend

- API contract is preserved or intentionally versioned.
- Server validation is present.
- Provider errors are not exposed directly to users.
- Environment requirements are documented.
- One shared API boundary remains.

## QA

- Relevant unit, shared web, desktop, mobile and API tests are updated.
- Regression results are reported.
- No unexplained skipped tests are introduced.
- Flaky behavior is documented instead of hidden with arbitrary waits.

## Accessibility

- Semantic controls are used.
- Form labels and errors are associated.
- Focus is visible.
- Keyboard operation is supported.
- ARIA is used where required and not added where native semantics are enough.

## Documentation

- Paths and commands are updated.
- Architecture decisions are recorded when necessary.
- Known limitations are updated.
- Current and conceptual states are clearly separated.

## Delivery

- Build passes.
- Rollback is considered.
- Preview or deployment is validated when applicable.
