const express = require('express')
const courseRouter = require('./routes/course.routes')
const mongoose = require('mongoose')
const studentRouter = require('./routes/student.routes')

const app = express()

app.use(express.json())

app.use('/api/courses', courseRouter)
app.use('/api/studentes', studentRouter)

mongoose
    .connect('mongodb+srv://b2023-rollinguser:12345rollingsecure@cluster0.tgrfw.mongodb.net/clase-03?retryWrites=true&w=majority')
    .then(() => console.log('Conectado'))
    .catch(() => console.log('No Conectado'))

app.listen(3000, () => console.log('Server listening to port', 3000))