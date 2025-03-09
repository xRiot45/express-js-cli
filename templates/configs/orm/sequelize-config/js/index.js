const templateCodeSequelizeConfigJS = () => {
  return `
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
};

export default templateCodeSequelizeConfigJS;
