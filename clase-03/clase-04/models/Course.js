const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course