import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'lcov', 'json'],
      exclude: [
        './src/cli.ts',
        './src/cliFunctions.ts'
      ],
    },
  },
});
