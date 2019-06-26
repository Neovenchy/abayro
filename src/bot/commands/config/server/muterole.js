const { Command } = require('discord-akairo');
const { emojis } = require('../../../util/Constants');
class SModRoleCommand extends Command {
	constructor() {
		super('muterole', {
			aliases: ['muterole', 'set-muterole'],
			cooldown: 5000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'Shows or sets the server mute role.'
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
			this.client.settings.set(message.guild.id, 'muterole', role.id);
			return message.channel.send(`${emojis.yes}** | ${message.author.username}**, The **modrole** for **${message.guild.name}** has been set to: **\`\`${role.name}\`\`**.`);
		}
		const muteRole = this.client.settings.get(message.guild, 'muterole');
		return message.channel.send(`${emojis.info}** | ${message.author.username}**, The **modrole** for **${message.guild.name}** is: ${muteRole ? message.guild.roles.get(muteRole) : '*Not set*'}\nUse \`${this.handler.prefix(message)}muterole <role>\` to set a **muterole**.`);
	}
}


module.exports = SModRoleCommand;
