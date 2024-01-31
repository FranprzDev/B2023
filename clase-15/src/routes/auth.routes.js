const authRouter = require('express').Router()
const passport = require('passport');
const db = require('../models')

authRouter.get('/needs-login', (req, res) => {
    res.json({ data: null, error: 'Necesita iniciar sesion' })
})

// Local Auth
authRouter.post('/local/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        const exist = await db.Users.findOne({ where: { email } })

        if (exist && exist.username) return res.json({ message: 'Ya tiene email' })

        if (exist && !exist.username) {
            exist.username = username
            exist.password = password
            await exist.save()
            return res.json({ message: 'Ya tenias una cuenta pero la unificamos' })
        }

        const user = await db.Users.create({
            email,
            username,
            password,
            local: true,
        });

        res.json({ data: `Usuario ${user.username} creado`, error: null })
    } catch (err) {
        console.log(err)
        res.json({ data: null, error: 'No se pudo crear el usuario' })
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