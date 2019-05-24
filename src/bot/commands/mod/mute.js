const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const { find, update, increase } = require('../../database/Users');
const moment = require('moment');

class MuteCommand extends Command {
	constructor() {
		super('mute', {
			aliases: ['mute'],
			ratelimit: 5,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Mutes a member',
				usage: '@user/user/40440404044040',
				examples: ['@nouridio badmember', '171259176029257728 badmember']
			},
			args: [{
				id: 'member',
				type: (arg, msg) => {
					if (!arg) return ' ';
					const member = this.client.util.resolveMembers(arg, msg.guild.members).first() || arg;
					return member || null;
				},
				index: 0
			},
		  {
				'id': 'mreason',
				'match': 'rest',
				'type': 'string',
				'default': 'No reason',
				'index': 1
			}],
			clientPermissions: ['MANAGE_ROLES'],
			userPermissions(message) {
				if (message.member.roles.exists(role => role.name === this.client.settings.get(message.guild.id, 'modrole')) || message.member.hasPermission('MANAGE_ROLES')) return true;
		 }
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 */
	async exec(message, { member }) {
		const cooldown = 8.64e+7;
		const mlimit = await find(message.author.id, 'mlimit', null);
		const mutes = await find(message.author.id, 'mutes', 0);
		const time = cooldown - (Date.now() - mlimit);
		if (mlimit !== null && time > 0) {
			return message.channel.send(`${emojis.no}** | ${message.author.username}**, You have reached **max limit** of today's **mutes**\n:white_small_square:You can ban again in: **${moment.duration(time).format('hh [hours] mm [minutes] ss [seconds]')}**.`);
		}
		if (member === ' ') {
			return message.channel.send(`${emojis.no}** | ${message.author.username}, Please type the member you want to mute.`);
		}
		if (!member) return message.channel.send(`${emojis.no}** | ${message.author.username}**, I can't find **${member}**.`);
		if (member.id === message.author.id) return message.channel.send(`${emojis.no}** | ${message.author.username}**, You can't **mute** yourself.`);
		if (member.id === this.client.user.id) return message.channel.send(`${emojis.no}** | ${message.author.username}**, You can't **mute** me by **me**!`);
		const muteRole = message.guild.roles.find(r => r.name === 'Muted');
		if (!muteRole) {
			await message.guild.createRole({
				name: 'Muted',
				color: 'BLACK'
			});
		}
		await member.addRole(muteRole.id).catch(error => {
			message.channel.send(`:x: | **Failed** to **mute** ${member}.\n**Error:** ${error}`);
		});
		await increase(message.author.id, 'mutes', 1);
		if (mutes >= this.client.settings.get(message.guild.id, 'mutelimit')) {
			await update(message.author.id, 'mlimit', Date.now());
		}
		message.channel.send(`${emojis.yes}** | ${message.author.username}**, I've **muted** ${member}.`);
	}
}

module.exports = MuteCommand;
