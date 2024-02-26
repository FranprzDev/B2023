const Student = require('../models/Student')

const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find({})

        res.json(students)
    } catch (err) {
        next(err)
    }
}

const createStudent = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body

        const student = new Student({ firstName, lastName })
        await student.save()

        res.status(201)
        res.json(student)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllStudents,
    createStudent
}