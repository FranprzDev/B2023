const { validationResult } = require('express-validator')

const requestValidation = (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) return res.json({ errors: result.array() })

    next()
}

const errorMiddleware = (err, req, res, next) => {
    console.log('Error capturado', err)
    res.status(500)
    res.json({ message: 'Internal server error' })
}

module.exports = {
    requestValidation,
    errorMiddleware
}