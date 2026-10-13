import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // fileURLToPath 还原 percent-encoding；`.pathname` 在含中文的目录下会得到 %E7... 导致模块解析失败
      '~': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // These suites exercise optional upstream demo features removed by the
    // official initializer. Their modules/assets are absent in this fork.
    // Pure framework, SEO, content and initializer safety tests still run.
    exclude: [
      ...(!existsSync(fileURLToPath(new URL('./src/config/landing.ts', import.meta.url)))
        ? ['tests/landing-paths.test.ts', 'tests/community-digest.test.ts', 'tests/redirects.test.ts']
        : []),
      ...(!existsSync(fileURLToPath(new URL('./src/content/wiki/en/codes/all-codes.mdx', import.meta.url)))
        ? ['tests/codes-consistency.test.ts']
        : []),
    ],
  },
});
