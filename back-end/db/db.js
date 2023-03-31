const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('**********', '*********', '***********', {
    host: '************',
    dialect: 'mysql'
});

sequelize.authenticate().then(response => console.log('Connection has been established successfully.')).catch(e => { throw e })

module.exports = sequelize