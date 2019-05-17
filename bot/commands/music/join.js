const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const {Message} = require("discord.js") //eslint-disable-line

class JoinCommand extends Command {
	constructor() {
		super('join', {
			aliases: ['join'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'music',
			channelRestriction: 'guild',
			description: {
				content: 'Joins your voice channel',
				examples: ['']
			}
		});
	}

	/**
     * @param {Message} message
     */
	exec(message) {
		if (message.guild.member(this.client.user).voiceChannel) return message.channel.send(`${emojis.no} | **I'm already in your voice channel**.`);
		if (!message.member.voiceChannel.joinable) return message.channel.send(`${emojis.no} | **It appears that I canno't join your voice channel**`);
		if (!message.guild.member(message.author).voiceChannel) return message.channel.send(`${emojis.no} | **Please enter a voice channel first**.`);
		if (message.guild.member(message.author).voiceChannel.full) return message.channel.send(`${emojis.no} | **Your voiceChannel is full, I cant join**.`);
		if (!message.guild.member(this.client.user).hasPermission('CONNECT')) {
			return message.channel.send(`${emojis.no} | **I don't have \`CONNECT\`/\`SPEAK\` Permission to join your voiceChannel**.`);
		}
		message.guild.member(message.author).voiceChannel.join();
		message.channel.send(`${emojis.yes} | **I Joined your voice channel**.`);
	}
}


module.exports = JoinCommand;
