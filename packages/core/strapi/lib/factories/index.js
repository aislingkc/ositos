'use strict';

const createCtrl = require('../core-api/controller');

const createCoreController = config => {
  const { uid, ...decorator } = config;

  const coreController = createCtrl({ service: {}, uid });

  return Object.assign(coreController, decorator);
};

module.exports = {
  createCoreController,
};
