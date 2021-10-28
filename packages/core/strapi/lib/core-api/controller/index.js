'use strict';

const { sanitizeEntity, contentTypes } = require('@strapi/utils');

const { transformResponse } = require('./transform');
const createSingleTypeController = require('./single-type');
const createCollectionTypeController = require('./collection-type');

module.exports = ctx => {
  const { uid, strapi } = ctx;

  const contentType = strapi.contentType(uid);

  if (!contentType) {
    throw new Error(`Cannot create core controller for unknown content type '${uid}'`);
  }

  let coreController;

  if (contentTypes.isSingleType(contentType)) {
    coreController = createSingleTypeController(ctx);
  }

  coreController = createCollectionTypeController(ctx);

  return Object.assign(coreController, {
    transformResponse(data, meta) {
      return transformResponse(data, meta, { contentType });
    },
    sanitize(data) {
      return sanitizeEntity(data, { model: contentType });
    },
  });
};
