const { isDirector } = require('../middlewares/auth.middlewares');
const db = require('../models');

const dtRouter = require('express').Router()

dtRouter.get('/', isDirector, (req, res) => {
    res.json({ message: 'eres un director' });
});

dtRouter.post('/buy-player', isDirector, async (req, res) => {
    const { playerId } = req.body
    const { directorId } = req.user
    const t = await db.sequelize.transaction()

    try {
        const director = await db.Directors.findByPk(directorId, { transaction: t })
        const player = await db.Players.findByPk(playerId, { transaction: t })

        // verificar si el dt es propietario del jugador
        // if (player.directorId) throw new Error('Ya fue comprado por alguien mas')

        const totalPrice = player.basePrice * player.stars
        const money = parseFloat(director.money)

        if (totalPrice > money) throw new Error('Fondos insuficientes')

        director.money = money - totalPrice
        player.directorId = director.id

        await director.save({ transaction: t })
        await player.save({ transaction: t })

        t.commit()
        res.json({ director, player })
    } catch (err) {
        console.log(err)
        await t.rollback()
        res.json({ data: null, error: err.message })
    }
});

// dtRouter.patch('/patch-stars', (req, res) => {
//     if (!req.isAuthenticated()) return res.json({ message: 'Inicia sesion' })
//     if (!req.user.isDirector) return res.json({ message: 'URL PERMITIDA SOLO A DIRECTORES' })

//     res.json({ message: 'eres un director' });
// });

module.exports = dtRouter