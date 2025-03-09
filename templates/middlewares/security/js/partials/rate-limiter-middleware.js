const templateCodeRateLimiterMiddlewareJS = () => {
  return `
import rateLimit from 'express-rate-limit';

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  headers: true,
});

export default limiterMiddleware;
    `;
};

export default templateCodeRateLimiterMiddlewareJS;
