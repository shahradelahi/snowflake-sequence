import { defineConfig } from '@shahrad/eslint-config';
import globals from 'globals';

export default defineConfig(
  {
    ignores: ['dist/**', '**/examples_DONT-REMOVE/**'],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'error',
    },
  }
);
