const { isPlayer } = require('../middlewares/auth.middlewares');
const db = require('../models');

const playerRouter = require('express').Router()

playerRouter.get('/', isPlayer, async (req, res) => {
    try {
        const player = await db.Players.findByPk(req.user.playerId)
        res.json(player);
    } catch (err) {
        res.json(err.message)
    }
});

module.exports = playerRouter