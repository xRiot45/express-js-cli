const templateCodeValidation = (modelName) => {
  return `
import { z } from 'zod';

const ${modelName}Validation = z.object({
  // Implement your validation schema here
});

export default ${modelName}Validation;`;
};

export default templateCodeValidation;
