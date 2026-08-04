# Contact feature

Status: Current
Audience: Frontend, Backend and QA

See [../README.md](../README.md).

The contact feature connects public CTAs to the shared backend/API boundary.

## Frontend Files

```text
src/features/contact/components/ContactForm.tsx
src/features/contact/services/submit-contact.ts
src/features/contact/utils/resolveContactIntent.ts
```

`ContactForm` owns UI interaction, loading, success/error messages and form state.

`submitContact` owns the browser request to `POST /api/contact` and preserves the existing response handling.

`resolveContactIntent` reads supported URL query parameters.

## Supported Intent Parameters

```text
?produto=fieldops
?tipo=empresa
?tipo=personalizada
```

Unknown values fall back to a safe general contact state.

## Contracts

```text
src/domain/contact/contracts.ts
src/domain/contact/types.ts
src/domain/contact/contact-errors.ts
```

The contact schema currently serves both form validation and transport validation because the rules are identical.

## Backend Flow

```text
src/app/api/contact/route.ts
-> src/server/contact/contact-controller.ts
-> src/server/contact/contact-validation.ts
-> src/server/contact/contact-rate-limit.ts
-> src/server/contact/contact.service.ts
-> src/services/email/email-provider.ts
-> src/services/email/resend.ts
```

## QA Ownership

Relevant tests:

```text
tests/web-shared/contact.spec.ts
tests/api/contact-api.spec.ts
src/features/contact/utils/resolveContactIntent.test.ts
src/server/contact/contact.service.test.ts
src/services/email/resend.test.ts
```

API tests must not send real email.
