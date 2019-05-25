const { Command } = require('discord-akairo');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed } } = require('../../util');
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
			userPermissions: ['MUTE_MEMBERS'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: message => `${message.author}, what member do you want to mute?`,
						retry: message => `${message.author}, please mention a member.`
					}
				},
				{
					id: 'duration',
					type: str => {
						const duration = ms(str);
						if (duration && duration >= 300000) return duration;
						return null;
					},
					prompt: {
						start: message => `${message.author}, for how long do you want the mute to last?`,
						retry: message => `${message.author}, please use a proper time format.`
					}
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

	async exec(message, { member, duration, reason }) {
		if (member.id === message.author.id) return;

		const muteRole = this.client.settings.get(message.guild, 'muteRole');
		if (!muteRole) return message.reply('there is no mute role configured on this server.');

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			await member.roles.add(muteRole, `Muted by ${message.author.tag} | Case #${totalCases}`);
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
		if (modLogChannel) {
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

		return message.util.send(`Successfully muted **${member.user.tag}**`);
	}
}

module.exports = MuteCommand;
