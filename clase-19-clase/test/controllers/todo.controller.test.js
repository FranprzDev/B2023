const { getAllTodo } = require('../../src/controllers/todo.controllers')
const { todos } = require('../../src/db')

describe('Controller Todo', () => {
    describe('getAllTodo', () => {

        test('Tiene que devolver un error', () => {
            const req = {
                query: {
                    palabra: 'no-error'
                }
            }
    
            const res = {
                status: jest.fn(),
                json: jest.fn()
            }
    
            getAllTodo(req, res)

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200)
        })

        // test('Tiene que devolver todos los todos', () => {
        //     const req = {}
    
        //     const res = {
        //         status: jest.fn(),
        //         json: jest.fn()
        //     }
    
        //     getAllTodo(req, res)

        //     expect(res.status).toHaveBeenCalledTimes(1)
        //     expect(res.status).toHaveBeenCalledWith(200)
        // })
    })
})