const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
})

const orderSchema = new Schema({
    products: {
        type: [itemSchema],
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["PREPARING", "BUYED", "DISPATCHED", "SHIPPED", "FINISHED"]
    }
})

const Order = model('Order', orderSchema)

module.exports = Order
