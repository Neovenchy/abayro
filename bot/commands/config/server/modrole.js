const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
class SModRoleCommand extends Command {
	constructor() {
		super('modrole', {
			aliases: ['modrole'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Shows or sets the server modrole.'
			},
			args: [{
				id: 'role',
				type: 'role',
				index: 0
			}]
		});
	}

	 exec(message, { role }) {
		if (role) {
			this.client.settings.set(message.guild.id, 'modrole', role.name);
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, The **modrole** for **${message.guild.name}** has been set to: **\`\`${role.name}\`\`**.`);
		}
		return message.channel.send(`${emojis.info}** | ${message.author.username}**, The **modrole** for **${message.guild.name}** is: <&${this.client.settings.get(message.guild.id, 'modrole', 'No modrole was set')}>\nUse \`${this.handler.prefix(message)}modrole [roleName/roleMention/roleID]\` to set a **modrole**.`);
	}
}


module.exports = SModRoleCommand;
