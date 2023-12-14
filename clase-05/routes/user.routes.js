const apicache = require('apicache')
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/user.controller')
const { validateMongoId } = require('../middlewares/common.middleware')
const { validateUserData } = require('../middlewares/user.middlewares')

let cache = apicache.middleware

const userRouter = require('express').Router()

userRouter.get('/', cache('5 minutes'), getAllUsers)
userRouter.post('/', validateUserData, createUser)

userRouter.get('/:id', validateMongoId, getUserById)
userRouter.patch('/:id', validateMongoId, updateUser)
userRouter.delete('/:id', validateMongoId, deleteUser)

module.exports = userRouter