import { defineConfig } from 'vitest/config';

// The Angular unit-test builder only covers src/**; this config runs the
// Node-side build tooling tests.
export default defineConfig({
  test: {
    include: ['tools/**/*.spec.mjs'],
    environment: 'node',
  },
});
