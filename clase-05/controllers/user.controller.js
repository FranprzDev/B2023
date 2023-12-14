const User = require('../models/User')
const apicache = require('apicache')
const { makeSuccessResponse, makeErrorResponse } = require('../utils/response.utils')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs').exec()

        res.json(makeSuccessResponse(users))
    } catch (err) {
        next(err)
    }
}
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id })
        await user.populate('blogs')

        if (!user) return res.status(404).json({ data: [], error: ['User was not found'] })

        res.json(makeSuccessResponse(user))
    } catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try {
        const { username } = req.body

        const user = new User({ username })
        await user.save()

        apicache.clear()
        res.status(201).json(makeSuccessResponse(user))
    } catch (err) {
        next(err)
    }
}
const updateUser = (req, res, next) => {
    res.json({ data: 'Message', error: [] })
}
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)

        if (!user) return res.status(400).json(makeErrorResponse(['User was not found']))

        res.json(makeSuccessResponse(user))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}