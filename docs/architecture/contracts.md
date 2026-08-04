# Contracts

Status: Current
Audience: Frontend, Backend and Technical Lead

Contracts are the typed agreements between layers of the application.

In this repository, a contract is practical rather than theoretical: it describes data that crosses a boundary between frontend, domain, API, server services or provider integrations.

## Current contact contracts

```text
src/domain/contact/
├── contracts.ts
├── contact-errors.ts
├── types.ts
└── index.ts
```

`contracts.ts` contains the current contact validation schema, form values and API response type.

`types.ts` contains `ContactIntent`, which describes how URL query parameters are interpreted by the contact feature.

`contact-errors.ts` centralizes public response messages and internal error-code names. The public JSON response shape is unchanged.

## Domain versus transport versus form

The current contact flow can safely use the same schema for form and transport validation because the browser and server rules are identical.

If future clients diverge, the project may separate:

- form model: browser-specific fields and UI state;
- transport model: JSON payload sent to the API;
- domain model: provider-neutral business representation.

Do not create separate models before they remove real coupling.

## Future extraction

If a backend repository is extracted, shared contracts can move to a future contracts package or repository. Those contracts must remain independent from:

- React;
- Next.js;
- Resend;
- browser-only APIs;
- server-only implementation details.

Versioning will matter once multiple deployed clients consume the same API. Until then, the repository keeps contracts close to the current implementation and validates compatibility through tests.

See [../README.md](../README.md).
