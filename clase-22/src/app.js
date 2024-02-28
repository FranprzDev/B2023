const express = require('express')
const morgan = require('morgan')
const rootRouter = require('./routes')
const { NODE_ENV, MONGO_URI   } = require('./constants')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

if (NODE_ENV !== 'test')
    app.use(morgan('dev'))

app.use('/api', rootRouter)

mongoose.connect(MONGO_URI)
    .then(() => console.log({ message: "Conectado a la DB" }))
    .catch(() => console.error({ message: "No Conectado a la DB" }))

module.exports = {
    app
}