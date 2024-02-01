'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      local: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      githubId: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('Users');
  }
};