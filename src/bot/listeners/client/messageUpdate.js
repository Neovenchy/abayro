const { Listener } = require('discord-akairo');
const Embed = require('../../util/Embed');


class messageUpdateListener extends Listener {
	constructor() {
		super('messageDelete', {
			emitter: 'client',
			eventName: 'messageUpdate',
			category: 'client'
		});
	}

	/** @param {import('discord.js').Message} message */
	exec(message) {
		if (message.author.bot) return;
		if (!message.content) return;
		const logschannel = this.client.settings.get(message.guild, 'logs', undefined) && `${this.client.settings.get(message.guild, 'logsChannel', undefined)}`;

		if (!logschannel) return;

		const channel = message.guild.channels.get(logschannel);

		if (!channel) return;

		const embed = new Embed()
			.setColor(0xDC143C)
			.setAuthor('Message Edited', 'https://i.imgur.com/EUGvQJJ.png')
			.setThumbnail(message.author.displayAvatarURL)
			.addField('❯ User', `${message.author.tag} (${message.author.id}) `, true)
			.addField('❯ Channel', message.channel, true)
			.addField('❯ Old Message', `**${message.content.substring(0, 1020)}**`, true)
			.addField('❯ New Message', `**${message.content.substring(0, 1020)}**`, true)
			.setFooter(message.guild.name, message.guild.iconURL)
			.setTimestamp();

		return channel.send(embed);
	}
}

module.exports = messageUpdateListener;
