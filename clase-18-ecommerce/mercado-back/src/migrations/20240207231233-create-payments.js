'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fee: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      feePercentage: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      netPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      currency: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      installments: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};