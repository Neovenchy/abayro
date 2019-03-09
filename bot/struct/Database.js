const Sequelize = require('sequelize');
const { join } = require('path');

const sequelize = new Sequelize(process.env.DATABASE, {
	host: 'localhost',
	dialect: 'postgres',
	logging: false,
	operatorsAliases: false
});

sequelize.import(join(__dirname, '..', 'database', 'models', 'users'));
sequelize.import(join(__dirname, '..', 'database', 'models', 'settings'));

// TODO: AMAZING >>>> sequelize.model('users').sync({ force: true })
sequelize.sync({ alter: true });

module.exports = sequelize;
