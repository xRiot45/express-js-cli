const templateCodeCompressionMiddlewareTS = () => {
  return `
import compression from 'compression';
import { Request, Response } from 'express';

const compressionMiddleware = compression({
  level: 6,
  threshold: 1024,
  filter: (req: Request, res: Response): boolean => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
});

export default compressionMiddleware;

`;
};

export default templateCodeCompressionMiddlewareTS;
