const { Command } = require('discord-akairo');
const { emojis } = require('../../util/Constants');
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
					id: 'member',
					type: 'member',
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

	async exec(message, { member, transferamount }) {
		const currentCredits = await find(message.author.id, 'credits', 0);
		if (!member) return message.channel.send(`${emojis.no} | Not a vaild member.`);
		if (member.id === message.author.id) return message.channel.send(`${emojis.no} | I'am not that dumb.`);
		if (!transferamount || transferamount <= 0) return message.channel.send(`${emojis.no} | Not a vaild amount.`);
		if (transferamount > currentCredits) return message.channel.send(`${emojis.no} | You don't have enough money.`);
		transferamount = Math.floor(transferamount);
		increase(member.id, 'credits', transferamount);
		decrease(message.author.id, 'credits', transferamount);
		return message.channel.send(`${emojis.yes} | Transferred **${transferamount}** to ${member} successfully.`);
	}
}


module.exports = TransferCommand;
