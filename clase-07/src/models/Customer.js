const { Schema } = require("mongoose");
const User = require("./User");

const Customer = User.discriminator('Customer', new Schema({}))

module.exports = Customer