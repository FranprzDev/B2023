const userRouter = require('express').Router()

userRouter.get('/', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/api/auth/needs-login');

    res.json({ user: req.user });
});

userRouter.get('/bloqueada', (req, res) => {
    if (!req.isAuthenticated()) return res.json({ message: 'Esta pagina esta bloqueada, sal por favor!' })

    res.json({ message: 'Esta pagina esta bloqueada pero tenes la cookie' })
})

module.exports = userRouter