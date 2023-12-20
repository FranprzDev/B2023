const express = require('express')
const { MONGO_CONFIG } = require('./config')
const mongoose = require('mongoose')
const { getDummyData } = require('./controllers/dummy.controller')

const app = express()

app.get('/api/dummy', getDummyData)

mongoose
    .connect(MONGO_CONFIG.URI)
    .then(() => console.log({ message: 'Base de datos conectada' }))
    .catch(() => console.log({ message: 'No se pudo conectar a mongo' }))

module.exports = app