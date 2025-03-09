const templateCodeEnvironmentVariable = (
  projectName,
  environment,
  database,
) => {
  return `
# Application
APP_URL=http://localhost:3000
APP_NAME=${projectName}
APP_PORT=3000
NODE_ENV=${environment}

# Database
DIALECT=${database === 'MySQL' ? 'mysql' : 'postgres'}
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
`;
};

export default templateCodeEnvironmentVariable;
