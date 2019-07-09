const { Listener } = require('discord-akairo');
const Embed = require('../../util/Embed');

class guildBanAddListener extends Listener {
	constructor() {
		super('guildBanAdd', {
			emitter: 'client',
			eventName: 'guildBanAdd',
			category: 'client'
		});
	}

	/**
     * @param {import('discord.js').Guild} guild
     * @param {import('discord.js').User} user
     */
	async exec(guild, user) {
		if (!guild.member(this.client.user).hasPermission('VIEW_AUDIT_LOG')) return;

		const logs = this.client.settings.get(guild, 'logs', undefined) && `${this.client.settings.get(guild, 'logsChannel', undefined)}`;

		if (logs) {
			const channel = guild.channels.get(logs);
			const auditlogs = await guild.fetchAuditLogs({ type: 22, limit: 1 });
			const { executor, reason } = auditlogs.entries.first().target === user ? auditlogs.entries.first() : { executor: null, reason: "Couldn't fetch reason." };
			const embed = new Embed('RED')
				.setAuthor('Member Ban', 'https://i.imgur.com/wqXmpIY.png')
				.setThumbnail(user.displayAvatarURL)
				.setDescription(`**${user.tag}** (${user.id}) got **__banned__** by ${executor ? `**${executor.tag}** (${executor.id})` : "Couldn't fetch mod."}`)
				.addField('❯ Reason', `**${reason.substring(0, 1020)}**`)
				.setFooter(executor.tag, executor.avatarURL)
				.setTimestamp();
			try {
				channel.send(embed);
			} catch {}
		}
	}
}

module.exports = guildBanAddListener;
