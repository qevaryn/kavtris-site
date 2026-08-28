import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
// @ts-expect-error The production governance checker is an executable JavaScript module.
import { checkProductionSmokeGovernance } from '../../scripts/check-production-smoke-governance.mjs';

const roots: string[] = [];
const requiredGuard = `
  test.describe('published production smoke is read-only', () => {
    const methods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    const firstParty = url.startsWith(origin);
    const mutationMessage = 'published smoke must not send first-party mutating requests';
    const contactMessage = 'API contact POSTs must stay at zero';
  });
`;

function createFixture(files: Record<string, string>) {
  const root = mkdtempSync(path.join(tmpdir(), 'production-smoke-governance-'));
  roots.push(root);
  writeFileSync(
    path.join(root, 'tsconfig.json'),
    JSON.stringify({ compilerOptions: { baseUrl: '.', paths: { '@/*': ['./src/*'] } } })
  );

  const smokeDirectory = path.join(root, 'tests', 'published-smoke');
  mkdirSync(smokeDirectory, { recursive: true });
  writeFileSync(path.join(smokeDirectory, 'production-read-only.spec.ts'), requiredGuard);

  for (const [relativePath, source] of Object.entries(files)) {
    const filePath = path.join(smokeDirectory, relativePath);
    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, source);
  }

  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe('production smoke governance', () => {
  it('accepts legitimate read-only smoke and API request-context GET usage', () => {
    const root = createFixture({
      'nested/read-only.spec.ts': `test('read only', async ({ request }) => { await request.get('/health'); });`
    });

    expect(checkProductionSmokeGovernance(root).failures).toEqual([]);
  });

  it('discovers nested specs and rejects request fixture mutations', () => {
    const root = createFixture({
      'nested/mutation.spec.ts': `test('mutation', async ({ request }) => { await request.post('/api/contact'); });`
    });

    const result = checkProductionSmokeGovernance(root);
    expect(result.files.some((file: string) => file.endsWith(path.join('nested', 'mutation.spec.ts')))).toBe(true);
    expect(result.failures).toEqual(expect.arrayContaining([expect.stringContaining('.post()')]));
  });

  it('rejects mutations from APIRequestContext variables with arbitrary names', () => {
    const root = createFixture({
      'context.spec.ts': `test('mutation', async ({ playwright }) => {
        const apiClient = await playwright.request.newContext();
        await apiClient.put('/state');
      });`
    });

    expect(checkProductionSmokeGovernance(root).failures).toEqual(
      expect.arrayContaining([expect.stringContaining('.put()')])
    );
  });

  it('rejects context request mutations', () => {
    const root = createFixture({
      'context-request.spec.ts': `test('mutation', async ({ context }) => { await context.request.delete('/state'); });`
    });

    expect(checkProductionSmokeGovernance(root).failures).toEqual(
      expect.arrayContaining([expect.stringContaining('.delete()')])
    );
  });

  it('rejects explicit mutating methods passed to fetch calls', () => {
    const root = createFixture({
      'fetch.spec.ts': `test('mutation', async ({ request }) => {
        await request.fetch('/state', { method: 'PATCH' });
        await fetch('/state', { method: 'POST' });
      });`
    });

    expect(
      checkProductionSmokeGovernance(root).failures.filter((failure: string) => failure.includes('mutating fetch'))
    ).toHaveLength(2);
  });

  it('scans helpers in the governed tree and rejects repository helpers outside it', () => {
    const root = createFixture({
      'nested/helper.ts': `export async function mutate(apiClient) { await apiClient.post('/state'); }`,
      'nested/helper-user.spec.ts': `import { mutate } from './helper'; test('helper', () => mutate(request));`,
      'outside-helper.spec.ts': `import { helper } from '@/shared/helper'; test('outside', helper);`
    });
    const outsideHelper = path.join(root, 'src', 'shared', 'helper.ts');
    mkdirSync(path.dirname(outsideHelper), { recursive: true });
    writeFileSync(outsideHelper, 'export const helper = () => undefined;');

    const result = checkProductionSmokeGovernance(root);
    expect(result.files.some((file: string) => file.endsWith(path.join('nested', 'helper.ts')))).toBe(true);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.stringContaining('.post()'),
        expect.stringContaining('helper must remain inside tests/published-smoke')
      ])
    );
  });
});
