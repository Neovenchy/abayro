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
			.setColor('RED')
			.setTitle('Abayro left a server.')
			.setDescription(`
**- Server name** : ${guild.name}
**- Server ID** : \`${guild.id}\`
**- Server owner** : ${guild.owner}
**- Members count** : \`${guild.memberCount}\` members
**- Abayro is now in** : \`${this.client.guilds.size}\` Servers`)
			.setFooter('Abayro', this.client.user.avatarURL);
		this.client.channels.get(channels.logs).send(embed);
	}
}

module.exports = guildCreateAddEvent;
