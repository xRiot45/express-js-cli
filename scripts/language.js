import fs from 'fs';
import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureLanguage = async (language) => {
  await runCommandWithBuilder(() => {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    if (language === 'TypeScript') {
      packageJson.main = 'src/app.ts';
      packageJson.type = 'module';
      packageJson.scripts = {
        dev: "nodemon --exec 'tsx src/app.ts'",
        start: 'node dist/app.js',
        build: 'rm -rf dist && tsc',
        format: 'prettier --write .',
        lint: 'eslint "src/**/*.{ts,js}" --fix',
      };

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // Install dependencies for TypeScript
      shell.exec('npm install --save-dev typescript ts-node @types/node', {
        silent: true,
      });
      shell.exec('npx tsc --init', { silent: true });

      // Update tsconfig.json
      const tsConfigPath = 'tsconfig.json';
      const customTsConfig = `
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}`;

      if (fs.existsSync(tsConfigPath)) {
        fs.writeFileSync(tsConfigPath, customTsConfig, 'utf-8');
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
  });
};

export default configureLanguage;
