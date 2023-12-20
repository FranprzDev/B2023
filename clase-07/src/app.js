const express = require('express')
const situationRouter = require('./routers/situations.routes')
const mongoose = require('mongoose')
const { MONGO_CONFIG } = require('./config')

const app = express()

app.use(express.json())

app.use('/api/situations', situationRouter)

mongoose.connect(MONGO_CONFIG.URI)
    .then(() => console.log({ message: "Conectado a la DB" }))
    .catch(() => console.error({ message: "No Conectado a la DB" }))

module.exports = app