'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
     * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
     * @return {Promise<void>}
     */
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Todos', [
            {
                name: 'Learn Jest',
            },
            {
                name: 'Learn Testing with Postman',
                status: false,
            },
            {
                name: 'Learn E2E with Cypress',
                description: 'A simple description'
            },
        ], {})
    },
    /**
     * @param {import('sequelize').QueryInterface} queryInterface - La interfaz de consulta de Sequelize para realizar cambios en la base de datos.
     * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
     * @return {Promise<void>}
     */
    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Todos', null, {})
    }
}
