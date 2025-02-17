import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { schematicDirectories, templateMap } from '../constants';

export const generateFile = async (schematic, fileName, language) => {
  const normalizedFileName = fileName.toLowerCase();

  const extensionMap = {
    TypeScript: schematic === 'types' ? 'd.ts' : 'ts',
    JavaScript: 'js',
  };

  const fileExtension = extensionMap[language] || 'js';

  if (schematic === 'resources') {
    await generateResourceFiles(normalizedFileName, language);
    return;
  }

  if (language === 'JavaScript' && ['interface', 'types'].includes(schematic)) {
    process.stdout.write(
      chalk.red('✖ ERROR') +
        `\t\t Can't generate ${schematic} in JavaScript\n`,
    );
    return;
  }

  const directory = schematicDirectories[schematic];
  if (!directory) {
    process.stdout.write(
      chalk.red('✖ ERROR') + `\t\t Invalid schematic: ${schematic}\n`,
    );
    return;
  }

  const filePath = path.join(
    'src',
    directory,
    schematic === 'types'
      ? `${normalizedFileName}.${fileExtension}`
      : `${normalizedFileName}.${schematic}.${fileExtension}`,
  );

  if (fs.existsSync(filePath)) {
    process.stdout.write(
      chalk.red('✖ ERROR') + `\t\t File already exists: ${filePath}\n`,
    );
    return;
  }

  const fileTemplate = templateMap[schematic] || '';
  fs.writeFileSync(filePath, fileTemplate.trim());
  process.stdout.write(
    chalk.green('✔ SUCCESS') + `\t File generated: ${filePath}\n`,
  );
};

const generateResourceFiles = async (resourceName, language) => {
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

  for (const schematic of schematics) {
    await generateFile(schematic, resourceName, language);
  }
};
