import fs from 'fs';
import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const setupHuskyAndCommitlint = (language) => {
  runCommandWithBuilder(() => {
    // 1. Initialize Git if not exists
    if (!fs.existsSync('.git')) {
      fs.mkdirSync('.git');
    }

    // 2. Install Husky & Commitlint
    if (!fs.existsSync('.husky')) {
      fs.mkdirSync('.husky');
      shell.exec(
        'npm install --save-dev husky @commitlint/cli @commitlint/config-conventional',
        { silent: true },
      );
    }

    // 3. Initialize Husky
    if (!fs.existsSync('.husky/_')) {
      shell.exec('npx husky init', { silent: true });
    }

    // 4. Create Commitlint Config
    const commitlintConfigPath = 'commitlint.config.js';
    if (!fs.existsSync(commitlintConfigPath)) {
      fs.writeFileSync(
        commitlintConfigPath,
        "export default { extends: ['@commitlint/config-conventional']};",
      );
    }

    // 5. Setup pre-commit hook
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

    // 6. Setup commit-msg hook
    const commitMsgPath = '.husky/commit-msg';
    const commitMsgScript = `
npx --no-install commitlint --edit "$1"
`;

    if (!fs.existsSync(commitMsgPath)) {
      fs.writeFileSync(commitMsgPath, commitMsgScript, { mode: 0o755 });
    }
  }, 'Installing Husky and Commitlint...');
};

const getPreCommitCommand = (language) => {
  let command = 'npm run lint && npm run format';

  if (language === 'TypeScript') {
    command += ' && npm run build';
  }

  return command;
};
