const { Listener } = require('discord-akairo');
const Embed = require('../../util/Embed');


class messageDeleteListener extends Listener {
	constructor() {
		super('messageDelete', {
			emitter: 'client',
			eventName: 'messageDelete',
			category: 'client'
		});
	}

	/** @param {import('discord.js').Message} message */
	exec(message) {
		if (message.author.bot) return;
		if (!message.content) return;
		const channel = this.client.settings.get(message.guild, 'logs', undefined) && `${this.client.settings.get(message.guild, 'logschnl', undefined)}`;
		if (!channel) return;

		const embed = new Embed()
			.setColor(0xDC143C)
			.setAuthor('Message Delete', 'https://i.imgur.com/EUGvQJJ.png')
			.setThumbnail(message.author.displayAvatarURL)
			.addField('❯ User', `${message.author.tag} (${message.author.id})`, true)
			.addField('❯ Channel', message.channel, true)
			.addField('❯ Message', `**${message.content.substring(0, 1020)}**`)
			.setFooter(message.guild.name, message.guild.iconURL)
			.setTimestamp();

		return message.guild.channels.get(channel).send(embed);
	}
}

module.exports = messageDeleteListener;
