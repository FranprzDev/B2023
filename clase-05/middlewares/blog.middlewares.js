const { body } = require('express-validator')
const { requestValidation } = require('./common.middleware')

const validateBlogData = [
    body('userId').notEmpty().withMessage('`userId` is required'),
    body('userId').isMongoId().withMessage('`userId` must be a Mongo ID'),
    body('title').notEmpty().withMessage('`title` is required'),
    body('title').isString().withMessage('`title` must be a String'),
    body('content').notEmpty().withMessage('`content` is required'),
    body('content').isString().withMessage('`content` must be a string'),
    requestValidation
]

module.exports = {
    validateBlogData
}