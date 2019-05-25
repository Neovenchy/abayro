const { Sequelize } = require('sequelize');
const { join } = require('path');

const sequelize = new Sequelize(process.env.DATABASE, {
	host: 'localhost',
	dialect: 'postgres',
	logging: false
});

sequelize.import(join(__dirname, '..', 'database', 'models', 'users'));
sequelize.import(join(__dirname, '..', 'database', 'models', 'settings'));
sequelize.import(join(__dirname, '..', 'database', 'models', 'cases'));

sequelize.sync();

module.exports = sequelize;
