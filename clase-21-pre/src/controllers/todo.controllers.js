const db = require('../models')

const getAllTodo = async (req, res) => {
    try {
        const todos = await db.Todos.findAll()
        res.status(200)
        res.json({ data: todos, error: null })
    } catch (error) {
        res.status(500)
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