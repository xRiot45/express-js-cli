const templateCodeUtil = (modelName) => {
  return `
const ${modelName}Util = (): void => {
  // Implement your util logic here  
}

export default ${modelName}Util
`;
};

export default templateCodeUtil;
