const { Command } = require('discord-akairo');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed } } = require('../../util/Util');
const { emojis } = require('../../util/Constants');

class WarnCommand extends Command {
	constructor() {
		super('warn', {
			aliases: ['warn'],
			category: 'mod',
			description: {
				content: 'Warns a user, duh.',
				usage: '<member> <...reason>',
				examples: ['warn @Crawl dumb']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: message => `${message.author}, what member do you want to warn?`,
						retry: message => `${message.author}, please mention a member.`
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

	async exec(message, { member, reason }) {
		if (member.id === message.author.id) return;

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;
		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'logschnl');
		let modMessage;
		if (modLogChannel && this.client.settings.get(message.guild, 'logs')) {
			const embed = logEmbed({ message, member, action: 'Warn', caseNum: totalCases, reason }).setColor(COLORS.WARN);
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
			action: ACTIONS.WARN,
			reason
		});

		return message.channel.send(`${emojis.yes} Successfully warned **${member.user.tag}**`);
	}
}

module.exports = WarnCommand;
