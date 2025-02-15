import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

export const setupEslint = (language) => {
  console.log(chalk.yellow('\nSetting up Eslint...\n'));

  const dependencies = [
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'eslint-plugin-unused-imports',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-eslint-comments',
  ];

  if (language === 'TypeScript') {
    dependencies.push(
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      'typescript-eslint',
    );
  }

  shell.exec(`npm install --save-dev ${dependencies.join(' ')}`);

  const eslintConfigPath = 'eslint.config.js';

  if (language === 'TypeScript') {
    const importStatements = `
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginEslintComments from 'eslint-plugin-eslint-comments';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint'\n\n`;

    const customConfig = `/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'eslint-comments': eslintPluginEslintComments,
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'eslint-comments/no-unused-disable': 'warn',
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ['node_modules/', 'dist/', 'test/', 'coverage/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]`;

    if (!fs.existsSync(eslintConfigPath)) {
      fs.writeFileSync(
        eslintConfigPath,
        `${importStatements} ${customConfig};\n`,
        'utf8',
      );
    }
  } else if (language === 'JavaScript') {
    const eslintConfigContent = fs.existsSync(eslintConfigPath)
      ? fs.readFileSync(eslintConfigPath, 'utf8')
      : '';

    const customConfig = `{
      plugins: ['prettier', 'import', 'unused-imports', 'simple-import-sort', 'eslint-comments'],
      rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'eslint-comments/no-unused-disable': 'warn'
      }
    }`;

    if (!eslintConfigContent.includes("plugins: ['prettier'")) {
      const updatedConfig = eslintConfigContent.replace(
        /export default \[/,
        `export default [\n  ${customConfig},`,
      );

      fs.writeFileSync(eslintConfigPath, updatedConfig, 'utf8');
    }
  }
};
