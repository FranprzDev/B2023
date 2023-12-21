const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    available: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    }
})

const Product = model('Product', productSchema)

module.exports = Product
