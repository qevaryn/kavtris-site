# Access and secrets ownership

Status: Current guidance
Audience: Technical Lead, DevOps and Security/Privacy

See [../README.md](../README.md).

Do not include credentials in this repository.

## Current Repository Evidence

- `.env.example` documents variable names only.
- GitHub Actions CI is defined in `.github/workflows/ci.yml`.
- A manual `smoke` job is defined in `.github/workflows/ci.yml` and runs via `workflow_dispatch`.
- No `vercel.json` exists in the repository.

## Recommended Future Ownership

| Area | Recommended owner |
| --- | --- |
| Repository administration | Technical Lead |
| Branch protection | Technical Lead + DevOps |
| Environment variables | DevOps + Security/Privacy |
| Vercel access | DevOps + Technical Lead |
| Resend access | Backend/API + Security/Privacy |
| Production secrets | Security/Privacy + DevOps |
| Deployment permissions | DevOps |
| Incident access | DevOps + Technical Lead + affected role owner |
| Secret rotation | Security/Privacy + relevant provider owner |

## External Configuration Requiring Verification

- Vercel project settings;
- production environment variables;
- Resend sender/domain verification;
- branch protection rules;
- GitHub repository permissions.
