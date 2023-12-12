const { body } = require('express-validator')
const { requestValidation } = require('./common.middleware')

const validateCourseData = [
    body('name').notEmpty().withMessage('Name is required'),
    body('name').isString().withMessage('Name must be a string'),
    body('price').notEmpty().withMessage('Price is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    requestValidation,
]

module.exports = {
    validateCourseData
}