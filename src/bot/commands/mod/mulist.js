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

	exec(message) {
		const role = message.guild.roles.find('name', 'Muted') || message.guild.roles.find('name', 'muted');
		let i = 0;
		let mutelist;
		message.guild.members.filter(m => m.roles.has(role.id)).forEach(member => {
			i++;
			mutelist += `**#${i}** \`-\` <@${member.id}>\n`;
		});

		if (!mutelist || mutelist === '') {
			[mutelist] = `No muted members in ${message.guild.name}`;
		}
		message.channel.send(
			 new Embed()
				.setAuthor(message.guild.name, message.guild.iconURL)
				.setDescription(mutelist)
				.setFooter(message.author.username, message.author.avatarURL)
				.setTimestamp()
		);
	}
}


module.exports = mutelistCommand;
