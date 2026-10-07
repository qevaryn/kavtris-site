import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  // Tests declare synthetic settings explicitly; never load the developer's .env files.
  envDir: false,
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'server-only': path.resolve(__dirname, 'src/test/server-only-stub.ts')
    }
  }
});
