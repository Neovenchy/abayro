// const {
// 	Command
// } = require('discord-akairo');
// const {Message} = require('discord.js') //eslint-disable-line
// const {
// 	emojis
// } = require('../../struct/bot');
// class StopCommand extends Command {
// 	constructor() {
// 		super('stop', {
// 			aliases: ['stop'],
// 			cooldown: 3000,
// 			ratelimit: 3,
// 			category: 'music',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Stops the current song'
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
// 		} else if (!message.member.voiceChannel.joinable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to enter this voice channel.`);
// 		} else if (!message.member.voiceChannel.speakable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to talk in this voice channel.`);
// 		}
// 		if (!this.client.music.get(message.guild.id)) {
// 			return message.channel.send(`${emojis.no} | **There is nothing to stop**.`);
// 		} else if (this.client.music.get(message.guild.id)) {
// 			const playlist = this.client.music.get(message.guild.id);
// 			playlist.songs = [];
// 			playlist.connection.dispatcher.end();
// 			message.channel.send(`${emojis.yes} | **All music has stopped**.`);
// 		}
// 	}
// }
// module.exports = StopCommand;
