# Hydration Investigation: `caret-color: transparent`

Status: Investigation snapshot
Audience: Frontend and QA

## Summary

React hydration warnings involving `caret-color: transparent` have appeared during Playwright desktop runs around the homepage contact form.

The warning has not caused a failed build or failed E2E suite.

## Confirmed Evidence

- Route: `/`
- Area: contact form inputs and textarea inside `#contacto`
- Project observed: `web-desktop-chromium`
- Server mode observed: local Playwright web server using `npm run dev` for non-CI scoped runs
- First-run desktop result in Phase 8: 51 tests passed, warning appeared in server output
- First-run mobile result in Phase 8: 9 tests passed, warning did not block execution
- Complete `CI=1 npm run test:e2e`: 63 tests passed

The warning shows server/client mismatch where client-side markup includes an inline style similar to:

```text
style={{caret-color:"transparent"}}
```

on form controls.

## Source Search

Search terms reviewed:

```text
caret-color
caretColor
style=
contentEditable
window.innerWidth
matchMedia
navigator.userAgent
```

No application source currently defines `caret-color: transparent`.

## Current Assessment

The current evidence points to a development/test-environment mutation or browser/tooling behavior rather than confirmed application code.

No production behavior defect has been proven.

## Decision

Document only.

No code fix was applied because:

- the application source causing the mismatch was not identified;
- the full test suite passes;
- no user-visible defect was confirmed;
- speculative use of `suppressHydrationWarning` would hide evidence without fixing root cause.

## Future Investigation

If this becomes noisy or starts failing tests:

1. Run the same contact-form route under `next build` + `next start`.
2. Capture browser console messages from a minimal test visiting only `/`.
3. Compare serialized form-control attributes before and after hydration.
4. Check whether the warning appears with browser extensions disabled and without development overlay.
5. Apply a fix only if application code is proven to create the mismatch.
