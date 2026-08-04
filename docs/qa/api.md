# API QA

API tests validate route behavior directly without driving the browser UI.

Current API scope:

```text
/api/contact
```

API tests run through:

```bash
npm run test:e2e:api
```

Project:

```text
api
```

Current checks include the local negative path where email delivery is not configured. Tests must not call the real email provider or expose secrets.

Contact form UI tests remain under web tests. Direct request/response behavior belongs under `tests/api`.
