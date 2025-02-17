import path from 'path';
import fs from 'fs';

export const generateFile = async (schematic, fileName, language) => {
  fileName = fileName.toLowerCase();

  const schematicFolders = {
    controller: 'controllers',
    service: 'services',
    route: 'routes',
    repository: 'repositories',
    validation: 'validations',
    model: 'models',
    interface: 'types',
    types: 'types',
    config: 'configs',
    resources: 'resources',
    middleware: 'middlewares',
    util: 'utils',
  };

  const extension = language === 'TypeScript' ? 'ts' : 'js';

  if (schematic === 'resources') {
    // Prevent generating a resource file (e.g., `admin.resources.js`)
    await generateResourceFiles(fileName, language);
    return;
  }

  const folder = schematicFolders[schematic];
  if (!folder) {
    process.stdout.write(`Invalid schematic: ${schematic}\n`);
    return;
  }

  const dirPath = path.join('src', folder);
  const filePath = path.join(dirPath, `${fileName}.${schematic}.${extension}`);
  if (fs.existsSync(filePath)) {
    process.stdout.write(`File already exists: ${filePath}\n`);
    return;
  }

  let template = '';

  switch (schematic) {
    case 'configs':
      template = '// This is config code';
      break;
    case 'controller':
      template = '// This is controller code';
      break;
    case 'service':
      template = '// This is service code';
      break;
    case 'repository':
      template = '// This is repository code';
      break;
    case 'route':
      template = '// This is route code';
      break;
    case 'validation':
      template = '// This is validation code';
      break;
    case 'model':
      template = '// This is model code';
      break;
    case 'interface':
      template = '// This is interface code';
      break;
    case 'utils':
      template = '// This is utils code';
      break;
    case 'types':
      template = '// This is types code';
      break;
  }

  fs.writeFileSync(filePath, template.trim());
  process.stdout.write(`File generated: ${filePath}\n`);
};

const generateResourceFiles = async (fileName, language) => {
  const resourceSchematics = [
    'controller',
    'service',
    'route',
    'validation',
    'model',
    'repository',
  ];

  for (const schematic of resourceSchematics) {
    await generateFile(schematic, fileName, language);
  }
};
