const sequelize = require('sequelize')
const connection = require('./connection')


const card = connection.define("card", {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    type: {
        type: sequelize.STRING,
        allowNull: true
    },
    image: {
        type: sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: true
    },
    attack: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    defense: {
        type: sequelize.DECIMAL,
        allowNull: false
    }
})

//card.sync({ force: true })

module.exports = card;