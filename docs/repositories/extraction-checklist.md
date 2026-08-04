# Repository extraction checklist

Status: Current guidance
Audience: Technical Lead and Future Repository Owners

See [../README.md](../README.md).

A future extraction must not happen until this checklist is satisfied.

## Technical

- Dependency direction is clean.
- Contracts are explicit.
- Forbidden imports are removed.
- Independent build exists.
- Independent tests exist.
- Environment contract is documented.
- Release process is defined.
- Deployment target exists.
- Logging/monitoring ownership exists where needed.

## Product

- Independent lifecycle exists.
- Product ownership exists.
- Scope is stable enough.
- Consumers are known.

## Team

- Primary owner exists.
- Reviewers exist.
- Operational responsibility exists.
- Incident owner exists when applicable.

## Integration

- Version strategy exists.
- Compatibility tests exist.
- Rollback exists.
- Dependency update process exists.
- Migration plan exists.

## Security

- Secret ownership is defined.
- Access control is defined.
- Data classification is understood.
- Dependency scanning ownership exists.
- Incident process exists.

Repository extraction is an operational decision, not a folder-organization decision.
