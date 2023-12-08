const Student = require('../models/Student')

const getAllStudents = async (req, res, next) => {
    try {
        const courses = await Student.find({})

        res.json(courses)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllStudents
}