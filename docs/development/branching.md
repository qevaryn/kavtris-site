# Branching

Status: Current, owner-authorized on 2026-10-07
Audience: All contributors

`main` is the only local and remote development branch. Do not create `develop`,
feature branches, release branches or automated dependency-update branches.

Keep changes small, review the full diff and run the relevant checks before
committing and pushing directly to `main`. Never force-push or discard unique
history. Existing branches may be deleted only after their commits are preserved
on the validated remote `main`.

The canonical cross-repository policy is
`qevaryn/kavtris-docs/docs/governance/git-branching-policy.md`.

Dependency updates are reviewed manually. Main-only Git organization does not
certify production deployment or expand product/runtime authorization.
