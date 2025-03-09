const templateCodeXssMiddlewareTS = () => {
  return `
import { Request, Response, NextFunction } from 'express';
import xss from 'xss-clean';

const xssMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  xss()(req, res, (err: Error | null) => {
    if (err) {
      res.status(400).json({
        message: 'Request contains unsafe input',
      });
      return;
    }
    next();
  });
};

export default xssMiddleware;
`;
};

export default templateCodeXssMiddlewareTS;
