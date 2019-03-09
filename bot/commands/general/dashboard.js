const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');

class DashboardCommand extends Command {
	constructor() {
		super('dashboard', {
			aliases: ['dashboard', 'dash'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'general',
			channelRestriction: 'guild',
			description: {
				content: 'To see your server control-panel'

			},
			args: [{
				'id': 'guild',
				'type': 'guild',
				'default': message => message.guild
			}]
		});
	}

	/**
 * @param {import('discord.js').Message} message
 */
	exec(message, { guild }) {
		if (!guild) {
			if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD') || message.guild.member(message.author.id) === message.guild.owner.id) return message.channel.send(`${emojis.no}**|** You need to **have** \`MANAGE_GUILD\` **permission** in **${message.guild.name}**.`);
			message.channel.send(`${emojis.info}**|** You can **control** ${message.guild.name} from this **link**:\nhttps://abayro.xyz/guilds/${message.guild.id}/manage`);
		} else if (guild) {
			if (guild.members.get(message.author.id)) {
				if (!guild.member(message.author).hasPermission('MANAGE_GUILD') || guild.member(message.author.id) === guild.owner.id) return message.channel.send(`${emojis.no}**|** You need to **have** \`MANAGE_GUILD\` **permission** in the **selected server** ( **${message.guild.name}** ).`);
				message.channel.send(`${emojis.info}**|** You can **control** ${guild.name} from this **link**:\nhttps://abayro.xyz/guilds/${guild.id}/manage`);
			} else if (!guild.members.get(message.author.id)) {
				message.channel.send(`${emojis.no}**|** You are not in **${guild.name}**.`);
			}
		}
	}
}
module.exports = DashboardCommand;
