const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
class SprefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Sets the bot prefix in the guild.'
			},
			args: [{
				id: 'newPrefix',
				match: 'word',
				index: 0
			}]
		});
	}

	 exec(message, { newPrefix }) {
		if (newPrefix) {
			if (newPrefix.length > 5) return message.channel.send(`${emojis.no}**| ${message.author.username}**, The **prefix** must be between **1** to **5** letters.`);
			this.client.settings.set(message.guild.id, 'prefix', newPrefix);
			return message.channel.send(`${emojis.yes}**| ${message.author.username}**, My **prefix** has been **changed** to: \`${newPrefix.toLowerCase()}\``);
		}
		return message.channel.send(`${emojis.info}**| ${message.author.username}**, Current **prefix** for **${message.guild.name}** is: \`\`${this.handler.prefix(message)}\`\`\nUse \`${this.handler.prefix(message)}prefix [new prefix]\` to set a **new prefix**.`);
	}
}


module.exports = SprefixCommand;
