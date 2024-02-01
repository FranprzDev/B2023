'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Players.init({
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mainFoot: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    basePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    directorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Directors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
};