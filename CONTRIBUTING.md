# Contributing to Express JS CLI

Thank you for being interested in contributing to the **Express JS CLI** project! I welcome all forms of contributions, be it bug fixes, new features, or documentation improvements.

## 📋 Cheat Sheet Table

| Type         | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| **build**    | Changes that affect the build system or external dependencies (e.g., gulp, broccoli, npm).   |
| **ci**       | Changes to CI configuration files and scripts (e.g., Circle, BrowserStack, SauceLabs).       |
| **docs**     | Documentation updates and improvements.                                                      |
| **feat**     | Introducing a new feature.                                                                   |
| **fix**      | Bug fixes.                                                                                   |
| **perf**     | Code changes that improve performance.                                                       |
| **refactor** | Code changes that neither fix bugs nor add features.                                         |
| **style**    | Changes that do not affect code meaning (e.g., formatting, white-space, missing semicolons). |
| **tests**    | Adding or correcting tests.                                                                  |

---

## 📜 Contribution Guide

1. **Fork** repository [Express JS CLI](https://github.com/xRiot45/express-js-cli).
2. **Clone** the forked result to your local computer by running the command
   ```bash
   $ git clone https://github.com/xRiot45/express-js-cli.git
   ```
3. **Create a new branch** for the changes to be made by running the command

   ```bash
   $ git checkout -b <type>/<short-description>
   ```

   For Example:

   ```bash
   $ git checkout -b feat/integration-sqlite
   ```

4. Make the necessary changes.
5. **Commit** changes with a clear message (use all lowercase letters)

   ```bash
   $ git commit -m "<type>(<scope>): clear description of change"
   ```

   For Example:

   ```bash
   $ git commit -m "feat(database): integrasi dengan database sqlite"
   ```

6. **Push** branches to your fork repository

   ```bash
   $ git push origin <your-branch>
   ```

   For Example:

   ```bash
   $ git push origin feat/integration-sqlite
   ```

7. **Create a Pull Request (PR)** to the main repository.
8. Wait for the review and make changes if needed.

---

## 📌 Code Standard

To keep the code neat and easy to understand, please follow these rules:

- Use descriptive variable and function names.
- Add comments where necessary.
- Avoid using dead code.

---

## 📋 Development Guide

### 1. Installation Dependencies

Before starting, make sure you have installed all dependencies by running the following command:

```bash
$ npm install
```

### 2. Running Express JS CLI in Development Mode

To test Express JS CLI locally on your computer, run the following command

```bash
$ npm link
```

> You can then run the `express -h` command directly in a terminal to check if the Express JS CLI is running on your local computer.

---

## 🛠 What You Can Contribute?

Here are some things you can contribute:

- [ ] Support for integration with SQLite Database
- [ ] Support for integration with MariaDB
- [ ] Support for integration with MongoDB
- [ ] Added option for choose ORM (Object Relational Mapping)
- [ ] Improved documentation
- [x] Added option for import type
- [x] Added middleware CORS, Compression, Error, Rate Limiter and Morgan
- [ ] Refactoring Express JS CLI code

---

## 💡 Bug Reports and Feature Requests

If you find a bug or have a new feature idea, please create an **issue** on [GitHub Issues](https://github.com/xRiot45/express-js-cli/issues) using the template provided.

### 📝 How to create bug reports and feature requests

1. Go to the [GitHub Issues] page (https://github.com/xRiot45/express-js-cli/issues)
2. Click the **New Issue** button
3. Select the appropriate template:
   - **Bug Report** if you found a bug
   - **Feature Request** if you want to propose a new feature
4. Fill out the form with the required information according to the template provided.

#### 📌 Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**

- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Smartphone (please complete the following information):**

- Device: [e.g. iPhone6]
- OS: [e.g. iOS8.1]
- Browser [e.g. stock browser, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

#### 🚀 Feature Request Template

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

5. Click **Submit new issue** and wait for a response from the maintener team.

---

## 📄 Licension

By contributing your code, you agree to release your contribution under this project license.

Thank you for contributing! 🚀
