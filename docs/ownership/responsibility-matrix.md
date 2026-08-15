# Responsibility matrix

Status: Current guidance
Audience: Technical Lead and Reviewers

See [../README.md](../README.md).

| Area | Primary owner | Required reviewers | Consulted roles | Current path | Future repository |
| --- | --- | --- | --- | --- | --- |
| Routing and metadata | Frontend Web | Technical Lead | SEO/Product | `src/app` | `KAVTRIS-web` |
| Shared UI | Frontend Web | Design | Accessibility | `src/components/shared` | `KAVTRIS-web` or conditional `KAVTRIS-ui` |
| Layout/navigation | Frontend Web | Accessibility | Design, QA | `src/components/layout` | `KAVTRIS-web` |
| Responsive web | Frontend Responsive / Mobile Web | Frontend Web | QA Mobile, Design | `src/features`, `src/components` | `KAVTRIS-web` |
| Catalog | Frontend Web | Product | QA | `src/features/catalog` | `KAVTRIS-web` |
| FieldOps | Frontend Web | Product | Design, QA | `src/features/products/fieldops` | `KAVTRIS-web` |
| Contact frontend | Frontend Web | Backend/API | QA | `src/features/contact` | `KAVTRIS-web` |
| Contact contracts | Technical Lead | Frontend + Backend/API | QA API | `src/domain/contact` | future `KAVTRIS-contracts` |
| API route | Backend/API | Technical Lead | QA API | `src/app/api/contact` | future `KAVTRIS-api` |
| Server service | Backend/API | Technical Lead | QA API | `src/server/contact` | future `KAVTRIS-api` |
| Email provider | Backend/API | Security/Privacy | DevOps | `src/services/email` | future `KAVTRIS-api` |
| Environment config | DevOps / Platform | Backend/API | Security/Privacy | `.env.example`, `src/config` | future `KAVTRIS-api` or infrastructure |
| Desktop QA | QA Web Desktop | Frontend Web | Technical Lead | `tests/web-desktop` | future `KAVTRIS-qa-web` |
| Mobile QA | QA Web Mobile | Frontend Responsive / Mobile Web | Accessibility | `tests/web-mobile` | future `KAVTRIS-qa-web` |
| API QA | QA API | Backend/API | Technical Lead | `tests/api` | future `KAVTRIS-qa-web` or API repo |
| Accessibility | Accessibility | Frontend Web | QA | `tests/accessibility` | future `KAVTRIS-qa-web` |
| Documentation | Technical Lead | Relevant role owner | All | `docs` | conditional `KAVTRIS-docs` |
| CI | DevOps / Platform | Technical Lead | QA | `.github/workflows` | future infrastructure |
| Deployment | DevOps / Platform | Technical Lead | Product | external platform config | future infrastructure |
| Security/privacy | Security / Privacy | Technical Lead | Backend/API, Product | privacy docs, env docs, secrets outside repo | future platform/security ownership |
