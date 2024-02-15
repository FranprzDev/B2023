const todoRouter = require('express').Router()

todoRouter.get('/', (req, res) => {})
todoRouter.post('/', (req, res) => {})
todoRouter.get('/:id', (req, res) => {})
todoRouter.update('/:id', (req, res) => {})
todoRouter.delete('/:id', (req, res) => {})

module.exports = todoRouter