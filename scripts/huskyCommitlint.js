import fs from 'fs';
import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureHuskyAndCommitlint = async (language) => {
  await runCommandWithBuilder(() => {
    if (!fs.existsSync('.git')) {
      fs.mkdirSync('.git');
    }

    if (!fs.existsSync('.husky')) {
      fs.mkdirSync('.husky');
      shell.exec(
        'npm install --save-dev husky @commitlint/cli @commitlint/config-conventional',
        { silent: true },
      );
    }

    if (!fs.existsSync('.husky/_')) {
      shell.exec('npx husky init', { silent: true });
    }

    const commitlintConfigPath = 'commitlint.config.js';
    if (!fs.existsSync(commitlintConfigPath)) {
      fs.writeFileSync(
        commitlintConfigPath,
        "export default { extends: ['@commitlint/config-conventional']};",
      );
    }

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

    const commitMsgPath = '.husky/commit-msg';
    const commitMsgScript = `npx --no-install commitlint --edit "$1"`;

    if (!fs.existsSync(commitMsgPath)) {
      fs.writeFileSync(commitMsgPath, commitMsgScript, { mode: 0o755 });
    }
  });
};

const getPreCommitCommand = (language) => {
  let command = 'npm run lint && npm run format';

  if (language === 'TypeScript') {
    command += ' && npm run build';
  }

  return command;
};
