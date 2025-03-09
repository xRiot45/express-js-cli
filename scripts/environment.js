import fs from 'fs';
import templateCodeEnvironmentConfigJS from '../templates/configs/environment-config/js/index.js';
import templateCodeEnvironmentConfigTS from '../templates/configs/environment-config/ts/index.js';
import templateCodeEnvironmentVariable from '../templates/environment-variabel/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureEnvironment = async (database, projectName, language) => {
  const environmentVariables = {
    development: '.env.development.local',
    production: '.env.production.local',
    test: '.env.test.local',
  };

  const environmentVariableContent = (environment) =>
    templateCodeEnvironmentVariable(projectName, environment, database);

  await runCommandWithBuilder(() => {
    Object.entries(environmentVariables).forEach(([environment, fileName]) => {
      const content = environmentVariableContent(environment);
      fs.writeFileSync(fileName, content);
    });

    const fileExtension = language === 'TypeScript' ? 'ts' : 'js';
    const envConfigPath = `src/configs/env.config.${fileExtension}`;

    const envConfigContent =
      language === 'TypeScript'
        ? templateCodeEnvironmentConfigTS()
        : templateCodeEnvironmentConfigJS();

    fs.mkdirSync('src/configs', { recursive: true });
    fs.writeFileSync(envConfigPath, envConfigContent);
  });
};

export default configureEnvironment;
