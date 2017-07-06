'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.belongsTo(models.Todo, {foreignKey: 'userId'});
  };

  return User;
};
