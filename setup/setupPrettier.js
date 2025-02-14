import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

export const setupPrettier = () => {
  console.log(chalk.yellow('\nSetting up Prettier...\n'));
  shell.exec('npm install --save-dev prettier');
  fs.writeFileSync(
    '.prettierrc',
    JSON.stringify({ singleQuote: true, semi: false }, null, 2),
  );
};
