const templateCodeCorsMiddlewareJS = () => {
  return `
import cors from 'cors';

const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

export default corsMiddleware;
`;
};

export default templateCodeCorsMiddlewareJS;
