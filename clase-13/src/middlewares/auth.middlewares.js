const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization

    jwt.verify(token, 'palabra_supersecreta_para_dar_veracidad', (err, user) => {
        if (err) return res.json({ message: 'Ruta privada - Token invalido' })

        next()
    })
}

const verifyJWTAsCustomer = (req, res, next) => {
    const token = req.headers.authorization

    jwt.verify(token, 'palabra_supersecreta_para_dar_veracidad', (err, user) => {
        if (err) return res.json({ message: 'Ruta privada - Token invalido' })

        if (user.role !== 'CUSTOMER') return res.json({ message: 'Ruta privada - Token sin autorizacion' })

        next()
    })
}

const verifyJWTAsAdmin = (req, res, next) => {
    const token = req.headers.authorization

    jwt.verify(token, 'palabra_supersecreta_para_dar_veracidad', (err, user) => {
        if (err) return res.json({ message: 'Ruta privada - Token invalido' })

        if (user.role !== 'ADMIN') return res.json({ message: 'Ruta privada - Token sin autorizacion' })

        next()
    })
}

module.exports = {
    verifyJWT,
    verifyJWTAsAdmin,
    verifyJWTAsCustomer
}