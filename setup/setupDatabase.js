import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const setupDatabase = (databaseName) => {
  const packageName =
    databaseName.toLowerCase() === 'mysql' ? 'mysql2' : 'pg-promise';

  runCommandWithBuilder(() => {
    shell.exec(`npm install ${packageName}`, { silent: true });
  }, `Installing Database...`);
};
