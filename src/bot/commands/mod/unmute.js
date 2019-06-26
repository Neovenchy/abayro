const { Command } = require('discord-akairo');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed } } = require('../../util/Util');
const { emojis } = require('../../util/Constants');

class MuteCommand extends Command {
	constructor() {
		super('unmute', {
			aliases: ['unmute'],
			category: 'mod',
			description: {
				content: 'Unmutes a member, duh.',
				usage: '<member> <duration> <...reason>',
				examples: ['unmute @Abady']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
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
			],
			userPermissions(message) {
				return message.member.roles.has(this.client.settings.get(message.guild, 'modrole')) || message.member.hasPermission('MANAGE_MESSAGES');
		   }
		});
	}

	/**
  *
  * @param {import('discord.js').Message} message
  * @param {object} args
  * @param {import('discord.js').GuildMember} args.member
  */
	async exec(message, { member, duration, reason }) {
		if (!member) return message.channel.send(`${emojis.no} | Please enter a member to unmute.`);

		if (member.id === message.author.id) return;

		const muteRole = this.client.settings.get(message.guild, 'muterole');
		if (!muteRole) return message.channel.send(`${emojis.no} | There is no mute role configured on this server.`);

		if (!member.roles.has(muteRole)) return message.channel.send(`${emojis.no} | Member is not muted.`);

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			await member.removeRole(muteRole, `Unmuted by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			return message.channel.send(`${emojis.no} | There was an error muting this member: \`${error}\``);
		}

		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'logschnl');
		let modMessage;
		if (modLogChannel && this.client.settings.get(message.guild, 'logs')) {
			const embed = logEmbed({ message, member, action: 'Mute', duration, caseNum: totalCases, reason }).setColor(COLORS.MUTE);
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
			action: ACTIONS.UNMUTE,
			reason
		});

		return message.channel.send(`${emojis.yes} Successfully unmuted **${member.user.tag}**`);
	}
}

module.exports = MuteCommand;
