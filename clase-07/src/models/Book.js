const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
})

const Book = model('Book', bookSchema)

module.exports = Book
