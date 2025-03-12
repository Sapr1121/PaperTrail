'use strict';

/**
 * nombre service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nombre.nombre');
