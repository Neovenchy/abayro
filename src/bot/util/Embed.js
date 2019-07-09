const { RichEmbed } = require('discord.js');
const { colors } = require('../util/Constants');

class Embed extends RichEmbed {
	/**
	 * @param {object} options
	 * @param {colors} options.color
	 *  */
	constructor(options) {
		super();
		this.setColor(colors[options.color] || colors.default); // default color
	}
}

module.exports = Embed;
