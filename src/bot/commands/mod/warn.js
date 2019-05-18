const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');

class WarnCommand extends Command {
	constructor() {
		super('warn', {
			aliases: ['warn'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Warns a member',
				usage: '@user',
				examples: [`@Abady`, `171259176029257728`, 'Abady']
			},
			args: [
				{
					id: 'member',
					type: (arg, msg) => {
						if (!arg) return ' ';
						const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg;
						return member || null;
					}
				}
			],
			clientPermissions: ['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_ROLES'],
			userPermissions: ['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_ROLES']
		});
	}

	/**
 * @param {import('discord.js').Message} message
 */
	exec(message, { member }) {
		if (member === ' ') return message.channel.send(`${emojis.no} | Please type a member to ban.`);
		if (!member) return message.channel.send(`${emojis.no} | I couldn't find that member.`);
	}
}

module.exports = WarnCommand;
