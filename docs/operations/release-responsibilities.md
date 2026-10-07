# Release responsibilities

Status: Current evidence and future guidance
Audience: Release Owners and Reviewers

See [../README.md](../README.md).

## Confirmed Current Evidence

CI runs on:

```text
push to main
pull_request
workflow_dispatch (manual published smoke with base_url)
```

`main` is the only local and remote branch. See
[branching](../development/branching.md) for the source workflow.

## Lightweight Release Flow

Recommended current flow:

```text
small change on main
-> local diff review and relevant checks
-> commit and push main
-> automated CI validation
-> deployment through external platform
-> smoke validation when needed
```

Do not assume deployment behavior that is not visible in this repository.

## Responsibilities

- Developer: implement, self-review and run relevant tests.
- Reviewer: check behavior, architecture and test adequacy.
- QA: validate affected routes, viewports and API paths.
- Technical Lead: approve architecture, contract and extraction-sensitive changes.
- DevOps/Platform: own deployment settings, environment variables and rollback.
- Product: approve user-facing scope when product behavior changes.

Minor documentation-only changes do not need the full flow unless they affect operational instructions.
