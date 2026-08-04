# Extraction trigger matrix

Status: Current guidance
Audience: Technical Lead and Future Team Owners

See [../README.md](../README.md).

Repository extraction is justified by operational evidence, not folder count.

| Boundary | Technical trigger | Team trigger | Deployment trigger | Contract trigger | Do not extract when |
| --- | --- | --- | --- | --- | --- |
| Web/API | API runtime, persistence, auth or scaling differs from web | Backend owner works independently | API deploys separately | HTTP/API contract is stable enough | Contact API remains small inside Next.js |
| Contracts | Multiple consumers need shared types | Frontend/backend owners release independently | Contracts release independently | Versioned compatibility needed | Web and API are still in one repo |
| Web QA | Tests validate deployed environments externally | Dedicated QA team exists | QA runs independently from app CI | Stable environment contract exists | Tests mainly support local developer workflow |
| Native mobile | Native device APIs, offline or app-store lifecycle exists | Native team exists | Native release train exists | Mobile consumes shared API | Only mobile web behavior is needed |
| Shared UI | Reuse across multiple active apps exists | Design-system owner exists | UI package release needed | Semver UI contract exists | Components are site-specific |
| Documentation | Docs span several active repos | Docs owner exists | Docs publishing independent | Cross-repo docs versioning needed | Docs only explain this repo |
| Infrastructure | IaC or platform automation exists | DevOps ownership separate | Multi-service deploy exists | Environment contract needed | One externally configured Vercel app |

## Invalid Triggers

- folder count;
- preference for more repositories;
- desktop versus mobile layout;
- one new developer joining;
- theoretical future reuse;
- desire to look more enterprise.
