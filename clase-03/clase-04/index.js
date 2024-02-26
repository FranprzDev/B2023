const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const courseRouter = require('./routes/course.routes')
const studentRouter = require('./routes/student.routes')
const { logger } = require('./loggers')

const app = express()

app.use(express.json())

app.use(morgan(function (tokens, req, res) {
    const logMessage = {
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        rs: tokens['response-time'](req, res) + ' ms'
    }

    logger.info({ message: JSON.stringify(logMessage), date: new Date().toLocaleString() })
    return JSON.stringify(logMessage)
}))

app.use('/api/courses', courseRouter)
app.use('/api/students', studentRouter)

mongoose
    .connect('mongodb+srv://b2023-rollinguser:12345rollingsecure@cluster0.tgrfw.mongodb.net/clase-03?retryWrites=true&w=majority')
    .then(() => logger.info({ message: 'Base de datos conectada' }))
    .catch(() => logger.error({ message: 'No se pudo conectar a mongo' }))

app.listen(3000, () => logger.info({ message: 'Servidor ejecutandose en el puerto ' + 3000, date: new Date().toLocaleString() }))