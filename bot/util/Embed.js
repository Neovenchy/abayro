const { RichEmbed } = require('discord.js');

class Embed extends RichEmbed {
	constructor() {
		super();
		this.setColor(3447003);
	}
	// modeartion(modUser, user) {
	// 	this.setAuthor(`${user.tag} (${user.id})`);
	// 	this.setFooter(`${modUser.tag} (${modUser.id})`);
	// }
}

module.exports = Embed;
