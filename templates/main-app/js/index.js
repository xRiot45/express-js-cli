export const getTemplateMainAppJS = () => {
  return `
import cors from 'cors';
import express from 'express';
import { APP_PORT } from './configs/env.config.js';
import logger from './configs/logger.config.js';
import connectToDatabase from './configs/database.config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(APP_PORT, async () => {
      logger.info(\`Server running on port \${APP_PORT}\`);
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
