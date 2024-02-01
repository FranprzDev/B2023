'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mainFoot: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      basePrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      directorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Directors',
          key: 'id'
        }
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
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};