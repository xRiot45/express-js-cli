import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const createProjectDirectories = (language) => {
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

  runCommandWithBuilder(() => {
    if (!fs.existsSync('src')) {
      fs.mkdirSync('src');
    }

    folders.forEach((folder) => {
      const folderPath = `src/${folder}`;
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    });

    const extension = language === 'TypeScript' ? 'ts' : 'js';
    fs.writeFileSync(`src/app.${extension}`, '');
    fs.writeFileSync(`src/server.${extension}`, '');
  }, 'Initializing project directories...');
};
