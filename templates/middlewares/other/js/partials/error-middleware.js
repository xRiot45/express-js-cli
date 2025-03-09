const templateCodeErrorMiddlewareJS = () => {
  return `
const errorMiddleware = (err, req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || null,
  });
};

export default errorMiddleware;
`;
};

export default templateCodeErrorMiddlewareJS;
