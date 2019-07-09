const { RichEmbed } = require('discord.js');
const { colors } = require('../util/Constants');

class Embed extends RichEmbed {
	/**
	 * @param {object} options
	 * @param {colors} options.color
	 *  */
	constructor(color = colors.default) {
		super();
		this.setColor(color); // default color
	}
}

module.exports = Embed;
