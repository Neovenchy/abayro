const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const {Message,RichEmbed} = require('discord.js') //eslint-disable-line

class NpCommand extends Command {
	constructor() {
		super('np', {
			aliases: ['np', 'nowplaying'],
			cooldown: 3000,
			ratelimit: 1,
			category: 'music',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Show the current streamed song.'
			}
		});
	}

	/**
     *
     * @param {Message} message
     */
	exec(message) {
		if (!this.client.music.get(message.guild.id)) {
			return message.channel.send(`${emojis.no} | **There is nothing playing in this guild**.`);
		} else if (this.client.music.get(message.guild.id)) {
			const np = this.client.music.get(message.guild.id).songs[0];
			const embed = new RichEmbed()
				.setAuthor(`${message.guild.name}'s Queue`, message.guild.iconURL)
				.setDescription(`__**Now Playing:**__\n❯ [**${np.title}**](${np.url})`)
				.setColor('#000000')
				.setColor('#36393e')
				.setFooter(`Requested by ${np.requster.tag}`, np.requster.avatarURL);
			return message.channel.send(embed);
		}
	}
}

module.exports = NpCommand;
