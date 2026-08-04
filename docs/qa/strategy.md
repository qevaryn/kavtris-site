# QA strategy

The project keeps one responsive web application and one shared API boundary.

Automated tests are organized by responsibility:

- Unit tests stay close to implementation under `src/**/*.test.ts`.
- Web shared tests validate behavior that is independent of viewport.
- Desktop tests validate desktop-specific navigation or layout behavior.
- Mobile tests validate responsive mobile behavior, touch-friendly controls, mobile navigation and overflow.
- API tests validate route-handler behavior directly through Playwright's request fixture.
- Accessibility tests focus on Axe, keyboard behavior, focus management and ARIA semantics.
- Visual tests validate images, logo rendering and purposeful screenshot artifacts.

## Current supported Playwright projects

- `web-desktop-chromium`
- `web-mobile-chromium`
- `api`

Firefox, WebKit, native mobile automation and external QA repositories are intentionally not part of this phase.

## Coverage principle

The same shared user journey should not run in both desktop and mobile unless viewport differences are part of the expected behavior. Mobile-specific tests cover the mobile responsibilities directly.
