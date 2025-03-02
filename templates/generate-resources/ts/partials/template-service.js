const templateCodeService = (modelName) => {
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
};

export default templateCodeService;
