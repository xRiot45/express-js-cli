import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import { getTemplateDatabaseConfigJS } from '../templates/database-config/js/index.js';
import { getTemplateDatabaseConfigTS } from '../templates/database-config/ts/index.js';
import { getTemplateSequelizeConfigJS } from '../templates/sequelize-config/js/index.js';
import { getTemplateSequelizeConfigTS } from '../templates/sequelize-config/ts/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureDatabase = (databaseName, language) => {
  const packageName =
    databaseName.toLowerCase() === 'mysql'
      ? 'mysql2 sequelize'
      : 'pg pg-hstore sequelize';

  runCommandWithBuilder(() => {
    shell.exec(`npm install ${packageName}`, { silent: true });
  }, `Initializing database`);

  const extension = language === 'JavaScript' ? 'js' : 'ts';
  const configDir = path.resolve('src/configs');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const sequelizeConfigContent =
    language === 'TypeScript'
      ? getTemplateSequelizeConfigTS()
      : getTemplateSequelizeConfigJS();

  fs.writeFileSync(
    path.join(configDir, `sequelize.config.${extension}`),
    sequelizeConfigContent,
  );

  const databaseConfigContent =
    language === 'TypeScript'
      ? getTemplateDatabaseConfigTS()
      : getTemplateDatabaseConfigJS();

  fs.writeFileSync(
    path.join(configDir, `database.config.${extension}`),
    databaseConfigContent,
  );
};
