import chalk from 'chalk';
import shell from 'shelljs';

export const setupDatabase = (database) => {
  console.log(chalk.yellow('\nSetting up database configuration...\n'));
  if (database === 'MySQL') {
    shell.exec('npm install mysql2');
  } else {
    shell.exec('npm install pg-promise');
  }
};
