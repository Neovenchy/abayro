const { Listener } = require('discord-akairo');
const { mod: { CONSTANTS: { COLORS }, logEmbed } } = require('../../util/Util');

class GuildBanAddListener extends Listener {
	constructor() {
		super('guildBanAdd', {
			emitter: 'client',
			eventName: 'guildBanAdd',
			category: 'client'
		});
	}

	async exec(guild, member) {
		const totalCases = this.client.settings.get(guild, 'caseTotal', 0) + 1;
		this.client.settings.set(guild, 'caseTotal', totalCases);
		const modLogChannel = this.client.settings.get(guild, 'logschnl');
		if (modLogChannel && this.client.settings.get(guild, 'logs')) {
			const embed = logEmbed({ member, action: 'Ban' }).setColor(COLORS.BAN);
			await this.client.channels.get(modLogChannel).send(embed);
		}
	}
}

module.exports = GuildBanAddListener;
