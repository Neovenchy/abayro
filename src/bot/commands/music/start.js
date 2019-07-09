const { Command } = require('discord-akairo');

class StartCommand extends Command {
	constructor() {
		super('start', {
			aliases: ['start', '▶'],
			description: {
				content: 'Joins the voice channel and start playing.',
				usage: '[--force/-f]',
				examples: ['--force', '-f']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'force',
					match: 'flag',
					prefix: ['--force', '-f']
				}
			]
		});
	}

	async exec(message, { force }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.reply('Join a voice channel first, bitc*');
		} else if (!message.member.voice.channel.joinable) {
			return message.reply("I don't seem to have permission to enter this voice channel.");
		} else if (!message.member.voice.channel.speakable) {
			return message.channel.send("I don't seem to have permission to talk in this voice channel.");
		}
		const queue = this.client.music.queues.get(message.guild.id);
		if (!message.guild.me.voice || !message.guild.me.voice.channel || force) {
			await queue.player.join(message.member.voice.channel.id, { deaf: true });
			message.channel.send(':thumbsup:');
		}
		if ((!queue.player.playing && !queue.player.paused) || force) await queue.start();
	}
}

module.exports = StartCommand;
