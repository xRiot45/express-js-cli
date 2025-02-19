import fs from 'fs';
import path from 'path';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const createProjectDirectories = (language) => {
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

  runCommandWithBuilder(() => {
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
        ? `
import cors from 'cors';
import express, { Application } from 'express';
import { envConfig } from './configs/env.config.ts';
import logger from './configs/logger.config.ts';
import connectToDatabase from './configs/database.config.ts';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    app.listen(envConfig.APP_PORT, () => {
      logger.info(\`Server running on port \${envConfig.APP_PORT}\`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
    `
        : `
import cors from 'cors';
import express from 'express';
import { APP_PORT } from './configs/env.config.js';
import logger from './configs/logger.config.js';
import connectToDatabase from './configs/database.config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(APP_PORT, async () => {
      logger.info(\`Server running on port \${APP_PORT}\`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

    `;

    if (!fs.existsSync(appFilePath)) {
      fs.writeFileSync(appFilePath, appContent);
    }
  }, 'Initializing project directories');
};
