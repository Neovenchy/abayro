const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { find } = require('../../database/Users');

class CreditsCommand extends Command {
	constructor() {
		super('credit', {
			aliases: ['credit', 'credits', 'pounds', 'balance'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Shows your credit card balancce',
				examples: ['', '354716386716811264', '@NourEliden'],
				usage: ['[user]']
			},
			args: [{
				'id': 'user',
				'type': 'user',
				'default': message => message.author
			},
			{
				id: 'transferamount',
				type: 'string'
			}]
		});
	}

	/**
	 *
	 * @param {import('discord.js').Message} message
	 * @param {import('discord.js').User} [user={user}]
	 */
	async exec(message, { user, transferamount }) {
		if (user.bot) return message.channel.send(`${emojis.no}**| Bots** does not have **pounds**.`);
		if (transferamount) return this.handler.modules.get('transfer').exec(message, { user, transferamount }, false);
		const credits = await find(user.id, 'credits', '0');
		return message.channel.send(`${emojis.pound} **|** ${user.id === message.author.id ? `${message.author.username}, Your` : `${user.username}'s`} **pounds** balance is £${credits}`);
	}
}


module.exports = CreditsCommand;
