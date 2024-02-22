const db = require('../models')
const { getAllTodo, getById } = require('./todo.controllers')

jest.mock('../models', () => ({
    Todos: {
        findAll: jest.fn(),
        findByPk: jest.fn()
    },
}))

describe('Todo Controller', () => {
    describe('getAllTodo', () => {
        beforeEach(() => { jest.resetAllMocks() })

        test('should return all TODOs correctly', async () => {
            const mockTodosData = [{ id: 1, texto: 'Hacer la tarea' }]
            db.Todos.findAll.mockResolvedValue(mockTodosData)

            // Simular la solicitud y la respuesta
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            // Llamar a la función del controlador
            await getAllTodo(req, res)

            // Verificar que la función findAll fue llamada
            expect(db.Todos.findAll).toHaveBeenCalledTimes(1)

            // Verificar que la respuesta sea correcta
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: mockTodosData, error: null })
        })

        test('should handle errors correctly', async () => {
            // Configurar el mock para simular un error
            db.Todos.findAll.mockRejectedValue('Error simulado')

            // Simular la solicitud y la respuesta
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            // Llamar a la función del controlador
            await getAllTodo(req, res)

            // Verificar que la función findAll fue llamada
            expect(db.Todos.findAll).toHaveBeenCalledTimes(1)

            // Verificar que la respuesta sea un error 500
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ data: null, error: 'Something went wrong!' })
        })
    })

    describe('getById', () => {
        beforeEach(() => { jest.resetAllMocks() })

        test('should return a TODO by ID correctly', async () => {
            // Configurar el mock para que devuelva un TODO ficticio
            const mockTodo = { id: 1, texto: 'Hacer la tarea' }
            db.Todos.findByPk.mockResolvedValue(mockTodo)

            // Simular la solicitud y la respuesta
            const req = {
                params: {
                    id: 1,
                },
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            // Llamar a la función del controlador
            await getById(req, res)

            // Verificar que la función findByPk fue llamada con el ID correcto
            expect(db.Todos.findByPk).toHaveBeenCalledWith(1)

            // Verificar que la respuesta sea correcta
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: mockTodo, error: null })
        })

        test('should handle the case where TODO does not exist', async () => {
            // Configurar el mock para que findByPk devuelva null (TODO no existe)
            db.Todos.findByPk.mockResolvedValue(null)

            // Simular la solicitud y la respuesta
            const req = {
                params: {
                    id: 1,
                },
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            // Llamar a la función del controlador
            await getById(req, res)

            // Verificar que la función findByPk fue llamada con el ID correcto
            expect(db.Todos.findByPk).toHaveBeenCalledWith(1)

            // Verificar que la respuesta sea un error 404
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ data: null, error: 'Todo with id 1 not exists' })
        })

        test('should handle errors correctly', async () => {
            // Configurar el mock para simular un error
            db.Todos.findByPk.mockRejectedValue('Error simulado')

            // Simular la solicitud y la respuesta
            const req = {
                params: {
                    id: 1,
                },
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            // Llamar a la función del controlador
            await getById(req, res)

            // Verificar que la función findByPk fue llamada con el ID correcto
            expect(db.Todos.findByPk).toHaveBeenCalledWith(1)

            // Verificar que la respuesta sea un error 500
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ data: null, error: 'Something went wrong!' })
        })
    })
})