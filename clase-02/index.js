const express = require('express')
const courseRouter = require('./routes/course.routes')
const mongoose = require('mongoose')

const app = express()

app.use('/courses', courseRouter)
app.use('/products', courseRouter)
app.use('/categorias', courseRouter)
app.use('/peliculas', courseRouter)

mongoose
    .connect('mongodb+srv://b2023-rollinguser:12345rollingsecure@cluster0.tgrfw.mongodb.net/rolling-courses?retryWrites=true&w=majority')
    .then(() => console.log('Conectado'))
    .catch(() => console.log('No Conectado'))

app.listen(3000, () => console.log('Server listening to port', 3000))