# Pull requests

Status: Current
Audience: All contributors

See [../README.md](../README.md).

## Current Delivery Flow

The owner requires `main` only. Review the diff and validation evidence locally,
then commit and push directly to `main`; do not create a branch to open a PR.
The review checklist below also applies to direct commits.
See [branching.md](branching.md).

## PR Description

Include:

- summary;
- routes or features affected;
- architecture impact;
- API compatibility impact;
- tests run;
- screenshots when visual behavior changes;
- known limitations;
- rollback notes when relevant.

## Required Checks

For broad changes, run:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

For focused changes, run the smallest relevant subset and explain why it is sufficient.

## Review Focus

Reviewers should check:

- behavior preservation;
- responsive behavior;
- accessibility;
- contact/API compatibility;
- import direction;
- test strength;
- absence of unsupported product or production claims.
