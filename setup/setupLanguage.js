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
      dev: "nodemon --exec 'node --import ./register-ts-node.mjs' src/app.ts",
      start: 'node dist/app.js',
      build: 'rm -rf dist && tsc',
      format: 'prettier --write .',
      lint: 'eslint "src/**/*.{ts,js}" --fix',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // TODO: Add file to register ts-node
    const content = `
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
    `;

    fs.writeFileSync('register-ts-node.mjs', content.trim());

    // TODO: Install dependencies for typescript
    shell.exec('npm install --save-dev typescript ts-node @types/node');
    shell.exec('npx tsc --init');

    // TODO: Update tsconfig.json
    const tsConfigPath = 'tsconfig.json';
    if (fs.existsSync(tsConfigPath)) {
      let tsConfig = fs.readFileSync(tsConfigPath, 'utf-8');

      tsConfig = tsConfig
        .replace(/("target":\s*)".*?"/, '$1"ESNext"')
        .replace(/("module":\s*)".*?"/, '$1"NodeNext"')
        .replace(
          /\/\/\s*"moduleResolution":\s*".*?",?/g,
          '"moduleResolution": "NodeNext",',
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
      lint: 'eslint "src/**/*.{js,ts}" --fix',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
};
