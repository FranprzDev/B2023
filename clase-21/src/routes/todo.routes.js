const { getAllTodo, createTodo, getById, deleteById } = require('../controllers/todo.controllers')
const { validateRequest } = require('../middlewares/common.middlewares')
const { beforeTodoCreation, beforeFindByPk } = require('../middlewares/todo.middlewares')

const todoRouter = require('express').Router()

todoRouter.get('/', getAllTodo)
todoRouter.post('/', beforeTodoCreation, validateRequest, createTodo)
todoRouter.get('/:id', beforeFindByPk, validateRequest, getById)
todoRouter.delete('/:id', beforeFindByPk, validateRequest, deleteById)

module.exports = todoRouter