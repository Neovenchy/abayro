const { Command } = require('discord-akairo');

class PauseCommand extends Command {
	constructor() {
		super('pause', {
			aliases: ['pause'],
			description: {
				content: 'Pauses the queue.'
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2
		});
	}

	async exec(message) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.reply('Join a voice channel first, bitc*');
		}
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.player.pause();

		return message.channel.send('Paused the queue.');
	}
}

module.exports = PauseCommand;
