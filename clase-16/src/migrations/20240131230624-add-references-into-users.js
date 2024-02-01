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
    await queryInterface.addColumn('Users', 'directorId', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Directors',
        key: 'id'
      },
      unique: true
    })
    await queryInterface.addColumn('Users', 'playerId', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Players',
        key: 'id'
      },
      unique: true
    })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'Users_directorId_foreign_idx')
    await queryInterface.removeColumn('Users', 'directorId')
    await queryInterface.removeConstraint('Users', 'Users_playerId_foreign_idx')
    await queryInterface.removeColumn('Users', 'playerId')
  }
};
