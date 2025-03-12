import fs from 'fs';
import path from 'path';
import templateCodeMainAppJS from '../templates/main-app/js/index.js';
import templateCodeMainAppTS from '../templates/main-app/ts/index.js';
import templateCodeServerJS from '../templates/server/js/index.js';
import templateCodeServerTS from '../templates/server/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureProjectDirectories = async (language) => {
  const folders = new Set([
    'controllers',
    'services',
    'repositories',
    'models',
    'routes',
    'configs',
    'middlewares',
    'utils',
    'enums',
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
    const serverFilePath = path.join(srcPath, `server.${extension}`);

    const serverContent =
      language === 'TypeScript'
        ? templateCodeServerTS()
        : templateCodeServerJS();

    const appContent =
      language === 'TypeScript'
        ? templateCodeMainAppTS()
        : templateCodeMainAppJS();

    if (!fs.existsSync(appFilePath && serverFilePath)) {
      fs.writeFileSync(serverFilePath, serverContent);
      fs.writeFileSync(appFilePath, appContent);
    }
  });
};

export default configureProjectDirectories;
