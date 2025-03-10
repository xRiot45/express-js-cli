const templateCodeExpressConfigTS = () => {
  return `
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import {
  compressionMiddleware,
  corsMiddleware,
  errorMiddleware,
  limiterMiddleware,
  morganMiddleware,
} from '../middlewares/index.ts';
import server from '../server.ts';

const configureExpress = (): Application => {
  const app: Application = express();

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

export default templateCodeExpressConfigTS;
