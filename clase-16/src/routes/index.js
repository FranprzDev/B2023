const rootRouter = require('express').Router()
const authRouter = require('./auth.routes')
const dtRouter = require('./dt.routes')
const playerRouter = require('./player.routes')
const userRouter = require('./user.routes')

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)
rootRouter.use('/dt', dtRouter)
rootRouter.use('/player', playerRouter)

module.exports = rootRouter