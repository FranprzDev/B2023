const Author = require('../models/Author')
const Book = require('../models/Book')
const User = require('../models/User')
const Staff = require('../models/Staff')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const Order = require('../models/Order')
const mongoose = require('mongoose')

/**
 * Relaciones entre dos modelos, en este ejemplo relacionaremos libros y autores
 */
const createAuthor = async (req, res) => {
    const { firstName, lastName } = req.body
    const author = new Author({ firstName, lastName })
    await author.save()

    res.json(author)
}

const createBook = async (req, res) => {
    const { name, description, authorId } = req.body
    const book = new Book({ name, description, authorId })
    await book.save()

    res.json(book)
}

const getBooks = async (req, res) => {
    // Toma de la query los datos para realizar las busquedas correpondientes
    const { bookId, withAuthorData } = req.query

    // Defino una consulta vacia
    let query = undefined

    // tengo dos caminos
    if (bookId !== undefined) {
        // busqueda de un unico libro por id
        query = Book.findById(bookId)
    } else {
        // busqueda de varios libros sin aplicar niguna clausula
        query = Book.find({})
    }

    if (withAuthorData === "YES") {
        query = query.populate('authorId')
    }

    const response = await query.exec()

    res.json(response)
}

const createStaff = async (req, res) => {
    const { username, employeeId } = req.body

    const staff = new Staff({ username, employeeId })
    await staff.save()

    res.json(staff)
}

const getStaff = async (req, res) => {
    const { employeeId } = req.query
    let query = undefined
    if (employeeId !== undefined) {
        query = Staff.findOne({ employeeId })
    } else {
        query = Staff.find({})
    }

    const response = await query.exec()

    res.json(response)
}

const createCustomer = async (req, res) => {
    const { username } = req.body

    const customer = new Customer({ username })
    await customer.save()

    res.json(customer)
}

const createProduct = async (req, res) => {
    const { name, price, available, stock } = req.body

    const product = new Product({ name, price, available, stock })
    await product.save()

    res.status(201).json(product)
}

const getProducts = async (req, res) => {
    const { productId } = req.query
    let query = undefined
    if (productId !== undefined) {
        query = Product.findById(productId)
    } else {
        query = Product.find({})
    }

    const response = await query.exec()

    res.json(response)
}

const makeProductAvailable = async (req, res) => {
    const { available, productId } = req.body

    const product = await Product.findById(productId)

    if (!product) return res.status(400).json({ message: 'Producto no existe' })

    if (available && (product.stock === 0 || product.price <= 0)) {
        return res.status(400).json({ message: 'No se puede disponibilizar, el stock no puede ser nulo' })
    }

    product.available = available
    await product.save()

    res.json({ message: 'Producto actualizado', data: product })
}

const patchProduct = async (req, res) => {
    const { price, stock, name, productId } = req.body

    const product = await Product.findByIdAndUpdate(productId, { price, stock, name })

    if (!product) return res.status(400).json({ message: 'Producto no existe' })

    res.json({ message: 'Producto actualizado', data: product })
}

const prepareOrder = async (req, res) => {
    const { customerId, productId, quantity } = req.body

    const order = new Order({ customer: customerId, products: [{ product: productId, quantity }] })
    await order.save()

    res.json(order)
}

const findNewestOrder = async (req, res) => {
    const { customerId } = req.query

    const customer =
        await Order.findOne({ customer: customerId, status: 'PREPARING' })
            .populate('products.product')
            .populate('customer')

    res.json(customer)
}

const buyOrder = async (req, res) => {
    const { customerId } = req.body
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const order =
            await Order.findOne({ customer: customerId, status: 'PREPARING' })
                .populate('products.product')
                .session(session)

        // recorro todo mi listado de productos en mi compra
        for (const item of order.products) {
            // tomo cada producto
            const product = item.product;
            // tomo la cantidad a comprar
            const quantityPurchased = item.quantity;

            if (product.stock < quantityPurchased) {
                throw new Error(`No hay suficiente stock para ${product.name}`);
            }

            // Actualizar el stock del producto
            product.stock -= quantityPurchased;
            await product.save();
            console.log("Product saved")
        }

        order.status = "BUYED"
        await order.save()

        if (req.query.cancel === "YES") throw new Error("Cancel transaction")

        await session.commitTransaction();
        session.endSession();

        res.json(order)
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        session.endSession()

        res.json({ message: error.message })
    }
}

const addProduct = async (req, res) => {
    const { customerId, productId, quantity } = req.body

    const order = await Order.findOne({ customer: customerId, status: 'PREPARING' })

    order.products.push({ product: productId, quantity })

    await order.save()

    res.json(order)
}

const cancelOrder = async (req, res) => {
    const { orderId } = req.body

    const session = await mongoose.startSession();
    session.startTransaction()

    try {
        const order = await Order.findById(orderId).populate("products.product").session(session)

        for (const item of order.products) {
            // tomo cada producto
            const product = item.product;
            // tomo la cantidad a comprar
            const quantityPurchased = item.quantity;

            // Actualizar el stock del producto
            product.stock += quantityPurchased;
            await product.save();
        }

        order.status = "FINISHED"
        await order.save()

        await session.commitTransaction();
        session.endSession();

        res.json(order)
    } catch (error) {
        await session.abortTransaction()
        session.endSession()

        res.json({ message: error.message })
    }
}

module.exports = {
    createAuthor,
    createBook,
    getBooks,
    createStaff,
    getStaff,
    createCustomer,
    createProduct,
    getProducts,
    makeProductAvailable,
    patchProduct,
    prepareOrder,
    findNewestOrder,
    buyOrder,
    addProduct,
    cancelOrder
}