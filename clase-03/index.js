const express = require('express')
const courseRouter = require('./routes/course.routes')
const mongoose = require('mongoose')
const studentRouter = require('./routes/student.routes')

const app = express()

app.use(express.json())

app.use('/api/courses', courseRouter)
app.use('/api/students', studentRouter)

// app.get('/middle',
//     (req, res, next) => {
//         console.log('Primer middleware')
//         if (req.query.option === '1') return res.json({ message: 'Primero finaliza' })
//         else if (req.query.option === 'error1') throw new Error('Lanzamos un error en middle 1')


//         next()
//     },
//     (req, res, next) => {
//         console.log('Segundo middleware')
//         if (req.query.option === '2') return res.json({ message: 'Segundo finaliza' })
//         else if (req.query.option === 'error2') throw new Error('Lanzamos un error en middle 2')

//         next()
//     },
//     (req, res, next) => {
//         console.log('Tercero middleware')
//         if (req.query.option === '3') return res.json({ message: 'Tercero finaliza' })
//         else if (req.query.option === 'error3') throw new Error('Lanzamos un error en middle 3')


//         next()
//     },

//     (req, res) => res.json({ message: 'Endpoint' }),

//     (err, req, res, next) => {
//         // Mecanismo para salvar nuestro log -------------------------
//         console.log('Error', err)
//         // Mecanismo para salvar nuestro log -------------------------

//         if (err !== undefined) return res.json({ message: 'Algo salio mal' })

//         next()
//     }
// )

mongoose
    .connect('mongodb+srv://b2023-rollinguser:12345rollingsecure@cluster0.tgrfw.mongodb.net/clase-03?retryWrites=true&w=majority')
    .then(() => console.log('Conectado'))
    .catch(() => console.log('No Conectado'))

app.listen(3000, () => console.log('Server listening to port', 3000))