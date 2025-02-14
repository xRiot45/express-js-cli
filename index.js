#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import shell from 'shelljs';
import { setupDatabase } from './setup/setupDatabase.js';
import { setupEslint } from './setup/setupEslint.js';
import { setupGit } from './setup/setupGit.js';
import { setupHuskyCommitlint } from './setup/setupHuskyCommitlint.js';
import { setupLanguage } from './setup/setupLanguage.js';
import { setupPrettier } from './setup/setupPrettier.js';

const dim = '\x1b[2m';
const reset = '\x1b[0m';

const askQuestions = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter Project Name:',
    },
    {
      type: 'list',
      name: 'language',
      message: 'Select Language:',
      choices: ['JavaScript', 'TypeScript'],
    },
    {
      type: 'list',
      name: 'database',
      message: 'Select Database:',
      choices: ['MySQL', 'PostgreSQL'],
    },
    {
      type: 'confirm',
      name: 'prettier',
      message: `Use Prettier for code formatting? ${dim}(Recommended)${reset}`,
      default: true,
    },
    {
      type: 'confirm',
      name: 'eslint',
      message: `Use Eslint for code linting? ${dim}(Recommended)${reset}`,
      default: true,
    },
    {
      type: 'confirm',
      name: 'husky',
      message: `Use Husky & Commitlint for commit linting? ${dim}(Recommended)${reset}`,
      default: true,
    },
    {
      type: 'confirm',
      name: 'git',
      message: `Initialize Git repository?`,
    },
    {
      type: 'input',
      name: 'gitCommand',
      message: 'Enter GitHub repository URL:',
      when: (answers) => answers.git,
      validate: (input) =>
        /^https:\/\/github\.com\/.+\/.+\.git$/.test(input) ||
        'Enter a valid GitHub repository URL!',
    },
  ]);

  return answers;
};

const createProject = async () => {
  const {
    projectName,
    language,
    database,
    prettier,
    eslint,
    husky,
    git,
    gitCommand,
  } = await askQuestions();

  console.log(chalk.yellow(`\nCreating project: ${projectName}...\n`));

  shell.mkdir(projectName);
  shell.cd(projectName);

  shell.exec('npm init -y');

  const packageJsonPath = 'package.json';
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.name = `${projectName}`;
  packageJson.description = `This is a ${projectName} project`;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  shell.exec(
    'npm install express dotenv cors helmet morgan express-rate-limit bcryptjs express-validator uuid cookie-parser',
  );

  shell.exec(
    'npm install --save-dev @types/express @types/cors @types/helmet @types/morgan @types/bcryptjs @types/uuid @types/http-errors nodemon',
  );

  // Setup Language
  setupLanguage(language);

  // Setup Database
  setupDatabase(database);

  // Setup Prettier
  if (prettier) {
    setupPrettier();
  }

  // Setup Eslint
  if (eslint) {
    setupEslint(language);
  }

  // Setup Husky & Commitlint
  if (husky) {
    setupHuskyCommitlint(language);
  }

  // Setup Git
  if (git) {
    setupGit();
  }

  console.log(chalk.green(`\nProject created successfully!`));
};

createProject();
