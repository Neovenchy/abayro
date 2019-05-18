const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
	constructor() {
		super('blacklist', {
			type: 'pre',
			reason: 'blacklist'
		});
	}

	exec(message) {
		const blacklisted = this.client.settings.get('global', 'blacklist', []);
		return blacklisted.includes(message.author.id);
	}
}

module.exports = BlacklistInhibitor;
