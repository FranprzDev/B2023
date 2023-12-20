const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    price: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    publicUUID: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
