const templateCodeRateLimiterMiddlewareTS = () => {
  return `
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req: Request, res: Response, next: NextFunction) => {
    res.status(429).json({
      status: 429,
      error: 'Too many requests, please try again later.',
    });
  },
  headers: true,
});

export default limiterMiddleware;

    `;
};

export default templateCodeRateLimiterMiddlewareTS;
