const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course