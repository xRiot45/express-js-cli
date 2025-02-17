const schematics = {
  controller: 'Generate a new controller file',
  service: 'Generate a new service file',
  route: 'Generate a new route file',
  repository: 'Generate a new repository file',
  validation: 'Generate a new validation file',
  model: 'Generate a new model file',
  interface: 'Generate a new interface file (if using TypeScript)',
  types: 'Generate a new types file (if using TypeScript)',
  resources: 'Generate a new resources file (CRUD)',
  config: 'Generate a new config file',
  middleware: 'Generate a new middleware file',
  util: 'Generate a new util file',
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
};

export { schematics, schematicDirectories, templateMap };
