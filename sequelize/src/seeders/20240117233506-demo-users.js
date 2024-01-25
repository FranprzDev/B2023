'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkInsert('Users', [
      {
        firstname: 'Nombre 1',
        lastname: 'Apellido 1',
        username: 'user 1',
        password: '12345segurarc',
        dni: '12345',
        email: 'falso@test.com'
      },
      {
        firstname: 'Nombre 2',
        lastname: 'Apellido 2',
        username: 'user 2',
        password: '12345segurarc',
        dni: '12345',
        email: 'falso2@test.com'
      },
      {
        firstname: 'Nombre 3',
        lastname: 'Apellido 3',
        username: 'user 3',
        password: '12345segurarc',
        dni: '12345',
        email: 'falso3@test.com'
      },
      {
        firstname: 'Nombre 4',
        lastname: 'Apellido 4',
        username: 'user 4',
        password: '12345segurarc',
        dni: '12345',
        email: 'falso4@test.com'
      },
      {
        firstname: 'Nombre 5',
        lastname: 'Apellido 5',
        username: 'user 5',
        password: '12345segurarc',
        dni: '12345',
        email: 'falso5@test.com'
      },
    ])
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @return {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
