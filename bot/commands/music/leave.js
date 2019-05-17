const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const {Message} = require('discord.js') //eslint-disable-line

class LeaveCommand extends Command {
	constructor() {
		super('leave', {
			aliases: ['leave'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'music',
			channelRestriction: 'guild',
			description: {
				content: 'Leaves your voiceChannel',
				examples: ['']
			}
		});
	}

	/**
     *
     * @param {Message} message
     */
	exec(message) {
		if (!message.guild.member(this.client.user).voiceChannel) {
			return message.channel.send(`${emojis.no} | **I'm not in a voice channel to leave it**.`);
		} else if (message.member.voiceChannel === message.guild.member(this.client.user).voiceChannel) {
			message.guild.member(message.author).voiceChannel.leave();
			return message.channel.send(`${emojis.yes} | **I left your voice channel**.`);
		}
	}
}


module.exports = LeaveCommand;
