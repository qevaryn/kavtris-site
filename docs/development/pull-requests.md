# Pull requests

Status: Current
Audience: All contributors

See [../README.md](../README.md).

## Branch Naming

Use descriptive branch names:

```text
feat/<short-topic>
fix/<short-topic>
refactor/<short-topic>
docs/<short-topic>
```

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
