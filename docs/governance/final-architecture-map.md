# Final Architecture Map

Status: Snapshot from Organization Phase 8
Audience: All technical contributors

The repository remains one responsive web application with one shared API boundary.

```text
Responsive web application
├── src/app
│   ├── route adapters
│   ├── metadata
│   ├── route handlers
│   └── global styles
├── src/features
│   ├── home
│   ├── catalog
│   ├── products
│   │   ├── generic
│   │   └── fieldops
│   ├── enterprise
│   ├── contact
│   └── legacy
├── src/components
│   ├── layout
│   └── shared
├── src/domain
│   ├── contact
│   ├── enterprise
│   └── products
├── src/server
│   └── contact
├── src/services
│   └── email
├── tests
│   ├── web-shared
│   ├── web-desktop
│   ├── web-mobile
│   ├── api
│   ├── accessibility
│   ├── visual
│   └── shared
└── docs
    ├── architecture
    ├── decisions
    ├── development
    ├── governance
    ├── legacy
    ├── operations
    ├── ownership
    ├── qa
    └── repositories
```

## Active Principles

- One web application serves desktop and mobile web.
- One shared API handles contact requests.
- Route files stay thin.
- Feature UI stays under `src/features`.
- Domain contracts remain pure.
- Server orchestration stays separate from provider integrations.
- QA responsibilities are separated by purpose.
- Future repositories are conceptual, not active.

See also:

- [../architecture/overview.md](../architecture/overview.md)
- [../architecture/frontend-responsibilities.md](../architecture/frontend-responsibilities.md)
- [../architecture/shared-backend.md](../architecture/shared-backend.md)
- [../repositories/future-repositories.md](../repositories/future-repositories.md)
