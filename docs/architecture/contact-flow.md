# Contact flow

The contact flow supports general requests, product-specific requests, enterprise requests and custom-solution requests.

## Client flow

```text
URL query
→ resolveContactIntent
→ ContactForm preselection
→ React Hook Form validation
→ POST /api/contact
→ success or error state
```

Supported query parameters:

```text
?produto=fieldops
?tipo=empresa
?tipo=personalizada
```

Product and type parameters may appear together. The resolver preserves the product slug while still identifying enterprise or custom-solution intent.

## Server flow

```text
src/app/api/contact/route.ts
→ contact schema validation
→ honeypot check
→ process-local rate limit
→ src/server/contact/contact.service.ts
→ src/services/email/resend.ts
→ Resend
```

The API route keeps the same HTTP response shape and status codes as before the organization work.

The rate limiter is process-local. It is suitable as a lightweight protection layer for the current deployment model, but it is not a distributed abuse-prevention system.

## Contracts

Contact request validation lives in `src/domain/contact/contracts.ts`.

Contact intent typing lives in `src/domain/contact/types.ts`.
