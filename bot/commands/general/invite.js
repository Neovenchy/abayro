const { Command } = require('discord-akairo');
class inviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'inv'],
			cooldown: 5000,
			ratelimit: 1,
			category: 'general',
			channelRestriction: 'guild',
			description: {
				content: 'Invite Abayro to your guild'

			}
		});
	}

	exec(message) {
		message.channel.send(`https://abayro.xyz/invite`);
	}
}


module.exports = inviteCommand;
