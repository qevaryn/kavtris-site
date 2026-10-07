# Current repository responsibility

Status: Current
Audience: Technical Lead, Frontend, Backend, QA and DevOps

See [../README.md](../README.md).

This repository owns the site implementation and its implementation-specific
documentation. Cross-product governance and product decisions are canonical in
[`qevaryn/kavtris-docs`](https://github.com/qevaryn/kavtris-docs).

## Owns Today

- responsive Next.js website;
- homepage;
- product catalog;
- generic product routes;
- KAVTRIS FieldOps presentation;
- enterprise presentation;
- Rede Qualidade e Vida page;
- privacy and cookies pages;
- shared contact API at `POST /api/contact`;
- account and authentication route foundations;
- identity/tenancy schema, migration and local database tests;
- Resend email integration;
- local domain contracts;
- desktop web QA;
- mobile web QA;
- API QA;
- accessibility-oriented tests;
- visual audit tests;
- technical documentation.

## Does Not Own Today

- native mobile application;
- certified production identity and database deployment;
- dedicated infrastructure repository;
- published shared packages;
- independently deployed API;
- native mobile QA;
- real FieldOps SaaS platform;
- desktop-specific or mobile-specific backend.

## Current Principle

One responsive web frontend and one shared backend/API boundary. Product and
cross-repository decisions live in `kavtris-docs`; site implementation lives here.
