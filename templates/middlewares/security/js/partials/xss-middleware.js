const templateCodeXssMiddlewareJS = () => {
  return `
import xss from 'xss-clean'

const xssMiddleware = (req, res, next) => {
  xss()(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'Request contains unsafe input',
      });
    }
    next();
  });
};

export default xssMiddleware;
`;
};

export default templateCodeXssMiddlewareJS;
