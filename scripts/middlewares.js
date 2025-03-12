import fs from 'fs';
import path from 'path';

// Security Middleware
import {
  templateCodeCorsMiddlewareJS,
  templateCodeRateLimiterMiddlewareJS,
  templateCodeXssMiddlewareJS,
} from '../templates/middlewares/security/js/index.js';
import {
  templateCodeCorsMiddlewareTS,
  templateCodeRateLimiterMiddlewareTS,
} from '../templates/middlewares/security/ts/index.js';

// Other Middleware
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
    limiter: templateCodeRateLimiterMiddlewareTS,
    error: templateCodeErrorMiddlewareTS,
    morgan: templateCodeMorganMiddlewareTS,
    compression: templateCodeCompressionMiddlewareTS,
  },
  JavaScript: {
    cors: templateCodeCorsMiddlewareJS,
    limiter: templateCodeRateLimiterMiddlewareJS,
    error: templateCodeErrorMiddlewareJS,
    morgan: templateCodeMorganMiddlewareJS,
    compression: templateCodeCompressionMiddlewareJS,
    xss: templateCodeXssMiddlewareJS,
  },
};

const configureMiddlewares = async (language) => {
  const fileExtension = language === 'JavaScript' ? 'js' : 'ts';
  const middlewareDirectory = path.resolve('src/middlewares');

  if (!fs.existsSync(middlewareDirectory)) {
    fs.mkdirSync(middlewareDirectory, { recursive: true });
  }

  const middlewares = [
    { name: 'cors', filename: `cors.middleware.${fileExtension}` },
    { name: 'limiter', filename: `limiter.middleware.${fileExtension}` },
    { name: 'error', filename: `error.middleware.${fileExtension}` },
    { name: 'morgan', filename: `morgan.middleware.${fileExtension}` },
    {
      name: 'compression',
      filename: `compression.middleware.${fileExtension}`,
    },
  ];

  const imports = [];
  const exports = [];

  middlewares.forEach(({ name, filename }) => {
    const filePath = path.join(middlewareDirectory, filename);
    const content = middlewareTemplates[language][name]();
    fs.writeFileSync(filePath, content, 'utf-8');

    const importName = `${name}Middleware`;
    imports.push(`import ${importName} from './${filename}';`);
    exports.push(`${importName},`);

    const indexContent = `${imports.join('\n')}\n\nexport {\n${exports.join('\n')}\n};\n`;
    fs.writeFileSync(
      path.join(middlewareDirectory, `index.${fileExtension}`),
      indexContent,
      'utf-8',
    );
  });
};

export default configureMiddlewares;
