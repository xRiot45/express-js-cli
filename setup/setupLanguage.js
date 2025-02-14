import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

export const setupLanguage = (language) => {
  console.log(chalk.yellow(`\nSetting up ${language}...\n`));

  const packageJsonPath = 'package.json';
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (language === 'TypeScript') {
    packageJson.main = 'src/app.ts';
    packageJson.type = 'module';
    packageJson.scripts = {
      dev: 'nodemon --ext ts --exec ts-node src/app.ts',
      start: 'node dist/app.js',
      build: 'rm -rf dist && tsc',
      format: 'prettier --write .',
      lint: 'eslint "src/**/*.{js,ts}" "test/**/*.{js,ts}" --fix',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    shell.exec('npm install --save-dev typescript ts-node @types/node');
    shell.exec('npx tsc --init');

    const tsConfigPath = 'tsconfig.json';
    if (fs.existsSync(tsConfigPath)) {
      let tsConfig = fs.readFileSync(tsConfigPath, 'utf-8');

      tsConfig = tsConfig
        .replace(
          /\/\/\s*"moduleResolution":\s*".*?",?/g,
          '"moduleResolution": "Node",',
        )
        .replace(/\/\/\s*"outDir":\s*".*?",?/g, '"outDir": "./dist",');

      if (!/"include": \[.*?\]/.test(tsConfig)) {
        tsConfig = tsConfig.replace(
          /\n\}\s*$/,
          ',\n  "include": ["src/**/*"]\n}',
        );
      }

      fs.writeFileSync(tsConfigPath, tsConfig);
    }
  } else if (language === 'JavaScript') {
    packageJson.main = 'src/app.js';
    packageJson.type = 'module';
    packageJson.scripts = {
      dev: 'nodemon --ext js src/app.js',
      start: 'node src/app.js',
      format: 'prettier --write .',
      lint: 'eslint "src/**/*.{js}" "test/**/*.{js}" --fix',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
};
