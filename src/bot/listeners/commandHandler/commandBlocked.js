const { Listener } = require('discord-akairo');
const { emojis } = require('../../struct/bot');

class CommandBlocked extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			eventName: 'commandBlocked',
			category: 'commandHandler'
		});
	}

	/**
	 *
	 * @param {import('discord.js').Message} message
	 * @param {import('discord-akairo').Command} command
	 * @param {string} reason
	 */
	exec(message, command, reason) {
		if (reason === 'clientPermissions' || 'userPermissions') {
			return message.channel.send(`${emojis.no} ${reason === 'clientPermissions' ? 'I' : 'You'} don't have ${command.clientPermissions.length === 1 ? 'this permission' : 'these permissions'} to run **${command.id}**\n ❯ **${command.clientPermissions}**`);
		}
		this.client.logger.info(reason);
	}
}

module.exports = CommandBlocked;
