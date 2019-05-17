// const { Command } = require('discord-akairo');
// const {Message} = require('discord.js') //eslint-disable-line
// const { emojis } = require('../../struct/bot');
// class ResumeCommand extends Command {
// 	constructor() {
// 		super('resume', {
// 			aliases: ['resume'],
// 			cooldown: 3000,
// 			ratelimit: 3,
// 			category: 'music',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Resumes the current song'
// 			}
// 		});
// 	}
// 	/**
//      *
//      * @param {Message} message
//      */
// 	exec(message) {
// 		if (!message.member.voiceChannel) {
// 			return message.channel.send(`${emojis.no} | You need to be in a voice channel first!`);
// 		}
// 		if (!this.client.music.get(message.guild.id)) {
// 			return message.channel.send(`${emojis.no} | **There is nothing to resume**.`);
// 		} else if (this.client.music.get(message.guild.id)) {
// 			const playlist = this.client.music.get(message.guild.id);
// 			if (playlist.playing) {
// 				return message.channel.send(`${emojis.no} | **The song is already resumed**.`);
// 			}
// 			playlist.playing = true;
// 			playlist.connection.dispatcher.resume();
// 			message.channel.send(`${emojis.yes} | **Resumed the current song**.`);
// 		}
// 	}
// }
// module.exports = ResumeCommand;
