const { Listener } = require('discord-akairo');
const { channels } = require('../../../struct/bot');
const Embed = require('../../util/Embed');

class guildCreateAddEvent extends Listener {
	constructor() {
		super('guildCreate', {
			emitter: 'client',
			eventName: 'guildCreate',
			category: 'client'
		});
	}

	/**
     *
     * @param {import('discord.js').Guild} guild
     */
	exec(guild) {
		const embed = new Embed()
			.setColor('GREEN')
			.setTitle('Abayro joined a new server!')
			.setDescription(`
**- Server name** : \`${guild.name}\`
**- Server ID** : \`${guild.id}\`
**- Server owner** : ${guild.owner.user.tag}
**- Membercount** : \`${guild.memberCount}\`
**- Abayro is now in** : \`${this.client.guilds.size}\` Servers`)
			.setFooter('Abayro', this.client.user.avatarURL);
		this.client.channels.get(channels.logs).send(embed);
		const defChannel = guild.defaultChannel;
		if (!defChannel) return;
		defChannel.send(`Hello! I'am **${this.client.user.username}**.\n▫ Start using me by typing: **${this.client.user.tag} help**\n▫ My website is: ** https://abayro.xyz **\n▫ Support, Feedback, bugs and changelog goes here: https://discord.gg/USrsqKG`);
	}
}

module.exports = guildCreateAddEvent;
