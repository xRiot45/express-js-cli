import chalk from 'chalk';
import shell from 'shelljs';

export const setupEnv = () => {
  console.log(chalk.yellow('\nSetting up environment variables...\n'));
  shell.exec('touch .env.development.local');
  shell.exec('touch .env.production.local');
  shell.exec('touch .env.test.local');
};
