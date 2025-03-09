import fs from 'fs';
import path from 'path';
import templateCodeExpressConfigJS from '../templates/configs/express-config/js/index.js';
import templateCodeExpressConfigTS from '../templates/configs/express-config/ts/index.js';

const configureExpressConfig = async (language) => {
  const extension = language === 'JavaScript' ? 'js' : 'ts';
  const configDir = path.resolve('src/configs');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const expressConfigContent =
    language === 'TypeScript'
      ? templateCodeExpressConfigTS()
      : templateCodeExpressConfigJS();

  fs.writeFileSync(
    path.join(configDir, `express.config.${extension}`),
    expressConfigContent,
  );
};

export default configureExpressConfig;
