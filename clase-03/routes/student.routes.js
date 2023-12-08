const { getAllStudents } = require('../controllers/student.controllers')
const { errorMiddleware } = require('../middlewares/common.middleware')

const studentRouter = require('express').Router()

studentRouter.get('/', getAllStudents, errorMiddleware)

module.exports = studentRouter