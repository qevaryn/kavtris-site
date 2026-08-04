# Team responsibilities

Status: Current guidance
Audience: All future contributors

See [../README.md](../README.md).

Ownership is role-based. No real usernames or GitHub teams are defined here.

## Technical Lead

Owns architecture direction, dependency boundaries, extraction decisions and final tradeoffs.

Reviews changes touching `src/domain`, `src/server`, `src/services`, repository structure, CI and ADRs.

Does not replace product, design, QA or security review when those concerns are affected.

## Product

Owns problem definition, target users, acceptance criteria, priority, scope and exclusions.

Reviews product journeys, product positioning and feature intent.

Does not own implementation details or provider credentials.

## Design

Owns visual direction, responsive states, interaction states, empty/error/loading states and asset quality.

Collaborates with Frontend Web, Accessibility and Product.

## Frontend Web

Owns `src/app`, `src/features`, `src/components`, client integration with public contracts and frontend unit tests.

Collaborates with Design, Backend/API, QA and Accessibility.

Does not own provider credentials, server email implementation or production infrastructure.

## Frontend Responsive / Mobile Web

Owns mobile web navigation, touch usability, responsive composition, small-screen behavior and mobile web tests with QA.

Does not own native mobile applications, mobile backends or separate mobile routes.

## Backend / API

Owns `src/server`, `src/services`, `src/config/server-env.ts`, API route behavior, server validation and provider integrations.

Does not own frontend visual layout or separate desktop/mobile APIs.

## QA Web Desktop

Owns desktop-specific E2E coverage under `tests/web-desktop` and desktop aspects of `tests/web-shared`.

## QA Web Mobile

Owns mobile web tests under `tests/web-mobile`, mobile accessibility behavior, responsive overflow and touch-oriented journeys.

QA mobile web is not native-mobile QA.

## QA API

Owns direct request/response tests under `tests/api` and collaborates with Backend/API on contract behavior.

## Accessibility

Owns practical accessibility checks, keyboard behavior, focus management and ARIA review.

## DevOps / Platform

Owns CI, deployment configuration, environment setup, smoke test execution and future infrastructure when it exists.

## Security / Privacy

Owns privacy review, secret handling, access controls, incident access and security-sensitive changes.
