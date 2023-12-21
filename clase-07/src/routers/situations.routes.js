

const {
    createAuthor, createBook, getBooks, createStaff, getStaff, createCustomer, createProduct, getProducts, makeProductAvailable, patchProduct, prepareOrder
} = require('../controllers/situtations.controllers')

const situationRouter = require('express').Router()

// /api/situations/...
situationRouter.post('/populate/create-author', createAuthor)
situationRouter.post('/populate/create-book', createBook)
situationRouter.get('/populate/find-books', getBooks)

// /api/situations/...
situationRouter.post('/discriminators/create-staff', createStaff)
situationRouter.post('/discriminators/create-customer', createCustomer)
situationRouter.get('/discriminators/find-staff', getStaff)

// /api/situations/...
situationRouter.post('/transactions/create-product', createProduct)
situationRouter.get('/transactions/find-products', getProducts)
situationRouter.patch('/transactions/make-product-available', makeProductAvailable)
situationRouter.patch('/transactions/patch-product', patchProduct)
situationRouter.post('/transactions/prepare-order', prepareOrder)
situationRouter.post('/transactions/update-order', (req, res) => { })
situationRouter.post('/transactions/make-order', (req, res) => { })

module.exports = situationRouter