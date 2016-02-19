/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    //password,
    organizations: {
      collection: 'organization',
      via: 'members'
    },
    email: {
  		type: 'email',
  		required: true,
  		unique: true
  	},

  	password: {
  		type: 'string',
      required: true,
  	},

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    isPasswordValid: function (password, cb) {
      bcrypt.compare(password, this.password, cb);
    }
  }
};

