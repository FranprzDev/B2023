const { getAllStudents, createStudent } = require('../controllers/student.controllers')
const { errorMiddleware } = require('../middlewares/common.middleware')
const { validateStudentData } = require('../middlewares/student.middleware')

const studentRouter = require('express').Router()

studentRouter.get('/', getAllStudents, errorMiddleware)

studentRouter.post('/',
    validateStudentData,
    createStudent,
    errorMiddleware
)

module.exports = studentRouter