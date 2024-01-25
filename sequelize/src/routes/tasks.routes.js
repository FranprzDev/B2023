// const db = require('../models')

const taskRouter = require('express').Router()

taskRouter.get('/', async (req, res) => {
    // const tasks = await db.Tasks.findAll()

    res.json({ data: [] })
})

module.exports = taskRouter