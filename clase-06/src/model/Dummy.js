const mongoose = require('mongoose')

const dummySchema = new mongoose.Schema({
    _publicId: {
        type: mongoose.Schema.Types.ObjectId
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        min: [0, 'Nadie tiene menos de 0 años cumplidos'],
        max: 100
    },
    object: {
        type: mongoose.Schema.Types.Mixed,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    favouriteCategories: {
        type: [String],
        default: undefined
    },
    socialMedias: {
        type: Map,
        of: String
    },
    hiringDate: {
        type: Date,
        required: true,
    }
})

const Dummy = mongoose.model('Dummy', dummySchema)

module.exports = Dummy
