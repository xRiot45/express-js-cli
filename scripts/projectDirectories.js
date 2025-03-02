import fs from 'fs';
import path from 'path';
import { getTemplateMainAppJS } from '../templates/main-app/js/index.js';
import { getTemplateMainAppTS } from '../templates/main-app/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureProjectDirectories = async (language) => {
  const folders = new Set([
    'controllers',
    'services',
    'repositories',
    'models',
    'routes',
    'configs',
    'middlewares',
    'utils',
    'validations',
  ]);

  if (language === 'TypeScript') {
    folders.add('types');
    folders.add('interfaces');
  }

  await runCommandWithBuilder(() => {
    const srcPath = 'src';
    if (!fs.existsSync(srcPath)) {
      fs.mkdirSync(srcPath);
    }

    folders.forEach((folder) => {
      const folderPath = path.join(srcPath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    });

    const extension = language === 'TypeScript' ? 'ts' : 'js';
    const appFilePath = path.join(srcPath, `app.${extension}`);

    const appContent =
      language === 'TypeScript'
        ? getTemplateMainAppTS()
        : getTemplateMainAppJS();

    if (!fs.existsSync(appFilePath)) {
      fs.writeFileSync(appFilePath, appContent);
    }
  });
};
