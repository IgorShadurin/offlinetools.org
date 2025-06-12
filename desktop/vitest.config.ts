import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    include: ['test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    testTimeout: 1000 * 60,
    hookTimeout: 1000 * 60,
    setupFiles: ['./test/setup.ts'],
    environmentOptions: {
      ...(process.env.CI === 'true' && {
        // Add any CI-specific environment options here
      }),
    },
    retry: process.env.CI === 'true' ? 2 : 0,
    maxConcurrency: 1,
  },
})
