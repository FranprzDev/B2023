const courseRouter = require('./courses.routes')

const rootRouter = require('express').Router()

rootRouter.use('/courses', courseRouter)

module.exports = rootRouter