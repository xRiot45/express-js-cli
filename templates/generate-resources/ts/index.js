export const getTemplateGenerateResourcesTS = (schematic, resourceName) => {
  const modelName = resourceName.toLowerCase();
  switch (schematic) {
    case 'service':
      return `
import ${modelName}Interface from '../interfaces/${modelName}.interface.ts';

const get = async (): Promise<${modelName}Interface[]> => {
  // Implement your logic to get data here
  return [];
};

const getById = async (id: string): Promise<${modelName}Interface | null> => {
  // Implement your logic to get data by id here
  return null;
};

const create = async (data: ${modelName}Interface): Promise<${modelName}Interface> => {
  // Implement your logic to create data here
  return data;
};

const update = async (
  id: string,
  data: Partial<${modelName}Interface>,
): Promise<${modelName}Interface | null> => {
  // Implement your logic to update data here
  return null;
};

const remove = async (id: string): Promise<boolean> => {
  // Implement your logic to remove data here
  return false;
};

export default { get, getById, create, update, remove }`;

    case 'controller':
      return `
import { Request, Response, NextFunction } from 'express';

const get = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to get data here
  } catch (error) {
    next(error);
  }
};

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to get data by id here
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to create data here
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to update data here
  } catch (error) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to remove data here
  } catch (error) {
    next(error);
  }
};

export default { get, getById, create, update, remove };
`;
    case 'validation':
      return `
import { z } from 'zod';

const ${modelName}Validation = z.object({
  // Implement your validation schema here
});

type ${modelName}Type = z.infer<typeof ${modelName}Validation>;

export { ${modelName}Validation, ${modelName}Type }`;
    case 'model':
      return `
import sequelize from '../configs/sequelize.config.ts';

const ${modelName}Model = sequelize.define('${modelName}', {
  // Define your model attributes here
});

export default ${modelName}Model;`;
    case 'repository':
      return `
import { Model, FindOptions } from 'sequelize';
import ${modelName}Model from '../models/${modelName}.model.ts';
import ${modelName}Interface from '../interfaces/${modelName}.interface.ts';

const getAllData = async (): Promise<Model<${modelName}Interface>[]> => {
  return await ${modelName}Model.findAll();
};

const getDataById = async (id: number): Promise<Model<${modelName}Interface> | null> => {
  return await ${modelName}Model.findByPk(id);
};

const createData = async (data: Partial<${modelName}Interface>): Promise<Model<${modelName}Interface>> => {
  return await ${modelName}Model.create(data);
};

const updateData = async (id: number, data: Partial<${modelName}Interface>): Promise<Model<${modelName}Interface> | null> => {
  await ${modelName}Model.update(data, { where: { id } });
  return await ${modelName}Model.findByPk(id);
};

const deleteData = async (id: number): Promise<Model<${modelName}Interface> | null> => {
  const data = await ${modelName}Model.findByPk(id);
  if (data) {
    await ${modelName}Model.destroy({ where: { id } });
  }
  return data;
};

export default { getAllData, getDataById, createData, updateData, deleteData }`;

    case 'route':
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
    case 'interface':
      return `
export default interface ${modelName}Interface{
  // Implement your interface here
}      
  `;
    case 'middleware':
      return `
import { Request, Response, NextFunction } from 'express';

const ${modelName}Middleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Implement your middleware logic here
    next();
  } catch (error) {
    next(error);
  }
};

export default ${modelName}Middleware;    
`;
    case 'util':
      return `
const ${modelName}Util = (): void => {
  // Implement your util logic here  
}

export default ${modelName}Util
`;
    default:
      return '';
  }
};
