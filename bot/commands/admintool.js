const { Command } = require('discord-akairo');
const { increase, update } = require('../database/Users');
const { emojis } = require('../struct/bot');

class AdminToolCommand extends Command {
	constructor() {
		super('admintool', {
			aliases: ['admin'],
			cooldown: 1,
			ratelimit: 1,
			ownerOnly: true,
			args: [{
				id: 'method',
				type: ['increase', 'update', 'zero']
			},
			{
				id: 'typo',
				type: ['credits', 'textxp', 'voicexp', 'textlevel', 'voicelevel', 'rep'],
				index: 1
			},
			{
				id: 'user',
				type: 'user',
				index: 2
			},
			{
				id: 'amount',
				type: 'integer',
				index: 3
			}]
		});
	}

	async exec(message, { method, typo, user, amount }) {
		const prefix = this.client.commandHandler.prefix(message);
		if (!method) {
			return message.channel.send(`${emojis.info}**| ${message.author.username}**, Available **methods** are:
:white_small_square: ${prefix}admin increase [credits/xp/etc] [user] [ammount]
:white_small_square: ${prefix}admin update [credits/xp/etc] [user] [ammount]
:white_small_square: ${prefix}admin zero [credits/xp/etc] [user]`);
		} else if (method === 'increase') {
			if (!typo) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **type**.\n:white_small_square: **Available types**:\n- credits\n- textxp\n- voicexp\n- textlevel\n- voicelevel\n- rep.`);
			if (!user) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **user** to set the **type** you choosed.`);
			if (!amount) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **ammount** to set.`);
			await increase(user.id, typo, amount);
			message.channel.send(`${emojis.yes}**| ${message.author.username}**, I added/Increased \`${amount}\` **${typo}** to **${user.tag}**.`);
		} else if (method === 'update') {
			if (!typo) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **type**.\n:white_small_square: **Available types**:\n- credits\n- textxp\n- voicexp\n- textlevel\n- voicelevel\n- rep.`);
			if (!user) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **user** to set the **type** you choosed.`);
			if (!amount) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **ammount** to update.`);
			await update(user.id, typo, amount);
			message.channel.send(`${emojis.yes}**| ${message.author.username}**, I removed/updated \`${amount}\` **${typo}** to **${user.tag}**.`);
		} else if (method === 'zero') {
			if (!typo) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **type**.\n:white_small_square: **Available types**:\n- credits\n- textxp\n- voicexp\n- textlevel\n- voicelevel\n- rep.`);
			if (!user) return message.channel.send(`${emojis.no}**| ${message.author.username}**, Please **include** the **user** to set the **type** you choosed.`);
			await update(user.id, typo, '0');
			message.channel.send(`${emojis.yes}**| ${message.author.username}**, I zeroed **${typo}** from **${user.tag}**.`);
		} else {
			return message.channel.send(`${emojis.no}**| ${message.author.username}**, Invalid usage.`);
		}
	}
}


module.exports = AdminToolCommand;
