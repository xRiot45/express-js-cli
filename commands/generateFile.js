import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { schematicDirectories } from '../constants/index.js';
import { getTemplateGenerateResourcesJS } from '../templates/generate-resources/js/index.js';
import { getTemplateGenerateResourcesTS } from '../templates/generate-resources/ts/index.js';

export const generateFile = async (schematic, fileName, language, testing) => {
  const toCamelCase = (str) =>
    str
      .split(/[-_ ]+/)
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join('');

  const normalizedFileName = fileName.toLowerCase();
  const camelCaseName = toCamelCase(fileName);

  const extensionMap = {
    TypeScript: schematic === 'types' ? 'd.ts' : 'ts',
    JavaScript: 'js',
  };

  const fileExtension = extensionMap[language] || 'js';

  if (schematic === 'resources') {
    await generateResourceFiles(normalizedFileName, language, testing);
    return;
  }

  if (language === 'JavaScript' && ['interface', 'types'].includes(schematic)) {
    process.stdout.write(
      chalk.red('✖ ERROR') +
        `\t\t Can't generate ${schematic} in JavaScript\n`,
    );
    return;
  }

  const directory =
    schematic === 'test'
      ? 'test'
      : path.join('src', schematicDirectories[schematic]);
  if (!directory) {
    process.stdout.write(
      chalk.red('✖ ERROR') + `\t\t Invalid schematic: ${schematic}\n`,
    );
    return;
  }

  const filePath = path.join(
    directory,
    schematic === 'types'
      ? `${normalizedFileName}.${fileExtension}`
      : `${normalizedFileName}.${schematic}.${fileExtension}`,
  );

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  if (fs.existsSync(filePath)) {
    process.stdout.write(
      chalk.red('✖ ERROR') + `\t\t File already exists: ${filePath}\n`,
    );
    return;
  }

  const fileTemplate =
    language === 'TypeScript'
      ? getTemplateGenerateResourcesTS(schematic, camelCaseName, testing)
      : getTemplateGenerateResourcesJS(schematic, camelCaseName, testing);

  fs.writeFileSync(filePath, fileTemplate.trim());
  process.stdout.write(
    chalk.green('✔ SUCCESS') + `\t File generated: ${filePath}\n`,
  );
};

const generateResourceFiles = async (resourceName, language, testing) => {
  const schematics = [
    'controller',
    'service',
    'route',
    'validation',
    'model',
    'repository',
  ];

  if (language === 'TypeScript') {
    schematics.push('interface');
  }

  schematics.push('test');

  for (const schematic of schematics) {
    await generateFile(schematic, resourceName, language, testing);
  }
};
