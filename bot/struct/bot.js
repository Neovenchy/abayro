require('dotenv').config();
const { version } = require('../../package.json');
const { version: djsVersion } = require('discord.js');
const { resolve } = require('path');

exports.library = {
	version,
	node: process.version,
	dj: djsVersion
};

exports.staff = ['171259176029257728', '556036680352792596', '231956829159161856'];

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
	error: '579400044814401576',
	logs: '579400058416660500'
};

exports.assets = path => resolve(__dirname, '..', 'assets', path);

exports.tokens = {
	discord: process.env.TOKEN,
	youtube: process.env.YOUTUBE,
	dbl: process.env.DBL
};
