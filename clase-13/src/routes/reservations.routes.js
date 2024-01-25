const reservationRouter = require('express').Router()
const { verifyJWTAsCustomer, verifyJWT } = require('../middlewares/auth.middlewares')
const db = require('../models')

reservationRouter.get('/', verifyJWT, async (req, res) => {
    const reservations = await db.Reservations.findAll()

    res.json({ reservations })
})

reservationRouter.post('/', verifyJWT, async (req, res) => {
    const { hostId, tableId, quantity, date } = req.body

    const table = await db.Tables.findByPk(tableId)

    if (table === null) return res.status(400).json({ message: 'La mesa no existe' })

    if (quantity > table.quantity) return res.status(400).json({ message: 'La mesa no tiene dicha capacidad' })

    // TODO: si la fecha es menor a las proximas 48 no se debe realizar una reserva
    // TODO: validar si la mesa en esa fecha esta disponible

    const host = await db.Hosts.findByPk(hostId)

    if (host === null) return res.status(400).json({ message: 'El anfitrion no esta cargado' })

    const reservation = await db.Reservations.create({ hostId, tableId, quantity, date })

    res.json({ reservation })
})

reservationRouter.put('/', verifyJWTAsCustomer, async (req, res) => {
    const { reservationId, newTableId, quantity, date, fakeError } = req.body

    const t = await db.sequelize.transaction()

    try {
        const reservation = await db.Reservations.findByPk(reservationId, { transaction: t })

        if (reservation === null) throw new Error('La reservacion no existe')

        const newReservation =
            await db.Reservations.create(
                { hostId: reservation.hostId, tableId: newTableId, quantity, date },
                { transaction: t }
            )

        await reservation.destroy({ transaction: t })

        if (fakeError) throw new Error('Falla manual')

        await t.commit()

        res.json({ newReservation, lastReservation: reservation })
    } catch (error) {
        console.log(error)

        await t.rollback()
    }
})

module.exports = reservationRouter