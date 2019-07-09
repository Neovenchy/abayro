const { Command } = require('discord-akairo');
const Embed = require('../../util/Embed');
const { emojis } = require('../../util/Constants');
class AvatarCommand extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar'],
			cooldown: 2000,
			ratelimit: 5,
			category: 'info',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Shows yours or a user avatar.'
			},
			args: [{
				'id': 'user',
				'type': 'user',
				'default': message => message.author
			}]
		});
	}

	exec(message, { user }) {
		if (!user) return message.channel.send(`${emojis.no} | The **user** could not be **found**.`);

		const embed = new Embed({})
			.setTitle(`${user.username}'s Avatar`)
			.setURL(user.displayAvatarURL)
			.setColor('#307FFF')
			.setImage(user.displayAvatarURL)
			.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
			.setTimestamp();
		message.channel.send(embed);
	}
}


module.exports = AvatarCommand;
