const templateCodeExpressConfigJS = () => {
  return `
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import {
  compressionMiddleware,
  corsMiddleware,
  errorMiddleware,
  limiterMiddleware,
  morganMiddleware,
} from '../middlewares/index.js';
import server from '../server.js';

const configureExpress = () => {
  const app = express();
  app.use(compressionMiddleware);
  app.use(morganMiddleware);
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(corsMiddleware);
  app.use(cookieParser());
  app.use(limiterMiddleware);

  // add your routes in here!!
  app.use(errorMiddleware);

  server();
  return app;
};

export default configureExpress;
  `;
};

export default templateCodeExpressConfigJS;
