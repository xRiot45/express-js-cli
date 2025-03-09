import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import templateCodeLoggerJS from '../templates/configs/logger-config/js/index.js';
import templateCodeLoggerTS from '../templates/configs/logger-config/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureLogger = async (language) => {
  await runCommandWithBuilder(() => {
    shell.exec(`npm install winston`, { silent: true });
  }, `Initializing logger`);

  const extension = language === 'JavaScript' ? 'js' : 'ts';
  const configDir = path.resolve('src/configs');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const loggerConfigContent =
    language === 'TypeScript' ? templateCodeLoggerTS() : templateCodeLoggerJS();

  fs.writeFileSync(
    path.join(configDir, `logger.config.${extension}`),
    loggerConfigContent,
  );
};

export default configureLogger;
