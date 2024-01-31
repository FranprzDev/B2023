const LocalStrategy = require('passport-local')
const GitHubStrategy = require('passport-github')
const db = require('../models')
require('dotenv').config()

// La respuesta del inicio de sesion
const serializeUser = function (user, cb) {
    cb(null, user.id);
}

// Interpretacion de un usuario ya logueado
const deserializeUser = async function (id, cb) {
    try {
        const user = await db.Users.findByPk(id);
        cb(null, {
            id: user.id,
            username: user.username,
            email: user.email,
            local: user.local,
            googleId: user.googleId,
            githubId: user.githubId
        });
    } catch (error) {
        cb(error);
    }
}

// done(error, valor falso, mensaje que acompaña al error) // caso incorrecto
// done(error, valor verdarero) // caso correcto

const localStrategy = new LocalStrategy(async (username, password, done) => {
    // logica de inicio sesion a travez de usuario y contraseña

    // buscar el usuario
    const user = await db.Users.findOne({ where: { username } });

    // el usuario no existe -> se devuelve mensaje de error
    if (!user) return done(null, false, { message: 'Credenciales invalidas.' });

    // la pass no coincide -> se devuelve mensaje de error
    if (user?.password !== password) return done(null, false, { message: 'Credenciales Invalidas.' });

    // se devuelve el resultado correcto
    return done(null, user);
})

const githubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        callbackURL: "http://localhost:3000/api/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // busca el usuario que inicio sesion en github
            const exist = await db.Users.findOne({ where: { email: profile.emails[0].value } })

            // si existe en local o tiene un googleId -> ya se creo cuenta con otro metodo
            if (exist && (exist.local || exist.googleId)) return done(null, false, { message: 'Ya tiene una cuenta con otro servicio' })

            // si existe pero ya creo cuenta con el mismo github -> inicia ok pero con la cuenta ya creada
            if (exist && exist.githubId) return done(null, exist)

            // Si no existia previamente creamos una cuenta
            const user = await db.Users.create({
                email: profile.emails[0].value,
                githubId: profile.id,
                local: false
            });

            // todo ok devolvemos el usuario nuevo
            done(null, user)
        } catch (err) {
            console.log(err)
            // Error devolvemos un falso con un mensaje
            done(null, false, { message: 'No se pudo iniciar sesion' })
        }
    }
)

module.exports = {
    serializeUser,
    deserializeUser,
    localStrategy,
    githubStrategy
}