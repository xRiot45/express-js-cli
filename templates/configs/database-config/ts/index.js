const templateCodeDatabaseConfigTS = () => {
  return `
import logger from './logger.config.ts';
import sequelize from './sequelize.config.ts';

export default async function connectToDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info(
      'Connection to the database has been established successfully.',
    );

  } catch (error) {
    await sequelize.close();
    logger.error('Unable to connect to the database:', error);
  }
}`;
};

export default templateCodeDatabaseConfigTS;
