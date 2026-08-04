# API compatibility strategy

Status: Current guidance
Audience: Backend, Frontend, QA and Technical Lead

See [../README.md](../README.md).

The current endpoint remains:

```text
POST /api/contact
```

The current request and response behavior is the compatibility baseline.

Future external API extraction must preserve compatibility or provide a migration path.

## Compatibility Rules

- clients depend on documented contracts;
- provider errors remain internal;
- status codes and response shapes must be intentionally versioned if changed;
- contract tests should validate compatibility;
- no client imports server implementations.

## Future Versioning Options

Conceptual options:

- URL versioning;
- header versioning;
- schema versioning;
- package versioning.

No future API-versioning approach is chosen yet because no external API exists.
