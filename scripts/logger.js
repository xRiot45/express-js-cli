import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import { getTemplateLoggerJS } from '../templates/logger-config/js/index.js';
import { getTemplateLoggerTS } from '../templates/logger-config/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureLogger = (language) => {
  runCommandWithBuilder(() => {
    shell.exec(`npm install winston`, { silent: true });
  }, `Initializing logger`);

  const extension = language === 'JavaScript' ? 'js' : 'ts';
  const configDir = path.resolve('src/configs');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const loggerConfigContent =
    language === 'TypeScript' ? getTemplateLoggerTS() : getTemplateLoggerJS();

  fs.writeFileSync(
    path.join(configDir, `logger.config.${extension}`),
    loggerConfigContent,
  );
};
