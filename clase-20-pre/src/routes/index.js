const rootRouter = require('express').Router()
const todoRouter = require('./todo.routes')

rootRouter.use('/todos', todoRouter)

module.exports = rootRouter