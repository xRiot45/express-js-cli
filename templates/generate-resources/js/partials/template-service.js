const templateCodeService = () => {
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
};

export default templateCodeService;
