const express = require('express')
const morgan = require('morgan')
const rootRouter = require('./routes')
const { NODE_ENV } = require('./constants')

const app = express()

app.use(express.json())

if (NODE_ENV !== 'test')
    app.use(morgan('dev'))

app.use('/api', rootRouter)

module.exports = {
    app
}