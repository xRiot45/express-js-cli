import fs from 'fs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';
import { getTemplateGitIgnore } from '../templates/gitignore/index.js';

const configureGitIgnore = async () => {
  await runCommandWithBuilder(() => {
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
  });
};

export default configureGitIgnore;
