const taskRouter = require('./tasks.routes')
const userRouter = require('./users.routes')

const rootRouter = require('express').Router()

rootRouter.use('/tasks', taskRouter)
rootRouter.use('/users', userRouter)

module.exports = rootRouter