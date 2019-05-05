const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { find, update, increase } = require('../../database/Users');
const moment = require('moment');

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'kicks a member',
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
				'id': 'kreason',
				'type': 'string',
				'default': 'No reason provided',
				'index': 1
			}],
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions(message) {
				if (message.member.roles.exists(role => role.name === this.client.settings.get(message.guild.id, 'modrole')) || message.member.hasPermission('KICK_MEMBERS')) return true;
		 }
		});
	}

	async exec(message, { member, kreason }) {
		const cooldown = 8.64e+7;
		const klimit = await find(message.author.id, 'klimit', null);
		const kicks = await find(message.author.id, 'kicks', 0);
		const time = cooldown - (Date.now() - klimit);
		if (klimit !== null && time > 0) {
			return message.channel.send(`${emojis.no}** | ${message.author.username}**, You have reached **max limit** of today's **kicks**\n:white_small_square:You can kick again in: **${moment.duration(time).format('hh [hours] mm [minutes] ss [seconds]')}**.`);
		}
		if (member === ' ') {
			return message.channel.send(`${emojis.no}** | ${message.author.username}**, Correct **usage**:
\`${this.client.commandHandler.prefix(message)}kick [@user/userName/userID] [reason]\``);
		}
		if (!member) return message.channel.send(`${emojis.no}** | ${message.author.username}**, I can't find **${member}**.`);
		if (member.id === message.author.id) return message.channel.send(`${emojis.no}** | ${message.author.username}**, You can't **kick** yourself.`);
		if (member.id === this.client.user.id) return message.channel.send(`${emojis.no}** | ${message.author.username}**, You can't **kick** me by **me**!`);
		if (!member.kickable) return message.channel.send(`${emojis.no}** | ${message.author.username}**, I can't **kick** ${member}.`);
		await member.kick({ reason: kreason });
		await increase(message.author.id, 'kicks', 1);
		if (kicks >= this.client.settings.get(message.guild.id, 'kicklimit')) {
			await update(message.author.id, 'klimit', Date.now());
		}
		message.channel.send(`${emojis.yes}** | ${message.author.username}**, I've **kicked** ${member}.`);
	}
}

module.exports = KickCommand;
