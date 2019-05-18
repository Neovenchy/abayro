const { Command } = require('discord-akairo');

class supportCommand extends Command {
	constructor() {
		super('support', {
			aliases: ['support'],
			cooldown: 5000,
			ratelimit: 4,
			category: 'general',
			channelRestriction: 'guild',
			description: {
				content: "Dah It's support!?"

			}
		});
	}

	exec(message) {
		message.channel.send('https://abayro.xyz/support');
	}
}


module.exports = supportCommand;
