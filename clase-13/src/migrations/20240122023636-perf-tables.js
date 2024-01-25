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
    await queryInterface.removeColumn('Tables', 'number')
    await queryInterface.changeColumn('Tables', 'quantity', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn('Tables', 'place', {
      type: DataTypes.TEXT,
      allowNull: false
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tables', 'number', DataTypes.INTEGER)
    await queryInterface.changeColumn('Tables', 'quantity', DataTypes.INTEGER)
    await queryInterface.changeColumn('Tables', 'place', DataTypes.STRING)
  }
};
