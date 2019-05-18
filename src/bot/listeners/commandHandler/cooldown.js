const { Listener } = require('discord-akairo');
const { emojis } = require('../../struct/bot');

class Cooldown extends Listener {
	constructor() {
		super('cooldown', {
			emitter: 'commandHandler',
			eventName: 'commandCooldown',
			category: 'commandHandler'
		});
	}

	msToSeconds(ms) {
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return seconds;
	}

	exec(message, command, ms) {
		message.channel.send(`${emojis.info} **|** You need to wait **${this.msToSeconds(ms)}** seconds to use **${command.id}** again.`).then(msg => {
			msg.delete(3000);
		});
	}
}
module.exports = Cooldown;
