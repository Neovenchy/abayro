const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { randomNumber: randomDaily } = require('../../util/Util');
const { find, update, increase } = require('../../database/Users');
const moment = require('moment');

class DailyCommand extends Command {
	constructor() {
		super('daily', {
			aliases: ['daily'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Get your daily credits',
				examples: ['', '354716386716811264', '@NourEliden'],
				usage: ['[user]']
			}
		});
	}

	async exec(message) {
		const cooldown = 8.64e+7;
		const daily = await find(message.author.id, 'daily', null);
		const time = cooldown - (Date.now() - daily);

		if (daily !== null && time > 0) {
			return message.channel.send(`${emojis.info} **| ${message.author.username}**, You can get another **daily pounds** in **${moment.duration(1, 'days').format()}`);
		}

		const dailyAmount = randomDaily(100, 300);
		await update(message.author.id, 'daily', Date.now());
		await increase(message.author.id, 'credits', dailyAmount);
		return message.channel.send(`${emojis.pound}**| ${message.author.username}**, You received your **${dailyAmount}** daily pounds!`);
	}
}

module.exports = DailyCommand;
