const { Command } = require('discord-akairo');
const { stripIndents } = require('discord.js');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed } } = require('../../util/Util');

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			category: 'mod',
			description: {
				content: 'Kicks a member, duh.',
				usage: '<member> <...reason>',
				examples: ['kick @Crawl', 'kick @Crawl']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			userPermissions: ['KICK_MEMBERS'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member'
				},
				{
					'id': 'reason',
					'match': 'rest',
					'type': 'string',
					'default': ''
				}
			]
		});
	}

	async exec(message, { member, reason }) {
		if (!member) return message.channel.send(`${emojis.no} | Please type a member to ban.`);
		if (member.id === message.author.id) {
			return message.channel.send(`${emojis.no} | You seem to be funny, which I don't like.`);
		}

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		let sentMessage;
		try {
			sentMessage = await message.channel.send(`Kicking **${member.user.tag}**...`);
			try {
				await member.send(stripIndents`
					**You have been kicked from ${message.guild.name}**
					${reason ? `\n**Reason:** ${reason}\n` : ''}
					You may rejoin whenever.
				`);
			} catch {}
			await member.kick(`Kicked by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			return message.reply('there is no mute role configured on this server.');
		}

		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'logschnl');
		let modMessage;
		if (modLogChannel) {
			const embed = logEmbed({ message, member, action: 'Kick', caseNum: totalCases, reason }).setColor(COLORS.KICK);
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
			action: ACTIONS.KICK,
			reason
		});

		return sentMessage.edit(`Successfully kicked **${member.user.tag}**`);
	}
}

module.exports = KickCommand;