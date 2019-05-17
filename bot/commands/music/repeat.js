// const { Command } = require('discord-akairo');
// const {Message} = require('discord.js') //eslint-disable-line
// const { emojis } = require('../../struct/bot');
// class RepeatCommand extends Command {
// 	constructor() {
// 		super('repeat', {
// 			aliases: ['repeat', 'loop'],
// 			cooldown: 3000,
// 			ratelimit: 3,
// 			category: 'music',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Repeats the current song'
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
// 			return message.channel.send(`${emojis.no} | **There is nothing to repeat**.`);
// 		} else if (this.client.music.get(message.guild.id)) {
// 			const playlist = this.client.music.get(message.guild.id);
// 			if (playlist.repeat) {
// 				playlist.repeat = false;
// 				message.channel.send(`${emojis.yes} | **Repeat disabled**.`);
// 			} else {
// 				playlist.repeat = true;
// 				message.channel.send(`${emojis.yes} | **Repeat enabled**.`);
// 			}
// 		}
// 	}
// }

// module.exports = RepeatCommand;
