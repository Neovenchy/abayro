const { Listener } = require('discord-akairo');
const { channels } = require('../../util/Constants');
const Embed = require('../../util/Embed');

class guildCreateAddEvent extends Listener {
	constructor() {
		super('guildDelete', {
			emitter: 'client',
			eventName: 'guildDelete',
			category: 'client'
		});
	}

	exec(guild) {
		const embed = new Embed()
			.setAuthor('Guild Leave', guild.iconURL)
			.setColor('RED')
			.setThumbnail(guild.iconURL)
			.setDescription(`${this.client.user.username} has **__left__** **${guild.name}** (${guild.id}).`)
			.addField('❯ Owner', `**${guild.owner.user.tag}** (${guild.owner.id})`, true)
			.addField('❯ Members', `**${guild.memberCount}** member/s`, true)
			.addField('❯ Guilds Size', `**${this.client.guilds.size}** guild/s`, true)
			.setTimestamp();
		this.client.channels.get(channels.logs).send(embed);
	}
}

module.exports = guildCreateAddEvent;
