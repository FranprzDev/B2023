const tableRouter = require('express').Router()
const { verifyJWTAsAdmin } = require('../middlewares/auth.middlewares')
const db = require('../models')

tableRouter.get('/', verifyJWTAsAdmin, async (req, res) => {
    const tables = await db.Tables.findAll()

    res.json({ tables })
})

tableRouter.post('/', verifyJWTAsAdmin, async (req, res) => {
    const { quantity, place } = req.body

    const table = db.Tables.build({ quantity, place })
    await table.save()

    res.json({ table })
})

module.exports = tableRouter