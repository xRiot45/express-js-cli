#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import shell from 'shelljs';
import { setupDatabase } from './setup/setupDatabase.js';
import { setupEnv } from './setup/setupEnv.js';
import { setupEslint } from './setup/setupEslint.js';
import { setupGit } from './setup/setupGit.js';
import { setupGitIgnore } from './setup/setupGitignore.js';
import { setupHuskyAndCommitlint } from './setup/setupHuskyCommitlint.js';
import { setupLanguage } from './setup/setupLanguage.js';
import { setupPrettier } from './setup/setupPrettier.js';
import { setupProjectStructure } from './setup/setupProjectStructure.js';
import { runCommandWithBuilder } from './utils/runCommandWithBuilder.js';

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
      message: ` Use Eslint for code linting? ${dim}(recommended)${reset}`,
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

  console.log(chalk.yellow(`\nCreating project: ${projectName}...\n`));

  shell.mkdir(projectName);
  shell.cd(projectName);

  runCommandWithBuilder('npm init -y', 'Creating package.json...');

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

  setupProjectStructure(language);
  setupEnv(database, projectName);
  setupGitIgnore();
  setupLanguage(language);
  setupDatabase(database);

  if (usePrettier) setupPrettier();
  if (useEslint) setupEslint(language);
  if (useHusky) setupHuskyAndCommitlint(language);
  if (useGit) setupGit(projectName, gitRepositoryUrl);

  console.log(chalk.green(`\nProject created successfully! 🎉`));
};

createProject();
