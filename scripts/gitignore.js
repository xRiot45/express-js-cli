import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';
import { getTemplateGitIgnore } from '../templates/gitignore/index.js';

export const configureGitIgnore = () => {
  runCommandWithBuilder(() => {
    const gitignore = '.gitignore';
    const existingIgnoreRules = fs.existsSync(gitignore)
      ? fs.readFileSync(gitignore, 'utf8')
      : '';

    const ignoreRules = getTemplateGitIgnore();
    const newRules = ignoreRules.trimEnd().replace(/\n+$/, '');
    const newIgnoreRules =
      newRules === existingIgnoreRules
        ? existingIgnoreRules
        : `${existingIgnoreRules}\n${newRules}`;

    fs.writeFileSync(gitignore, newIgnoreRules);
  }, 'Initializing gitignore configurations');
};
