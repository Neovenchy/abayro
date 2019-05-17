// const { Command } = require('discord-akairo');
// const {Message} = require('discord.js') //eslint-disable-line
// const { emojis } = require('../../struct/bot');
// class SkipCommand extends Command {
// 	constructor() {
// 		super('skip', {
// 			aliases: ['skip'],
// 			cooldown: 3000,
// 			ratelimit: 3,
// 			category: 'music',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Skip the current song.'
// 			},
// 			args: [
// 				{
// 					id: 'skipnumber',
// 					type: number => {
// 						if (!number) return '';
// 						if (isNaN(number)) return null;
// 						return Math.floor(number);
// 					}
// 				}
// 			]
// 		});
// 	}
// 	/**
//      *
//      * @param {Message} message
//      */
// 	exec(message, { skipnumber }) {
// 		if (!message.member.voiceChannel) {
// 			return message.channel.send(`${emojis.no} | You need to be in a voice channel first!`);
// 		} else if (!message.member.voiceChannel.joinable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to enter this voice channel.`);
// 		} else if (!message.member.voiceChannel.speakable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to talk in this voice channel.`);
// 		}
// 		if (!this.client.music.get(message.guild.id)) {
// 			return message.channel.send(`${emojis.no} | **There is nothing to skip**.`);
// 		} else if (this.client.music.get(message.guild.id)) {
// 			if (skipnumber === '') {
// 				message.channel.send(`⏩ | **Skipped the current song**.`);
// 				this.client.music.get(message.guild.id).connection.dispatcher.end();
// 			} else {
// 				if (skipnumber === null || this.client.music.get(message.guild.id).songs.length + 1 <= skipnumber) return message.channel.send(`${emojis.no} | That's not a queue postion number to skip.`);
// 				message.channel.send(`⏩ | Skipped the current song to **${skipnumber}** postion in queue.`);
// 				skipnumber -= 1;
// 				this.client.music.get(message.guild.id).connection.dispatcher.end(`${skipnumber}`);
// 			}
// 		}
// 	}
// }
// module.exports = SkipCommand;
