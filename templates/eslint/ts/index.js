const templateCodeEslintTS = () => {
  return `
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginComments from 'eslint-plugin-eslint-comments';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsEslint from 'typescript-eslint';\n

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSort,
      'eslint-comments': eslintPluginComments,
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      'eslint-comments/no-unused-disable': 'warn',
      'arrow-body-style': 'off'
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ['node_modules/', 'dist/', 'test/', 'coverage/'],
  },
  jsPlugin.configs.recommended,
  ...tsEslint.configs.recommended,
];
`;
};

export default templateCodeEslintTS;
