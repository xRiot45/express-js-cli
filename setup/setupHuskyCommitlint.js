import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

export const setupHuskyAndCommitlint = (language) => {
  console.log(chalk.yellow('\nSetting up Husky and Commitlint...\n'));

  const initGit = () => {
    if (!fs.existsSync('.git')) {
      console.log(chalk.blue('\nInitializing Git repository...\n'));
      shell.exec('git init');
    }
  };

  const installHuskyAndCommitlint = () => {
    if (!fs.existsSync('.husky')) {
      console.log(chalk.blue('\nInstalling Husky and Commitlint...\n'));
      shell.exec(
        'npm install --save-dev husky @commitlint/cli @commitlint/config-conventional',
      );
    }
  };

  const initHusky = () => {
    if (!fs.existsSync('.husky/_')) {
      console.log(chalk.blue('\nInitializing Husky...\n'));
      shell.exec('npx husky init');
    }
  };

  const createCommitlintConfig = () => {
    const commitlintConfigPath = 'commitlint.config.js';

    if (!fs.existsSync(commitlintConfigPath)) {
      fs.writeFileSync(
        commitlintConfigPath,
        "export default { extends: ['@commitlint/config-conventional']};",
      );
    }
  };

  const createPreCommitHook = () => {
    const preCommitPath = '.husky/pre-commit';
    const preCommitCommand = getPreCommitCommand(language);

    if (fs.existsSync(preCommitPath)) {
      let preCommitContent = fs.readFileSync(preCommitPath, 'utf8');

      preCommitContent = preCommitContent
        .split('\n')
        .filter((line) => !line.includes('npm test'))
        .join('\n');

      preCommitContent += `${preCommitCommand}\n`;

      fs.writeFileSync(preCommitPath, preCommitContent, 'utf8');
    }
  };

  const createCommitMsgHook = () => {
    const commitMsgPath = '.husky/commit-msg';
    const commitMsgScript = `
npx --no-install commitlint --edit "$1"
`;

    if (!fs.existsSync('.husky/commit-msg')) {
      fs.writeFileSync(commitMsgPath, commitMsgScript, { mode: 0o755 });
    }
  };

  const getPreCommitCommand = (language) => {
    let command = 'npm run lint && npm run format';

    if (language === 'TypeScript') {
      command += ' && npm run build';
    }

    return command;
  };

  initGit();
  installHuskyAndCommitlint();
  initHusky();
  createCommitlintConfig();
  createPreCommitHook();
  createCommitMsgHook();

  console.log(
    chalk.green('\nHusky and Commitlint setup completed successfully! \n'),
  );
};
