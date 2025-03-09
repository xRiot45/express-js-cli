import path from 'path';
import fs from 'fs';
import {
  templateCodeCsrfMiddlewareTS,
  templateCodeCorsMiddlewareTS,
  templateCodeRateLimiterMiddlewareTS,
} from '../templates/middlewares/security/ts/index.js';
import {
  templateCodeCsrfMiddlewareJS,
  templateCodeCorsMiddlewareJS,
  templateCodeRateLimiterMiddlewareJS,
} from '../templates/middlewares/security/js/index.js';
import {
  templateCodeCompressionMiddlewareJS,
  templateCodeErrorMiddlewareJS,
  templateCodeMorganMiddlewareJS,
} from '../templates/middlewares/other/js/index.js';
import {
  templateCodeCompressionMiddlewareTS,
  templateCodeErrorMiddlewareTS,
  templateCodeMorganMiddlewareTS,
} from '../templates/middlewares/other/ts/index.js';

const middlewareTemplates = {
  TypeScript: {
    cors: templateCodeCorsMiddlewareTS,
    csrf: templateCodeCsrfMiddlewareTS,
    rateLimiter: templateCodeRateLimiterMiddlewareTS,
    error: templateCodeErrorMiddlewareTS,
    morgan: templateCodeMorganMiddlewareTS,
    compression: templateCodeCompressionMiddlewareTS,
  },
  JavaScript: {
    cors: templateCodeCorsMiddlewareJS,
    csrf: templateCodeCsrfMiddlewareJS,
    rateLimiter: templateCodeRateLimiterMiddlewareJS,
    error: templateCodeErrorMiddlewareJS,
    morgan: templateCodeMorganMiddlewareJS,
    compression: templateCodeCompressionMiddlewareJS,
  },
};

export const configureMiddlewares = async (language) => {
  const fileExtension = language === 'JavaScript' ? 'js' : 'ts';
  const middlewareDirectory = path.resolve('src/middlewares');

  if (!fs.existsSync(middlewareDirectory)) {
    fs.mkdirSync(middlewareDirectory, { recursive: true });
  }

  const middlewares = [
    { name: 'cors', filename: `cors.middleware.${fileExtension}` },
    { name: 'rateLimiter', filename: `limiter.middleware.${fileExtension}` },
    { name: 'error', filename: `error.middleware.${fileExtension}` },
    { name: 'morgan', filename: `morgan.middleware.${fileExtension}` },
    {
      name: 'compression',
      filename: `compression.middleware.${fileExtension}`,
    },
  ];

  middlewares.forEach(({ name, filename }) => {
    const filePath = path.join(middlewareDirectory, filename);
    const content = middlewareTemplates[language][name]();
    fs.writeFileSync(filePath, content, 'utf-8');
  });
};
