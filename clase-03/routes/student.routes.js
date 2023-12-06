const Student = require('../models/Student')

const studentRouter = require('express').Router()

studentRouter.get('/', async (req, res) => {
    const courses = await Student.find({})

    res.json(courses)
})

module.exports = studentRouter