const { Command } = require('discord-akairo');
const { emojis: { yes, no } } = require('../../util/Constants');
class mutecCommand extends Command {
	constructor() {
		super('mutec', {
			aliases: ['mutec'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Lock the message channel.'

			},
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions(message) {
				return message.member.roles.has(this.client.settings.get(message.guild, 'modrole')) || message.member.hasPermission('MANAGE_CHANNELS');
		   }
		});
	}

	exec(message) {
		message.channel.overwritePermissions(message.guild.id, {
			SEND_MESSAGES: false
		}).then(() => {
			message.channel.send(`${yes} | Channel **locked**`);
		}).catch(error => {
			message.channel.send(`${no} | **Failed** to lock the channel.\n**Error:**${error}`);
		});
	}
}


module.exports = mutecCommand;
