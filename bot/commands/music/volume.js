// const { Command } = require('discord-akairo');
// const {Message} = require('discord.js') //eslint-disable-line
// const { emojis } = require('../../struct/bot');
// class VolumeCommand extends Command {
// 	constructor() {
// 		super('volume', {
// 			aliases: ['volume', 'vol'],
// 			cooldown: 5000,
// 			ratelimit: 5,
// 			category: 'music',
// 			channelRestriction: 'guild',
// 			description: {
// 				content: 'Get/change the current volume.',
// 				examples: ['31', '100'],
// 				usage: '[Number]'
// 			},
// 			args: [{
// 				id: 'vol',
// 				type: vol => {
// 					if (!vol) return '_';
// 					if (isNaN(vol)) return null;
// 					if (vol > 150 || vol < 1) return null;
// 					return vol;
// 				}
// 			}]
// 		});
// 	}
// 	/**
//      *
//      * @param {Message} message
//      */
// 	exec(message, {
// 		vol
// 	}) {
// 		if (!message.member.voiceChannel) {
// 			return message.channel.send(`${emojis.no} | You need to be in a voice channel first!`);
// 		} else if (!message.member.voiceChannel.joinable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to enter this voice channel.`);
// 		} else if (!message.member.voiceChannel.speakable) {
// 			return message.channel.send(`${emojis.no} | I don't seem to have permission to talk in this voice channel.`);
// 		}
// 		if (!this.client.music.get(message.guild.id)) {
// 			return message.channel.send(`${emojis.no} | **There is no music playing**, you can't set the volume for nothing !`);
// 		} else if (this.client.music.get(message.guild.id)) {
// 			if (vol === '_') return message.channel.send(`🔊 | **Current volume: ${this.client.music.get(message.guild.id).volume * 100}**.`);
// 			else if (!vol) return message.channel.send(`🔊 | **Set a volume from 0 to 150**.`);
// 			this.client.music.get(message.guild.id).connection.dispatcher.setVolume(0.01 * parseInt(vol, 10));
// 			this.client.music.get(message.guild.id).volume = 0.01 * parseInt(vol, 10);
// 			return message.channel.send(`🔊 | **Turned the volume to ${parseInt(vol, 10)}**.`);
// 		}
// 	}
// }
// module.exports = VolumeCommand;
