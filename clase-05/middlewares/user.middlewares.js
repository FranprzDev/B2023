const { body } = require('express-validator')
const { requestValidation } = require('./common.middleware')

const validateUserData = [
    body('username').notEmpty().withMessage('Username is required'),
    body('username').isAlphanumeric().withMessage('Username is alphanumeric'),
    requestValidation
]

module.exports = {
    validateUserData
}