const { Listener } = require('discord-akairo');
const { channels } = require('../../util/Constants');
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
		const embed = new Embed({})
			.setAuthor('Guild Join', guild.iconURL)
			.setColor('GREEN')
			.setThumbnail(guild.iconURL)
			.setDescription(`${this.client.user.username} has **__joined__** **${guild.name}** (${guild.id}).`)
			.addField('❯ Owner', `**${guild.owner.user.tag}** (${guild.owner.id})`, true)
			.addField('❯ Members', `**${guild.memberCount}** member/s`, true)
			.addField('❯ Number (guilds size)', `**${this.client.guilds.size}** guild/s`, true)
			.setTimestamp();
		this.client.channels.get(channels.logs).send(embed);
		if (guild.defaultChannel) {
			try {
				guild.defChannel.send(`Hello! I'am **${this.client.user.username}**.\n▫ Start using me by typing: **${this.client.user.tag} help**\n▫ My website is: ** https://abayro.xyz **\n▫ Support, feedback, bugs and my changelog goes here: https://discord.gg/USrsqKG`);
			} catch (e) {
				throw new Error(e);
			}
		}
	}
}

module.exports = guildCreateAddEvent;
