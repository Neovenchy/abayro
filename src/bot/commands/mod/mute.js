const { Command } = require('discord-akairo');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed } } = require('../../util/Util');
const { emojis } = require('../../util/Constants');
const ms = require('@abayro/ms');

class MuteCommand extends Command {
	constructor() {
		super('mute', {
			aliases: ['mute'],
			category: 'mod',
			description: {
				content: 'Mutes a member, duh.',
				usage: '<member> <duration> <...reason>',
				examples: ['mute @Abady']
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
					id: 'duration',
					type: str => {
						if (!str) return null;
						const duration = ms(str);
						if (duration && duration >= 300000) return duration;
						return null;
					}
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
		if (!member) return message.channel.send(`${emojis.no} | Please enter a member to mute.`);
		if (!duration) return message.channel.send(`${emojis.no} | Please enter a duration that are greater than 5 mineuts.`);

		if (member.id === message.author.id) return;

		const muteRole = this.client.settings.get(message.guild, 'muterole');
		if (!muteRole) return message.channel.send(`${emojis.no} | there is no mute role configured on this server.`);

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			await member.addRole(muteRole, `Muted by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			return message.reply(`there was an error muting this member: \`${error}\``);
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
		await this.client.muteScheduler.addMute({
			guild: message.guild.id,
			message: modMessage ? modMessage.id : null,
			case_id: totalCases,
			target_id: member.id,
			target_tag: member.user.tag,
			mod_id: message.author.id,
			mod_tag: message.author.tag,
			action: ACTIONS.MUTE,
			action_duration: new Date(Date.now() + duration),
			action_processed: false,
			reason
		});

		return message.channel.send(`${emojis.yes} Successfully muted **${member.user.tag}**`);
	}
}

module.exports = MuteCommand;
