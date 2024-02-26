const { body } = require('express-validator')
const { requestValidation } = require('./common.middleware')

const validateStudentData = [
    body('firstName').isString().withMessage('firstName must be a string'),
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('lastName').isString().withMessage('lastName must be a string'),
    body('lastName').notEmpty().withMessage('lastName is required'),
    requestValidation
]

module.exports = {
    validateStudentData
}