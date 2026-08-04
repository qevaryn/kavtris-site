# Repository integration model

Status: Conceptual
Audience: Technical Lead, Backend, Frontend, QA and DevOps

See [../README.md](../README.md).

Future integration must not rely on periodically copying source code between repositories.

```text
qevaryn-web
    |
    |-- versioned API
    |-- versioned contracts
    `-- published shared UI package when justified

qevaryn-mobile-app
    |
    |-- versioned API
    `-- versioned contracts

qevaryn-qa-web
    |
    `-- deployed environment contract
```

## Integration Mechanisms

Conceptual future mechanisms:

- HTTP APIs;
- private packages;
- generated clients;
- schema validation;
- semantic versioning;
- release manifests;
- environment URLs;
- contract tests.

These are not currently implemented.

## Avoid

- copying folders between repositories;
- Git submodules by default;
- merging independent repository history back manually;
- importing server implementations into clients.
