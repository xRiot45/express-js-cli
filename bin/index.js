#!/usr/bin/env node

import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import shell from 'shelljs';
import { configureDatabase } from '../scripts/datahase.js';
import { configureEnvironment } from '../scripts/environment.js';
import { configureEslint } from '../scripts/eslint.js';
import { configureGit } from '../scripts/git.js';
import { configureGitIgnore } from '../scripts/gitignore.js';
import { configureHuskyAndCommitlint } from '../scripts/huskyCommitlint.js';
import { configureLanguage } from '../scripts/language.js';
import { configurePrettier } from '../scripts/prettier.js';
import { createProjectDirectories } from '../scripts/projectDirectories.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const dim = '\x1b[2m';
const reset = '\x1b[0m';

const askProjectDetails = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter project name:',
    },
    {
      type: 'list',
      name: 'language',
      message: 'Select language:',
      choices: ['JavaScript', 'TypeScript'],
    },
    {
      type: 'list',
      name: 'database',
      message: 'Select database:',
      choices: ['MySQL', 'PostgreSQL'],
    },
    {
      type: 'confirm',
      name: 'usePrettier',
      message: `Use Prettier for code formatting? ${dim}(recommended)${reset}`,
      default: true,
    },
    {
      type: 'confirm',
      name: 'useEslint',
      message: `Use Eslint for code linting? ${dim}(recommended)${reset}`,
      default: true,
    },
    {
      type: 'confirm',
      name: 'useHusky',
      message: `Use Husky and Commitlint for commit linting? ${dim}(recommended)${reset}`,
      default: true,
    },
    {
      type: 'confirm',
      name: 'useGit',
      message: 'Initialize Git repository?',
    },
    {
      type: 'input',
      name: 'gitRepositoryUrl',
      message: 'Enter GitHub repository URL:',
      when: (answers) => answers.useGit,
      validate: (input) =>
        /^https:\/\/github\.com\/.+\/.+\.git$/.test(input) ||
        'Enter a valid GitHub repository URL!',
    },
  ]);

  return answers;
};

const createProject = async () => {
  const {
    name: projectName,
    language,
    database,
    usePrettier,
    useEslint,
    useHusky,
    useGit,
    gitRepositoryUrl,
  } = await askProjectDetails();

  const spinner = ora(`Creating project ${projectName}...\n\n`).start();

  try {
    shell.mkdir(projectName);
    shell.cd(projectName);

    runCommandWithBuilder('npm init -y', 'Initializing project...');

    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = projectName;
    packageJson.description = `This is a ${projectName} project`;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    runCommandWithBuilder(
      'npm install express dotenv cors helmet morgan express-rate-limit bcryptjs express-validator uuid cookie-parser',
      'Installing core dependencies...',
    );

    runCommandWithBuilder(
      'npm install --save-dev @types/express @types/cors @types/helmet @types/morgan @types/bcryptjs @types/uuid @types/http-errors nodemon',
      'Installing development dependencies...',
    );

    createProjectDirectories(language);
    configureEnvironment(database, projectName);
    configureGitIgnore();
    configureLanguage(language);
    configureDatabase(database);

    if (usePrettier) {
      configurePrettier();
    }

    if (useEslint) {
      configureEslint(language);
    }
    if (useHusky) {
      configureHuskyAndCommitlint(language);
    }
    if (useGit) {
      configureGit(projectName, gitRepositoryUrl);
    }

    spinner.succeed(`Project ${projectName} created successfully! 🎉`);
  } catch (error) {
    spinner.fail(`Failed to create project: ${error.message}`);
  }
};

await createProject();
