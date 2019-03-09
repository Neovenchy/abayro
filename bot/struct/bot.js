require('dotenv').config();
const { version } = require('../../package.json');
const { version: djsVersion } = require('discord.js');
const { resolve } = require('path');

exports.library = {
	version,
	node: process.version,
	dj: djsVersion
};

exports.staff = ['171259176029257728', '354716386716811264'];

exports.emojis = {
	yes: ':white_check_mark:',
	no: ':negative_squared_cross_mark:',
	info: ':information_source:',
	pound: ':pound:',
	youtube: ':red_circle:',
	spotify: ':musical_score:',
	apple: ':apple:'
};

exports.channels = {
	error: '552847958190718977',
	logs: '552847960782929945'
};

// exports.prefix = process.env.PREFIX.split(',');

exports.assets = path => resolve(__dirname, '..', 'assets', path);

exports.tokens = {
	discord: process.env.TOKEN,
	youtube: process.env.YOUTUBE,
	dbl: process.env.DBL
};
