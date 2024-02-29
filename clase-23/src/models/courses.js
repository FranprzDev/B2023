'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Courses.init({
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        schedule: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        minimunQuote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maximunQuote: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Courses',
    })
    return Courses
}