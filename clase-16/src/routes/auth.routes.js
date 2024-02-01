const authRouter = require('express').Router()
const passport = require('passport');
const db = require('../models')

authRouter.get('/needs-login', (req, res) => {
    res.json({ data: null, error: 'Necesita iniciar sesion' })
})

// Local Auth
authRouter.post('/local/register-as-dt', async (req, res) => {
    const { username, email, password, fullname } = req.body

    const t = await db.sequelize.transaction()

    try {
        const exist = await db.Users.findOne({ where: { email } })

        if (exist && exist.local)
            throw new Error('Email ya ocupado')

        if (exist && exist.local === false)
            throw new Error('Email ya ocupado por un servicio de tercero')

        const director = await db.Directors.create({
            fullname
        }, { transaction: t })

        const user = await db.Users.create({
            email,
            username,
            password,
            local: true,
            directorId: director.id
        }, { transaction: t });

        await t.commit()

        res.json({ data: { user, director }, error: null })
    } catch (err) {
        console.log(err)
        await t.rollback()
        res.json({ data: null, error: err.message })
    }
})

authRouter.post('/local/register-as-player', async (req, res) => {
    const { username, email, password, fullname, mainFoot, basePrice } = req.body

    const t = await db.sequelize.transaction()

    try {
        const exist = await db.Users.findOne({ where: { email } })

        if (exist && exist.local)
            throw new Error('Email ya ocupado')

        if (exist && exist.local === false)
            throw new Error('Email ya ocupado por un servicio de tercero')

        const player = await db.Players.create({
            fullname,
            mainFoot,
            basePrice
        }, { transaction: t })

        const user = await db.Users.create({
            email,
            username,
            password,
            local: true,
            playerId: player.id
        }, { transaction: t });

        await t.commit()

        res.json({ data: { user, player }, error: null })
    } catch (err) {
        console.log(err)
        await t.rollback()
        res.json({ data: null, error: err.message })
    }
})

authRouter.get('/local/failure', (req, res) => res.json({ data: null, error: 'El inicio de sesion fallo - LOCAL' }));
authRouter.get('/local/success', (req, res) => res.json({ data: null, error: 'El inicio de sesion fue exitoso - LOCAL' }));

authRouter.post('/local/login', passport.authenticate('local', {
    successRedirect: '/api/auth/local/success',
    failureRedirect: '/api/auth/local/failure'
}));

// Google Auth
// authRouter.get('/google/failure', (req, res) => res.json({ data: null, error: 'El inicio de sesion fallo' }));

// authRouter.get('/google', passport.authenticate(
//     'google',
//     {
//         scope: ['email', 'profile']
//     }
// ));

// authRouter.get('/google/callback', passport.authenticate(
//     'google',
//     {
//         successRedirect: '/api/user',
//         failureRedirect: '/api/auth/google/failure'
//     }
// ));

// Github Auth
authRouter.get('/github/failure', (req, res) => res.json({ data: null, error: 'El inicio de sesion fallo - GITHUB' }));
authRouter.get('/github/success', (req, res) => res.json({ data: null, error: 'El inicio de sesion fue exitoso - GITHUB' }));

authRouter.get('/github', passport.authenticate('github'))

authRouter.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api/auth/github/failure',
        successRedirect: '/api/auth/github/success',
    })
)

// Close Session
authRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({ data: null, error: 'No se pudo cerrar la sesion' })
            } else {
                res.json({ data: 'Cierre de sesion exitoso', error: null })
            }
        });
    } else {
        res.json({ data: null, error: 'No hay una sesion activa' })
    }
})

module.exports = authRouter