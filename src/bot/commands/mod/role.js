const { Command } = require('discord-akairo');
const { emojis: { no } } = require('../../util/Constants');

class AddRoleCommand extends Command {
	constructor() {
		super('role', {
			aliases: ['role'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Adds/Removes a role to/from a member',
				usage: '@user @role',
				example: ['@Abady @Admin', 'Abady Admin', '171259176029257728 529538053815926794']
			},
			args: [
				{
					id: 'member',
					type: 'member'
				},
				{
					id: 'role',
					type: 'role'
				}
			],
			clientPermissions: ['MANAGE_ROLES', 'MANAGE_GUILD'],
			userPermissions(message) {
				return message.member.roles.has(this.client.settings.get(message.guild, 'modrole')) || message.member.hasPermission('MANAGE_ROLES');
		   }
		});
	}

	/**
	 * @param {import('discord.js').Message} message
	 */
	async exec(message, { member, role }) {
		if (!member) return message.channel.send(`${no} | Cloudn't find the member \`${this.handler.prefix(message)}help role\``);
		if (!role) return message.channel.send(`${no} | Couldn't get the role \`${this.handler.prefix(message)}help role\``);
		if (member.roles.has(role.id)) {
			try {
				await member.removeRole(role, `Removed by ${message.author.tag}`);
			} catch (e) {
				return message.channel.send(`${no} | I couldn't remove the role because the ${role.name} role is higher than me.`);
			}
			return message.channel.send(`➖ Removed the role **${role.name}** from **${member.displayName}**`);
		}
		try {
			await member.addRole(role, `Added by ${message.author.tag}`);
		} catch (e) {
			return message.channel.send(`${no} | I couldn't remove the role because the ${role.name} role is higher than me.`);
		}
		return message.channel.send(`➕ Added the role **${role.name}** to **${member.displayName}**`);
	}
}

module.exports = AddRoleCommand;
