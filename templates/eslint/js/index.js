const templateCodeEslintJS = () => {
  return `
import globals from 'globals';
import js from '@eslint/js';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'test/', 'coverage/'],
  },
    {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      'arrow-body-style': 'off',
    },
  },
  js.configs.recommended,
  pluginJs.configs.recommended,
];    
`;
};

export default templateCodeEslintJS;
