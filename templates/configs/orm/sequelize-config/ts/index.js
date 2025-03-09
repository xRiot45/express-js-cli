const templateCodeSequelizeConfigTS = () => {
  return `
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
  `;
};

export default templateCodeSequelizeConfigTS;
