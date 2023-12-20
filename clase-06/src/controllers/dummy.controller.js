const Dummy = require('../model/Dummy')
const Product = require('../model/Product')
const { v4 } = require('uuid')

const getDummyData = async (req, res) => {
    const {
        name,
        description,
        price,
        quantity,
        createdAt
    } = req.query

    const UUID = v4()
    console.log(UUID)
    const date = createdAt !== undefined ? new Date(createdAt) : undefined

    try {
        const product = new Product({
            name,
            description,
            price,
            createdAt: date,
            quantity,
            publicUUID: UUID
        })
        await product.save()
        res.json(product)
    } catch (err) {
        console.log(err)
        res.json({ message: 'Error' })
    }
}

module.exports = {
    getDummyData
}