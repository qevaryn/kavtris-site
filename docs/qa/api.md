# API QA

Status: Current
Audience: API QA and Backend

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

Current checks cover direct request/response behavior such as missing local email configuration, invalid payload and honeypot rejection. Tests must not call the real email provider or expose secrets.

Contact form UI tests remain under web tests. Direct request/response behavior belongs under `tests/api`.

See [../README.md](../README.md) and [writing-tests.md](writing-tests.md).
