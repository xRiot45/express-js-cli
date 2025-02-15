import fs from 'fs';

export const setupProjectStructure = (language) => {
  const folders = [
    'controllers',
    'services',
    'repositories',
    'models',
    'routes',
    'configs',
    'middlewares',
    'utils',
    'validations',
  ];

  // Add types folder if language is TypeScript
  if (language === 'TypeScript') {
    folders.push('types');
  }

  // Create src folder
  if (!fs.existsSync('src')) {
    fs.mkdirSync('src');
  }

  // Mapping folders to src
  folders.forEach((folder) => {
    const folderPath = `src/${folder}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });

  // Create empty files (app.ts/js, server.ts/js)
  const extension = language === 'TypeScript' ? 'ts' : 'js';
  fs.writeFileSync(`src/app.${extension}`, '');
  fs.writeFileSync(`src/server.${extension}`, '');
};
