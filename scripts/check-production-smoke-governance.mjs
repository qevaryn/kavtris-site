import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const smokePath = path.join(root, 'tests', 'published-smoke', 'production-read-only.spec.ts');
const source = readFileSync(smokePath, 'utf8');

const requiredSnippets = [
  "test.describe('published production smoke is read-only'",
  "['POST', 'PUT', 'PATCH', 'DELETE']",
  "url.startsWith(origin)",
  "published smoke must not send first-party mutating requests",
  "API contact POSTs must stay at zero"
];

const forbiddenPatterns = [
  { label: 'direct Playwright POST request', pattern: /\bpage\.request\.post\s*\(/ },
  { label: 'direct Playwright PUT request', pattern: /\bpage\.request\.put\s*\(/ },
  { label: 'direct Playwright PATCH request', pattern: /\bpage\.request\.patch\s*\(/ },
  { label: 'direct Playwright DELETE request', pattern: /\bpage\.request\.delete\s*\(/ },
  { label: 'fetch POST request in browser context', pattern: /\bfetch\s*\([^)]*method\s*:\s*['"`]POST['"`]/s },
  { label: 'fetch PUT request in browser context', pattern: /\bfetch\s*\([^)]*method\s*:\s*['"`]PUT['"`]/s },
  { label: 'fetch PATCH request in browser context', pattern: /\bfetch\s*\([^)]*method\s*:\s*['"`]PATCH['"`]/s },
  { label: 'fetch DELETE request in browser context', pattern: /\bfetch\s*\([^)]*method\s*:\s*['"`]DELETE['"`]/s }
];

const failures = [];

for (const snippet of requiredSnippets) {
  if (!source.includes(snippet)) {
    failures.push(`missing required read-only smoke guard: ${snippet}`);
  }
}

for (const { label, pattern } of forbiddenPatterns) {
  if (pattern.test(source)) {
    failures.push(`forbidden production smoke mutation pattern found: ${label}`);
  }
}

if (failures.length > 0) {
  console.error('Production smoke governance violations found:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Production smoke governance ok');
