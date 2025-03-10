import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureLanguage = async (language, useImportAlias) => {
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

    await runCommandWithBuilder(
      'npm install --save-dev typescript ts-node @types/node',
    );
    await runCommandWithBuilder('npx tsc --init');

    const tsConfigPath = 'tsconfig.json';
    let customTsConfig = {
      compilerOptions: {
        target: 'ESNext',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        allowImportingTsExtensions: true,
        noEmit: true,
        outDir: './dist',
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
      },
      include: ['src/**/*'],
    };

    if (useImportAlias) {
      customTsConfig.compilerOptions.baseUrl = './src';
      customTsConfig.compilerOptions.paths = {
        '@/configs/*': ['./configs/*'],
        '@/controllers/*': ['./controllers/*'],
        '@/interfaces/*': ['./interfaces/*'],
        '@/middlewares/*': ['./middlewares/*'],
        '@/models/*': ['./models/*'],
        '@/repositories/*': ['./repositories/*'],
        '@/routes/*': ['./routes/*'],
        '@/services/*': ['./services/*'],
        '@/types/*': ['./types/*'],
        '@/utils/*': ['./utils/*'],
      };
    }

    fs.writeFileSync(tsConfigPath, JSON.stringify(customTsConfig, null, 2));
  } else if (language === 'JavaScript') {
    packageJson.main = 'src/app.js';
    packageJson.type = 'module';
    packageJson.scripts = {
      dev: 'nodemon --ext js src/app.js',
      start: 'node src/app.js',
      format: 'prettier --write .',
      lint: 'eslint "src/**/*.{js,ts}" --fix',
    };

    if (useImportAlias) {
      packageJson.imports = {
        '#configs/*': './src/configs/*',
        '#controllers/*': './src/controllers/*',
        '#middlewares/*': './src/middlewares/*',
        '#models/*': './src/models/*',
        '#repositories/*': './src/repositories/*',
        '#routes/*': './src/routes/*',
        '#services/*': './src/services/*',
        '#utils/*': './src/utils/*',
        '#validations/*': './src/validations/*',
      };
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
};

export default configureLanguage;
