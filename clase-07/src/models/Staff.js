const { Schema } = require("mongoose");
const User = require("./User");

const Staff = User.discriminator('Staff', new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    }
}))

module.exports = Staff