# CODEOWNERS plan

Status: Future plan
Audience: Technical Lead and Repository Admins

See [../README.md](../README.md).

Do not create an enforcing `.github/CODEOWNERS` file until real GitHub users or teams exist.

Future conceptual mapping:

```text
/src/app/                         frontend-web
/src/features/                    frontend-web
/src/components/layout/           frontend-web
/src/features/products/fieldops/  frontend-web + product
/src/domain/                      technical-lead + frontend/backend
/src/server/                      backend-api
/src/services/email/              backend-api
/tests/web-desktop/               qa-web-desktop
/tests/web-mobile/                qa-web-mobile
/tests/api/                       qa-api + backend
/tests/accessibility/             accessibility + qa
/docs/architecture/               technical-lead
/.github/workflows/               devops + technical-lead
```

Real usernames or GitHub teams should be added only when those identities and review responsibilities exist.
