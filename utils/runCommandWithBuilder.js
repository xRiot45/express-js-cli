import chalk from 'chalk';
import ora from 'ora';
import shell from 'shelljs';

export const runCommandWithBuilder = (
  task,
  message,
  options = { silent: true },
) => {
  const spinner = ora({
    text: chalk.yellow(`LOADING ${message}`),
    color: 'yellow',
    discardStdin: true,
  }).start();

  try {
    if (typeof task === 'string') {
      const result = shell.exec(task, options);
      if (result.code !== 0) {
        throw new Error(result.stderr);
      }
    } else if (typeof task === 'function') {
      task();
    } else {
      throw new Error('Invalid task type, expected string or function.');
    }

    spinner.succeed(chalk.green(`SUCCESS ${message}`));
  } catch (error) {
    spinner.fail(chalk.red(`ERROR ${message}`));
    ora(error.message).fail();
    process.exit(1);
  }
};
