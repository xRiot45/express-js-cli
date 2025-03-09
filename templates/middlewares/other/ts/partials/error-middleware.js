const templateCodeErrorMiddlewareTS = () => {
  return `
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  errors?: Record<string, string> | null;
}

const errorMiddleware = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  _next: NextFunction
): void => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || null,
  });
};

export default errorMiddleware;

`;
};

export default templateCodeErrorMiddlewareTS;
