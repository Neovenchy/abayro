const { Command } = require('discord-akairo');
const { mod: { CONSTANTS: { ACTIONS, COLORS }, logEmbed } } = require('../../util/Util');
const { emojis } = require('../../struct/bot');

class UnbanCommand extends Command {
	constructor() {
		super('unban', {
			aliases: ['unban'],
			category: 'mod',
			description: {
				content: 'Unbans a user, duh.',
				usage: '<member> <...reason>',
				examples: ['unban @Crawl']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'user',
					type: 'user'
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

	async exec(message, { user, reason }) {
		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			await message.guild.members.unban(user, `Unbanned by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			return message.reply(`there was an error unbanning this user: \`${error}\``);
		}

		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'logschnl');
		let modMessage;
		if (modLogChannel && this.client.settings.get(message.guild, 'logs')) {
			const embed = logEmbed({ message, member: user, action: 'Unban', caseNum: totalCases, reason }).setColor(COLORS.UNBAN);
			modMessage = await this.client.channels.get(modLogChannel).send(embed);
		}
		await this.client.db.models.cases.create({
			guild: message.guild.id,
			message: modMessage ? modMessage.id : null,
			case_id: totalCases,
			target_id: user.id,
			target_tag: user.tag,
			mod_id: message.author.id,
			mod_tag: message.author.tag,
			action: ACTIONS.UNBAN,
			reason
		});

		return message.channel.send(`${emojis.yes} Successfully unbanned **${user.tag}**`);
	}
}

module.exports = UnbanCommand;
