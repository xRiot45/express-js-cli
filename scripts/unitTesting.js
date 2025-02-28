import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';
import fs from 'fs';
import shell from 'shelljs';

const updatePackageJson = (updates) => {
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.scripts = {
    ...packageJson.scripts,
    ...updates.scripts,
  };

  if (updates.jest) {
    packageJson.jest = updates.jest;
  }
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const createBabelConfig = (language) => {
  const presets = ['@babel/preset-env'];
  if (language === 'TypeScript') {
    presets.push('@babel/preset-typescript');
  }

  const content = JSON.stringify({ presets }, null, 2);
  fs.writeFileSync('babel.config.json', content);
};

const installDependencies = (dependencies) => {
  shell.exec(`npm install --save-dev ${dependencies.join(' ')}`, {
    silent: true,
  });
};

export const configureUnitTesting = async (language, unitTesting) => {
  await runCommandWithBuilder(async () => {
    if (language === 'JavaScript') {
      const testConfigs = {
        Jest: {
          scripts: {
            test: 'jest -i',
          },
          jest: {
            transform: { '^.+\\.[t|j]sx?$': 'babel-jest' },
          },
          dependencies: [
            'jest',
            '@types/jest',
            'babel-jest',
            '@babel/preset-env',
            'supertest',
            '@types/supertest',
          ],
        },
        Mocha: {
          scripts: {
            test: "mocha --require @babel/register 'test/**/*.test.js'",
          },
          dependencies: [
            'chai',
            'chai-http',
            'mocha',
            '@babel/core',
            '@babel/preset-env',
            '@babel/register',
            'supertest',
            '@types/supertest',
          ],
        },
      };

      const config = testConfigs[unitTesting];
      if (!config) {
        return;
      }

      updatePackageJson({
        scripts: config.scripts,
        ...(config.jest && { jest: config.jest }),
      });
      installDependencies(config.dependencies);
      createBabelConfig();
    } else if (language === 'TypeScript') {
      const testConfigs = {
        Jest: {
          scripts: {
            test: 'jest -i',
          },
          jest: {
            transform: {
              '^.+\\.[t|j]sx?$': 'babel-jest',
            },
          },
          dependencies: [
            'jest',
            '@types/jest',
            'babel-jest',
            '@babel/preset-env',
            'supertest',
            '@types/supertest',
            '@babel/preset-typescript',
            '@jest/globals',
          ],
        },
        Mocha: {
          scripts: {
            test: "mocha --require @babel/register 'test/**/*.test.ts'",
          },
          dependencies: [
            'mocha',
            'chai',
            'chai-http',
            '@babel/core',
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/register',
            'supertest',
            '@types/supertest',
            '@types/chai',
            '@types/chai-http',
            '@types/mocha',
          ],
        },
      };

      const config = testConfigs[unitTesting];
      if (!config) {
        return;
      }

      updatePackageJson({
        scripts: config.scripts,
        ...(config.jest && { jest: config.jest }),
      });
      installDependencies(config.dependencies);
      createBabelConfig(language);
    }
  });
};
