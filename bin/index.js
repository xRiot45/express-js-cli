#!/usr/bin/env node

import chalk from 'chalk';
import { exec } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import shell from 'shelljs';
import { generateFile } from '../commands/generateFile.js';
import { schematics } from '../constants/index.js';
import { configureDatabase } from '../scripts/database.js';
import { configureEnvironment } from '../scripts/environment.js';
import { configureEslint } from '../scripts/eslint.js';
import { configureGit } from '../scripts/git.js';
import { configureGitIgnore } from '../scripts/gitignore.js';
import { configureHuskyAndCommitlint } from '../scripts/huskyCommitlint.js';
import { configureLanguage } from '../scripts/language.js';
import { configureLogger } from '../scripts/logger.js';
import { configurePrettier } from '../scripts/prettier.js';
import { configureProjectDirectories } from '../scripts/projectDirectories.js';
import { configureUnitTesting } from '../scripts/unitTesting.js';
import centerText from '../utils/centerText.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const program = new Command();
const packageJson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const dim = '\x1b[2m';
const reset = '\x1b[0m';

const askProjectDetails = async (projectName) => {
  try {
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
        type: 'list',
        name: 'unitTesting',
        message: 'Select unit testing:',
        choices: ['Jest', 'Mocha'],
      },
      {
        type: 'confirm',
        name: 'usePrettier',
        message: 'Use Prettier for code formatting? (recommended)',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useEslint',
        message: 'Use Eslint for code linting? (recommended)',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useHusky',
        message: 'Use Husky and Commit lint for commit linting? (recommended)',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useGit',
        message: 'Initialize Git repository?',
        default: true,
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
  } catch (error) {
    if (error.isTtyError) {
      process.stdout.write('Prompt cannot be displayed on this terminal.');
    } else {
      process.stdout.write('\nProgram is stopped by user\n');
    }
    process.exit(0);
  }
};

const createProject = async (projectName) => {
  if (fs.existsSync(projectName)) {
    process.stdout.write(chalk.red('✖ ERROR : Project already exists') + `\n`);
    process.exit(1);
  }

  const details = await askProjectDetails(projectName);
  process.stdout.write('\n');

  const spinner = ora(`Installation in progress... ☕`).start();

  try {
    shell.mkdir(projectName);
    shell.cd(projectName);

    await runCommandWithBuilder('npm init -y');

    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    packageJson.description = `This is a ${projectName} project`;
    packageJson.language = details.language;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    await runCommandWithBuilder(
      'npm install express dotenv cors helmet morgan express-rate-limit bcryptjs zod cookie-parser',
    );

    await runCommandWithBuilder(
      'npm install --save-dev @types/express @types/cors @types/helmet @types/morgan @types/bcryptjs @types/http-errors nodemon',
    );

    await configureProjectDirectories(details.language);
    await configureEnvironment(details.database, projectName, details.language);
    await configureGitIgnore();
    await configureLanguage(details.language);
    await configureDatabase(details.database, details.language);
    await configureLogger(details.language);
    await configureUnitTesting(details.language, details.unitTesting);

    if (details.usePrettier) {
      await configurePrettier();
    }
    if (details.useEslint) {
      await configureEslint(details.language);
    }
    if (details.useHusky) {
      await configureHuskyAndCommitlint(details.language);
    }
    if (details.useGit) {
      await configureGit(projectName, details.gitRepositoryUrl);
    }

    spinner.succeed(chalk.green(`Project ${projectName} created! 🎉 `));

    process.stdout.write(`\nNext steps:\n`);
    process.stdout.write(chalk.cyan(`\n$ cd ${projectName}`));
    process.stdout.write(chalk.cyan(`\n$ npm run format`));
    process.stdout.write(chalk.cyan(`\n$ npm run dev\n`));

    process.stdout.write('\n\n');
    process.stdout.write(
      chalk.green(centerText('Thank you for using Express CLI!')) + '\n',
    );
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
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

program
  .command('generate <schematic> <file-name>')
  .description('Generate a new file based on a schematic')
  .action(async (schematic, fileName) => {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    let language = packageJson.language;
    if (!language) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'language',
          message: 'Select language:',
          choices: ['JavaScript', 'TypeScript'],
        },
      ]);

      language = answers.language;
    }

    fileName = fileName.toLowerCase();
    await generateFile(schematic, fileName, language);
  });

program
  .command('update')
  .description('Update express-cli to the latest version')
  .action(() => {
    const spinner = ora('Checking for updates...☕').start();
    const command = `npm install -g ${packageJson.name}`;

    spinner.text = 'Express JS CLI is updating....';

    exec(command, (error) => {
      if (error) {
        spinner.fail('Failed to update Express JS CLI ❌');
      } else {
        spinner.succeed('Express JS CLI successfully updated! 🚀');
      }
    });
  });

program.on('--help', () => {
  process.stdout.write('\nSchematics:\n');
  Object.keys(schematics).forEach((schematic) => {
    process.stdout.write(
      `  ${schematic} ${dim} \t${schematics[schematic]} ${reset}\n`,
    );
  });
});

program.parse(process.argv);
