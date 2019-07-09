const { RichEmbed } = require('discord.js');
const { colors } = require('../util/Constants');

class Embed extends RichEmbed {
	/**
	 * @param {object} options
	 * @param {colors} options.color
	 *  */
	constructor(color) {
		super();
		this.setColor(color || colors.default); // default color
	}
}

module.exports = Embed;
