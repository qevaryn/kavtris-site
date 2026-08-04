# Contract ownership and versioning

Status: Current guidance
Audience: Frontend, Backend and Technical Lead

See [../README.md](../README.md).

## Current Behavior

Contracts are local TypeScript modules in `src/domain`.

The web and API are in the same repository. TypeScript compilation provides local compatibility.

## Future Behavior After Extraction

If web and API are split:

- contracts require explicit versions;
- backwards compatibility must be considered;
- API changes must be coordinated;
- clients must not import server implementations;
- provider-specific types must not enter public contracts.

## Semantic Versioning Concept

```text
PATCH
compatible correction

MINOR
backwards-compatible addition

MAJOR
breaking contract change
```

No package is published now. No API version prefix is added now.
