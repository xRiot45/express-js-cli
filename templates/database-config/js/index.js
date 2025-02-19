export const getTemplateDatabaseConfigJS = () => {
  return `
import logger from './logger.config.js';
import sequelize from './sequelize.config.js';

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
};
