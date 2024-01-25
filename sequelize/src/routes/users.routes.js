const db = require('../models')

const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
    const users = await db.Users.findAll()

    res.json({ data: users })
})

userRouter.post('/', async (req, res) => {
    const { firstname, lastname, username, password, dni, email } = req.body

    const user = db.Users.build({ firstname, lastname, username, password, dni, email })
    await user.save()

    res.json({ data: user })
})

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    const data = await db.Users.destroy({
        where: {
            id
        }
    })

    res.json({ data })
})

module.exports = userRouter