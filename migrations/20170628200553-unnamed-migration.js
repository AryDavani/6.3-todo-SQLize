'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Todos',
      'assigned_to',
      {
        type: Sequelize.STRING,
        defaultValue: 'me',
        allowNull: false
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos', 'assigned_to');
  }
};
