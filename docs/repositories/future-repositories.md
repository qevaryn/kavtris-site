# Future repository catalog

Status: Conceptual
Audience: Technical Lead and Future Team Owners

See [../README.md](../README.md).

No repositories listed here currently exist unless explicitly stated. The current repository remains the source of truth.

## KAVTRIS-web

Status: Future evolution of the current repository.

Purpose: responsive public web application, marketing, product catalog, product presentations, enterprise pages and client-side contact experience.

Potential contents: `src/app`, `src/features`, `src/components`, web-specific configuration, web unit tests and web build configuration.

Dependencies: shared contracts and shared API.

Owned contracts: web route and client interaction contracts.

Deployment responsibility: web platform deployment.

Release responsibility: frontend web release owner.

Extraction trigger: API becomes independently deployed, multiple backend clients exist, ownership becomes independent, or web/API release cadence diverges.

Risk of early extraction: duplicated setup, harder local development and premature coordination overhead.

Integration method: versioned API, shared contracts and compatible releases.

It must remain one responsive application. Do not split desktop and mobile web into different repositories.

## KAVTRIS-api

Status: Conceptual - not implemented.

Purpose: shared API for web, future native mobile app, future internal tools, authentication, domain services, notifications, integrations and persistence.

Potential current extraction candidate: `src/server/contact`, `src/services/email`, `src/config/server-env.ts` and the current contact API contract.

Dependencies: contracts, provider integrations and deployment environment.

Owned contracts: API request/response behavior.

Deployment responsibility: backend/API deployment.

Release responsibility: backend/API owner.

Extraction trigger: multiple clients consume the API, independent backend deployment is required, persistent data or authentication is introduced, scaling differs from frontend, or backend team lifecycle becomes independent.

Risk of early extraction: operational overhead before backend scope justifies it.

Integration method: versioned HTTP API, shared contracts and documented compatibility.

## KAVTRIS-contracts

Status: Conceptual - not published.

Purpose: provider-neutral shared contracts, request/response types, common identifiers and versioned integration contracts.

Potential contents: `ContactApiResponse`, contact request fields, `ContactIntent`, product identifiers and future API contracts.

Must not contain: React components, Next.js routes, Resend types, database implementations or UI-specific state.

Extraction trigger: web and API exist in separate repositories, more than one client consumes contracts, or contract versioning becomes necessary.

Integration method: private npm package, generated API client or OpenAPI-derived types. These are conceptual and not implemented.

## KAVTRIS-qa-web

Status: Conceptual - current QA remains inside this repository.

Purpose: black-box web E2E, desktop web testing, mobile web testing, accessibility-oriented testing, visual validation and environment smoke testing.

Potential contents: `tests/web-shared`, `tests/web-desktop`, `tests/web-mobile`, `tests/accessibility`, `tests/visual`, `tests/shared` and Playwright configuration.

Extraction trigger: dedicated QA team exists, QA releases independently, tests validate multiple deployed environments, or repository access boundaries require separation.

Risk: application and test selectors may become unsynchronized; version coordination becomes necessary.

Integration method: deployed environment contract, stable selectors and CI pipelines.

## KAVTRIS-mobile-app

Status: Conceptual - no native application currently exists.

Purpose: future iOS and Android product application, shared native application logic and native device capabilities.

It must not be confused with mobile web.

Extraction trigger: real native product requirement, offline/device APIs, app-store distribution or native release lifecycle.

Integration method: shared API and versioned contracts.

Do not create a separate mobile backend.

## KAVTRIS-ui

Status: Conditional.

Purpose: reusable UI components across multiple active applications.

Potential contents: Button, form controls, design tokens, accessible tabs, accessible accordions and brand primitives.

Extraction trigger: at least two active applications reuse the components, independent UI versioning is needed, and design-system ownership exists.

Risk of early extraction: site-specific components become falsely generic and package maintenance slows iteration.

## KAVTRIS-docs

Status: Conditional.

Purpose: architecture, operations, API, product documentation and cross-repository decisions.

Extraction trigger: documentation spans several active repositories or independent documentation publishing exists.

Until then, documentation remains inside the current repository.

## KAVTRIS-infrastructure

Status: Conditional.

Purpose: infrastructure as code, environments, deployment configuration, monitoring, DNS, secrets integration and platform policies.

Extraction trigger: infrastructure code exists, multiple deployed services require shared operations, or DevOps ownership becomes independent.

Do not create an infrastructure repository for a single Vercel application without infrastructure code.
