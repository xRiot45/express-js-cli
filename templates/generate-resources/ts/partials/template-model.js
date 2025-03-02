const templateCodeModel = (modelName) => {
  return `
import sequelize from '../configs/sequelize.config.ts';

const ${modelName}Model = sequelize.define('${modelName}', {
  // Define your model attributes here
});

export default ${modelName}Model;`;
};

export default templateCodeModel;
