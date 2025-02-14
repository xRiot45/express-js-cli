#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import shell from 'shelljs';
import fs from 'fs';

const dim = '\x1b[2m'; // ANSI escape untuk warna redup
const reset = '\x1b[0m'; // Reset ke warna normal

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
      when: (answers) => answers.git, // Hanya muncul jika user memilih "Yes"
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

  const gitIgnore = '.gitignore';
  const ignoreContent = `
# compiled output
/dist
/node_modules
/build

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# temp directory
.temp
.tmp

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json
`;

  if (!fs.existsSync(gitIgnore)) {
    fs.writeFileSync(gitIgnore, ignoreContent.trim());
    console.log('.gitignore created successfully');
  } else {
    fs.appendFileSync(gitIgnore, `\n${ignoreContent.trim()}`);
    console.log('Added rules to .gitignore');
  }

  // Setup default configurations
  packageJson.type = 'module';
  packageJson.scripts = {
    format: 'prettier --write "src/**/*.{js,ts}" "test/**/*.{js,ts}"',
    lint: 'eslint "{src,apps,libs,test}/**/*.{js,ts}" --fix',
    build: 'npm run build',
  };

  // Setup Language
  if (language === 'TypeScript') {
    console.log(chalk.yellow('\nSetting up TypeScript...\n'));

    packageJson.main = 'src/app.ts';
    packageJson.scripts = {
      dev: 'nodemon --ext ts --exec ts-node src/app.ts',
      start: 'node dist/app.js',
    };

    shell.exec('npm install --save-dev typescript @types/express ts-node');
    shell.exec('npx tsc --init');

    const tsConfigPath = 'tsconfig.json';
    if (fs.existsSync(tsConfigPath)) {
      let tsConfig = fs.readFileSync(tsConfigPath, 'utf-8');

      tsConfig = tsConfig
        .replace(
          /\/\/\s*"moduleResolution":\s*".*?",?/g,
          '"moduleResolution": "Node",',
        )
        .replace(/"outDir": ".*?"/, '"outDir": "./dist"');

      if (!/"include": \[.*?\]/.test(tsConfig)) {
        tsConfig = tsConfig.replace(
          /\n\}\s*$/,
          ',\n  "include": ["src/**/*"]\n}',
        );
      }

      fs.writeFileSync(tsConfigPath, tsConfig);
    }
  } else if (language === 'JavaScript') {
    console.log(chalk.yellow('\nSetting up JavaScript...\n'));

    packageJson.main = 'src/app.js';
    packageJson.scripts = {
      dev: 'nodemon src/app.js',
      start: 'node src/app.js',
    };
  }

  // Setup database
  if (database) {
    console.log(chalk.yellow('\nSetting up database configuration...\n'));
    if (database === 'MySQL') {
      shell.exec('npm install mysql2');
    } else {
      shell.exec('npm install pg-promise');
    }
  }

  // Setup Prettier
  if (prettier) {
    console.log(chalk.yellow('\nSetting up Prettier...\n'));
    shell.exec('npm install --save-dev prettier');
    fs.writeFileSync(
      '.prettierrc',
      JSON.stringify({ singleQuote: true, semi: false }, null, 2),
    );
  }

  // Setup Eslint
  if (eslint) {
    console.log(chalk.yellow('\nSetting up Eslint...\n'));
    if (language === 'TypeScript') {
      shell.exec(
        'npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier',
      );

      const eslintConfig = `module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  };`;

      fs.writeFileSync('.eslintrc.js', eslintConfig);
    } else {
      shell.exec(
        'npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier',
      );

      const eslintConfigJs = `module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prettier/prettier': 'error',
  },
};`;

      fs.writeFileSync('.eslintrc.js', eslintConfigJs);
    }
  }

  // Setup Husky & Commitlint
  if (husky) {
    console.log(chalk.yellow('\nSetting up Husky & Commitlint...\n'));

    // Pastikan proyek memiliki Git repository
    if (!fs.existsSync('.git')) {
      console.log(chalk.blue('\nInitializing Git repository...\n'));
      shell.exec('git init');
    }

    // Install Husky & Commitlint (dengan sintaks yang benar)
    shell.exec(
      'npm install --save-dev husky @commitlint/cli @commitlint/config-conventional',
    );

    // Inisialisasi Husky
    shell.exec('npx husky init');

    // Konfigurasi Commitlint
    fs.writeFileSync(
      'commitlint.config.js',
      "module.exports = { extends: ['@commitlint/config-conventional'] };",
    );

    // Tambahkan hook pre-commit
    fs.writeFileSync(
      '.husky/pre-commit',
      `#!/bin/sh\n. "$(dirname "$0")/_/husky.sh"\nnpm run lint\nnpm run format\nnpm run build\n`,
    );
    shell.exec('chmod +x .husky/pre-commit');

    // Tambahkan hook commit-msg
    fs.writeFileSync(
      '.husky/commit-msg',
      `#!/bin/sh\n. "$(dirname "$0")/_/husky.sh"\nnpx --no-install commitlint --edit "$1"\n`,
    );
    shell.exec('chmod +x .husky/commit-msg');

    console.log(
      chalk.green('\nHusky & Commitlint setup completed successfully! ✅\n'),
    );
  }

  // Setup GIT (Optional)
  if (git) {
    console.log(chalk.yellow('\nSetting up Git Repository...\n'));
    shell.exec('git init');
    shell.exec('git add .');
    shell.exec(`git commit -m ` + `feat: setup project ${projectName}`);

    shell.exec('git branch -M main');
    if (gitCommand) {
      shell.exec(`git remote add origin ${gitCommand}`);
    }
    shell.exec('git push -u origin main');
  }

  // Setup Project Structure
  console.log(chalk.yellow('\nSetting up project structure...\n'));
  const folders = [
    'controllers',
    'services',
    'repositories',
    'models',
    'routes',
    'configs',
    'middlewares',
    'utils',
    'validations',
  ];
  if (language === 'TypeScript') {
    folders.push('types');
  }

  if (!fs.existsSync('src')) {
    shell.mkdir('src');
  }

  folders.forEach((folder) => {
    const folderPath = `src/${folder}`;
    if (!fs.existsSync(folderPath)) {
      shell.mkdir(folderPath);
    }
  });

  fs.writeFileSync(`src/app.${language === 'TypeScript' ? 'ts' : 'js'}`, '');
  fs.writeFileSync(`src/server.${language === 'TypeScript' ? 'ts' : 'js'}`, '');

  console.log(chalk.blue('\nProject structure created successfully!\n'));

  console.log(chalk.blue('\nProject setup completed!\n'));
};

createProject();
