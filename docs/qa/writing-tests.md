# Writing tests

Status: Current
Audience: QA and Developers

See [../README.md](../README.md).

## Choose The Right Location

```text
src/**/*.test.ts
```

Pure unit tests close to implementation.

```text
tests/web-shared
```

Viewport-independent user behavior.

```text
tests/web-desktop
```

Desktop-specific behavior such as desktop navigation.

```text
tests/web-mobile
```

Mobile-specific responsive behavior such as mobile menu, overflow and one-column layout.

```text
tests/api
```

Direct request/response API behavior.

```text
tests/accessibility
```

Axe, keyboard, focus and ARIA behavior.

```text
tests/visual
```

Image loading and purposeful screenshot audit artifacts. This is not a full visual-regression baseline system.

## Locator Priority

Use this order:

1. accessible role and name;
2. associated form label;
3. visible semantic heading;
4. stable user-facing text;
5. deliberate `data-testid` only when no accessible locator is suitable.

Avoid Tailwind class selectors, DOM-position selectors and React implementation details.

## Assertions

Assert the behavior that matters to users or API consumers.

Do not only check that an element exists when the test needs to prove state, destination, selected value or response shape.

## Duplicated Execution

Do not run every shared test in both desktop and mobile projects. Shared tests run once unless viewport behavior is part of the contract.

## API Tests

API tests use Playwright's request fixture. They must not call the real email provider or require secrets.

Prefer deterministic cases:

- invalid payload;
- missing configuration;
- honeypot rejection;
- response shape.

Avoid flaky timing-based rate-limit tests.
