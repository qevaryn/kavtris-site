# Documentation index

Status: Current
Audience: Frontend, Backend, QA and Technical Lead

This directory documents the architecture that currently exists. Future ideas are labeled as conceptual or not implemented.

## Architecture

- [architecture/overview.md](architecture/overview.md)
  Audience: all technical contributors
  Purpose: repository boundaries and dependency direction.
  Status: current.

- [architecture/frontend.md](architecture/frontend.md)
  Audience: frontend developers and technical leads
  Purpose: where frontend code belongs and how route wrappers use features.
  Status: current.

- [architecture/responsive-web.md](architecture/responsive-web.md)
  Audience: frontend and QA
  Purpose: responsive web strategy and CSS-first behavior.
  Status: current.

- [architecture/frontend-responsibilities.md](architecture/frontend-responsibilities.md)
  Audience: frontend desktop/mobile web owners
  Purpose: shared, desktop-specific, mobile-specific and responsive ownership.
  Status: current.

- [architecture/shared-backend.md](architecture/shared-backend.md)
  Audience: frontend, backend and technical lead
  Purpose: shared API boundary and future extraction conditions.
  Status: current.

- [architecture/contact-flow.md](architecture/contact-flow.md)
  Audience: frontend, backend and QA
  Purpose: current contact form and API flow.
  Status: current.

- [architecture/contracts.md](architecture/contracts.md)
  Audience: frontend, backend and technical lead
  Purpose: domain contracts and transport boundaries.
  Status: current.

## QA

- [qa/strategy.md](qa/strategy.md)
  Audience: QA and developers
  Purpose: test ownership across unit, desktop, mobile, API, accessibility and visual checks.
  Status: current.

- [qa/web-desktop.md](qa/web-desktop.md)
  Audience: web desktop QA
  Purpose: desktop project scope and command.
  Status: current.

- [qa/web-mobile.md](qa/web-mobile.md)
  Audience: web mobile QA
  Purpose: responsive mobile project scope and command.
  Status: current.

- [qa/api.md](qa/api.md)
  Audience: API QA and backend
  Purpose: direct API test ownership.
  Status: current.

- [qa/writing-tests.md](qa/writing-tests.md)
  Audience: QA and developers
  Purpose: how to choose test location, locators and assertions.
  Status: current.

## Development

- [../CONTRIBUTING.md](../CONTRIBUTING.md)
  Audience: all contributors
  Purpose: contribution entry point.
  Status: current.

- [development/branching.md](development/branching.md)
  Audience: all contributors
  Purpose: current branch evidence and recommended branch naming.
  Status: current.

- [development/setup.md](development/setup.md)
  Audience: new contributors
  Purpose: local setup, environment and common setup failures.
  Status: current.

- [development/coding-standards.md](development/coding-standards.md)
  Audience: developers
  Purpose: project coding rules and architecture boundaries.
  Status: current.

- [development/naming.md](development/naming.md)
  Audience: developers and QA
  Purpose: naming conventions for components, services, tests and folders.
  Status: current.

- [development/commits.md](development/commits.md)
  Audience: all contributors
  Purpose: commit style and atomicity.
  Status: current.

- [development/pull-requests.md](development/pull-requests.md)
  Audience: all contributors
  Purpose: PR checklist and review expectations.
  Status: current.

- [development/troubleshooting.md](development/troubleshooting.md)
  Audience: all contributors
  Purpose: common local issues and fixes.
  Status: current.

## Products And Features

- [products/fieldops.md](products/fieldops.md)
  Audience: frontend, QA and product
  Purpose: technical guide to the FieldOps product page implementation.
  Status: current.

- [features/contact.md](features/contact.md)
  Audience: frontend, backend and QA
  Purpose: contact feature responsibilities and API integration.
  Status: current.

## Institutional, Company And Product Baseline

### Rede Qualidade é Vida

- [governance/rede-qualidade-e-vida.md](governance/rede-qualidade-e-vida.md)
  Audience: owner, product, legal, commercial, partners and future collaborators
  Purpose: institutional governance, brand, cooperation and network rules baseline.
  Status: draft strategic baseline.

### Qevaryn Systems

- [governance/qevaryn-systems.md](governance/qevaryn-systems.md)
  Audience: owner, product, commercial, engineering, QA, legal and future collaborators
  Purpose: company identity, operations, services, contracts and business model baseline.
  Status: draft company baseline.

### Qevaryn Platform

- [products/qevaryn-platform-first-product.md](products/qevaryn-platform-first-product.md)
  Audience: product, design, frontend, backend, QA, commercial and legal
  Purpose: modular platform concept, first product "Pedidos e Trabalhos" and illustrative plans baseline.
  Status: draft product baseline.

> Estes documentos registam decisões institucionais, empresariais e de produto. Itens classificados como proposta, exemplo ou a validar não representam funcionalidades implementadas nem compromissos públicos.

## Visual Assets

- [visual-assets/audit.md](visual-assets/audit.md)
  Audience: product, design, frontend, QA and technical lead
  Purpose: current visual-asset audit and replacement priorities.
  Status: snapshot.

- [visual-assets/inventory.md](visual-assets/inventory.md)
  Audience: frontend, QA and technical lead
  Purpose: current asset metadata, usage and integrity baseline.
  Status: snapshot.

- [visual-assets/product-comparison.md](visual-assets/product-comparison.md)
  Audience: product, design and frontend
  Purpose: comparison of the six current product visuals.
  Status: snapshot.

- [visual-assets/phase-2-requirements.md](visual-assets/phase-2-requirements.md)
  Audience: product, design, frontend and QA
  Purpose: Phase 1 requirements that Phase 2 resolved.
  Status: superseded snapshot.

- [visual-assets/system-principles.md](visual-assets/system-principles.md)
  Audience: product, design, frontend, QA and technical lead
  Purpose: product visual-system principles and shared visual family.
  Status: current specification.

- [visual-assets/technical-specification.md](visual-assets/technical-specification.md)
  Audience: design, frontend, QA and technical lead
  Purpose: ratios, safe areas, export rules, naming and future directory strategy.
  Status: current specification.

- [visual-assets/product-briefs.md](visual-assets/product-briefs.md)
  Audience: product, design, frontend, QA and technical lead
  Purpose: product-specific visual briefs for the six current product concepts.
  Status: current specification.

- [visual-assets/review-and-acceptance.md](visual-assets/review-and-acceptance.md)
  Audience: product, design, frontend, QA, accessibility and technical lead
  Purpose: review sequence, acceptance criteria and production-method guidance.
  Status: current specification.

- [visual-assets/phase-3-production-plan.md](visual-assets/phase-3-production-plan.md)
  Audience: product, design, frontend, QA and technical lead
  Purpose: proposed image-production and replacement plan for Visual Phase 3.
  Status: proposed plan.

## Decisions

- [decisions/ADR-001-single-responsive-web-app.md](decisions/ADR-001-single-responsive-web-app.md)
- [decisions/ADR-002-shared-backend-api.md](decisions/ADR-002-shared-backend-api.md)
- [decisions/ADR-003-feature-based-organization.md](decisions/ADR-003-feature-based-organization.md)
- [decisions/ADR-004-qa-responsibility-separation.md](decisions/ADR-004-qa-responsibility-separation.md)
- [decisions/ADR-005-future-repository-extraction.md](decisions/ADR-005-future-repository-extraction.md)

## Repositories

- [repositories/current-repository.md](repositories/current-repository.md)
  Audience: technical lead and all contributors
  Purpose: what this repository owns today.
  Status: current.

- [repositories/future-repositories.md](repositories/future-repositories.md)
  Audience: technical lead and future team owners
  Purpose: conceptual future repository catalog and extraction triggers.
  Status: conceptual.

- [repositories/extraction-triggers.md](repositories/extraction-triggers.md)
  Audience: technical lead
  Purpose: matrix for when extraction is justified.
  Status: current guidance.

- [repositories/integration-model.md](repositories/integration-model.md)
  Audience: frontend, backend, QA and DevOps
  Purpose: how future repositories integrate without copying code.
  Status: conceptual.

- [repositories/current-repository-future.md](repositories/current-repository-future.md)
  Audience: technical lead
  Purpose: likely future role of this repository.
  Status: current recommendation.

- [repositories/contract-versioning.md](repositories/contract-versioning.md)
  Audience: frontend, backend and technical lead
  Purpose: future versioning model for extracted contracts.
  Status: current guidance.

- [repositories/api-compatibility.md](repositories/api-compatibility.md)
  Audience: frontend, backend and QA
  Purpose: current API compatibility baseline and future options.
  Status: current guidance.

- [repositories/extraction-checklist.md](repositories/extraction-checklist.md)
  Audience: technical lead and future repository owners
  Purpose: readiness checklist before extraction.
  Status: current guidance.

- [repositories/extraction-runbook.md](repositories/extraction-runbook.md)
  Audience: technical lead and future repository owners
  Purpose: conceptual safe extraction process.
  Status: conceptual.

- [repositories/integration-and-rollback.md](repositories/integration-and-rollback.md)
  Audience: frontend, backend, QA and DevOps
  Purpose: future integration failure scenarios and rollback thinking.
  Status: conceptual.

## Ownership

- [ownership/team-responsibilities.md](ownership/team-responsibilities.md)
  Audience: all contributors
  Purpose: role-based responsibilities without real usernames.
  Status: current guidance.

- [ownership/responsibility-matrix.md](ownership/responsibility-matrix.md)
  Audience: technical lead and reviewers
  Purpose: lightweight owner/reviewer matrix.
  Status: current guidance.

- [ownership/team-handoffs.md](ownership/team-handoffs.md)
  Audience: product, design, development and QA
  Purpose: practical handoff expectations.
  Status: current guidance.

- [ownership/codeowners-plan.md](ownership/codeowners-plan.md)
  Audience: technical lead and repository admins
  Purpose: future CODEOWNERS plan without fake usernames.
  Status: future plan.

- [ownership/access-and-secrets.md](ownership/access-and-secrets.md)
  Audience: technical lead, DevOps and security/privacy
  Purpose: access and secret ownership guidance.
  Status: current guidance.

## Operations

- [operations/deployment.md](operations/deployment.md)
  Audience: DevOps and release owners
  Purpose: confirmed build/deploy evidence and smoke workflow.
  Status: current evidence and guidance.

- [operations/environments.md](operations/environments.md)
  Audience: DevOps, backend, frontend and QA
  Purpose: local, test, preview and production environment expectations.
  Status: current guidance.

- [operations/release-responsibilities.md](operations/release-responsibilities.md)
  Audience: release owners and reviewers
  Purpose: lightweight release responsibilities based on repository evidence.
  Status: current guidance.

## Operations And Limitations

- [known-limitations.md](known-limitations.md)
  Audience: all contributors
  Purpose: confirmed limitations and investigation items.
  Status: current.

## Governance

- [governance/repository-maintenance.md](governance/repository-maintenance.md)
  Audience: technical lead, DevOps, QA and maintainers
  Purpose: periodic maintenance responsibilities.
  Status: current guidance.

- [governance/definition-of-done.md](governance/definition-of-done.md)
  Audience: all contributors
  Purpose: proportional Definition of Done.
  Status: current guidance.

- [governance/final-architecture-map.md](governance/final-architecture-map.md)
  Audience: all technical contributors
  Purpose: final architecture snapshot.
  Status: current snapshot.

- [governance/final-readiness-report.md](governance/final-readiness-report.md)
  Audience: technical lead and reviewers
  Purpose: final organization-readiness summary.
  Status: snapshot.

- [governance/merge-strategy.md](governance/merge-strategy.md)
  Audience: maintainers
  Purpose: final branch merge recommendation.
  Status: current recommendation.

## Legacy

- [legacy/policy.md](legacy/policy.md)
  Audience: technical lead, frontend and QA
  Purpose: evidence required before legacy deletion.
  Status: current guidance.

- [legacy/inventory.md](legacy/inventory.md)
  Audience: technical lead, frontend and QA
  Purpose: Phase 8 legacy inventory.
  Status: snapshot.

## Investigations

- [investigations/hydration-caret-color.md](investigations/hydration-caret-color.md)
  Audience: frontend and QA
  Purpose: hydration warning evidence and decision.
  Status: investigation snapshot.
