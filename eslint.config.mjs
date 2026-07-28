import { globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    '.next/**',
    'next-env.d.ts',
    'node_modules/**',
    'playwright-report/**',
    'test-results/**'
  ])
];

export default eslintConfig;
