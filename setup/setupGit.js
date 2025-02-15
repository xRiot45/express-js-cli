import chalk from 'chalk';
import shell from 'shelljs';

export const setupGit = (projectName, repositoryUrl) => {
  console.log(`${chalk.yellow('\nInitializing Git repository...\n')}`);
  shell.exec('git add .');
  shell.exec(`git commit -m "feat: setup project ${projectName}"`);

  shell.exec('git branch -M main');
  if (repositoryUrl) {
    shell.exec(`git remote add origin ${repositoryUrl}`);
  }
  shell.exec('git push -u origin main');
};
