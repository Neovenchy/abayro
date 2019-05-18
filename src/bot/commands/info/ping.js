const { Command } = require('discord-akairo');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'info',
			channelRestriction: 'guild',
			description: {
				content: 'Shows the bot ping.'
			}
		});
	}

	/**
     *
     * @param {import('discord.js').Message} message
     */
	async exec(message) {
		const msg = await message.channel.send(`Pinging...`);
		return msg.edit(`• **Latency**: \`${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp).toString()}ms\`\n • **API**: \`${this.client.ping.toFixed(0)}ms\``);
	}
}

module.exports = PingCommand;
