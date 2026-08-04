# Web desktop QA

Desktop web tests run through:

```bash
npm run test:e2e:desktop
```

Project:

```text
web-desktop-chromium
```

The desktop project runs:

- `tests/web-shared/**`
- `tests/web-desktop/**`
- `tests/accessibility/shared/**`
- `tests/accessibility/desktop/**`
- `tests/visual/shared/**`
- `tests/visual/desktop/**`

Desktop-specific tests should cover behavior that is structurally desktop, such as the full desktop header navigation.

Do not place a test in `web-desktop` merely because it was first written on a desktop viewport.
