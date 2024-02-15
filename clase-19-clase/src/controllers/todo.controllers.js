const { todos } = require('../db')

const getAllTodo = (req, res) => {
    console.log(req)
    if (req.query.palabra === 'error') {
    
        res.status(400)
        res.json({ data: todos, error: 'Error' })
    
    } else {
    
        res.status(200)
        res.json({ data: todos, error: null })
    
    }
}

const createTodo = (req, res) => {
    // TODO: Completar para la tarea
}
const getById = (req, res) => {
    // TODO: Completar para la tarea
}
const updateById = (req, res) => {
    // TODO: Completar para la tarea
}
const deleteById = (req, res) => {
    // TODO: Completar para la tarea
}

module.exports = {
    getAllTodo,
    createTodo,
    getById,
    updateById,
    deleteById
}