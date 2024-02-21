const request = require('supertest')
const { app } = require('../app')
const db = require('../models')
const { down: downTodos, up: upTodos } = require('../seeders/20240219033807-seed-todos')

beforeAll(async () => {
    // Limpio la base de datos y elimino todo lo que haya en la tabla Todo
    // getQueryInterface: API QUE EJECUTA CONSULTAS MANUALES
    await downTodos(db.sequelize.getQueryInterface(), db.Sequelize)
    // Genero unas tareas basicas por defecto
    await upTodos(db.sequelize.getQueryInterface(), db.Sequelize)
})

describe('Todo module', function() {
    describe('[/api/todos]', function() {
        test('[GET] - List all todos - As Promise', function(done) {
            request(app)
                .get('/api/todos')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.data.length).toBe(3)
                })
                .finally(done)
        }) 
        
        test('[GET] - List all todos - Async/Wait', async function() {
            const response = await request(app)
                .get('/api/todos')

            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.data.length).toBe(3)
        })

        test('[POST] - Create Todo with no fields', async function() {
            const todoWithNoFields = {
            }

            const response = await request(app)
                .post('/api/todos')
                .send(todoWithNoFields)
                .set('Content-Type', 'application/json')

            expect(response.status).toBe(400)
            expect(response.body.data).toBe(null)
            expect(response.body.error.length).toBe(2)
        })

        test('[POST] - Create Todo with wrong type for status', async function() {
            const todoWithWrongTypeForStatus = {
                name: 'Wrong todo',
                status: 15
            }

            const response = await request(app)
                .post('/api/todos')
                .send(todoWithWrongTypeForStatus)
                .set('Content-Type', 'application/json')

            expect(response.status).toBe(400)
            expect(response.body.data).toBe(null)
            expect(response.body.error.length).toBe(1)
        })

        test('[POST] - Create Todo with wrong type for description', async function() {
            const todoWithWrongTypeForDescription = {
                name: 'Wrong todo',
                description: 15
            }

            const response = await request(app)
                .post('/api/todos')
                .send(todoWithWrongTypeForDescription)
                .set('Content-Type', 'application/json')

            expect(response.status).toBe(400)
            expect(response.body.data).toBe(null)
            expect(response.body.error.length).toBe(1)
        })

        test('[POST] - Create Todo with just name', async function() {
            const todoWithJustName = {
                name: 'Just have name'
            }

            const response = await request(app)
                .post('/api/todos')
                .send(todoWithJustName)
                .set('Content-Type', 'application/json')

            expect(response.status).toBe(201)
            expect(response.body.error).toBe(null)
            expect(response.body.error).toBeFalsy()
            expect(response.body.data).not.toBe(null)
            expect(response.body.data).toBeTruthy()
            expect(response.body.data.name).toBe(todoWithJustName.name)
        })

        test('[POST] - Create Todo with name and predefined status', async function() {
            const todoWithPredefinedStatus = {
                name: 'Todo con status',
                status: true
            }

            const response = await request(app)
                .post('/api/todos')
                .send(todoWithPredefinedStatus)
                .set('Content-Type', 'application/json')

            expect(response.status).toBe(201)
            expect(response.body.error).toBe(null)
            expect(response.body.error).toBeFalsy()
            expect(response.body.data).not.toBe(null)
            expect(response.body.data).toBeTruthy()
            expect(response.body.data.name).toBe(todoWithPredefinedStatus.name)
            expect(response.body.data.status).toBe(todoWithPredefinedStatus.status)
        })

        test('[POST] - Create Todo with all fields', async function() {
            const completedTodo = {
                name: 'Todo con status',
                status: true,
                description: 'Simple description'
            }

            const response = await request(app)
                .post('/api/todos')
                .send(completedTodo)
                .set('Content-Type', 'application/json')

            expect(response.status).toBe(201)
            expect(response.body.error).toBe(null)
            expect(response.body.error).toBeFalsy()
            expect(response.body.data).not.toBe(null)
            expect(response.body.data).toBeTruthy()
            expect(response.body.data.name).toBe(completedTodo.name)
            expect(response.body.data.status).toBe(completedTodo.status)
            expect(response.body.data.description).toBe(completedTodo.description)
        })
    })

    describe('[/api/todos/:id]', function() {
        test('[GET] - Find an id as string', async function() {
            const wrongId = 'hola'

            const response = await request(app)
                .get(`/api/todos/${wrongId}`)

            expect(response.status).toBe(400)
            expect(response.body.data).toBe(null)
            expect(response.body.data).toBeFalsy()
            expect(response.body.error).not.toBe(null)
            expect(response.body.error).toBeTruthy()
        })

        test('[GET] - Find an inexistent id', async function() {
            const wrongId = -1

            const response = await request(app)
                .get(`/api/todos/${wrongId}`)

            expect(response.status).toBe(404)
            expect(response.body.data).toBe(null)
            expect(response.body.data).toBeFalsy()
            expect(response.body.error).not.toBe(null)
            expect(response.body.error).toBeTruthy()
        })

        test('[GET] - Find a todo', async function() {
            const todoWithJustName = {
                name: 'Just have name'
            }

            const preloadResponse = await request(app)
                .post('/api/todos')
                .send(todoWithJustName)
                .set('Content-Type', 'application/json')

            const { id } = preloadResponse.body.data

            const response = await  request(app)
                .get(`/api/todos/${id}`)

            expect(response.status).toBe(200)
            expect(response.body.data).not.toBe(null)
            expect(response.body.error).toBe(null)
            expect(response.body.data.id).toEqual(id)
        })
    })
})

afterAll(async () => {
    await downTodos(db.sequelize.getQueryInterface(), db.Sequelize)
    await db.sequelize.close()
})