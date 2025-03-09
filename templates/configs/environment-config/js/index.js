const templateCodeEnvironmentConfigJS = () => {
  return `
import { config } from 'dotenv';
import fs from 'fs';
import logger from './logger.config.js';

const envFile = \`.env.\${process.env.NODE_ENV || 'development'}.local\`;

if (fs.existsSync(envFile)) {
  config({ path: envFile });
} else {
  logger.warn(\`⚠️  Environment file \${envFile} not found. Make sure to run configureEnvironment.\`);
}

export const {
  APP_URL,
  APP_NAME,
  APP_PORT,
  DIALECT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;
      `;
};

export default templateCodeEnvironmentConfigJS;
