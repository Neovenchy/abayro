const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const {Message, RichEmbed} = require("discord.js") //eslint-disable-line
const Lyricistapi = require('lyricist');
const lyrics = new Lyricistapi('Mo7AWPmN_e_NS06MUiARkVUC_tInvR7teaApz40n1wurCN6UaeZS1tERoixLSbg9');

class LyricsCommand extends Command {
	constructor() {
		super('lyrics', {
			aliases: ['lyrics', 'ly'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'music',
			channelRestriction: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				content: "Get any song's lyrics",
				examples: ['thank u next', 'baby'],
				usage: '<song>'
			},
			args: [
				{
					'id': 'query',
					'match': 'rest',
					'default': ''
				}
			]
		});
	}

	/**
     * @param {Message} message
     */
	async exec(message, { query }) {
		if (!query && !this.client.music.get(message.guild.id)) return message.channel.send(`${emojis.no} | **Please enter the song name**.`);
		query ? query.replace(/\[[^\]]*\]/g, '').replace(/ *\([^)]*\) */g, '').replace(/[^\w\s]/gi, '') : query = this.client.music.get(message.guild.id).songs[0].title.replace(/\[[^\]]*\]/g, '').replace(/ *\([^)]*\) */g, '').replace(/[^\w\s]/gi, '');


		try {
            var song = await lyrics.search(query); //eslint-disable-line
		} catch (error) {
			return message.channel.send(`${emojis.no} | This didn't work either because of: **GENIUS API** or you searched in **unescaped characters**`);
		}

		/* eslint-disable block-scoped-var */

		if (song[0]) {
			const msgfetch = await message.channel.send(`:bookmark_tabs: | Fetching **${song[0].full_title}** Lyrics.....`);
			const songlyrics = await lyrics.song(song[0].id, { fetchLyrics: true, textFormat: 'dom' });
			let fixedsonglyrics;
			if (songlyrics.lyrics.length > 2047) fixedsonglyrics = `${songlyrics.lyrics.slice(0, 2000 - songlyrics.url.length)}......\n\n[**Continue Here**](${songlyrics.url})`;
			else fixedsonglyrics = songlyrics.lyrics;
			let youtube;
			let music;
			if (songlyrics.media.find(g => g.provider === 'youtube')) youtube = `${emojis.youtube} [**YouTube**](${songlyrics.media.find(g => g.provider === 'youtube').url})`;
			else youtube = 'N/A';
			if (songlyrics.media.find(g => g.provider === 'spotify')) music = `${emojis.spotify} [**Spotify**](${songlyrics.media.find(g => g.provider === 'spotify').url})`;
			else if (songlyrics.media.find(g => g.provider === 'apple_music')) music = `${emojis.apple} [**iTunes**](${songlyrics.media.find(g => g.provider === 'apple_music').url})`;
			else music = 'N/A';

			const embed = new RichEmbed()
				.setDescription(`\n${fixedsonglyrics}`)
				.setTitle(songlyrics.full_title)
				.setURL(songlyrics.url)
				.setThumbnail(songlyrics.header_image_url)
				.addField(`Watch on`, youtube, true)
				.addField(`Listen on`, music, true)
				.setColor('#000000')
				.setColor('#36393e');
			msgfetch.edit(embed);
		} else return message.channel.send(`${emojis.no} | **I couldn't find this song**!`); // eslint-disable-line curly
	}
}


module.exports = LyricsCommand;
