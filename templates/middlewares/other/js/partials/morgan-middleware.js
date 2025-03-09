const templateCodeMorganMiddlewareJS = () => {
  return `
import morgan from 'morgan';
import logger from '../configs/logger.config.js';

const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

export default morganMiddleware;
`;
};

export default templateCodeMorganMiddlewareJS;
