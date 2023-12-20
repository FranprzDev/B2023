require('dotenv').config()

module.exports = {
    SERVER_CONFIG: {
        PORT: process.env.SERVER_PORT || 3000
    },
    MONGO_CONFIG: {
        URI: process.env.MONGO_URI || ''
    }
}