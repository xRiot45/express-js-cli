const templateCodeMainAppJS = () => {
  return `
import configureExpress from './configs/express.config.js';

const app = configureExpress();
export default app;
`;
};

export default templateCodeMainAppJS;
