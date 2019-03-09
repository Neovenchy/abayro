const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const NekoClient = require('nekos.life');
const { sfw } = new NekoClient();

class TickleCommand extends Command {
	constructor() {
		super('tickle', {
			aliases: ['tickle'],
			cooldown: 5000,
			ratelimit: 3,
			category: 'action',
			channelRestriction: 'guild',
			description: {
				content: 'Tickles the specified user/users.',
				examples: ['@Abady', '@Abady @NourEldien'],
				usage: '@user1 / @user2 ...'
			}
		});
	}

	async exec(message) {
		const { users } = message.mentions;
		if (users.size < 1) return message.channel.send(`${emojis.no} | **You need to mention a user/users**.`);
		if (users.first().bot) return message.channel.send(`${emojis.no} | **You can't do that to bots**.`);
		const { url } = await sfw.tickle();
		if (users.first().id === message.author.id) return message.channel.send(`*${this.id} you*`, { files: [url] });
		return message.channel.send(`💬 **${users.map(user => user.username).join(' ')}** you have been ${this.id}d by **${message.author.username}**`, { files: [url] });
	}
}
module.exports = TickleCommand;
