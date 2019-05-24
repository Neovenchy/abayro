const { Command } = require('discord-akairo');
const { emojis: { yes, no } } = require('../../struct/bot');
class mutecCommand extends Command {
	constructor() {
		super('mutec', {
			aliases: ['mutec'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Lock the message channel'

			},
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions(message) {
				if (message.member.roles.some(role => this.client.settings.get(message.guild.id, 'modrole') === role.name) || message.member.hasPermission('MANAGE_CHANNELS')) return true;
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
