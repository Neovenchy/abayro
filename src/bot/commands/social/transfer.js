const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { increase, decrease, find } = require('../../database/Users');

class TransferCommand extends Command {
	constructor() {
		super('transfer', {
			aliases: ['transfer'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Transfers credits to other users',
				examples: ['', '354716386716811264', '@NourEliden'],
				usage: ['[user]']
			},
			args: [
				{
					id: 'user',
					type: 'user',
					// prompt: {
					// 	start: 'Who should I transfer to?',
					// 	retry: `${emojis.no} | **That's not a member**`
					// },
					index: 0
				},
				{
					id: 'transferamount',
					type: 'number',
					// prompt: {
					// 	start: 'Type the credits you want to transfer',
					// 	retry: `${emojis.no} | **That's not a correct amount**`
					// },
					index: 1
				}
			]
		});
	}

	async exec(message, { user, transferamount }) {
		const currentCredits = await find(message.author.id, 'credits', 0);
		if (!user) return message.channel.send(`${emojis.no} | Not a vaild member.`);
		if (!transferamount || transferamount <= 0) return message.channel.send(`${emojis.no} | Not a vaild amount.`);
		if (transferamount > currentCredits) return message.channel.send(`${emojis.no} | You don't have enough money.`);
		transferamount = Math.floor(transferamount);
		increase(user.id, 'credits', transferamount);
		decrease(message.author.id, 'credits', transferamount);
		return message.channel.send(`${emojis.yes} | Transferred ${transferamount} to ${user} sucessfully.`);
	}
}


module.exports = TransferCommand;
