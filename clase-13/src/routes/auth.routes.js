const authRouter = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body

    const user = await db.Users.create({ username, password, role: 'CUSTOMER' })

    res.json({ user })
})

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await db.Users.findOne({ where: { username } })

    if (!user) return res.status(400).json({ message: 'Credenciales invalidadas' })

    if (user.password !== password) return res.status(400).json({ message: 'Credenciales invalidadas' })

    const token = jwt.sign({ username: user.username, role: user.role }, 'palabra_supersecreta_para_dar_veracidad', {
        expiresIn: '1h'
    })

    res.json({ token })
})

module.exports = authRouter