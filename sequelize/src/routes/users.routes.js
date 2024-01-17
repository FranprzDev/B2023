const db = require('../models')

const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
    const users = await db.Users.findAll()

    res.json({ data: users })
})

module.exports = userRouter