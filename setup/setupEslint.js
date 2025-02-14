import chalk from 'chalk';
import { spawnSync } from 'child_process';
import fs from 'fs';
import shell from 'shelljs';

export const setupEslint = (language) => {
  console.log(chalk.yellow('\nSetting up Eslint...\n'));
  if (language === 'TypeScript') {
    shell.exec(
      'npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
      eslint-config-prettier eslint-plugin-prettier eslint-plugin-import \
      eslint-plugin-unused-imports eslint-plugin-simple-import-sort \
      eslint-plugin-eslint-comments',
    );

    spawnSync('npx', ['eslint', '--init'], {
      stdio: 'inherit',
      shell: true,
    });

    const eslintConfigPath = 'eslint.config.js';
    if (fs.existsSync(eslintConfigPath)) {
      let eslintConfigContent = fs.readFileSync(eslintConfigPath, 'utf8');

      const customConfig = `{
      plugins: ['@typescript-eslint', 'prettier', 'import', 'unused-imports', 'simple-import-sort', 'eslint-comments'],
      rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'eslint-comments/no-unused-disable': 'warn'
    }
  }`;

      if (eslintConfigContent.includes('export default [')) {
        eslintConfigContent = eslintConfigContent.replace(
          /export default \[/,
          `export default [\n  ${customConfig},`,
        );
      }

      fs.writeFileSync(eslintConfigPath, eslintConfigContent, 'utf8');

      console.log('✅ ESLint configuration updated successfully!');
    }

    const eslintIgnore = `node_modules
dist
build
coverage
.eslintrc.js`;
    fs.writeFileSync('.eslintignore', eslintIgnore);
  } else if (language === 'JavaScript') {
    shell.exec(
      'npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-unused-imports eslint-plugin-simple-import-sort eslint-plugin-eslint-comments',
    );

    spawnSync('npx', ['eslint', '--init'], {
      stdio: 'inherit',
      shell: true,
    });

    const eslintConfigPath = 'eslint.config.js';
    if (fs.existsSync(eslintConfigPath)) {
      let eslintConfigContent = fs.readFileSync(eslintConfigPath, 'utf8');

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
        eslintConfigContent = eslintConfigContent.replace(
          /export default \[/,
          `export default [\n  ${customConfig},`,
        );

        fs.writeFileSync(eslintConfigPath, eslintConfigContent, 'utf8');
        console.log('✅ ESLint configuration updated successfully!');
      }

      const eslintIgnore = `node_modules
dist
build
coverage
.eslintrc.js`;
      fs.writeFileSync('.eslintignore', eslintIgnore);
    }
  }
};
