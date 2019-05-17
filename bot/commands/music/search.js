const { Command } = require('discord-akairo');
const { emojis } = require('../../struct/bot');
const {Message} = require("discord.js") //eslint-disable-line

class SearchCommand extends Command {
	constructor() {
		super('search', {
			aliases: ['search'],
			cooldown: 6000,
			ratelimit: 5,
			category: 'music',
			channelRestriction: 'guild',
			description: {
				content: 'Searches music',
				examples: ['']
			},
			ownerOnly: true
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
		if (!message.member.voiceChannel.speakable) return message.channel.send(`${emojis.no} | I don't seem to have permission to talk in this voice channel.`);
		if (!message.guild.member(this.client.user).hasPermission('CONNECT')) {
			return message.channel.send(`${emojis.no} | **I don't have \`CONNECT\`/\`SPEAK\` Permission to join your voiceChannel**.`);
		}
		message.channel.send(`${emojis.no} | **Command is not finished**.`);
	}
}


module.exports = SearchCommand;
