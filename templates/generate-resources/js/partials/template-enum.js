const templateCodeEnum = (modelName) => {
  return `
export const ${modelName}Enum = Object.freeze({
    // Implement your enum here
})
    `;
};

export default templateCodeEnum;
