const isDirector = (req, res, next) => {
    if (!req.isAuthenticated()) return res.json({ message: 'Inicia sesion' })
    if (!req.user.directorId) return res.json({ message: 'URL PERMITIDA SOLO A DIRECTORES' })

    next()
}

const isPlayer = (req, res, next) => {
    if (!req.isAuthenticated()) return res.json({ message: 'Inicia sesion' })
    if (!req.user.playerId) return res.json({ message: 'URL PERMITIDA SOLO A PLAYERS' })

    next()
}

module.exports = {
    isPlayer,
    isDirector
}