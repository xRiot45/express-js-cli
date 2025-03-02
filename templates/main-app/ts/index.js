export const getTemplateMainAppTS = () => {
  return `
import cors from 'cors';
import express, { Application } from 'express';
import { envConfig } from './configs/env.config.ts';
import logger from './configs/logger.config.ts';
import connectToDatabase from './configs/database.config.ts';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    app.listen(envConfig.APP_PORT, () => {
      logger.info(\`Server running on port \${envConfig.APP_PORT}\`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

export default app;
    `;
};
