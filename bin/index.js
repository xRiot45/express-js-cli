#!/usr/bin/env node

import { Command } from 'commander';
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
import { generateFile } from '../commands/generateFile.js';

const program = new Command();
const packageJson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const dim = '\x1b[2m';
const reset = '\x1b[0m';

const askProjectDetails = async (projectName) => {
  const answers = await inquirer.prompt([
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

  return { projectName, ...answers };
};

const createProject = async (projectName) => {
  const details = await askProjectDetails(projectName);
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

    createProjectDirectories(details.language);
    configureEnvironment(details.database, projectName);
    configureGitIgnore();
    configureLanguage(details.language);
    configureDatabase(details.database);

    if (details.usePrettier) {
      configurePrettier();
    }
    if (details.useEslint) {
      configureEslint(details.language);
    }
    if (details.useHusky) {
      configureHuskyAndCommitlint(details.language);
    }
    if (details.useGit) {
      configureGit(projectName, details.gitRepositoryUrl);
    }

    spinner.succeed(`Project ${projectName} created successfully! 🎉`);
  } catch (error) {
    spinner.fail(`Failed to create project: ${error.message}`);
  }
};

program
  .command('new <project-name>')
  .description('Create a new Express.js API project')
  .action(createProject);

program.version(
  packageJson.version,
  '-v, --version',
  'Display the current version of express-cli',
);

program
  .option('-i, --info', 'Display information about express-cli')
  .action(() => {
    process.stdout.write(`Name: ${packageJson.name}\n`);
    process.stdout.write(`Version: ${packageJson.version}\n`);
    process.stdout.write(`Author: ${packageJson.author}\n`);
    process.stdout.write(`Description: ${packageJson.description}\n`);
    process.stdout.write(`License: ${packageJson.license}\n\n`);
  });

const schematics = {
  controller: 'Generate a new controller file',
  service: 'Generate a new service file',
  route: 'Generate a new route file',
  repository: 'Generate a new repository file',
  validation: 'Generate a new validation file',
  model: 'Generate a new model file',
  interface: 'Generate a new interface file (if using TypeScript)',
  types: 'Generate a new types file (if using TypeScript)',
  resources: 'Generate a new resources file (CRUD)',
  config: 'Generate a new config file',
  middleware: 'Generate a new middleware file',
  util: 'Generate a new util file',
};

program
  .command('generate <schematic> <file-name>')
  .description('Generate a new file based on a schematic')
  .action(async (schematic, fileName) => {
    const { language } = await inquirer.prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Select language:',
        choices: ['JavaScript', 'TypeScript'],
      },
    ]);

    fileName = fileName.toLowerCase();

    generateFile(schematic, fileName, language);
  });

program
  .command('update')
  .description('Update express-cli to the latest version');

program.on('--help', () => {
  process.stdout.write('\nSchematics:\n');
  Object.keys(schematics).forEach((schematic) => {
    process.stdout.write(
      `  ${schematic} ${dim} \t${schematics[schematic]} ${reset}\n`,
    );
  });
});

program.parse(process.argv);
