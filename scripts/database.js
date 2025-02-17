import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureDatabase = (databaseName) => {
  const packageName =
    databaseName.toLowerCase() === 'mysql'
      ? 'mysql2 sequelize'
      : 'pg pg-hstore sequelize';

  runCommandWithBuilder(() => {
    shell.exec(`npm install ${packageName}`, { silent: true });
  }, `Initializing database...`);
};
