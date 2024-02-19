const { getAllTodo } = require('../../src/controllers/todo.controllers')
const db = require('../../src/models')

jest.mock('../../src/models', () => ({
    Todos: {
        findAll: jest.fn()
    }
}))

describe('Controller Todo', () => {
    describe('getAllTodo', () => {
        test('Tiene que devolver dos todos', async () => {
            db.Todos.findAll.mockResolvedValue([
                { id: 1, title: 'Todo 1' },
                { id: 2, title: 'Todo 2' },
            ])

            const mockRequest = {}
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            await getAllTodo(mockRequest, mockResponse)

            // Verificación de que 'findAll' se llamó
            expect(db.Todos.findAll).toHaveBeenCalled()

            // Verificación de la respuesta del controlador
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.json).toHaveBeenCalledWith({
                data: [
                    { id: 1, title: 'Todo 1' },
                    { id: 2, title: 'Todo 2' },
                ],
                error: null,
            })
        })
    })
})