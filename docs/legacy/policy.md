# Legacy Policy

Status: Current guidance
Audience: Technical lead, frontend and QA

Legacy code is code intentionally retained after the active product changed.

Legacy is not automatically dead code. It may preserve an interaction pattern, product concept, copy structure or visual idea that should be reviewed before deletion.

## What Qualifies As Legacy

- A component no longer rendered by current routes.
- Data used only by retained legacy components.
- A visual or interaction concept replaced by a newer implementation.
- A file retained because future product review may reuse the idea.

## Marking Legacy

Legacy code should live in an explicit legacy area when practical, such as:

```text
src/features/legacy
```

If a legacy file remains elsewhere, document why moving it would create more risk than value.

## Removal Evidence

Before deleting a legacy file, confirm:

- no static import exists;
- no dynamic import exists;
- no route depends on it;
- no test depends on it;
- no documentation presents it as active;
- no uniquely required asset depends on it;
- no product decision preserved it for future review;
- typecheck, build and relevant E2E tests pass after removal.

## Decisions

Use one of these decisions:

- `retain-active-reference`
- `retain-future-review`
- `archive-documentation-only`
- `delete-confirmed-dead`
- `merge-duplicate`

Default to `retain-future-review` when evidence is incomplete.

## Ownership

The technical lead owns deletion decisions. Product/design input is required when a legacy file preserves a business concept or visual direction.
