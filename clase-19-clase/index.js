const express = require('express')

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded())



module.exports = app