const { Command } = require('discord-akairo');
const Embed = require('../../util/Embed');

class mutelistCommand extends Command {
	constructor() {
		super('mutelist', {
			aliases: ['mutelist'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'moderation',
			channelRestriction: 'guild',
			description: {
				content: 'Muted users list'

			},
			clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS']
		});
	}

	/**
 *
 * @param {import('discord.js').Message} message
 */
	exec(message) {
		const muteRole = this.client.settings.get(message.guild, 'muterole');
		const muteList = message.guild.roles.get(muteRole).members.map(member => `• ${member}`).join('\n');
		const embed = new Embed()
			.setAuthor(message.guild.name, message.guild.iconURL)
			.setDescription(muteList ? muteList : 'There\'s No muted members.')
			.setFooter(message.author.username, message.author.avatarURL)
			.setTimestamp();

		return message.channel.send(embed);
	}
}


module.exports = mutelistCommand;
