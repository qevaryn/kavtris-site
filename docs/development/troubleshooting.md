# Troubleshooting

Status: Current
Audience: All contributors

See [../README.md](../README.md).

## Resend Not Configured

If `/api/contact` returns:

```text
O formulário não está configurado para envio neste ambiente.
```

configure Resend variables or use local mock mode:

```text
CONTACT_FORM_MOCK=true
```

Mock mode is for non-production local development and tests.

## Port 3000 Is Occupied

Check the running process.

PowerShell:

```powershell
Get-Process -Id <pid>
```

Stop only if you confirm it is a local dev server you own.

## Stale Next.js Output

If generated route types or build output appears stale, stop the dev server and remove `.next`.

PowerShell:

```powershell
Remove-Item -Recurse -Force .next
```

Use this only for generated output, not source files.

## Playwright Browser Missing

```bash
npx playwright install chromium
```

CI installs Chromium with dependencies.

## Windows Line-ending Warnings

Git may print warnings such as:

```text
LF will be replaced by CRLF
```

These warnings are expected in some Windows worktrees. `git diff --check` is the relevant whitespace validation.

## Wrong Playwright Project

Use:

```bash
npm run test:e2e:desktop
npm run test:e2e:mobile
npm run test:e2e:api
```

Use `npm run test:e2e` for the complete supported suite.

## Generated Reports

Playwright may generate:

```text
playwright-report/
test-results/
```

These are generated artifacts and should not be committed.
