/**
 * Core API
 */
'use strict';

const _ = require('lodash');

const createController = require('./controller');
const { createService } = require('./service');

/**
 * Returns a service and a controller built based on the content type passed
 *
 * @param {object} opts options
 * @param {object} opts.api api
 * @param {object} opts.model model
 * @param {object} opts.strapi strapi
 * @returns {object} controller & service
 */
function createCoreApi({ api, contentType, strapi }) {
  const { uid, modelName } = contentType;

  // find corresponding service and controller
  const userService = _.get(api, ['services', modelName], {});
  const userController = _.get(api, ['controllers', modelName], {});

  const service = Object.assign(createService({ contentType, strapi }), userService);

  const controller = Object.assign(createController({ uid, strapi }), userController);

  return {
    service,
    controller,
  };
}

module.exports = {
  createCoreApi,
};
