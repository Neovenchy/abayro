const { resolve } = require('path');

exports.assets = path => resolve(__dirname, '..', 'assets', path);

exports.library = {
	version: require('../../../package').version,
	node: process.version,
	dj: require('discord.js').version
};

exports.staff = [
	'171259176029257728',
	'556036680352792596',
	'168375981050953728'
];

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


exports.colors = {
	'RED': 0xDC143C,
	'default': 0xaab2ff
};
