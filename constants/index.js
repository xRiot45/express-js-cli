const schematics = {
  controller: 'Generate a new controller file',
  service: 'Generate a new service file',
  route: 'Generate a new route file',
  repository: 'Generate a new repository file',
  validation: 'Generate a new validation file',
  model: 'Generate a new model file',
  interface: 'Generate a new interface file (if using TypeScript)',
  types: 'Generate a new types file (if using TypeScript)',
  resources:
    'Generate a new resources file (controller, service, route, repository, validation, model, test, interface (If using typescript))',
  config: 'Generate a new config file',
  middleware: 'Generate a new middleware file',
  util: 'Generate a new util file',
  enum: 'Generate a new enum file',
  test: 'Generate a new test file',
};

const schematicDirectories = {
  controller: 'controllers',
  service: 'services',
  route: 'routes',
  repository: 'repositories',
  validation: 'validations',
  model: 'models',
  interface: 'interfaces',
  types: 'types',
  config: 'configs',
  resources: 'resources',
  middleware: 'middlewares',
  util: 'utils',
  enum: 'enums',
  test: 'test',
};

const templateMap = {
  configs: '// This is config code',
  controller: '// This is controller code',
  service: '// This is service code',
  repository: '// This is repository code',
  route: '// This is route code',
  validation: '// This is validation code',
  model: '// This is model code',
  interface: '// This is interface code',
  utils: '// This is utils code',
  types: '// This is types code',
  test: '// This is test code',
};

const dependencies = [
  'express',
  'dotenv',
  'cors',
  'helmet',
  'morgan',
  'express-rate-limit',
  'zod',
  'cookie-parser',
  'compression',
  'bcryptjs',
  'http-errors',
  'xss-clean',
  'csrf',
];

const devDependencies = [
  '@types/express',
  '@types/cors',
  '@types/helmet',
  '@types/morgan',
  '@types/bcryptjs',
  '@types/http-errors',
  'nodemon',
  '@types/cookie-parser',
  '@types/compression',
  '@types/helmet',
  '@types/http-errors',
  'tsx',
];

export {
  schematics,
  schematicDirectories,
  templateMap,
  dependencies,
  devDependencies,
};
