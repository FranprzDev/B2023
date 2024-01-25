const simpleRouter = require('express').Router()
const jwt = require('jsonwebtoken')

simpleRouter.get('/publica', async (req, res) => {
    res.json({ message: 'Ruta publica' })
})

simpleRouter.get('/privada', async (req, res) => {
    const token = req.headers.authorization

    jwt.verify(token, 'palabra_supersecreta_para_dar_veracidad', (err, user) => {
        if (err) return res.json({ message: 'Ruta privada - Token invalido' })

        res.json({ message: 'Ruta privada - Token valido tiene acceso' })
    })
})

simpleRouter.get('/privada-para-admin', async (req, res) => {
    const token = req.headers.authorization

    jwt.verify(token, 'palabra_supersecreta_para_dar_veracidad', (err, user) => {
        if (err) return res.json({ message: 'Ruta privada - Token invalido' })

        if (user.role !== 'ADMIN')
            return res.json({ message: 'Ruta privada - Token invalido, no tiene los permisos correcto' })

        res.json({ message: 'Ruta privada - Token valido tiene acceso de ADMIN' })
    })
})

module.exports = simpleRouter