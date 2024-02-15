const rootRouter = require('express').Router()
const todoRouter = require('./todo.routes')


rootRouter.use('/todo', todoRouter)

module.exports = rootRouter