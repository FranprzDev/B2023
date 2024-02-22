const db = require('../models')

// db => { Todos.findAll }

const getAllTodo = async (req, res) => {
    try {
        // obtiene los todos desde la libreria/orm de sequelize
        const todos = await db.Todos.findAll() // db.Todos.findAll va a ser mockeado
        // status OK
        res.status(200)
        // respuest OK
        res.json({ data: todos, error: null })
    } catch (error) {
        // status error fatal
        res.status(500)
        // respuest error fatal
        res.json({ data: null, error: 'Something went wrong!' })
    }
}
const createTodo = async (req, res) => {
    const { name, status, description } = req.body
    try {
        const todo = await db.Todos.build({ name, status, description })
        await todo.save()
        res.status(201)
        res.json({ data: todo, error: null })
    } catch (err) {
        res.status(400)
        res.json({ data: null, error: 'Todo was not created.' })
    }
}
const getById = async (req, res) => {
    const { id } = req.params
    try {
        const todo = await db.Todos.findByPk(id)

        if (!todo) {
            res.status(404)
            res.json({ data: null, error: `Todo with id ${id} not exists` })
            return undefined
        }

        res.status(200)
        res.json({ data: todo, error: null })
    } catch (error) {
        res.status(500)
        res.json({ data: null, error: 'Something went wrong!' })
    }
}
const deleteById = async (req, res) => {
    const { id } = req.params
    try {
        const todo = await db.Todos.findByPk(id)

        if (!todo) {
            res.status(404)
            res.json({ data: null, error: `Todo with id ${id} not exists` }) 
            return undefined
        }

        await todo.destroy() 

        res.status(204) 
        res.send() 
    } catch (error) {
        res.status(500)
        res.json({ data: null, error: 'Something went wrong!' })
    }
}

module.exports = {
    getAllTodo,
    createTodo,
    getById,
    deleteById
}