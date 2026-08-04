# Commits

Status: Current
Audience: All contributors

See [../README.md](../README.md).

Use small commits with one clear responsibility.

Preferred prefixes:

```text
feat:
fix:
refactor:
test:
docs:
chore:
```

Examples:

```text
refactor: separate contact server orchestration
test: strengthen contact API boundaries
docs: document shared backend contracts
```

Do not mix unrelated visual changes, architecture moves and test rewrites in the same commit.

When moving files, commit by boundary so review can distinguish pure movement from behavior changes.
