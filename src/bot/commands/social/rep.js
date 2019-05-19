const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { find, increase, update } = require('../../database/Users');
const moment = require('moment');

class RepCommand extends Command {
	constructor() {
		super('rep', {
			aliases: ['rep', 'like'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'social',
			channelRestriction: 'guild',
			description: {
				content: 'Give someone a reputation point!',
				examples: ['NourEliden', '354716386716811264', '@NourEliden'],
				usage: ['<user>']
			},
			args: [
				{
					id: 'member',
					type: (arg, msg) => {
						if (!arg) return ' ';
						const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || null;
						return member;
					}
				}
			]
		});
	}

	async exec(message, { member }) {
		if (member === ' ') return message.channel.send(`${emojis.no}** | ${message.author.username}**, Please **include** the **member** to give the **reputation** point.`);
		if (!member) return message.channel.send(`${emojis.no}** | ${message.author.username}**, I couldn't find this **member**.`);
		if (member.user.bot) return message.channel.send(`${emojis.no}** | ${message.author.username}**, You can't give a **reputation** point to **bots**.`);
		if (member.user.id === message.author.id) return message.channel.send(`${emojis.no}** | ${message.author.username}**, You can't give a **reputation** point to **yourself**.`);

		const cooldown = 8.64e+7;
		const daily = await find(message.author.id, 'repdaily', null);
		const time = cooldown - (Date.now() - daily);

		if (daily !== null && time > 0) {
			return message.channel.send(`${emojis.info} **|** You can give another **reputation point** in **${moment.duration(time).format('hh [hours] mm [minutes] ss [seconds]')}**.`);
		}

		await update(message.author.id, 'repdaily', Date.now());
		await increase(member.id, 'rep', 1);
		return message.channel.send(`:tada: ** | ${message.author.username}**, Gave ${member} a **reputation point**.`);
	}
}

module.exports = RepCommand;
