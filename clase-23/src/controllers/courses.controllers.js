const { Op } = require('sequelize')
const db = require('../models')

const createCourse = async (req, res) => {
    try {
        const { name, schedule, minimunQuote, maximunQuote } = req.body
        const course = await db.Courses.create({ name, schedule, minimunQuote, maximunQuote })
        res.json({ data: course, error: null })
    } catch (error) {
        console.log(error)
        res.json({ data: null, error: 'Something went wrong!' })
    }
}

const editCourse = async (req, res) => {
    try {
        const { id, name, schedule, minimunQuote, maximunQuote } = req.body
        
        const course = await db.Courses.findByPk(id)

        if (!course) {
            res.json({ data: null, error: `The course with id ${id} doesn't exist.`})
            return undefined
        }

        course.name = name ?? course.name
        course.schedule = schedule ?? course.schedule
        course.minimunQuote = minimunQuote ?? course.minimunQuote
        course.maximunQuote = maximunQuote ?? course.maximunQuote

        await course.save()

        res.json({ data: course, error: null })
    } catch (error) {
        console.log(error)
        res.json({ data: null, error: 'Something went wrong!' })
    }
}

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params
        
        const course = await db.Courses.findByPk(id)

        if (!course) {
            res.json({ data: null, error: `The course with id ${id} doesn't exist.`})
            return undefined
        }

        res.json({ data: course, error: null })
    } catch (error) {
        console.log(error)
        res.json({ data: null, error: 'Something went wrong!' })
    }
}

const listCourses = async (req, res) => {
    try {
        const { name, schedule, orderBy, order } = req.query

        const where = {}
        const ordering = []

        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            }
        }

        if (schedule) {
            where.schedule = schedule
            // where.schedule = {
            //     [Op.eq]: schedule
            // }
        }

        if ((orderBy === 'id' || orderBy === 'name') && (order === 'ASC' || order === 'DESC')) {
            ordering.push([ orderBy, order ])
        }

        const courses = await db.Courses.findAll({
            where,
            order: ordering
        })

        res.json({ data: courses, error: null })
    } catch (error) {
        console.log(error)
        res.json({ data: null, error: 'Something went wrong!' })
    }
}

module.exports = {
    createCourse,
    editCourse,
    getCourseById,
    listCourses
}