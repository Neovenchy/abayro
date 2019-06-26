const { Listener } = require('discord-akairo');
const { mod: { CONSTANTS: { COLORS }, logEmbed } } = require('../../util/Util');

class GuildBanRemoveListener extends Listener {
	constructor() {
		super('guildBanRemove', {
			emitter: 'client',
			eventName: 'guildBanRemove',
			category: 'client'
		});
	}

	async exec(guild, user) {
		const totalCases = this.client.settings.get(guild, 'caseTotal', 0) + 1;
		this.client.settings.set(guild, 'caseTotal', totalCases);
		const modLogChannel = this.client.settings.get(guild, 'logschnl');
		if (modLogChannel && this.client.settings.get(guild, 'logs')) {
			const embed = logEmbed({ member: user, action: 'Unban', caseNum: totalCases }).setColor(COLORS.UNBAN);
			await this.client.channels.get(modLogChannel).send(embed);
		}
	}
}

module.exports = GuildBanRemoveListener;
