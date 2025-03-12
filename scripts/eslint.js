import fs from 'fs';
import shell from 'shelljs';
import templateCodeEslintJS from '../templates/eslint/js/index.js';
import templateCodeEslintTS from '../templates/eslint/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureEslint = async (language) => {
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

  await runCommandWithBuilder(() => {
    shell.exec(`npm install --save-dev ${eslintDependencies.join(' ')}`, {
      silent: true,
    });

    const configPath = 'eslint.config.js';
    if (!fs.existsSync(configPath)) {
      const configContent =
        language === 'TypeScript'
          ? templateCodeEslintTS()
          : templateCodeEslintJS();

      fs.writeFileSync(configPath, configContent, 'utf8');
    }
  });
};

export default configureEslint;
