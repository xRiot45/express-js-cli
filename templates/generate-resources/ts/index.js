import templateCodeController from './partials/template-controller.js';
import templateCodeInterface from './partials/template-interface.js';
import templateCodeMiddleware from './partials/template-middleware.js';
import templateCodeModel from './partials/template-model.js';
import templateCodeRepository from './partials/template-repository.js';
import templateCodeRoute from './partials/template-route.js';
import templateCodeService from './partials/template-service.js';
import templateCodeJest from './partials/template-test/template-jest.js';
import templateCodeMocha from './partials/template-test/template-mocha.js';
import templateCodeUtil from './partials/template-util.js';
import templateCodeValidation from './partials/template-validation.js';

export const getTemplateGenerateResourcesTS = (
  schematic,
  resourceName,
  testing,
) => {
  const modelName = resourceName.toLowerCase();
  switch (schematic) {
    case 'service':
      return templateCodeService(modelName);
    case 'controller':
      return templateCodeController();
    case 'validation':
      return templateCodeValidation(modelName);
    case 'model':
      return templateCodeModel(modelName);
    case 'repository':
      return templateCodeRepository(modelName);
    case 'route':
      return templateCodeRoute(modelName);
    case 'interface':
      return templateCodeInterface(modelName);
    case 'middleware':
      return templateCodeMiddleware(modelName);
    case 'util':
      return templateCodeUtil(modelName);
    case 'test':
      return testing === 'Jest'
        ? templateCodeJest(modelName)
        : testing === 'Mocha'
          ? templateCodeMocha(modelName)
          : '';
    default:
      return '';
  }
};
