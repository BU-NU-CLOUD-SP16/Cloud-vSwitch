/**
 * Organization.js
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
    code: {
      type: 'string',
       required: true
    },
    members: {
      collection: 'user',
      via: 'organizations'
    },
    instances: {
      collection: 'instance',
      via: 'organization'
    },
    owner: {
      model: 'user',
      required: true
    },
    connected: {
      collection: 'user'
    },
    country: {
        type: 'string'
    },
    providence: {
        type: 'string'
    },
    city: {
        type: 'string'
    },
    ou: {
        type: 'string'
    },
    email: {
        type: 'string'
    },
    instance_id: {
      type: 'string'
    }
  }
};

