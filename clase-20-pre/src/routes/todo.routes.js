const { getAllTodo, createTodo, getById } = require('../controllers/todo.controllers')
const { beforeTodoCreation, validateRequest, beforeFindByPk } = require('../middlewares/todo.middlewares')

const todoRouter = require('express').Router()

todoRouter.get('/', getAllTodo)
todoRouter.post('/', beforeTodoCreation, validateRequest, createTodo)
todoRouter.get('/:id', beforeFindByPk, validateRequest, getById)
// todoRouter.update('/:id', (req, res) => {})
// todoRouter.delete('/:id', (req, res) => {})

module.exports = todoRouter