const Course = require('../models/Course')

const courseRouter = require('express').Router()

courseRouter.get('/', async (req, res) => {
    const courses = await Course.find({})

    res.json(courses)
})

courseRouter.post('/', async (req, res) => {
    const { name, price, description } = req.body

    // const course = new Course({ name, price, description })
    // await course.save()

    // res.status(201)
    // res.json(course)


    await Course.create({ name, price, description })

    res.status(201)
    res.json({ message: `Course ${name} was created` })
})

module.exports = courseRouter