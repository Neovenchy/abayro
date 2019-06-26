const { Command } = require('discord-akairo');
const { emojis } = require('../../util/Constants');

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
			userPermissions: ['MANAGE_GUILD']
		});
	}

	/**
 * @param {import('discord.js').Message} message
 */
	exec(message) {
		return message.channel.send(`${emojis.info} **|** You can **control** ${message.guild.name} from this **link**:\nhttps://abayro.xyz/guilds/${message.guild.id}/manage`);
	}
}
module.exports = DashboardCommand;
