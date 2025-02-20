import fs from 'fs';
import { getTemplateEnvironmentConfigJS } from '../templates/environment-config/js/index.js';
import { getTemplateEnvironmentConfigTS } from '../templates/environment-config/ts/index.js';
import { getTemplateEnvironmentVariabel } from '../templates/environment-variabel/index.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

export const configureEnvironment = async (database, projectName, language) => {
  const environmentVariables = {
    development: '.env.development.local',
    production: '.env.production.local',
    test: '.env.test.local',
  };

  const environmentVariableContent = (environment) =>
    getTemplateEnvironmentVariabel(projectName, environment, database);

  await runCommandWithBuilder(() => {
    Object.entries(environmentVariables).forEach(([environment, fileName]) => {
      const content = environmentVariableContent(environment);
      fs.writeFileSync(fileName, content);
    });

    const fileExtension = language === 'TypeScript' ? 'ts' : 'js';
    const envConfigPath = `src/configs/env.config.${fileExtension}`;

    const envConfigContent =
      language === 'TypeScript'
        ? getTemplateEnvironmentConfigTS()
        : getTemplateEnvironmentConfigJS();

    fs.mkdirSync('src/configs', { recursive: true });
    fs.writeFileSync(envConfigPath, envConfigContent);
  });
};
