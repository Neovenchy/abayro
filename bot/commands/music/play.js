// const { Command } = require('discord-akairo');
// const { emojis, tokens: { youtube } } = require('../../struct/bot');
// const { Message, Util } = require("discord.js") //eslint-disable-line
// const duration = require('../../util/duration');
// const ytdl = require('ytdl-core-discord');
// const YouTube = require('simple-youtube-api');
// class PlayCommand extends Command {
// 	constructor() {
// 		super('play', {
// 			aliases: ['play', 'p'],
// 			cooldown: 4000,
// 			ratelimit: 3,
// 			category: 'music',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Plays music for ya!',
// 				examples: ['zeze', 'https://www.youtube.com/watch?v=6Dh-RL__uN4'],
// 				usage: '<ytlink/ytsearch>'
// 			},
// 			args: [{
// 				'id': 'query',
// 				'match': 'rest',
// 				'type': 'string',
// 				'default': ''
// 			}]
// 		});
// 		this.music = new Map();
// 		this.youtube = new YouTube(youtube);
// 	}
// 	/**
//      * @param {Message} message
//      */
// 	async exec(message, { query }) {
// 		if (!message.member.voiceChannel) {
// 			return message.channel.send(`${emojis.no} | You need to be in a voice channel first!`);
// 		} else if (!message.member.voiceChannel.joinable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to enter this voice channel.`);
// 		} else if (!message.member.voiceChannel.speakable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to talk in this voice channel.`);
// 		}
// 		// TODO: Let the this stream V in client.js
// 		const stream = (this, async music => {
// 			music.connection.playOpusStream(await ytdl(music.songs[0].url, {
// 				filter: 'audioonly'
// 			}), {
// 				volume: music.volume
// 			})
// 				.on('start', () => {
// 					music.playing = true;
// 					music.connection.player.streamingData.pausedTime = 0;
// 				})
// 				.on('end', reason => {
// 					if (music.repeat) {
// 						setTimeout(() => {
// 							stream(music);
// 						}, 250);
// 					} else if (!music.repeat) {
// 						if (isNaN(parseInt(reason, 10))) music.songs.shift();
// 						else music.songs.splice(0, parseInt(reason, 10));
// 						if (music.songs[0]) {
// 							setTimeout(() => {
// 								stream(music);
// 							}, 250);
// 						} else {
// 							music.connection.disconnect();
// 							this.music.delete(message.guild.id);
// 						}
// 					}
// 				})
// 				.on('error', error => this.client.logger.error(error));
// 			music.textChannel.send(`🎵 Now Playing: **${music.songs[0].title}** by **${music.songs[0].requster.tag}**`);
// 		});
// 		const handleSong = (this, async (song, msg, voiceChannel, playlist = false) => {
// 			const fixedDuration = await duration(song.id); // TODO: Whenever the simple-youtube-api do a fix I'll use their last build!
// 			// eslint-disable-next-line no-negated-condition
// 			if (!this.music.get(msg.guild.id)) {
// 				const queueConstruct = {
// 					connection: null,
// 					voiceChannel,
// 					textChannel: msg.channel,
// 					songs: [],
// 					playing: false,
// 					volume: 1,
// 					repeat: false
// 				};
// 				this.music.set(msg.guild.id, queueConstruct);
// 				this.music.get(msg.guild.id).songs.push({
// 					url: song.url,
// 					title: Util.escapeMarkdown(song.title),
// 					duration: fixedDuration,
// 					requster: {
// 						tag: msg.author.tag,
// 						avatar: msg.author.avatarURL
// 					}
// 				});
// 				try {
// 					const connection = await voiceChannel.join();
// 					queueConstruct.connection = connection;
// 					stream(this.music.get(msg.guild.id));
// 				} catch (error) {
// 					this.client.logger.error(error);
// 					this.music.delete(msg.guild.id);
// 					return msg.channel.send(`${emojis.no} | **I could not join the voice channel**`);
// 				}
// 			} else {
// 				this.music.get(msg.guild.id).songs.push({
// 					url: song.url,
// 					title: song.title,
// 					duration: fixedDuration,
// 					requster: {
// 						tag: msg.author.tag,
// 						avatar: msg.author.avatarURL
// 					}
// 				});
// 				if (playlist) return undefined;
// 				return msg.channel.send(`🎵 Added **${song.title}** to the queue!`);
// 			}
// 		});
// 		if (query) {
// 			if (query.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
// 				const playlist = await this.youtube.getPlaylist(query);
// 				const videos = await playlist.getVideos();
// 				const songs = videos.filter(song => song.thumbnails !== undefined);
// 				for (const song of Object.values(songs)) {
// 					handleSong(song, message, message.member.voiceChannel, true);
// 				}
// 				if (songs.length < videos.length) return message.channel.send(`🎵 Added **${playlist.title}** with **${songs.length}** songs! (**${videos.length - songs.length}** items in playlist isn't playable!)`);
// 				return message.channel.send(`🎵 Added **${playlist.title}** with **${songs.length}** songs!`);
// 			}
// 			try {
//                     var song = await this.youtube.search(query, 1); //eslint-disable-line
// 			} catch (error) {
// 				this.client.logger.error(error);
// 				return message.channel.send(`${emojis.no} | **Couldn't find results with \`${query}\`**.`);
// 			}
// 			handleSong(song[0], message, message.member.voiceChannel); // eslint-disable-line block-scoped-var
// 		} else return message.channel.send(`${emojis.no} | **Please provide a yt search or a link**.`); // eslint-disable-line curly
// 	}
// }
// module.exports = PlayCommand;
