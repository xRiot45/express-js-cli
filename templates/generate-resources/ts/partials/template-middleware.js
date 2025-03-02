const templateCodeMiddleware = (modelName) => {
  return `
import { Request, Response, NextFunction } from 'express';

const ${modelName}Middleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Implement your middleware logic here
    next();
  } catch (error) {
    next(error);
  }
};

export default ${modelName}Middleware;    
`;
};

export default templateCodeMiddleware;
