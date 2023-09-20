'use strict';
module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'test-plugin',
    plugin: 'test-plugin',
    type: 'string',
  });
  strapi.customFields.register({
    name: 'test-plugin1',
    plugin: 'test-plugin',
    type: 'string',
  });
};


