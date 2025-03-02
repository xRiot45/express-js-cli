const templateCodeController = () => {
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
};

export default templateCodeController;
