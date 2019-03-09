const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			eventName: 'ready',
			category: 'client'
		});
	}

	 exec() {
		this.client.logger.info(`${this.client.user.username} is ready to serve ${this.client.guilds.size} guilds and ${this.client.users.filter(user => !user.bot).size} users!`);
		this.client.user.setActivity(`@Abayro help | abayro.xyz`);
	}
}
module.exports = ReadyListener;
