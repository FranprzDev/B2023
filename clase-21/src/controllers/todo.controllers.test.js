const db = require('../models')
const { getAllTodo, deleteById } = require('./todo.controllers')

jest.mock('../models', () => ({
    Todos: {
        findAll: jest.fn(),
        findByPk: jest.fn()
    }
}))

describe('Todo Controller', () => {
    describe('getAllTodo', () => {
        beforeEach(() => jest.resetAllMocks())

        test('deberia devolver todos los todos de manera correcta', async () => {
            const mockedTodos = [
                { id: 1, name: 'Todo 1', description: undefined, status: false },
                { id: 2, name: 'Todo 2', description: undefined, status: false },
            ]
            db.Todos.findAll.mockResolvedValue(mockedTodos)

            const mockedReq = {}
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
            }
            
            await getAllTodo(mockedReq, mockedRes)

            expect(db.Todos.findAll).toHaveBeenCalledTimes(1)

            expect(mockedRes.status).toHaveBeenCalledWith(200)
            expect(mockedRes.json).toHaveBeenCalledWith({ data: mockedTodos, error: null })
        })

        test('deberia manejar los errores e indicar la respuesta correspondiente', async () => {
            db.Todos.findAll.mockRejectedValue('DB No se encuentra disponible')

            const mockedReq = {}
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn()
            }
            
            await getAllTodo(mockedReq, mockedRes)

            expect(db.Todos.findAll).toHaveBeenCalledTimes(1)

            expect(mockedRes.status).toHaveBeenCalledWith(500)
            expect(mockedRes.json).toHaveBeenCalledWith({ data: null, error: 'Something went wrong!' })
        })
    })

    describe('deleteById', () => {
        beforeEach(() => jest.resetAllMocks())

        test('deberia devolver un estado 204 si se pudo eliminar la tarea', async () => {
            const todoToDestroy = {
                id: 1,
                name: 'Todo 1',
                description: undefined,
                status: false,
                destroy: jest.fn()
            }
            db.Todos.findByPk.mockResolvedValue(todoToDestroy)

            const mockedReq = {
                params: {
                    id: 1
                }
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
                send: jest.fn(),
            }
            
            await deleteById(mockedReq, mockedRes)

            expect(db.Todos.findByPk).toHaveBeenCalledTimes(1)

            expect(todoToDestroy.destroy).toHaveBeenCalledTimes(1)

            expect(mockedRes.json).toHaveBeenCalledTimes(0)
            
            expect(mockedRes.send).toHaveBeenCalledTimes(1)
            expect(mockedRes.status).toHaveBeenCalledWith(204)
        })

        test('deberia devolver un estado 404 cuando no existe el TODO', async () => {
            db.Todos.findByPk.mockResolvedValue(null)

            const mockedReq = {
                params: {
                    id: 1
                }
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
                send: jest.fn(),
            }
            
            await deleteById(mockedReq, mockedRes)

            expect(db.Todos.findByPk).toHaveBeenCalledTimes(1)

            expect(mockedRes.json).toHaveBeenCalledTimes(1)
            expect(mockedRes.send).toHaveBeenCalledTimes(0)
            expect(mockedRes.status).toHaveBeenCalledWith(404)
        })

        test('deberia manejar los errores e indicar la respuesta correspondiente', async () => {
            db.Todos.findByPk.mockRejectedValue('DB No se encuentra disponible')

            const mockedReq = {
                params: {
                    id: 1
                }
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
                send: jest.fn(),
            }
            
            await deleteById(mockedReq, mockedRes)

            expect(db.Todos.findByPk).toHaveBeenCalledTimes(1)

            expect(mockedRes.json).toHaveBeenCalledTimes(1)
            expect(mockedRes.json).toHaveBeenCalledWith({ data: null, error: 'Something went wrong!' })
            expect(mockedRes.send).toHaveBeenCalledTimes(0)
            expect(mockedRes.status).toHaveBeenCalledWith(500)
        })
    })
})