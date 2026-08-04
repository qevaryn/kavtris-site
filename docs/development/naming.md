# Naming conventions

Status: Current
Audience: Developers and QA

See [../README.md](../README.md).

## Components

Use names that describe responsibility:

```text
ContactForm
ProductCatalogClient
FieldOpsExperience
FieldOpsManagementDashboard
FieldOpsEmployeeMobileView
FieldOpsProcessWorkflow
```

Avoid viewport names when the component is only CSS-responsive. `FieldOpsEmployeeMobileView` is acceptable because it demonstrates the product's employee mobile interface, not visitor device detection.

## Services And Controllers

Use action-oriented names:

```text
submitContact
handleContactPost
processContactRequest
sendContactEmail
```

Avoid vague names such as `helper`, `manager` or `util` when the responsibility can be named directly.

## Domain Contracts

Use explicit nouns:

```text
ContactIntent
ContactApiResponse
ContactFormValues
ContactErrorCode
ProductConcept
EnterpriseCapability
```

## Tests

Use names that describe feature, condition and expected behavior:

```text
catalog filters products by selected sector
mobile menu supports keyboard navigation, Escape and focus return
contact api rejects invalid payload before email delivery
```

Test file placement should communicate responsibility:

```text
tests/web-shared/contact.spec.ts
tests/web-mobile/catalog-mobile.spec.ts
tests/api/contact-api.spec.ts
src/server/contact/contact.service.test.ts
```
