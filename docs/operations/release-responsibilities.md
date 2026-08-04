# Release responsibilities

Status: Current evidence and future guidance
Audience: Release Owners and Reviewers

See [../README.md](../README.md).

## Confirmed Current Evidence

CI runs on:

```text
push to main
push to master
pull_request
```

The repository also has local branches such as `develop`, but the CI workflow does not currently define a special deployment behavior for `develop`.

## Lightweight Release Flow

Recommended current flow:

```text
feature branch
-> pull request
-> automated validation
-> review
-> merge into integration or production branch
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
