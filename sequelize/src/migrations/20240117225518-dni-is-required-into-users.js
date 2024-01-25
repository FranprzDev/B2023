'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'dni', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
    await queryInterface.changeColumn('Users', 'age', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'dni', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
};
