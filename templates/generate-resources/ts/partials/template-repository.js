const templateCodeRepository = (modelName) => {
  return `
import { Model, FindOptions } from 'sequelize';
import ${modelName}Model from '../models/${modelName}.model.ts';
import ${modelName}Interface from '../interfaces/${modelName}.interface.ts';

const getAllData = async (): Promise<Model<${modelName}Interface>[]> => {
  return await ${modelName}Model.findAll();
};

const getDataById = async (id: number): Promise<Model<${modelName}Interface> | null> => {
  return await ${modelName}Model.findOne({ where: { id } });
};

const createData = async (data: Partial<${modelName}Interface>): Promise<Model<${modelName}Interface>> => {
  return await ${modelName}Model.create(data);
};

const updateData = async (id: number, data: Partial<${modelName}Interface>): Promise<Model<${modelName}Interface> | null> => {
  await ${modelName}Model.update(data, { where: { id } });
  return await ${modelName}Model.findOne({ where: { id } });
};

const deleteData = async (id: number): Promise<Model<${modelName}Interface> | null> => {
  const data = await ${modelName}Model.findOne({ where: { id } });
  if (data) {
    await ${modelName}Model.destroy({ where: { id } });
  }
  return data;
};

export default { getAllData, getDataById, createData, updateData, deleteData }`;
};

export default templateCodeRepository;
