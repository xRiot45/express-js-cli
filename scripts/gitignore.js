import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureGitIgnore = () => {
  runCommandWithBuilder(() => {
    const gitignore = '.gitignore';
    const existingIgnoreRules = fs.existsSync(gitignore)
      ? fs.readFileSync(gitignore, 'utf8')
      : '';

    const ignoreRules = `
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
    `;

    const newRules = ignoreRules.trimRight().replace(/\n+$/, '');
    const newIgnoreRules =
      newRules === existingIgnoreRules
        ? existingIgnoreRules
        : `${existingIgnoreRules}\n${newRules}`;

    fs.writeFileSync(gitignore, newIgnoreRules);
  }, 'Initializing gitignore configurations...');
};
