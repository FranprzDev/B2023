const express = require('express')
const tableRouter = require('./routes/tables.routes')
const hostRouter = require('./routes/hosts.routes')
const reservationRouter = require('./routes/reservations.routes')
const authRouter = require('./routes/auth.routes')
const simpleRouter = require('./routes/simple.routes')

const app = express()

app.use(express.json())

app.use('/api/tables', tableRouter)
app.use('/api/hosts', hostRouter)
app.use('/api/reservations', reservationRouter)
app.use('/api/auth', authRouter)
app.use('/api/simple', simpleRouter)

module.exports = app