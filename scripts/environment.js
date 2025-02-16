import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureEnvironment = (database, projectName) => {
  const environmentVariables = {
    development: '.env.development.local',
    production: '.env.production.local',
    test: '.env.test.local',
  };

  const environmentVariableContent = (environment) => {
    const databaseEnvironmentVariables =
      database === 'MySQL'
        ? `
# MySQL
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_SYNCHRONIZE=
    `
        : database === 'PostgreSQL'
          ? `
# PostgreSQL
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_SYNCHRONIZE=
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
  }, 'Initializing environment variables...');
};
