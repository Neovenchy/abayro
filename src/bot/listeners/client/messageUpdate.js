const { Listener } = require('discord-akairo');
const Embed = require('../../util/Embed');


class messageUpdateListener extends Listener {
	constructor() {
		super('messageUpdate', {
			emitter: 'client',
			eventName: 'messageUpdate',
			category: 'client'
		});
	}

	/** @param {import('discord.js').Message} message */
	exec(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;
		if (!oldMessage.content) return;
		const logschannel = this.client.settings.get(oldMessage.guild, 'logs', undefined) && `${this.client.settings.get(oldMessage.guild, 'logsChannel', undefined)}`;

		if (!logschannel) return;

		const channel = oldMessage.guild.channels.get(logschannel);

		if (!channel) return;

		const embed = new Embed({})
			.setColor(0xDC143C)
			.setAuthor('Message Edited', 'https://i.imgur.com/K1irEVh.png')
			.setThumbnail(oldMessage.author.displayAvatarURL)
			.addField('❯ User', `${oldMessage.author.tag} (${oldMessage.author.id}) `, true)
			.addField('❯ Channel', oldMessage.channel, true)
			.addField('❯ Old Message', `**${oldMessage.content.substring(0, 1020)}**`, true)
			.addField('❯ New Message', `**${newMessage.content.substring(0, 1020)}**`, true)
			.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
			.setTimestamp();

		return channel.send(embed);
	}
}

module.exports = messageUpdateListener;
