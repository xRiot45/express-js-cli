const templateCodeMiddleware = (modelName) => {
  return `
const ${modelName}Middleware = (req, res, next) => {
  try{
    // Implement your middleware logic here
    next();
  } catch(error){
    next(error) 
  }
}

export default ${modelName}Middleware
  `;
};

export default templateCodeMiddleware;
