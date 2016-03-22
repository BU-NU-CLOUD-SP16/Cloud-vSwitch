/**
 * Instance.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    organization: {
      model: 'organization'
    },
    status: {
      type: 'string',
      defaultsTo: 'active'
    },
    instance_id: {
      type: 'string'
    }
  }
};

