'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    local: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    githubId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    directorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Directors',
        key: 'id'
      },
      unique: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Players',
        key: 'id'
      },
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};