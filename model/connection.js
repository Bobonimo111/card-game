const Sequelize = require('sequelize')


const connetion = new Sequelize("cardgamedb", "root", "2023MySQL", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = connetion;