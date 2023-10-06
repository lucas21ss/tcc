//User.js
const { DataTypes } = require('sequelize')
const Relogio = require('./Relogio')

const db = require('../db/conn.js')

const RelogioImagem = db.define('RelogioImagem', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


Relogio.hasMany(RelogioImagem)
RelogioImagem.belongsTo(Relogio)


module.exports = RelogioImagem