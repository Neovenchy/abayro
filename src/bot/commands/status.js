const { Command } = require('discord-akairo');
const {Message} = require('discord.js'); //eslint-disable-line
const { emojis } = require('../util/Constants');

class StatusCommand extends Command {
	constructor() {
		super('status', {
			aliases: ['status', 'setstatus'],
			ownerOnly: true,
			args: [
				{
					id: 'status',
					index: 0
				},
				{
					id: 'text',
					match: 'rest'
				}
			]
		});
	}

	/**
     *
     * @param {Message} message
     */
	exec(message, { status, text }) {
		if ((!status && text) || (status === 'playing' && text)) {
			return this.client.user.setActivity(text, { type: 'PLAYING' });
		} else if (status === 'listening' && text) {
			return this.client.user.setActivity(text, { type: 'LISTENING' });
		} else if (status === 'watching' && text) {
			return this.client.user.setActivity(text, { type: 'WATCHING' });
		}
		return message.channel.send(`${emojis.no} | **Wrong** usage!`);
	}
}

module.exports = StatusCommand;
