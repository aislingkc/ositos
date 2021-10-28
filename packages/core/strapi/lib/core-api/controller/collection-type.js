'use strict';

const { parseBody } = require('./transform');

/**
 *
 * Returns a collection type controller to handle default core-api actions
 */
const createCollectionTypeController = ({ uid, strapi }) => {
  return {
    /**
     * Retrieve records.
     *
     * @return {Object|Array}
     */
    async find(ctx) {
      const { query } = ctx;

      const { results, pagination } = await strapi.service(uid).find(query);

      return this.transformResponse(this.sanitize(results), { pagination });
    },

    /**
     * Retrieve a record.
     *
     * @return {Object}
     */
    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;

      const entity = await strapi.service(uid).findOne(id, query);

      return this.transformResponse(this.sanitize(entity));
    },

    /**
     * Create a record.
     *
     * @return {Object}
     */
    async create(ctx) {
      const { query } = ctx.request;

      const { data, files } = parseBody(ctx);

      const entity = await strapi.service(uid).create({ ...query, data, files });

      return this.transformResponse(this.sanitize(entity));
    },

    /**
     * Update a record.
     *
     * @return {Object}
     */
    async update(ctx) {
      const { id } = ctx.params;
      const { query } = ctx.request;

      const { data, files } = parseBody(ctx);

      const entity = await strapi.service(uid).update(id, { ...query, data, files });

      return this.transformResponse(this.sanitize(entity));
    },

    /**
     * Destroy a record.
     *
     * @return {Object}
     */
    async delete(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;

      const entity = await strapi.service(uid).delete(id, query);
      return this.transformResponse(this.sanitize(entity));
    },
  };
};

module.exports = createCollectionTypeController;
