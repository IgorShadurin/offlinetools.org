import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    include: ['test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    testTimeout: 1000 * 60,
    hookTimeout: process.env.CI === 'true' ? 1000 * 120 : 1000 * 60, // 2 minutes in CI, 1 minute locally
    setupFiles: ['./test/setup.ts'],
    environmentOptions: {
      ...(process.env.CI === 'true' && {
        // Add any CI-specific environment options here
      }),
    },
    retry: process.env.CI === 'true' ? 2 : 0,
    // Run tests sequentially to avoid parallel Electron launches
    maxConcurrency: 1,
    sequence: {
      concurrent: false,
    },
    fileParallelism: false,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
})
