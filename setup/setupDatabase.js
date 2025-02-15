import shell from 'shelljs';

export const setupDatabase = (databaseName) => {
  const packageName =
    databaseName.toLowerCase() === 'mysql' ? 'mysql2' : 'pg-promise';
  shell.exec(`npm install ${packageName}`);
};
