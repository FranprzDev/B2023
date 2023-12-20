

const {
    createAuthor, createBook, getBooks
} = require('../controllers/situtations.controllers')

const situationRouter = require('express').Router()

// /api/situations/...
situationRouter.post('/populate/create-author', createAuthor)
situationRouter.post('/populate/create-book', createBook)
situationRouter.get('/populate/find-books', getBooks)

// /api/situations/...
situationRouter.get('/discriminator-1', (req, res) => { })
situationRouter.get('/discriminator-2', (req, res) => { })
situationRouter.get('/discriminator-3', (req, res) => { })

// /api/situations/...
situationRouter.get('/transactions-1', (req, res) => { })
situationRouter.get('/transactions-2', (req, res) => { })
situationRouter.get('/transactions-3', (req, res) => { })

module.exports = situationRouter