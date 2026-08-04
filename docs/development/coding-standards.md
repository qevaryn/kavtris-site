# Coding standards

Status: Current
Audience: Developers

See [../README.md](../README.md).

## General

- Prefer small, behavior-preserving changes.
- Keep routes thin.
- Keep feature code inside its feature.
- Keep domain contracts pure.
- Keep provider integrations outside features.
- Do not create separate desktop/mobile pages or APIs.
- Do not add abstractions unless they remove real coupling.

## TypeScript

- Use explicit public types for contracts crossing layers.
- Keep domain files free of React, Next.js and provider imports.
- Avoid broad barrel exports that hide circular dependencies.

## React And Next.js

- Use Server Components for static content where practical.
- Use Client Components for forms, tabs, accordions, filters and browser interactions.
- Client Components must not import from `src/server` or provider implementations.

## Forms And Validation

- Client validation improves user experience.
- Server validation is still required.
- Preserve contact payload and response compatibility unless a dedicated API change is approved.

## Responsive Web

- CSS handles spacing, columns, wrapping and button stacking.
- Component separation is justified only for different interaction, structure or information hierarchy.
- Do not use user-agent detection for layout.

## Comments

Code explains what. Comments explain why.

Good comments document non-obvious decisions such as process-local rate limiting, focus restoration or provider-neutral boundaries.

Do not comment obvious JSX, Tailwind classes or variable assignments.

## Tests

- Prefer accessible roles, labels and visible behavior.
- Avoid Tailwind-class selectors and DOM-position selectors.
- Add `data-testid` only when accessible locators are not sufficient.
- Do not weaken assertions to make a refactor pass.
