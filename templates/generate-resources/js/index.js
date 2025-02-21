export const getTemplateGenerateResourcesJS = (schematic, resourceName) => {
  const modelName = resourceName.toLowerCase();
  switch (schematic) {
    case 'service':
      return `
const get = async () => {
  // Implement your logic get data here
  return [];
};

const getById = async (id) => {
  // Implement your logic get data by id here
  return null;
};

const create = async (data) => {
  // Implement your logic create data here
  return null;
};

const update = async (id, data) => {
  // Implement your logic update data here
  return null;
};

const remove = async (id) => {
  // Implement your logic remove data here
  return false;
};

export default { get, getById, create, update, remove }`;
    case 'controller':
      return `
const get = async (req, res, next) => {
  try {
    // Implement your logic get data here
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    // Implement your logic get data by id here
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // Implement your logic create data here
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // Implement your logic update data here
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    // Implement your logic remove data here
  } catch (error) {
    next(error);
  }
};

export default { get, getById, create, update, remove };`;
    case 'validation':
      return `
import { z } from 'zod';

const ${modelName}Validation = z.object({
  // Implement your validation schema here
});

export default ${modelName}Validation;`;
    case 'model':
      return `
import sequelize from '../configs/sequelize.config.js';

const ${modelName}Model = sequelize.define('${modelName}', {
  // Define your model attributes here
});

export default ${modelName}Model;`;
    case 'repository':
      return `
import ${modelName}Model from '../models/${modelName}.model.js';

const getAllData = async () => await ${modelName}Model.findAll();

const getDataById = async (id) => await ${modelName}Model.findByPk(id);

const createData = async (data) => await ${modelName}Model.create(data);

const updateData = async (id, data) => {
  await ${modelName}Model.update(data, { where: { id } });
  return await ${modelName}Model.findByPk(id);
};

const deleteData = async (id) => {
  const data = await ${modelName}Model.findByPk(id);
  await ${modelName}Model.destroy({ where: { id } });
  return data;
};

export default { getAllData, getDataById, createData, updateData, deleteData };`;
    case 'route':
      return `
import { Router } from 'express';
import ${modelName}Controller from '../controllers/${modelName}.controller.js';

const ${modelName}Router = Router();

${modelName}Router.get('/', ${modelName}Controller.get);
${modelName}Router.get('/:id', ${modelName}Controller.getById);
${modelName}Router.post('/', ${modelName}Controller.create);
${modelName}Router.put('/:id', ${modelName}Controller.update);
${modelName}Router.delete('/:id', ${modelName}Controller.remove);

export default ${modelName}Router;
      `;
    case 'middleware':
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
    case 'util':
      return `
const ${modelName}Util = () => {
  // Implement your util logic here  
}

export default ${modelName}Util
`;
    default:
      return '';
  }
};
