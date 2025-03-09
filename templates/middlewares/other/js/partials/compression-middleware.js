const templateCodeCompressionMiddlewareJS = () => {
  return `
import compression from 'compression';

const compressionMiddleware = compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
});

export default compressionMiddleware;  
`;
};

export default templateCodeCompressionMiddlewareJS;
