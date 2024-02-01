'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Directors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Directors.init({
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    money: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1_000_000.0
    }
  }, {
    sequelize,
    modelName: 'Directors',
  });
  return Directors;
};