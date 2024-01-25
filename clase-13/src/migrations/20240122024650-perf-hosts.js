'use strict';

const { DataTypes, TEXT } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Hosts', 'fullname', {
      type: DataTypes.TEXT,
      allowNull: false
    })
    await queryInterface.changeColumn('Hosts', 'age', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn('Hosts', 'phoneNumber', {
      type: DataTypes.TEXT,
      allowNull: false
    })
    await queryInterface.changeColumn('Hosts', 'email', {
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
    await queryInterface.changeColumn('Hosts', 'fullname', DataTypes.INTEGER)
    await queryInterface.changeColumn('Hosts', 'age', DataTypes.INTEGER)
    await queryInterface.changeColumn('Hosts', 'phoneNumber', DataTypes.STRING)
    await queryInterface.changeColumn('Hosts', 'email', DataTypes.STRING)
  }
};
