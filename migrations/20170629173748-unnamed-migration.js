'use strict';

var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {

    models.findAll({where: {userId: null}}).then(function(todos) {
      
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
