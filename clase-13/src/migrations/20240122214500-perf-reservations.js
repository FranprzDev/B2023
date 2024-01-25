'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Reservations', 'hostId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'Hosts',
        key: 'id'
      },
      allowNull: false
    })
    await queryInterface.changeColumn('Reservations', 'tableId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tables',
        key: 'id'
      },
      allowNull: false
    })
    await queryInterface.changeColumn('Reservations', 'quantity', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn('Reservations', 'date', {
      type: DataTypes.DATE,
      allowNull: false,
    })
    await queryInterface.addColumn('Reservations', 'confirmed', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Reservations', 'hostId', DataTypes.INTEGER)
    await queryInterface.changeColumn('Reservations', 'tableId', DataTypes.INTEGER)
    await queryInterface.changeColumn('Reservations', 'quantity', DataTypes.INTEGER)
    await queryInterface.changeColumn('Reservations', 'date', DataTypes.DATE)
    await queryInterface.removeColumn('Reservations', 'confirmed')
  }
};
