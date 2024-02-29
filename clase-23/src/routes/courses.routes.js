const { createCourse, editCourse, getCourseById, listCourses } = require('../controllers/courses.controllers')

const courseRouter = require('express').Router()

courseRouter.post('/create', createCourse)
courseRouter.patch('/edit', editCourse)
courseRouter.get('/list-one/:id', getCourseById)
courseRouter.post('/enable', (req, res) => res.json({ data: 'Get course', error: null }))
courseRouter.get('/list', listCourses)

module.exports = courseRouter