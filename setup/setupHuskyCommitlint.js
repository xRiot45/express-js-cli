import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

export const setupHuskyCommitlint = (language) => {
  console.log(chalk.yellow('\n🔧 Setting up Husky & Commitlint...\n'));

  if (!fs.existsSync('.git')) {
    console.log(chalk.blue('\n📌 Initializing Git repository...\n'));
    shell.exec('git init');
  }

  if (!fs.existsSync('.husky')) {
    console.log(chalk.blue('\n📌 Installing Husky & Commitlint...\n'));
    shell.exec(
      'npm install --save-dev husky @commitlint/cli @commitlint/config-conventional',
    );
  } else {
    console.log(
      chalk.green('\n✅ Husky already installed, skipping installation.\n'),
    );
  }

  if (!fs.existsSync('.husky/_')) {
    console.log(chalk.blue('\n📌 Initializing Husky...\n'));
    shell.exec('npx husky init');
  }

  fs.writeFileSync('.husky/_/.gitignore', '*');

  // Commitlint Config
  const commitlintConfigPath = 'commitlint.config.js';
  if (!fs.existsSync(commitlintConfigPath)) {
    fs.writeFileSync(
      commitlintConfigPath,
      "module.exports = { extends: ['@commitlint/config-conventional'] };",
    );
    console.log(chalk.green('\n✅ Commitlint configuration created!\n'));
  } else {
    console.log(
      chalk.green('\n✅ Commitlint configuration already exists, skipping.\n'),
    );
  }

  // Pre-commit
  const preCommitPath = '.husky/pre-commit';
  let preCommitCommand = 'npm run lint && npm run format';

  if (language === 'TypeScript') {
    preCommitCommand += ' && npm run build';
  }

  if (fs.existsSync(preCommitPath)) {
    let preCommitContent = fs.readFileSync(preCommitPath, 'utf8');

    preCommitContent = preCommitContent
      .split('\n')
      .filter((line) => !line.includes('npm test'))
      .join('\n');

    preCommitContent += `\n${preCommitCommand}\n`;

    fs.writeFileSync(preCommitPath, preCommitContent, 'utf8');

    console.log(chalk.green('✅ Pre-commit hook updated successfully!\n'));
  } else {
    console.log(
      chalk.red(
        '❌ Pre-commit hook not found! Make sure Husky is initialized.',
      ),
    );
  }

  // Commit-msg
  const commitMsgPath = '.husky/commit-msg';
  const commitMsgScript = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx --no-install commitlint --edit "$1"
`;
  if (!fs.existsSync('.husky/commit-msg')) {
    fs.writeFileSync(commitMsgPath, commitMsgScript, { mode: 0o755 });
    console.log(chalk.green('✅ Commit-msg hook added!\n'));
  } else {
    console.log(chalk.green('✅ Commit-msg hook already exists, skipping.\n'));
  }

  console.log(
    chalk.green('\n🎉 Husky & Commitlint setup completed successfully! ✅\n'),
  );
};
