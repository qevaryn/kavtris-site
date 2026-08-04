# Branching

Status: Current evidence and recommended convention
Audience: All contributors

See [../README.md](../README.md).

## Current Observed Behavior

Repository workflows show:

```text
push to main
push to master
pull_request
```

Local branches observed during the organization work include:

```text
develop
main
docs/*
refactor/*
```

Do not document a full GitFlow model as current fact. The workflow does not currently assign special CI behavior to `develop`.

## Recommended Future Convention

Use focused branch names:

```text
feat/<short-topic>
fix/<short-topic>
refactor/<short-topic>
test/<short-topic>
docs/<short-topic>
chore/<short-topic>
```

Keep phase/integration branches only when a larger planned initiative needs reviewable steps.

## Merge Guidance

When a final integration branch already contains previous phase history, merge that final branch instead of merging older phase branches separately.

Avoid duplicating commits or reintroducing older file versions.
