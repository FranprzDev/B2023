const dotenv = require('dotenv')
dotenv.config()

const SERVER_CONFIG = {
    PORT: process.env.SERVER_PORT || 3000
}

const MONGO_CONFIG = {
    URI: process.env.MONGO_URI || ''
}

module.exports = {
    SERVER_CONFIG,
    MONGO_CONFIG
}