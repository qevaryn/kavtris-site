# Future role of the current repository

Status: Current recommendation
Audience: Technical Lead

See [../README.md](../README.md).

## Option A - Current Repository Becomes KAVTRIS-web

Suitable when:

- API is extracted;
- current code remains primarily frontend web;
- documentation stays near web code.

This is the most likely future path based on current reality.

## Option B - Current Repository Remains A Platform Monorepo

Suitable when:

- several apps remain operationally coupled;
- one team manages releases;
- shared contracts and tooling remain local packages.

Conceptual structure only:

```text
apps/
  web/
  api/
  mobile/

packages/
  contracts/
  ui/
  config/
  testing/
```

Do not implement this structure now.

## Option C - Current Repository Becomes Documentation/Integration Only

Suitable only when web, API and other applications are fully extracted and independent teams/pipelines exist.

## Current Recommendation

Keep the repository as the responsive web source of truth.

Extract the API only when operational triggers exist.
