const courseRouter = require('express').Router()
const { getAllCourses, createCourse, getCourseById, patchCourseById, deleteCourseById } = require('../controllers/course.controllers')
const { errorMiddleware } = require('../middlewares/common.middleware')
const { validateMongoId, validateCourseData } = require('../middlewares/course.middlewares')

courseRouter.get('/', getAllCourses, errorMiddleware)

courseRouter.post('/',
    validateCourseData,
    createCourse,
    errorMiddleware
)

courseRouter.get('/:id',
    validateMongoId,
    getCourseById,
    errorMiddleware
)

courseRouter.patch('/:id',
    validateMongoId,
    patchCourseById,
    errorMiddleware
)

courseRouter.delete('/:id',
    validateMongoId,
    deleteCourseById,
    errorMiddleware
)

module.exports = courseRouter