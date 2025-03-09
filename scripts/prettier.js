import fs from 'fs';
import shell from 'shelljs';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configurePrettier = async () => {
  await runCommandWithBuilder(() => {
    shell.exec('npm install --save-dev prettier', { silent: true });

    fs.writeFileSync(
      '.prettierrc',
      JSON.stringify({ singleQuote: true, semi: true }, null, 2),
    );
  });
};

export default configurePrettier;
