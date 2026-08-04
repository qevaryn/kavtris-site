# Web mobile QA

Mobile QA is responsive browser testing, not native application testing.

Mobile web tests run through:

```bash
npm run test:e2e:mobile
```

Project:

```text
web-mobile-chromium
```

Viewport:

```text
390 x 844
```

Mobile tests live in:

- `tests/web-mobile/**`
- `tests/accessibility/mobile/**`
- `tests/visual/mobile/**`

They should cover mobile menu behavior, focus restoration, touch target usability, horizontal overflow, one-column product cards and mobile-specific layout behavior.

Use manual viewport overrides only when a test intentionally validates a specific narrow width such as 320px.
