const { body, param } = require('express-validator')

const beforeTodoCreation = [
    body('name').notEmpty().withMessage('`name` is mandatory'),
    body('name').isString().withMessage('`name` must be a string'),
    body('status').optional().isBoolean().withMessage('`status` must be a boolean'),
    body('description').optional().isString().withMessage('`description` must be a string'),
]

const beforeFindByPk = [
    param('id').isNumeric().withMessage('`id` must be a number'),
]

module.exports = {
    beforeTodoCreation,
    beforeFindByPk
}