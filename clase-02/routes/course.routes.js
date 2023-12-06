const Course = require('../models/Course')

const router = require('express').Router()

// .../
router.get('/', async (req, res) => {
    const courses = await Course.find({})

    res.json(courses)
})

module.exports = router