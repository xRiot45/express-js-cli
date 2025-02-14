import chalk from 'chalk';
import shell from 'shelljs';

export const setupGit = () => {
  console.log(chalk.yellow('\nSetting up Git Repository...\n'));
  shell.exec('git add .');
  shell.exec(`git commit -m ` + `feat: setup project ${projectName}`);

  shell.exec('git branch -M main');
  if (gitCommand) {
    shell.exec(`git remote add origin ${gitCommand}`);
  }
  shell.exec('git push -u origin main');
};
