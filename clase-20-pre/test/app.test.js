const request = require('supertest')
const { app } = require('../src/app')
const db = require('../src/models')
const { down: downTodos, up: upTodos } = require('../src/seeders/20240219033807-seed-todos')

// beforeAll(async () => {
//     await downTodos(db.sequelize.getQueryInterface(), db.Sequelize)
//     await upTodos(db.sequelize.getQueryInterface(), db.Sequelize)
// })

describe('App', function() {
    describe('Route - [/api/todos]', function () {
        beforeEach(async () => {
            await downTodos(db.sequelize.getQueryInterface(), db.Sequelize)
            await upTodos(db.sequelize.getQueryInterface(), db.Sequelize)
        })

        test('[GET] - list all todos', function(done) {
            request(app)
                .get('/api/todos')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body.data.length).toBe(3)
                })
                .finally(done)
        })

        test('[GET] - list all todos - async/await', async function() {
            const response = await request(app)
                .get('/api/todos')
                .expect('Content-Type', /json/)
            expect(response.status).toEqual(200)
            expect(response.body.data.length).toBe(3)
        })

        test('[POST] - Create Todo with no fields', function(done) {
            const todoWithJustName = {
            }

            request(app)
                .post('/api/todos')
                .send(todoWithJustName)
                .set('Content-Type', 'application/json')
                .expect(400)
                .then(response => {
                    expect(response.body.data).toBeFalsy()
                    expect(response.body.error).toBeTruthy()
                    expect(response.body.error.length).toEqual(2)
                })
                .finally(done)
        })

        test('[POST] - Create Todo with wrong type for status', function(done) {
            const todoWithWrongTypeForStatus = {
                name: 'Wrong todo',
                status: 15
            }

            request(app)
                .post('/api/todos')
                .send(todoWithWrongTypeForStatus)
                .set('Content-Type', 'application/json')
                .expect(400)
                .then(response => {
                    expect(response.body.data).toBeFalsy()
                    expect(response.body.error).toBeTruthy()
                    expect(response.body.error.length).toEqual(1)
                })
                .finally(done)
        })

        test('[POST] - Create Todo with wrong type for description', function(done) {
            const todoWithWrongTypeForDescription = {
                name: 'Wrong todo',
                description: 15
            }

            request(app)
                .post('/api/todos')
                .send(todoWithWrongTypeForDescription)
                .set('Content-Type', 'application/json')
                .expect(400)
                .then(response => {
                    expect(response.body.data).toBeFalsy()
                    expect(response.body.error).toBeTruthy()
                    expect(response.body.error.length).toEqual(1)
                })
                .finally(done)
        })

        test('[POST] - Create Todo with just name', function(done) {
            const todoWithJustName = {
                name: 'Just have name'
            }

            request(app)
                .post('/api/todos')
                .send(todoWithJustName)
                .set('Content-Type', 'application/json')
                .expect(201)
                .then(response => {
                    expect(response.body.error).toBe(null)
                    expect(response.body.error).toBeFalsy()
                    expect(response.body.data.status).toBeFalsy()
                    expect(response.body.data.name).toBe(todoWithJustName.name)
                    expect(response.body.data.createdAt).toBeTruthy()
                    expect(response.body.data.updatedAt).toBeTruthy()
                })
                .finally(done)
        })

        test('[POST] - Create Todo with just name', function(done) {
            const todoWithPredefinedStatus = {
                name: 'Just have name',
                status: true
            }

            request(app)
                .post('/api/todos')
                .send(todoWithPredefinedStatus)
                .set('Content-Type', 'application/json')
                .expect(201)
                .then(response => {
                    expect(response.body.error).toBe(null)
                    expect(response.body.error).toBeFalsy()
                    expect(response.body.data.status).toBe(todoWithPredefinedStatus.status)
                    expect(response.body.data.name).toBe(todoWithPredefinedStatus.name)
                    expect(response.body.data.createdAt).toBeTruthy()
                    expect(response.body.data.updatedAt).toBeTruthy()
                })
                .finally(done)
        })

        test('[POST] - Create Todo with all fields', function(done) {
            const completedTodo = {
                name: 'Just have name',
                status: true,
                description: 'A simple description'
            }

            request(app)
                .post('/api/todos')
                .send(completedTodo)
                .set('Content-Type', 'application/json')
                .expect(201)
                .then(response => {
                    expect(response.body.error).toBe(null)
                    expect(response.body.error).toBeFalsy()
                    expect(response.body.data.status).toBe(completedTodo.status)
                    expect(response.body.data.name).toBe(completedTodo.name)
                    expect(response.body.data.description).toEqual(completedTodo.description)
                    expect(response.body.data.createdAt).toBeTruthy()
                    expect(response.body.data.updatedAt).toBeTruthy()
                })
                .finally(done)
        })
    })

    describe('Route [/api/todos/:id]', function() {
        beforeEach(async () => {
            await downTodos(db.sequelize.getQueryInterface(), db.Sequelize)
            await upTodos(db.sequelize.getQueryInterface(), db.Sequelize)
        })

        test('[GET] - Find todo with wrong type for id', function(done) {
            const wrongId = 'hola'

            request(app)
                .get(`/api/todos/${wrongId}`)
                .expect(400)
                .then(response => {
                    expect(response.body.data).toBeFalsy()
                    expect(response.body.error).toBeTruthy()
                })
                .finally(done)
        })

        test('[GET] - Find todo with inexistent id', function(done) {
            const wrongId = -1

            request(app)
                .get(`/api/todos/${wrongId}`)
                .expect(404)
                .then(response => {
                    expect(response.body.data).toBeFalsy()
                    expect(response.body.error).toBeTruthy()
                })
                .finally(done)
        })

        test('[GET] - Find todo with right id', async function() {
            const preloadedTodo = {
                name: 'Just have name'
            }

            const preloadedResponse = await request(app)
                .post('/api/todos')
                .send(preloadedTodo)
                .set('Content-Type', 'application/json')
            
            expect(preloadedResponse.status).toEqual(201)
            expect(preloadedResponse.body.data).toBeTruthy()

            const { id } = preloadedResponse.body.data

            const response = await  request(app)
                .get(`/api/todos/${id}`)
                .expect(200)

            expect(response.body.data).toBeTruthy()
            expect(response.body.error).toBeFalsy()
            expect(response.body.data.id).toEqual(id)
        })
    })
})

afterAll(async () => {
    await downTodos(db.sequelize.getQueryInterface(), db.Sequelize)
    await db.sequelize.close()
})