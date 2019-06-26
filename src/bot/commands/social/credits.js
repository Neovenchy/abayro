const { Command } = require('discord-akairo');
const { emojis } = require('../../util/Constants');
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
				'id': 'member',
				'type': 'member',
				'default': message => message.member
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
	 */
	async exec(message, { member, transferamount }) {
		if (member.user.bot) return message.channel.send(`${emojis.no}** | Bots** do not have **pounds**.`);
		if (transferamount) return this.handler.modules.get('transfer').exec(message, { member, transferamount }, false);
		const credits = await find(member.id, 'credits', '0');
		return message.channel.send(`${emojis.pound} **|** ${member.id === message.author.id ? `${message.author.username}, Your` : `${member.nickname}'s`} **pounds** balance is £${credits}`);
	}
}


module.exports = CreditsCommand;
