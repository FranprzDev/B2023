const hostRouter = require('express').Router()
const db = require('../models')

hostRouter.get('/', async (req, res) => {
    const hosts = await db.Hosts.findAll()

    res.json({ hosts })
})

hostRouter.post('/', async (req, res) => {
    const { fullname, age, phoneNumber, email } = req.body

    const t = await db.sequelize.transaction()

    const host = await db.Hosts.create({ fullname, age, phoneNumber, email }, { transaction: t })

    t.commit()

    res.json({ host })
})

module.exports = hostRouter