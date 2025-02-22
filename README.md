<br />
  <img src="![Image](https://github.com/user-attachments/assets/bed20e6f-18b1-40c5-a3b7-4de2a9f1a4dc)" alt="Gif">
<br />

<div align="center">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="javascript" />
  </div>

<h2 align="center">Express JS CLI</h2>

<div align="center">
Express API CLI is a Command Line Interface (CLI) tool designed to make it easier and faster to create RESTful API projects using Express JS.
</div>

<br />

- **Version :** v1.0.0
- **Developer :** Thomas Alberto
- **Released On :** February 2025
- **Status :** Stable Release

<br />

## 📋 Table of Contents

1. 🤖 [Introduction](#-introduction)
2. ⚙️ [Tech Stack](#-tech-stack)
3. 🔋 [Features](#-features)
4. 🤸 [Quick Start](#-quick-start)
5. 📜 [CLI Usage](#-cli-usage)
6. 🕸️ [Snippets](#-snippets)
7. 🔗 [Links](#-links)

<br />

## 🤖 Introduction

**Express API CLI** is a Command Line Interface (CLI) tool designed to make it easier and faster to create **RESTful API** projects using **Express JS**. With this CLI, developers can immediately create a neat project structure, install the necessary dependencies, and configure various key features according to user preferences without having to do time-consuming manual setup.

Express API CLI comes as a solution for developers who want to save time in the initialization stage of backend projects using Express.js. With support for programming language selection (JavaScript or TypeScript), database configuration (MySQL or PostgreSQL), as well as tools such as Prettier for code formatting and Husky & Commitlint for commit standardization, this CLI is designed so that developers can focus directly on developing business features without worrying about the initial technical setup.

This tool is perfect for beginners who want to start projects quickly as well as for development teams who want to maintain standards and consistency in their projects. With just a few simple commands, Express.js projects are ready to go with a structure that conforms to best practices.

<br />

## ⚙️ Tech Stack

- **Node JS** : JavaScript runtime for the server.
- **Express JS** : Minimalist framework for the backend.
- **JavaScript** : Programming Language.

<br />

## 🔋 Features

✅ **Multi-Language Support** : Choose between JavaScript or TypeScript.

✅ **Database Support** : Choose between MySQL or PostgreSQL.

✅ **ORM (Object Relational Mapping) Support** : For now using Sequelize ORM

✅ **Prettier Integration** : Automatically organize code with Prettier.

✅ **ESLint Integration** : Maintain code quality with static analysis.

✅ **Commit Linter** : Comes with Husky & Commitlint.

✅ **Automated Project Structure** : Generates ready-to-use project structure.

✅ **Initialize Git Repository** : Automatically initializes the Git repository.

✅ **Quick Installation** : All major and development dependencies are instantly installed.

<br />

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine

**1. Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**2. Instalation**

```bash
$ npm i express-api-cli-tool
```

**3. Create new project**

```bash
$ express new <project-name>
```

**4. Follow the instructions**

- **Choose Language** : JavaScript / TypeScript
- **Choose Database** : MySQL / PostgreSQL
- **Use Eslint for code linting?** : Y / n
- **Use Husky and Commit lint for commit linting?** : Y / n
- **Initialize Git repository?** : Y / n

**5. Running your project**

```bash
# Change directory to your project
$ cd <your-project>

# Format the code before running the project (optional)
$ npm run format

# Running your project
$ npm run dev
```

<br />

## 📜 CLI Usage

**To view the list of available commands, use the following command**

```bash
$ express -h
```

**Output:**

```
Usage: express [options] [command]

Options:
  -v, --version                     Display the current version of express-cli
  -i, --info                        Display information about express-cli
  -h, --help                        display help for command

Commands:
  new <project-name>                Create a new Express.js API project
  generate <schematic> <file-name>  Generate a new file based on a schematic
  update                            Update express-cli to the latest version

Schematics:
  controller   Generate a new controller file
  service      Generate a new service file
  route        Generate a new route file
  repository   Generate a new repository file
  validation   Generate a new validation file
  model        Generate a new model file
  interface    Generate a new interface file (if using TypeScript)
  types        Generate a new types file (if using TypeScript)
  resources    Generate a new resources file (CRUD)
  config       Generate a new config file
  middleware   Generate a new middleware file
  util         Generate a new util file
```

<br />

## 🕸️ Snippets

**Code Service**

- JavaScript

```javascript
const get = async () => {
  // Implement your logic get data here
  return [];
};

const getById = async (id) => {
  // Implement your logic get data by id here
  return null;
};

const create = async (data) => {
  // Implement your logic create data here
  return null;
};

const update = async (id, data) => {
  // Implement your logic update data here
  return null;
};

const remove = async (id) => {
  // Implement your logic remove data here
  return false;
};

export default { get, getById, create, update, remove };
```

- TypeScript

```typescript
import testInterface from '../interfaces/test.interface.ts';

const get = async (): Promise<testInterface[]> => {
  // Implement your logic to get data here
  return [];
};

const getById = async (id: string): Promise<testInterface | null> => {
  // Implement your logic to get data by id here
  return null;
};

const create = async (data: testInterface): Promise<testInterface> => {
  // Implement your logic to create data here
  return data;
};

const update = async (
  id: string,
  data: Partial<testInterface>,
): Promise<testInterface | null> => {
  // Implement your logic to update data here
  return null;
};

const remove = async (id: string): Promise<boolean> => {
  // Implement your logic to remove data here
  return false;
};

export default { get, getById, create, update, remove };
```

**Code Controller**

- JavaScript

```javascript
const get = async (req, res, next) => {
  try {
    // Implement your logic get data here
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    // Implement your logic get data by id here
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // Implement your logic create data here
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // Implement your logic update data here
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    // Implement your logic remove data here
  } catch (error) {
    next(error);
  }
};

export default { get, getById, create, update, remove };
```

- TypeScript

```typescript
import { Request, Response, NextFunction } from 'express';

const get = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to get data here
  } catch (error) {
    next(error);
  }
};

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to get data by id here
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to create data here
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to update data here
  } catch (error) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Implement your logic to remove data here
  } catch (error) {
    next(error);
  }
};

export default { get, getById, create, update, remove };
```

**Code Router**

- JavaScript

```javascript
import { Router } from 'express';
import testController from '../controllers/test.controller.js';

const testRouter = Router();

testRouter.get('/', testController.get);
testRouter.get('/:id', testController.getById);
testRouter.post('/', testController.create);
testRouter.put('/:id', testController.update);
testRouter.delete('/:id', testController.remove);

export default testRouter;
```

- TypeScript

```typescript
import { Router } from 'express';
import testController from '../controllers/test.controller.ts';

const testRouter: Router = Router();

testRouter.get('/', testController.get);
testRouter.get('/:id', testController.getById);
testRouter.post('/', testController.create);
testRouter.put('/:id', testController.update);
testRouter.delete('/:id', testController.remove);

export default testRouter;
```

**Code Model**

- JavaScript & TypeScript

```javascript
import sequelize from '../configs/sequelize.config.js';

const testModel = sequelize.define('test', {
  // Define your model attributes here
});

export default testModel;
```

**Code Repository**

- JavaScript

```javascript
import testModel from '../models/test.model.js';

const getAllData = async () => await testModel.findAll();

const getDataById = async (id) => await testModel.findByPk(id);

const createData = async (data) => await testModel.create(data);

const updateData = async (id, data) => {
  await testModel.update(data, { where: { id } });
  return await testModel.findByPk(id);
};

const deleteData = async (id) => {
  const data = await testModel.findByPk(id);
  await testModel.destroy({ where: { id } });
  return data;
};

export default { getAllData, getDataById, createData, updateData, deleteData };
```

- TypeScript

```typescript
import { Model, FindOptions } from 'sequelize';
import testModel from '../models/test.model.ts';
import testInterface from '../interfaces/test.interface.ts';

const getAllData = async (): Promise<Model<testInterface>[]> => {
  return await testModel.findAll();
};

const getDataById = async (
  id: number,
): Promise<Model<testInterface> | null> => {
  return await testModel.findByPk(id);
};

const createData = async (
  data: Partial<testInterface>,
): Promise<Model<testInterface>> => {
  return await testModel.create(data);
};

const updateData = async (
  id: number,
  data: Partial<testInterface>,
): Promise<Model<testInterface> | null> => {
  await testModel.update(data, { where: { id } });
  return await testModel.findByPk(id);
};

const deleteData = async (id: number): Promise<Model<testInterface> | null> => {
  const data = await testModel.findByPk(id);
  if (data) {
    await testModel.destroy({ where: { id } });
  }
  return data;
};

export default { getAllData, getDataById, createData, updateData, deleteData };
```

**Code Validation**

- JavaScript

```javascript
import { z } from 'zod';

const testValidation = z.object({
  // Implement your validation schema here
});

export default testValidation;
```

- TypeScript

```typescript
import { z } from 'zod';

const testValidation = z.object({
  // Implement your validation schema here
});

type testType = z.infer<typeof testValidation>;

export { testValidation, testType };
```

**Code Middleware**

- JavaScript

```javascript
const testMiddleware = (req, res, next) => {
  try {
    // Implement your middleware logic here
    next();
  } catch (error) {
    next(error);
  }
};

export default testMiddleware;
```

- TypeScript

```typescript
import { Request, Response, NextFunction } from 'express';

const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Implement your middleware logic here
    next();
  } catch (error) {
    next(error);
  }
};

export default testMiddleware;
```

**Code Util**

- JavaScript

```javascript
const testUtil = () => {
  // Implement your util logic here
};

export default testUtil;
```

- TypeScript

```typescript
const testUtil = (): void => {
  // Implement your util logic here
};

export default testUtil;
```

**Code Interface (Only using TypeScript)**

```typescript
export default interface testInterface {
  // Implement your interface here
}
```

<br />

## 🔗 Links

- [ExpressJS](https://expressjs.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Sequelize](https://sequelize.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)
