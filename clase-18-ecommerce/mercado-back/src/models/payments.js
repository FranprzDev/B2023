'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    feePercentage: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    netPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    installments: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};