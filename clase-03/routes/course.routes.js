const courseRouter = require('express').Router()
const Course = require('../models/Course')

courseRouter.get('/', async (req, res) => {
    const courses = await Course.find({})

    res.json(courses)
})

courseRouter.post('/', async (req, res) => {
    const { name, price, description } = req.body

    // Option 1
    const course = new Course({ name, price, description })
    await course.save()

    res.status(201)
    res.json(course)

    // Option 2
    // await Course.create({ name, price, description })

    // res.status(201)
    // res.json({ message: `Course ${name} was created` })

    // Option 3
    // await Course.insertMany([{ name, price, description }])

    // res.status(201)
    // res.json({ message: `Course ${name} was created` })
})

courseRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    const course = await Course.findById(id)

    if (!course) {
        res.status(404)
        return res.json({ message: `Course with id ${id} was not found.` })
    }

    res.json(course)
})

courseRouter.patch('/:id', async (req, res) => {
    const { id } = req.params

    const course = await Course.findById(id)

    if (!course) {
        res.status(400)
        return res.json({ message: `Course with id ${id} doesn't exist.` })
    }

    course.name = req.body.name ?? course.name
    course.description = req.body.description ?? course.description
    course.price = req.body.price ?? course.price
    await course.save()

    res.json(course)
})

courseRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    const course = await Course.findByIdAndDelete(id)

    if (!course) {
        res.status(400)
        return res.json({ message: `Course with id ${id} doesn't exist.` })
    }

    res.json(course)
})

module.exports = courseRouter