const templateCodeRepository = (modelName) => {
  return `
import ${modelName}Model from '../models/${modelName}.model.js';

const getAllData = async () => await ${modelName}Model.findAll();

const getDataById = async (id) => await ${modelName}Model.findOne({ where: { id } });

const createData = async (data) => await ${modelName}Model.create(data);

const updateData = async (id, data) => {
  await ${modelName}Model.update(data, { where: { id } });
  return await ${modelName}Model.findOne({ where: { id } });
};

const deleteData = async (id) => {
  const data = await ${modelName}Model.findOne({ where: { id } });
  await ${modelName}Model.destroy({ where: { id } });
  return data;
};

export default { getAllData, getDataById, createData, updateData, deleteData };`;
};

export default templateCodeRepository;
