import { spawn } from 'child_process';

export const runCommandWithBuilder = (command) =>
  new Promise((resolve, reject) => {
    if (typeof command === 'string') {
      const [cmd, ...args] = command.split(' ');
      const process = spawn(cmd, args, { shell: true, stdio: 'pipe' });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`Command "${command}" failed with exit code ${code}`),
          );
        }
      });

      process.on('error', reject);
    } else if (typeof command === 'function') {
      try {
        const result = command();
        if (result instanceof Promise) {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    } else {
      reject(
        new Error(
          `Invalid command type: expected string or function, but got ${typeof command}`,
        ),
      );
    }
  });
