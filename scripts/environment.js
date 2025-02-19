import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureEnvironment = (database, projectName, language) => {
  const environmentVariables = {
    development: '.env.development.local',
    production: '.env.production.local',
    test: '.env.test.local',
  };

  const environmentVariableContent = (environment) => {
    const databaseEnvironmentVariables =
      database === 'MySQL'
        ? `
# Database
DIALECT=mysql
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
    `
        : database === 'PostgreSQL'
          ? `
# Database
DIALECT=postgres
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
    `
          : '';

    return `
# Application
APP_URL=http://localhost:3000
APP_NAME=${projectName}
APP_PORT=3000
NODE_ENV=${environment}

    ${databaseEnvironmentVariables}
    `;
  };

  runCommandWithBuilder(() => {
    Object.entries(environmentVariables).forEach(([environment, fileName]) => {
      const content = environmentVariableContent(environment);
      fs.writeFileSync(fileName, content);
    });

    const fileExtension = language === 'TypeScript' ? 'ts' : 'js';
    const envConfigPath = `src/configs/env.config.${fileExtension}`;

    // Generate src/configs/env.config.[js|ts]
    const envConfigContent =
      language === 'TypeScript'
        ? `
import { config } from 'dotenv';
import fs from 'fs';
import logger from './logger.config.ts';

interface EnvConfig {
  APP_URL?: string;
  APP_NAME?: string;
  APP_PORT?: string;
  DIALECT?: string;
  DATABASE_HOST?: string;
  DATABASE_PORT?: string;
  DATABASE_USERNAME?: string;
  DATABASE_PASSWORD?: string;
  DATABASE_NAME?: string;
}

const envFile = \`.env.\${process.env.NODE_ENV || 'development'}.local\`;

if (fs.existsSync(envFile)) {
  config({ path: envFile });
} else {
  logger.warn(\`⚠️  Environment file \${envFile} not found. Make sure to run configureEnvironment.\`);
}

export const envConfig: EnvConfig = ({
  APP_URL: process.env.APP_URL,
  APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT,
  DIALECT: process.env.DIALECT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
} = process.env as EnvConfig);
      `
        : `
import { config } from 'dotenv';
import fs from 'fs';
import logger from './logger.config.js';

const envFile = \`.env.\${process.env.NODE_ENV || 'development'}.local\`;

if (fs.existsSync(envFile)) {
  config({ path: envFile });
} else {
  logger.warn(\`⚠️  Environment file \${envFile} not found. Make sure to run configureEnvironment.\`);
}

// Ekspor semua variabel lingkungan yang dibutuhkan
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

    fs.mkdirSync('src/configs', { recursive: true });
    fs.writeFileSync(envConfigPath, envConfigContent);
  }, 'Initializing environment variables');
};
