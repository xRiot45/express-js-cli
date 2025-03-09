const templateCodeServerJS = () => {
  return `
import app from './app.js';
import connectToDatabase from './configs/database.config.js';
import { APP_PORT } from './configs/env.config.js';
import logger from './configs/logger.config.js';

export default async function server() {
  try {
    await connectToDatabase();
    app.listen(APP_PORT, async () => {
      logger.info(\`Server running on port \${APP_PORT}\`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}
  `;
};

export default templateCodeServerJS;
