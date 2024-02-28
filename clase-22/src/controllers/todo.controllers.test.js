const { registerUser, loginUser } = require("./user.controllers")



describe("User Controller", () => {
    describe("Register User", () => {
        test("Should return a 400 status code when body is not right", () => {
            // Body vacio
            const mockedReq = {
                body: {}
            }
            // Funciones mockeadas para verificar nuestro error
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
            }

            registerUser(mockedReq, mockedRes)

            expect(mockedRes.status).toHaveBeenCalledTimes(1)
            expect(mockedRes.status).toHaveBeenCalledWith(400)
        })

        test("Should return a 401 status code when user exists", () => {
            const mockedReq = {
                body: {
                    name: "Test user",
                    email: "test@test.com",
                    password: "Secr37s_ultra"
                }
            }
            // Funciones mockeadas para verificar nuestro error
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
            }

            registerUser(mockedReq, mockedRes)

            expect(mockedRes.status).toHaveBeenCalledTimes(1)
            expect(mockedRes.status).toHaveBeenCalledWith(401)
        })

        test("Should return a 400 status code when password is not right", () => {
            const mockedReq1 = {
                body: {
                    name: "Test user1",
                    email: "nofake@test.com",
                    password: "pass1"
                }
            }
            const mockedReq2 = {
                body: {
                    name: "Test user2",
                    email: "nafake@test.com",
                    password: "pass1pass1pass1pass1pass1pass1pass1"
                }
            }
            // Funciones mockeadas para verificar nuestro error
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
            }

            registerUser(mockedReq1, mockedRes)
            registerUser(mockedReq2, mockedRes)

            expect(mockedRes.status).toHaveBeenNthCalledWith(1, 400)
            expect(mockedRes.json).toHaveBeenNthCalledWith(1, expect.objectContaining({data: null, error: "Password too short"}))
            
            expect(mockedRes.status).toHaveBeenNthCalledWith(2, 400)
            expect(mockedRes.json).toHaveBeenNthCalledWith(2, expect.objectContaining({data: null, error: "Password too long"}))
        })

        test("Should respond with created (201) when everything is ok", () => {
            const mockedReq = {
                body: {
                    name: "Test user1",
                    email: "nofake@test.com",
                    password: "pass1s3cr37"
                }
            }
            // Funciones mockeadas para verificar nuestro error
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn(),
            }

            registerUser(mockedReq, mockedRes)

            expect(mockedRes.status).toHaveBeenCalledWith(201)
            expect(mockedRes.json).toHaveBeenCalledWith({ data: { ...mockedReq.body }, error: null })
        })
    })

    describe("Login User", () => {
        test("Should return a 400 status code when body is not right", () => {
            const mockedReq = {
                body: {}
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn()
            }

            loginUser(mockedReq, mockedRes)

            expect(mockedRes.status).toHaveBeenCalledWith(400)
            expect(mockedRes.json).toHaveBeenCalledWith(
                expect.objectContaining({ data: null, error: 'Please fill the body with email and password' })
            )
        })

        test("Should return a 400 status code when users doesn't exist", () => {
            const mockedReq = {
                body: {
                    email: 'fake@test.com',
                    password: "1234554321"
                }
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn()
            }

            loginUser(mockedReq, mockedRes)
        
            expect(mockedRes.status).toHaveBeenCalledWith(400)
            expect(mockedRes.json).toHaveBeenCalledWith(
                expect.objectContaining({ data: null, error: "User doesn't exist" })
            )
        })

        test("Should return a 401 status code when password is not valid", () => {
            const mockedReq = {
                body: {
                    email: 'real@gmail.com',
                    password: "fake_password"
                }
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn()
            }

            loginUser(mockedReq, mockedRes)
        
            expect(mockedRes.status).toHaveBeenCalledWith(401)
            expect(mockedRes.json).toHaveBeenCalledWith(
                expect.objectContaining({ data: null, error: "Password is not valid" })
            )
        })

        test("Should respond with a success (200) when everything is ok", () => {
            const mockedReq = {
                body: {
                    email: 'real@gmail.com',
                    password: "rolling_code"
                }
            }
            const mockedRes = {
                status: jest.fn(),
                json: jest.fn()
            }

            loginUser(mockedReq, mockedRes)
        
            expect(mockedRes.status).toHaveBeenCalledWith(200)
            expect(mockedRes.json).toHaveBeenCalledWith(
                expect.objectContaining({ data: { email: mockedReq.body.email }, error: null })
            )
        })
    })
})



// ---------------------------------------------------------------

// const db = require('../models')
// const { getAllTodo, deleteById } = require('./todo.controllers')

// jest.mock('../models', () => ({
//     Todos: {
//         findAll: jest.fn(),
//         findByPk: jest.fn()
//     }
// }))

// describe('Todo Controller', () => {
//     describe('getAllTodo', () => {
//         beforeEach(() => jest.resetAllMocks())

//         test('deberia devolver todos los todos de manera correcta', async () => {
//             const mockedTodos = [
//                 { id: 1, name: 'Todo 1', description: undefined, status: false },
//                 { id: 2, name: 'Todo 2', description: undefined, status: false },
//             ]
//             db.Todos.findAll.mockResolvedValue(mockedTodos)

//             const mockedReq = {}
//             const mockedRes = {
//                 status: jest.fn(),
//                 json: jest.fn(),
//             }
            
//             await getAllTodo(mockedReq, mockedRes)

//             expect(db.Todos.findAll).toHaveBeenCalledTimes(1)

//             expect(mockedRes.status).toHaveBeenCalledWith(200)
//             expect(mockedRes.json).toHaveBeenCalledWith({ data: mockedTodos, error: null })
//         })

//         test('deberia manejar los errores e indicar la respuesta correspondiente', async () => {
//             db.Todos.findAll.mockRejectedValue('DB No se encuentra disponible')

//             const mockedReq = {}
//             const mockedRes = {
//                 status: jest.fn(),
//                 json: jest.fn()
//             }
            
//             await getAllTodo(mockedReq, mockedRes)

//             expect(db.Todos.findAll).toHaveBeenCalledTimes(1)

//             expect(mockedRes.status).toHaveBeenCalledWith(500)
//             expect(mockedRes.json).toHaveBeenCalledWith({ data: null, error: 'Something went wrong!' })
//         })
//     })

//     describe('deleteById', () => {
//         beforeEach(() => jest.resetAllMocks())

//         test('deberia devolver un estado 204 si se pudo eliminar la tarea', async () => {
//             const todoToDestroy = {
//                 id: 1,
//                 name: 'Todo 1',
//                 description: undefined,
//                 status: false,
//                 destroy: jest.fn()
//             }
//             db.Todos.findByPk.mockResolvedValue(todoToDestroy)

//             const mockedReq = {
//                 params: {
//                     id: 1
//                 }
//             }
//             const mockedRes = {
//                 status: jest.fn(),
//                 json: jest.fn(),
//                 send: jest.fn(),
//             }
            
//             await deleteById(mockedReq, mockedRes)

//             expect(db.Todos.findByPk).toHaveBeenCalledTimes(1)

//             expect(todoToDestroy.destroy).toHaveBeenCalledTimes(1)

//             expect(mockedRes.json).toHaveBeenCalledTimes(0)
            
//             expect(mockedRes.send).toHaveBeenCalledTimes(1)
//             expect(mockedRes.status).toHaveBeenCalledWith(204)
//         })

//         test('deberia devolver un estado 404 cuando no existe el TODO', async () => {
//             db.Todos.findByPk.mockResolvedValue(null)

//             const mockedReq = {
//                 params: {
//                     id: 1
//                 }
//             }
//             const mockedRes = {
//                 status: jest.fn(),
//                 json: jest.fn(),
//                 send: jest.fn(),
//             }
            
//             await deleteById(mockedReq, mockedRes)

//             expect(db.Todos.findByPk).toHaveBeenCalledTimes(1)

//             expect(mockedRes.json).toHaveBeenCalledTimes(1)
//             expect(mockedRes.send).toHaveBeenCalledTimes(0)
//             expect(mockedRes.status).toHaveBeenCalledWith(404)
//         })

//         test('deberia manejar los errores e indicar la respuesta correspondiente', async () => {
//             db.Todos.findByPk.mockRejectedValue('DB No se encuentra disponible')

//             const mockedReq = {
//                 params: {
//                     id: 1
//                 }
//             }
//             const mockedRes = {
//                 status: jest.fn(),
//                 json: jest.fn(),
//                 send: jest.fn(),
//             }
            
//             await deleteById(mockedReq, mockedRes)

//             expect(db.Todos.findByPk).toHaveBeenCalledTimes(1)

//             expect(mockedRes.json).toHaveBeenCalledTimes(1)
//             expect(mockedRes.json).toHaveBeenCalledWith({ data: null, error: 'Something went wrong!' })
//             expect(mockedRes.send).toHaveBeenCalledTimes(0)
//             expect(mockedRes.status).toHaveBeenCalledWith(500)
//         })
//     })
// })