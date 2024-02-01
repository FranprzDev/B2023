const express = require('express')
const session = require('express-session')
const passport = require('passport');
const rootRouter = require('./routes');
const { localStrategy, serializeUser, deserializeUser, githubStrategy } = require('./middlewares/passport.middlewares');
require('dotenv').config()

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded())

app.use(session({
    secret: process.env.SESSION_SECRET ?? '',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(localStrategy)
passport.use(githubStrategy)

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

app.use('/api', rootRouter)

module.exports = app