import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import templateCodeDatabaseConfigJS from '../templates/configs/database-config/js/index.js';
import templateCodeDatabaseConfigTS from '../templates/configs/database-config/ts/index.js';
import templateCodeSequelizeConfigJS from '../templates/configs/orm/sequelize-config/js/index.js';
import templateCodeSequelizeConfigTS from '../templates/configs/orm/sequelize-config/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureDatabase = async (databaseName, language) => {
  const packageName =
    databaseName.toLowerCase() === 'mysql'
      ? 'mysql2 sequelize'
      : 'pg pg-hstore sequelize';

  await runCommandWithBuilder(() => {
    shell.exec(`npm install ${packageName}`, { silent: true });
  });

  const extension = language === 'JavaScript' ? 'js' : 'ts';
  const configDir = path.resolve('src/configs');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const sequelizeConfigContent =
    language === 'TypeScript'
      ? templateCodeSequelizeConfigTS()
      : templateCodeSequelizeConfigJS();

  fs.writeFileSync(
    path.join(configDir, `sequelize.config.${extension}`),
    sequelizeConfigContent,
  );

  const databaseConfigContent =
    language === 'TypeScript'
      ? templateCodeDatabaseConfigTS()
      : templateCodeDatabaseConfigJS();

  fs.writeFileSync(
    path.join(configDir, `database.config.${extension}`),
    databaseConfigContent,
  );
};

export default configureDatabase;
