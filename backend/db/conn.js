//db/conn.js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('TLclock', 'root', 'sucesso', {
    host: 'localhost',
    dialect: 'mysql',
     //não copiar
})

try {
    sequelize.authenticate()
    console.log('Conectado ao banco!')
} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize