const templateCodeMainAppTS = () => {
  return `
import configureExpress from './configs/express.config.ts';

const app = configureExpress();
export default app;
`;
};

export default templateCodeMainAppTS;
