const { registerUser } = require('../controllers/user.controllers')

const rootRouter = require('express').Router()

rootRouter.post("/user/register", registerUser)

module.exports = rootRouter