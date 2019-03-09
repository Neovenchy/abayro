const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { find, update, increase } = require('../../database/Users');
const moment = require('moment');

class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Bans a member',
				usage: '@user',
				examples: ['@noureldien', '171259176029257728']
			},
			args: [{
				id: 'member',
				type: (arg, msg) => {
					if (!arg) return ' ';
					const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg;
					return member;
				},
				index: 0
			},
			{
				'id': 'days',
				'type': 'integer',
				'default': 7,
				'index': 1
			},
		  {
				'id': 'breason',
				'match': 'rest',
				'type': 'string',
				'default': 'No reason provided',
				'index': 2
			},
		  {
				id: 'soft',
				type: 'string',
				flag: ['--soft', '--s'],
				index: [1, 2, 3]
			}],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions(message) {
				if (message.member.roles.exists(role => role.name === this.client.settings.get(message.guild.id, 'modrole')) || message.member.hasPermission('BAN_MEMBERS')) return true;
		 }
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 */
	async exec(message, { member, days, breason, soft }) {
		const cooldown = 8.64e+7;
		const blimit = await find(message.author.id, 'blimit', null);
		const bans = await find(message.author.id, 'bans', 0);
		const time = cooldown - (Date.now() - blimit);
		if (blimit !== null && time > 0) {
			return message.channel.send(`${emojis.no}**| ${message.author.username}**, You have reached **max limit** of today's **bans**\n:white_small_square:You can ban again in: **${moment.duration(time).format('hh [hours] mm [minutes] ss [seconds]')}**.`);
		}
		if (member === ' ') {
			return message.channel.send(`${emojis.no}**| ${message.author.username}**, Correct **usage**:
\`${this.client.commandHandler.prefix(message)}ban [@user/userName/userID] [days (1-7)] [reason] [--soft for softban]\``);
		}
		if (!member) return message.channel.send(`${emojis.no}**| ${message.author.username}**, I can't find **${member}**.`);
		if (member.id === message.author.id) return message.channel.send(`${emojis.no}**| ${message.author.username}**, You can't **ban** yourself.`);
		if (member.id === this.client.user.id) return message.channel.send(`${emojis.no}**| ${message.author.username}**, You can't **ban** me by **me**!`);
		if (!member.bannable) return message.channel.send(`${emojis.no}**| ${message.author.username}**, I can't **ban** ${member}.`);
		await member.ban({ days, reason: breason });
		if (soft) {
			await member.ban({ days: 1, reason: breason });
			await message.guild.unban(member);
			await increase(message.author.id, 'bans', 1);
			if (bans >= this.client.settings.get(message.guild.id, 'banlimit')) {
				await update(message.author.id, 'blimit', Date.now());
			}
			return message.channel.send(`${emojis.yes}**| ${message.author.username}**, I've **softbanned** ${member}.`);
		}
		await increase(message.author.id, 'bans', 1);
		if (bans >= this.client.settings.get(message.guild.id, 'banlimit')) {
			await update(message.author.id, 'blimit', Date.now());
		}
		message.channel.send(`${emojis.yes}**| ${message.author.username}**, I've **banned** ${member}.`);
	}
}

module.exports = BanCommand;
