/* eslint-disable new-cap */
/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) =>
	sequelize.define('users', {
		id: {
			type: DataTypes.STRING(25),
			primaryKey: true,
			allowNull: false
		},
		textxp: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		voicexp: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		textlevel: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		voicelevel: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		rep: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		repdaily: {
			type: DataTypes.REAL
		},
		credits: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		daily: {
			type: DataTypes.REAL
		},
		ptitle: {
			type: DataTypes.TEXT,
			defaultValue: 'I like cheese.'
		},
		pcolor: {
			type: DataTypes.TEXT,
			defaultValue: '#007fff'
		},
		textupdatedAt: {
			type: DataTypes.DATE
		},
		voiceupdatedAt: {
			type: DataTypes.DATE
		}
	}, {
		timestamps: false,
		indexes: [
			{ fields: ['id'], unique: true }
		]
	});
