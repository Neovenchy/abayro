const { Listener } = require('discord-akairo');
const { channels } = require('../../../struct/bot');
const Embed = require('../../../util/Embed');

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
		if (guild.defaultChannel) {
			try {
				guild.defChannel.send(`Hello! I'am **${this.client.user.username}**.\n▫ Start using me by typing: **${this.client.user.tag} help**\n▫ My website is: ** https://abayro.xyz **\n▫ Support, feedback, bugs and changelog goes here: https://discord.gg/USrsqKG`);
			} catch (e) {
				throw new Error(e);
			}
		}
	}
}

module.exports = guildCreateAddEvent;
