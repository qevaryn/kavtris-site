# Team handoffs

Status: Current guidance
Audience: Product, Design, Development and QA

See [../README.md](../README.md).

Use these handoffs for meaningful product or technical changes. Minor documentation-only changes do not need heavy process.

## Product -> Development

Must provide:

- problem;
- target users;
- acceptance criteria;
- priority;
- scope;
- explicit exclusions.

## Design -> Frontend

Must provide:

- responsive states;
- interaction states;
- empty/error/loading states;
- accessibility considerations;
- asset ownership.

## Frontend -> Backend

Must provide:

- required request;
- expected response;
- validation requirements;
- failure behavior;
- contract compatibility.

## Backend -> Frontend

Must provide:

- documented endpoint;
- status codes;
- request schema;
- response schema;
- error model;
- environment requirements.

## Development -> QA

Must provide:

- acceptance criteria;
- affected routes;
- affected viewports;
- API changes;
- known limitations;
- test data;
- deployment target.

## QA -> Development

Must provide:

- reproduction steps;
- expected behavior;
- actual behavior;
- environment;
- viewport/browser;
- evidence;
- severity.
