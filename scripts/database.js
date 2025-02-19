import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';
import path from 'path';
import fs from 'fs';

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
      ? `
import { Sequelize } from 'sequelize';
import { envConfig } from './env.config.ts';

type SequelizeDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

const sequelize = new Sequelize({
  dialect: envConfig.DIALECT as SequelizeDialect,
  host: envConfig.DATABASE_HOST,
  port: Number(envConfig.DATABASE_PORT),
  username: envConfig.DATABASE_USERNAME,
  password: envConfig.DATABASE_PASSWORD,
  database: envConfig.DATABASE_NAME,
  logging: false,
});

export default sequelize;
  `
      : `
import { Sequelize } from 'sequelize';
import {
  DIALECT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './env.config.js';

const sequelize = new Sequelize({
  dialect: DIALECT,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: false,
});

export default sequelize;
`;

  fs.writeFileSync(
    path.join(configDir, `sequelize.config.${extension}`),
    sequelizeConfigContent,
  );

  const databaseConfigContent = `import logger from './logger.config.${extension}';
import sequelize from './sequelize.config.${extension}';

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection to the database has been established successfully.');
  } catch (error) {
    await sequelize.close();
    logger.error('Unable to connect to the database:', error);
  }
};

export default connectToDatabase;`;

  fs.writeFileSync(
    path.join(configDir, `database.config.${extension}`),
    databaseConfigContent,
  );
};
