const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			eventName: 'message',
			category: 'client'
		});
	}

	/**
     * @param { import('discord.js').Message } message
     */
	exec(message) {
		if (!message.guild || message.author.bot) return;
		// if (this.client.settings.get(message.guild.id, 'mediast', 'off') === 'on') {}
	}
}

module.exports = MessageListener;
