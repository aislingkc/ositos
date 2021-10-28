'use strict';

const { parseBody } = require('./transform');

/**
 * Returns a single type controller to handle default core-api actions
 */
const createSingleTypeController = ({ uid, strapi }) => {
  return {
    /**
     * Retrieve single type content
     *
     * @return {Object|Array}
     */
    async find(ctx) {
      const { query } = ctx;
      const entity = await strapi.service(uid).find(query);

      return this.transformResponse(this.sanitize(entity));
    },

    /**
     * create or update single type content.
     *
     * @return {Object}
     */
    async update(ctx) {
      const { query } = ctx.request;
      const { data, files } = parseBody(ctx);

      const entity = await strapi.service(uid).createOrUpdate({ ...query, data, files });

      return this.transformResponse(this.sanitize(entity));
    },

    async delete(ctx) {
      const { query } = ctx;

      const entity = await strapi.service(uid).delete(query);

      return this.transformResponse(this.sanitize(entity));
    },
  };
};

module.exports = createSingleTypeController;
