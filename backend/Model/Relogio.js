//User.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn.js')
const User = require('./User')
const Relogio = db.define('Relogio', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tamanho: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comprar: {
        type: DataTypes.STRING,
        allowNull: false
    },


   
})

User.hasMany(Relogio)
Relogio.belongsTo(User)

module.exports = Relogio