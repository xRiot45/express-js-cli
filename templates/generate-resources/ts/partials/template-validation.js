const templateCodeValidation = (modelName) => {
  return `
import { z } from 'zod';

const ${modelName}Validation = z.object({
  // Implement your validation schema here
});

type ${modelName}Type = z.infer<typeof ${modelName}Validation>;

export { ${modelName}Validation, ${modelName}Type }`;
};

export default templateCodeValidation;
