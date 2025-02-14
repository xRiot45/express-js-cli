import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

export const setupProjectStructure = () => {
  // Setup Project Structure
  console.log(chalk.yellow('\nSetting up project structure...\n'));
  const folders = [
    'controllers',
    'services',
    'repositories',
    'models',
    'routes',
    'configs',
    'middlewares',
    'utils',
    'validations',
  ];
  if (language === 'TypeScript') {
    folders.push('types');
  }

  if (!fs.existsSync('src')) {
    shell.mkdir('src');
  }

  folders.forEach((folder) => {
    const folderPath = `src/${folder}`;
    if (!fs.existsSync(folderPath)) {
      shell.mkdir(folderPath);
    }
  });

  fs.writeFileSync(`src/app.${language === 'TypeScript' ? 'ts' : 'js'}`, '');
  fs.writeFileSync(`src/server.${language === 'TypeScript' ? 'ts' : 'js'}`, '');

  console.log(chalk.blue('\nProject structure created successfully!\n'));

  console.log(chalk.blue('\nProject setup completed!\n'));
};
