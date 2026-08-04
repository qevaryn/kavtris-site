# Contact flow

Status: Current
Audience: Frontend, Backend and QA

The contact flow supports general requests, product-specific requests, enterprise requests and custom-solution requests.

## Client flow

```text
URL query
→ src/features/contact/utils/resolveContactIntent.ts
→ src/features/contact/components/ContactForm.tsx
→ React Hook Form + src/domain/contact/contracts.ts
→ src/features/contact/services/submit-contact.ts
→ POST /api/contact
→ visible success or error state
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
→ src/server/contact/contact-controller.ts
→ src/server/contact/contact-rate-limit.ts
→ src/server/contact/contact-validation.ts
→ src/server/contact/contact.service.ts
→ src/services/email/email-provider.ts
→ src/services/email/resend.ts
→ Resend
```

The API route is the Next.js adapter. It converts the server result to `NextResponse` and keeps the public route as `POST /api/contact`.

The server controller preserves the existing public HTTP behavior:

- success: `{ ok: true }`;
- validation failure: `{ ok: false, message: 'Validação inválida.', issues }`;
- rate limit: `{ ok: false, message: 'Foram enviados demasiados pedidos. Tente novamente mais tarde.' }`;
- unconfigured email: `{ ok: false, message: 'O formulário não está configurado para envio neste ambiente.' }`;
- unknown failure: `{ ok: false, message: 'Não foi possível processar o pedido.' }`.

The rate limiter is process-local. It is suitable as a lightweight protection layer for the current deployment model, but it is not a distributed abuse-prevention system.

## Contracts

Contact request validation lives in `src/domain/contact/contracts.ts`.

Contact intent typing lives in `src/domain/contact/types.ts`.

Contact response messages and error-code names live in `src/domain/contact/contact-errors.ts`.

## Email integration

`src/services/email/email-provider.ts` defines the provider-neutral boundary used by the server contact service.

`src/services/email/resend.ts` owns Resend-specific behavior, environment access through `src/config/server-env.ts`, inline logo attachment and provider response handling.

The HTML/text notification template remains in `src/emails/contact-notification.ts`.

The inline CID logo is intentional because email clients need the image attached to the message instead of fetched from the public website.

## Tests

- Unit tests for intent resolution remain beside `resolveContactIntent`.
- Unit tests for the contact service live under `src/server/contact`.
- Unit tests for Resend integration live under `src/services/email`.
- Direct API tests live in `tests/api/contact-api.spec.ts`.

See [../README.md](../README.md).
