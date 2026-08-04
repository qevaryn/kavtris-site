# Shared backend boundary

The current backend remains inside the Next.js application.

There is one shared API boundary for desktop web, mobile web and any future clients. The project must not create separate desktop, mobile or product-specific backends.

## Current implemented boundary

```text
Responsive Web
        |
        v
POST /api/contact
        |
        v
src/server/contact
        |
        v
src/services/email
        |
        v
Resend
```

The contact API is the first backend boundary in the project. It receives contact requests, validates the transport payload, applies lightweight abuse controls and sends a notification email.

## Future conceptual boundary

The following modules are conceptual and not implemented yet:

```text
Responsive Web
Future Native Mobile
Future Internal Tools
        |
        v
Shared Qevaryn API
        |
        |-- Contact
        |-- Authentication
        |-- Products
        |-- Notifications
        `-- Integrations
```

Extraction to a future `qevaryn-api` repository is only justified when there are multiple active clients or backend operational needs such as independent deployment, persistence, authentication, monitoring or integrations.

## Current limitations

- No persistent data exists.
- No authentication exists.
- No database exists.
- No queue exists.
- No separate mobile backend exists.
- The rate limiter is process-local and is not a distributed abuse-prevention system.
- Resend is an outer integration detail and must not leak into frontend features or domain contracts.

## Dependency direction

```text
Frontend features
-> domain contact contracts
-> API route
-> server contact controller/service
-> email provider contract
-> Resend provider implementation
```

Domain contracts must not import React, Next.js, server code or Resend. Client Components must not import from `src/server` or provider implementations.
