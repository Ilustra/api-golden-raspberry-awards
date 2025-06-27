const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Movie = sequelize.define("movie",{
    year:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }, 
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }, 
    studios:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    producers:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    winner:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Movie;