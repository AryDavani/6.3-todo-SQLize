'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Todos',
      'userId',
      {
        type: Sequelize.INTEGER,
        //references establishes reference to the id column on the user table
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Todos','userId');
  }
};
