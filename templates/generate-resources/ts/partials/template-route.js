const templateCodeRoute = (modelName) => {
  return `
import { Router } from 'express';
import ${modelName}Controller from '../controllers/${modelName}.controller.ts';

const ${modelName}Router: Router = Router();

${modelName}Router.get('/', ${modelName}Controller.get);
${modelName}Router.get('/:id', ${modelName}Controller.getById);
${modelName}Router.post('/', ${modelName}Controller.create);
${modelName}Router.put('/:id', ${modelName}Controller.update);
${modelName}Router.delete('/:id', ${modelName}Controller.remove);

export default ${modelName}Router;
      `;
};

export default templateCodeRoute;
