const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const { emojis } = require('../../util/Constants');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed, historyEmbed } } = require('../../util/Util');

class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban'],
			category: 'mod',
			description: {
				content: 'Bans a member, duh?!',
				usage: '<member> [--days=] [...reason]',
				examples: ['@Abady', 'Abady --d=5 not good!', '171259176029257728 --d=10']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES', 'BAN_MEMBERS'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member'
				},
				{
					'id': 'days',
					'match': 'prefix',
					'type': 'integer',
					'prefix': ['-d=', '--days='],
					'default': '0'
				},
				{
					'id': 'reason',
					'match': 'rest',
					'type': 'string',
					'default': ''
				}
			],
			userPermissions(message) {
				return message.member.roles.has(this.client.settings.get(message.guild, 'modrole')) || message.member.hasPermission('BAN_MEMBERS');
		   }
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 * @param {object} args
 * @param {import('discord.js').GuildMember} args.member
 */
	async exec(message, { member, days, reason }) {
		if (!member) return message.channel.send(`${emojis.no} | Please type a member to ban.`);
		if (member.id === message.author.id) {
			return message.channel.send(`${emojis.no} | You seem to be funny, which I don't like.`);
		}

		const dbCases = await this.client.db.models.cases.findAll({ where: { target_id: member.id } });
		const embed = historyEmbed(member, dbCases);
		await message.channel.send('You sure you want me to ban this person?', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('timed out. Cancelled ban.');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`Banning **${member.user.tag}**...`);
		} else {
			return message.reply('cancelled ban.');
		}

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			try {
				await member.send(stripIndents`
					**You have been banned from ${message.guild.name}**
					${reason ? `\n**Reason:** ${reason}\n` : ''}
				`);
			} catch {} // eslint-disable-line
			await member.ban({ days, reason: `Banned by ${message.author.tag} | Case #${totalCases}` });
		} catch (error) {
			return message.reply(`there was an error banning this member: \`${error}\``);
		}

		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'logschnl');
		let modMessage;
		if (modLogChannel && this.client.settings.get(message.guild, 'logs')) {
			const embed = logEmbed({ message, member, action: 'Ban', caseNum: totalCases, reason }).setColor(COLORS.BAN);
			modMessage = await this.client.channels.get(modLogChannel).send(embed);
		}
		await this.client.db.models.cases.create({
			guild: message.guild.id,
			message: modMessage ? modMessage.id : null,
			case_id: totalCases,
			target_id: member.id,
			target_tag: member.user.tag,
			mod_id: message.author.id,
			mod_tag: message.author.tag,
			action: ACTIONS.BAN,
			reason
		});

		return sentMessage.edit(`${emojis.yes} Successfully banned **${member.user.tag}**`);
	}
}

module.exports = BanCommand;
