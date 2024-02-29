const { validationResult } = require('express-validator')

const validateRequest = (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        res.status(400)
        res.json({ data: null, error: result.array() })
        return undefined
    }
    
    next()
}

module.exports = {
    validateRequest
}