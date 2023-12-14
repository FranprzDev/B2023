const express = require('express')
const mongoose = require('mongoose')
// const morgan = require('morgan')
const { logger } = require('./loggers')
const userRouter = require('./routes/user.routes')
const { MONGO_CONFIG, EXPRESS_CONFIG } = require('./config')
const blogRouter = require('./routes/blog.routes')
// const multer = require('multer')

const app = express()

app.use(express.json())

// app.use(morgan(function (tokens, req, res) {
//     const logMessage = {
//         method: tokens.method(req, res),
//         url: tokens.url(req, res),
//         status: tokens.status(req, res),
//         rs: tokens['response-time'](req, res) + ' ms'
//     }

//     logger.info({ message: JSON.stringify(logMessage), date: new Date().toLocaleString() })
//     return JSON.stringify(logMessage)
// }))

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

mongoose
    .connect(MONGO_CONFIG.URI)
    .then(() => logger.info({ message: 'Base de datos conectada' }))
    .catch(() => logger.error({ message: 'No se pudo conectar a mongo' }))

app.listen(
    EXPRESS_CONFIG.PORT,
    () => logger.info(
        {
            message: 'Servidor ejecutandose en el puerto ' + EXPRESS_CONFIG.PORT,
            date: new Date().toLocaleString()
        }
    )
)