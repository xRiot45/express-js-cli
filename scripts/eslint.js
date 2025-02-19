import fs from 'fs';
import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureEslint = (language) => {
  const eslintDependencies = [
    'globals',
    'eslint',
    '@eslint/js',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'eslint-plugin-unused-imports',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-eslint-comments',
  ];

  if (language === 'TypeScript') {
    eslintDependencies.push(
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      'typescript-eslint',
    );
  }

  runCommandWithBuilder(() => {
    shell.exec(`npm install --save-dev ${eslintDependencies.join(' ')}`, {
      silent: true,
    });

    const configPath = 'eslint.config.js';
    if (!fs.existsSync(configPath)) {
      const tsImports = `
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginComments from 'eslint-plugin-eslint-comments';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsEslint from 'typescript-eslint';\n\n`;

      const jsImports = `
import globals from 'globals';
import js from '@eslint/js';
import pluginJs from '@eslint/js';\n\n`;

      const tsConfig = `/** @type {import('eslint').Linter.Config[]} */
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
      'eslint-comments/no-unused-disable': 'warn',
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ['node_modules/', 'dist/', 'test/', 'coverage/'],
  },
  jsPlugin.configs.recommended,
  ...tsEslint.configs.recommended,
];`;

      const jsConfig = `/** @type {import('eslint').Linter.Config[]} */
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
  js.configs.recommended,
  pluginJs.configs.recommended,
];`;

      const configContent =
        language === 'TypeScript'
          ? `${tsImports}${tsConfig}`
          : `${jsImports}${jsConfig}`;

      fs.writeFileSync(configPath, configContent, 'utf8');
    }
  }, 'Initializing ESLint');
};
