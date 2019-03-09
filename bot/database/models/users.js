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
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		voicexp: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		textlevel: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		voicelevel: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		rep: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		repdaily: {
			type: DataTypes.REAL()
		},
		credits: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		daily: {
			type: DataTypes.REAL()
		},
		ptitle: {
			type: DataTypes.TEXT(),
			defaultValue: 'I like cheese.'
		},
		pcolor: {
			type: DataTypes.TEXT(),
			defaultValue: '#000'
		},
		blimit: {
			type: DataTypes.REAL()
		},
		klimit: {
			type: DataTypes.REAL()
		},
		mlimit: {
			type: DataTypes.REAL()
		},
		bans: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		kicks: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		},
		mutes: {
			type: DataTypes.INTEGER(),
			defaultValue: 0
		}
	}, {
		timestamps: false,
		indexes: [
			{ fields: ['id'], unique: true }
		]
	});
