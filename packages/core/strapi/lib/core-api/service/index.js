'use strict';

const _ = require('lodash');

const {
  isSingleType,
  getNonWritableAttributes,
  constants: { DP_PUB_STATE_LIVE },
} = require('@strapi/utils').contentTypes;

const createSingleTypeService = require('./single-type');
const createCollectionTypeService = require('./collection-type');

/**
 * Returns a core api for the provided model
 * @param {{ model: object, strapi: object }} context
 * @returns {object}
 */
const createService = ({ contentType, strapi }) => {
  const utils = createUtils({ contentType });

  if (isSingleType(contentType)) {
    return createSingleTypeService({ contentType, strapi, utils });
  }

  return createCollectionTypeService({ contentType, strapi, utils });
};

/**
 * Create default fetch params
 * @param {*} params
 * @returns
 */
const getFetchParams = (params = {}) => {
  return {
    publicationState: DP_PUB_STATE_LIVE,
    ...params,
  };
};

/**
 * Mixins
 */
const createUtils = ({ contentType }) => {
  return {
    // make sure to keep the call to getNonWritableAttributes dynamic
    sanitizeInput: data => _.omit(data, getNonWritableAttributes(contentType)),
    getFetchParams,
  };
};

module.exports = {
  createService,
  getFetchParams,
};
