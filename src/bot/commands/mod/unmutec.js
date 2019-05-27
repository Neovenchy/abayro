const { Command } = require('discord-akairo');
const { emojis: { yes, no } } = require('../../struct/bot');
class unmutecCommand extends Command {
	constructor() {
		super('unmutec', {
			aliases: ['unmutec'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Unlock the message channel.'

			},
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions(message) {
				return message.member.roles.has(this.client.settings.get(message.guild, 'modrole')) || message.member.hasPermission('MANAGE_CHANNELS');
		   }
		});
	}

	exec(message) {
		message.channel.overwritePermissions(message.guild.id, {
			SEND_MESSAGES: true

		}).then(() => {
			message.channel.send(`${yes} | **Channel unlocked**.`);
		}).catch(error => {
			message.channel.send(`${no} | **Failed** to unlock the channel.\n**Error:**${error}`);
		});
	}
}


module.exports = unmutecCommand;
