const { Command } = require('discord-akairo');
const {Message,RichEmbed} = require('discord.js') //eslint-disable-line
const { emojis } = require('../../struct/bot');
const moment = require('moment');
require('moment-duration-format');

class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue'],
			cooldown: 3000,
			ratelimit: 1,
			category: 'music',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: 'Show the current music queue.'
			},
			args: [
				{
					id: 'number',
					type: number => {
						if (!number) return '';
						if (!isNaN(number)) return Math.floor(number);
						return null;
					}
				}
			]
		});
	}

	/**
     *
     * @param {Message} message
     */
	exec(message, { number }) {
		const music = this.music.get(message.guild.id);
		if (!music) return message.channel.send(`${emojis.no} | **${message.guild.name}'s queue is empty**.`);

		const pages = Math.floor((music.songs.slice(1).length + 10) / 10);

		if (number === null) return message.channel.send(`${emojis.no} | That's not a vaild number.`);
		if (number === '') number = 1;
		let x = 11;
		let i = 0;
		if (number > 1) {
			x = (Math.floor(number) * 10) + 1;
			i = x - 11;
		}

		const nowplaying = music.songs[0];
		let queue = music.songs.slice(x - 10, x).map(song => `**${++i}.** [${song.title}](${song.url}) (${moment.duration(song.duration, 'seconds').format('h [hrs] mm:ss')})`).join('\n');
		if (!queue) queue = '*Nothing to show here*';

		if (number > pages) return message.channel.send(`${emojis.no} | Page doesn't exist.`);

		const embed = new RichEmbed()
			.setAuthor(`${message.guild.name}'s Queue | ${music.songs.length} songs`, message.guild.iconURL)
			.setDescription(`__**Now Playing:**__\n\n❯ [${nowplaying.title}](${nowplaying.url})\n\n__**Queue:**__\n\n${queue}\n`)
			.setFooter(`Page ${number} of ${pages}`)
			.setColor('#000000')
			.setColor('#36393e');
		return message.channel.send(embed);
	}

	get music() {
		if (!this._music) this._music = this.handler.modules.get('play').music;

		return this._music;
	}
}

module.exports = QueueCommand;
